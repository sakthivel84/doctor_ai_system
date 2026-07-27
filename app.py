from flask import Flask, render_template, request, redirect, url_for, session, jsonify, send_from_directory
import sqlite3
import hashlib
import os
import json
import pickle
import numpy as np
from datetime import datetime, timedelta
import sys

sys.path.insert(0, os.path.dirname(__file__))

app = Flask(__name__, static_folder=None)
app.secret_key = os.environ.get('SECRET_KEY', 'doctor_ai_secret_key_2024')

FRONTEND_DIR = os.path.join(os.path.dirname(__file__), 'frontend', 'dist')

DATABASE = os.path.join(os.path.dirname(__file__), 'database', 'hospital.db')

# ─── Database helpers ────────────────────────────────────────────────────────

def get_db():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    with open(os.path.join(os.path.dirname(__file__), 'database', 'schema.sql')) as f:
        conn.executescript(f.read())
    conn.commit()
    conn.close()

def hash_password(password):
    return hashlib.sha256(password.encode()).hexdigest()

# ─── Auth routes ─────────────────────────────────────────────────────────────

@app.route('/api/login', methods=['POST'])
def api_login():
    email    = request.form.get('email', '').strip()
    password = request.form.get('password', '')
    conn = get_db()
    user = conn.execute(
        'SELECT * FROM patients WHERE email = ? AND password = ?',
        (email, hash_password(password))
    ).fetchone()
    conn.close()
    if user:
        session['user_id']   = user['id']
        session['user_name'] = user['name']
        return jsonify({'success': True, 'name': user['name']})
    return jsonify({'success': False, 'error': 'Invalid email or password.'}), 401

@app.route('/api/register', methods=['POST'])
def api_register():
    name    = request.form.get('name', '').strip()
    email   = request.form.get('email', '').strip()
    password = request.form.get('password', '')
    phone   = request.form.get('phone', '').strip()
    age     = request.form.get('age', 0)
    gender  = request.form.get('gender', '')

    if not all([name, email, password]):
        return jsonify({'success': False, 'error': 'All fields are required.'}), 400

    conn = get_db()
    existing = conn.execute('SELECT id FROM patients WHERE email = ?', (email,)).fetchone()
    if existing:
        conn.close()
        return jsonify({'success': False, 'error': 'Email already registered.'}), 400

    conn.execute(
        'INSERT INTO patients (name, email, password, phone, age, gender) VALUES (?,?,?,?,?,?)',
        (name, email, hash_password(password), phone, age, gender)
    )
    conn.commit()
    conn.close()
    return jsonify({'success': True})

@app.route('/api/logout')
def api_logout():
    session.clear()
    return jsonify({'success': True})

# ─── Dashboard API ────────────────────────────────────────────────────────────

@app.route('/api/dashboard')
def api_dashboard():
    if 'user_id' not in session:
        return jsonify({'error': 'Not authenticated'}), 401
    uid  = session['user_id']
    conn = get_db()
    appointments = conn.execute('''
        SELECT a.*, d.name AS doctor_name, d.specialization
        FROM appointments a
        JOIN doctors d ON a.doctor_id = d.id
        WHERE a.patient_id = ?
        ORDER BY a.appointment_date DESC
    ''', (uid,)).fetchall()
    total    = len(appointments)
    upcoming = sum(1 for a in appointments if a['status'] == 'scheduled')
    completed = sum(1 for a in appointments if a['status'] == 'completed')
    conn.close()
    return jsonify({
        'appointments': [dict(a) for a in appointments],
        'total': total, 'upcoming': upcoming, 'completed': completed,
        'user_name': session.get('user_name', '')
    })

# ─── Book Appointment API ─────────────────────────────────────────────────────

@app.route('/api/book', methods=['POST'])
def api_book():
    if 'user_id' not in session:
        return jsonify({'error': 'Not authenticated'}), 401
    data      = request.get_json()
    doctor_id = data.get('doctor_id')
    date      = data.get('appointment_date')
    time_slot = data.get('time_slot')
    reason    = data.get('reason', '')

    conn = get_db()
    existing = conn.execute('''
        SELECT id FROM appointments
        WHERE doctor_id = ? AND appointment_date = ? AND time_slot = ? AND status != 'cancelled'
    ''', (doctor_id, date, time_slot)).fetchone()
    if existing:
        conn.close()
        return jsonify({'success': False, 'error': 'Slot already booked.'}), 400

    conn.execute('''
        INSERT INTO appointments (patient_id, doctor_id, appointment_date, time_slot, reason, status)
        VALUES (?,?,?,?,?,'scheduled')
    ''', (session['user_id'], doctor_id, date, time_slot, reason))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

@app.route('/api/cancel/<int:appt_id>', methods=['POST'])
def api_cancel(appt_id):
    if 'user_id' not in session:
        return jsonify({'error': 'Not authenticated'}), 401
    conn = get_db()
    conn.execute("UPDATE appointments SET status = 'cancelled' WHERE id = ? AND patient_id = ?",
                 (appt_id, session['user_id']))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

@app.route('/api/session')
def api_session():
    return jsonify({
        'logged_in': 'user_id' in session,
        'user_name': session.get('user_name', ''),
        'user_id': session.get('user_id', None)
    })

@app.route('/api/chatbot', methods=['POST'])
def chatbot_api():
    data    = request.get_json()
    message = data.get('message', '').lower().strip()

    from utils.chatbot import get_response
    reply = get_response(message)
    return jsonify({'reply': reply})

# ─── Symptom Checker API ─────────────────────────────────────────────────────

@app.route('/api/check-symptoms', methods=['POST'])
def check_symptoms():
    data     = request.get_json()
    symptoms = data.get('symptoms', [])

    from ml.symptom_checker import predict_disease
    from utils.emergency import is_emergency

    result    = predict_disease(symptoms)
    emergency = is_emergency(symptoms)

    conn    = get_db()
    doctors = []
    if result.get('disease'):
        doctors = conn.execute('''
            SELECT * FROM doctors
            WHERE LOWER(specialization) LIKE ?
            ORDER BY rating DESC LIMIT 3
        ''', (f"%{result.get('specialist', '').lower()}%",)).fetchall()
        doctors = [dict(d) for d in doctors]
    conn.close()

    return jsonify({
        'disease':    result.get('disease', 'Unknown'),
        'confidence': result.get('confidence', 0),
        'specialist': result.get('specialist', 'General Physician'),
        'emergency':  emergency,
        'doctors':    doctors
    })

# ─── Smart scheduling ─────────────────────────────────────────────────────────

@app.route('/api/available-slots', methods=['POST'])
def available_slots():
    data      = request.get_json()
    doctor_id = data.get('doctor_id')
    date      = data.get('date')

    from utils.scheduler import get_available_slots
    slots = get_available_slots(doctor_id, date)
    return jsonify({'slots': slots})

# ─── Voice Intent ────────────────────────────────────────────

@app.route('/api/parse-voice', methods=['POST'])
def parse_voice():
    data       = request.get_json()
    transcript = data.get('transcript', '')
    from utils.voice import parse_booking_intent
    intent = parse_booking_intent(transcript)
    return jsonify(intent)

# ─── Doctors API ─────────────────────────────────────────────────────────────

@app.route('/api/doctors')
def get_doctors():
    conn    = get_db()
    doctors = conn.execute('SELECT * FROM doctors ORDER BY rating DESC').fetchall()
    conn.close()
    return jsonify([dict(d) for d in doctors])

# ─── Reviews ─────────────────────────────────────────────────────────────────

@app.route('/api/review', methods=['POST'])
def add_review():
    if 'user_id' not in session:
        return jsonify({'error': 'Not authenticated'}), 401
    data      = request.get_json()
    doctor_id = data.get('doctor_id')
    rating    = data.get('rating', 5)
    comment   = data.get('comment', '')

    conn = get_db()
    conn.execute(
        'INSERT INTO reviews (patient_id, doctor_id, rating, comment) VALUES (?,?,?,?)',
        (session['user_id'], doctor_id, rating, comment)
    )
    # Update doctor avg rating
    avg = conn.execute(
        'SELECT AVG(rating) as avg FROM reviews WHERE doctor_id = ?', (doctor_id,)
    ).fetchone()['avg']
    conn.execute('UPDATE doctors SET rating = ? WHERE id = ?', (round(avg, 1), doctor_id))
    conn.commit()
    conn.close()
    return jsonify({'success': True})

# ─── React Frontend ───────────────────────────────────────────────────────────

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve_react(path):
    if path and os.path.exists(os.path.join(FRONTEND_DIR, path)):
        return send_from_directory(FRONTEND_DIR, path)
    return send_from_directory(FRONTEND_DIR, 'index.html')

# ─── Initialization ──────────────────────────────────────────────────────────

def initialize_app():
    os.makedirs('database', exist_ok=True)
    os.makedirs('models', exist_ok=True)
    if not os.path.exists(DATABASE):
        init_db()
    else:
        conn = get_db()
        count = conn.execute('SELECT COUNT(*) as c FROM doctors').fetchone()
        if count['c'] == 0:
            init_db()
        conn.close()
    from ml.train_model import train_and_save
    train_and_save()

initialize_app()

# ─── Entry point ─────────────────────────────────────────────────────────────

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)
