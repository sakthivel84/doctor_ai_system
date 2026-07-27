"""
MediBot — AI Chatbot for Doctor AI System
Upgraded with OpenAI API + rule-based fallback
"""
import re
import os
from datetime import datetime

# ─── OpenAI Setup ────────────────────────────────────────────
# Install: pip install openai
# Set your key below OR use environment variable

OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY", "")

# Try to load OpenAI
try:
    from openai import OpenAI
    client = OpenAI(api_key=OPENAI_API_KEY)
    USE_AI = True
    print("[Chatbot] OpenAI API loaded successfully.")
except ImportError:
    client = None
    USE_AI = False
    print("[Chatbot] OpenAI not installed. Using rule-based fallback.")

# ─── System Prompt for AI Mode ────────────────────────────────
SYSTEM_PROMPT = """You are MediBot, a helpful AI health assistant for MediAI — a smart doctor appointment booking platform in India.

You help patients with:
- Booking, cancelling, and rescheduling doctor appointments
- Understanding symptoms and recommending specialists
- Explaining consultation fees (typically ₹500–₹1600)
- Emergency guidance (always refer to 108 or 112 for emergencies)
- General health queries

Rules:
- Keep responses short and friendly (max 4-5 lines)
- Never diagnose a patient — always recommend seeing a real doctor
- For emergencies, immediately mention calling 108 or 112
- Use simple language, avoid heavy medical jargon
- You work for an Indian hospital platform"""

# ─── Rule-Based Fallback Patterns ────────────────────────────
RESPONSES = {
    r'\b(hi|hello|hey|good morning|good afternoon|good evening)\b': [
        "Hello! I'm MediBot 🏥 — your AI health assistant. How can I help you today?",
        "Hi there! I'm here to assist with appointments, symptoms, and health queries. What do you need?",
    ],
    r'\b(book|schedule|appoint|reserve)\b': [
        "To book an appointment:\n1. Go to **Book Appointment** from the dashboard\n2. Choose your doctor\n3. Pick a date and time slot\n4. Confirm your booking!\n\nWould you like me to guide you further?",
    ],
    r'\b(cancel|reschedule)\b': [
        "You can cancel an appointment from your **Dashboard** by clicking the 'Cancel' button next to the appointment. Rescheduling requires cancelling and booking a new slot.",
    ],
    r'\b(available|slot|timing|time)\b': [
        "Doctors are generally available on weekdays (Mon–Fri) with slots from 9 AM to 5 PM. Use the 'Check Available Slots' feature while booking for real-time availability.",
    ],
    r'\b(symptom|sick|ill|disease|pain|fever|cough|headache)\b': [
        "Please use our **AI Symptom Checker** to analyse your symptoms and get a disease prediction along with recommended specialists. Click on 'Symptom Checker' in the navigation.",
    ],
    r'\b(emergency|urgent|critical|ambulance|chest pain|breathing)\b': [
        "⚠️ **EMERGENCY DETECTED!**\nIf you're experiencing a medical emergency, please:\n• Call **108** (Emergency Ambulance)\n• Call **112** (National Emergency)\nDo NOT wait — seek immediate help!",
    ],
    r'\b(doctor|specialist|physician|find doctor)\b': [
        "We have 12+ specialist doctors across Cardiology, Neurology, Dermatology, and more. Use the **Book Appointment** page to browse and filter doctors by specialization.",
    ],
    r'\b(cost|fee|price|charge|pay)\b': [
        "Consultation fees vary by doctor and specialization, typically ₹500–₹1600. The exact fee is shown on each doctor's profile when you book.",
    ],
    r'\b(report|history|previous|past appointment)\b': [
        "Your full appointment history is available on the **Dashboard**. You can view status, date, doctor name, and more.",
    ],
    r'\b(hour|open|working|clinic timing)\b': [
        "Our system is available 24/7 for booking! Doctors are generally available Mon–Fri, 9 AM to 5 PM, with some offering weekend slots.",
    ],
    r'\b(thank|thanks|thank you|helpful)\b': [
        "You're welcome! 😊 Is there anything else I can help you with?",
    ],
    r'\b(bye|goodbye|exit|quit|see you)\b': [
        "Take care and stay healthy! 💊 Goodbye!",
    ],
}

DEFAULT_RESPONSES = [
    "I'm not sure I understand that fully. Could you rephrase? I can help with:\n• Booking appointments\n• Symptom checking\n• Finding doctors\n• Emergency guidance",
    "I didn't catch that. Try asking about **appointments**, **symptoms**, **doctors**, or **fees**.",
    "Hmm, I'm still learning! For complex queries, please use the relevant feature directly or contact our support.",
]

# ─── Main Response Function ───────────────────────────────────
def get_response(message: str) -> str:
    """
    Returns chatbot response.
    Uses OpenAI API if available, otherwise falls back to rule-based.
    """

    # 1. Always handle emergencies locally (never delegate to AI for safety)
    if re.search(r'\b(emergency|ambulance|chest pain|can\'t breathe|heart attack|stroke)\b',
                 message.lower()):
        return ("⚠️ **EMERGENCY DETECTED!**\n"
                "If you're experiencing a medical emergency, please:\n"
                "• Call **108** (Emergency Ambulance)\n"
                "• Call **112** (National Emergency)\n"
                "Do NOT wait — seek immediate help!")

    # 2. Try OpenAI API
    if USE_AI and client:
        try:
            response = client.chat.completions.create(
                model="gpt-4o-mini",          # cheap + fast model
                messages=[
                    {"role": "system", "content": SYSTEM_PROMPT},
                    {"role": "user",   "content": message}
                ],
                max_tokens=200,
                temperature=0.7
            )
            return response.choices[0].message.content.strip()

        except Exception as e:
            print(f"[Chatbot] OpenAI error: {e} — falling back to rules")
            # Fall through to rule-based below

    # 3. Rule-based fallback
    return _rule_based_response(message)


def _rule_based_response(message: str) -> str:
    """Original rule-based pattern matching."""
    message_lower = message.lower()
    for pattern, replies in RESPONSES.items():
        if re.search(pattern, message_lower):
            return replies[0]   # ← fixed: always return first reply cleanly
    return DEFAULT_RESPONSES[hash(message) % len(DEFAULT_RESPONSES)]
