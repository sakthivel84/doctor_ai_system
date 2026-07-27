"""
Voice processing helper.
Actual speech-to-text is handled on the frontend via the Web Speech API.
This module processes the transcribed text and extracts booking intent.
"""
import re


def parse_booking_intent(transcript: str) -> dict:
    """
    Parse a voice transcript to extract booking intent fields.
    Returns a dict with detected keys.
    """
    transcript = transcript.lower().strip()
    result = {}

    # Doctor name
    doc_match = re.search(r'(?:dr\.?|doctor)\s+([a-z]+(?:\s+[a-z]+)?)', transcript)
    if doc_match:
        result['doctor_name'] = doc_match.group(1).title()

    # Date
    if 'tomorrow' in transcript:
        from datetime import datetime, timedelta
        result['date'] = (datetime.now() + timedelta(days=1)).strftime('%Y-%m-%d')
    elif 'today' in transcript:
        from datetime import datetime
        result['date'] = datetime.now().strftime('%Y-%m-%d')
    else:
        date_match = re.search(r'(\d{1,2})[/-](\d{1,2})(?:[/-](\d{2,4}))?', transcript)
        if date_match:
            m, d, y = date_match.groups()
            from datetime import datetime
            year = int(y) if y else datetime.now().year
            result['date'] = f'{year}-{int(m):02d}-{int(d):02d}'

    # Time
    time_match = re.search(r'(\d{1,2})(?::(\d{2}))?\s*(am|pm)', transcript)
    if time_match:
        h, m, ampm = time_match.groups()
        m = m or '00'
        result['time'] = f'{int(h):02d}:{m} {ampm.upper()}'

    # Specialty intent
    specialties = [
        'cardiolog', 'neurolog', 'dermatolog', 'orthoped',
        'general', 'gastro', 'pulmon', 'endocrin',
        'ophthal', 'ent', 'psychiatr', 'urolog',
    ]
    for sp in specialties:
        if sp in transcript:
            result['specialty'] = sp
            break

    return result
