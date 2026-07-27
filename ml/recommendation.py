"""
Doctor recommendation based on specialization and rating.
"""
import sqlite3
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
DATABASE = os.path.join(BASE_DIR, 'database', 'hospital.db')


def recommend_doctors(specialist, top_n=3):
    """Return top N doctors for a specialization sorted by rating."""
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    rows = conn.execute('''
        SELECT * FROM doctors
        WHERE LOWER(specialization) LIKE ?
        ORDER BY rating DESC, experience DESC
        LIMIT ?
    ''', (f'%{specialist.lower()}%', top_n)).fetchall()
    conn.close()
    return [dict(r) for r in rows]
