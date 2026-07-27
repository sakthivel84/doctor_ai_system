"""
Smart scheduling — return available time slots for a doctor on a given date.
"""
import sqlite3
import os
from datetime import datetime

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
DATABASE = os.path.join(BASE_DIR, 'database', 'hospital.db')

ALL_SLOTS = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM',
    '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM',
    '04:00 PM', '04:30 PM', '05:00 PM',
]


def get_available_slots(doctor_id: int, date: str) -> list:
    """Return list of available slots for a doctor on a date."""
    conn = sqlite3.connect(DATABASE)
    booked = conn.execute('''
        SELECT time_slot FROM appointments
        WHERE doctor_id = ? AND appointment_date = ? AND status != 'cancelled'
    ''', (doctor_id, date)).fetchall()
    conn.close()

    booked_set = {row[0] for row in booked}

    # Don't show past slots for today
    today = datetime.now().strftime('%Y-%m-%d')
    available = []
    for slot in ALL_SLOTS:
        if slot in booked_set:
            continue
        if date == today:
            try:
                slot_dt = datetime.strptime(f'{date} {slot}', '%Y-%m-%d %I:%M %p')
                if slot_dt <= datetime.now():
                    continue
            except Exception:
                pass
        available.append(slot)

    return available


def suggest_best_slot(doctor_id: int, date: str) -> str:
    """Return the earliest available slot."""
    slots = get_available_slots(doctor_id, date)
    return slots[0] if slots else None
