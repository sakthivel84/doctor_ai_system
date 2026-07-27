"""
Emergency symptom detection — flags critical symptom combinations.
"""

EMERGENCY_SYMPTOMS = {
    'chest_pain',
    'shortness_of_breath',
    'seizures',
    'stroke',
    'numbness',
    'irregular_heartbeat',
    'palpitations',
    'blurred_vision',
    'difficulty_swallowing',
    'blood_in_urine',
    'yellowing_skin',
    'high_blood_pressure',
}

# Combos that are critical together
CRITICAL_COMBOS = [
    {'chest_pain', 'shortness_of_breath'},
    {'chest_pain', 'sweating'},
    {'chest_pain', 'palpitations'},
    {'seizures', 'fever'},
    {'numbness', 'dizziness', 'blurred_vision'},
    {'shortness_of_breath', 'cough', 'fever'},
]


def is_emergency(symptom_list: list) -> bool:
    symptoms_set = set(s.strip().lower().replace(' ', '_') for s in symptom_list)

    # Single critical symptom
    if symptoms_set & EMERGENCY_SYMPTOMS:
        return True

    # Critical combo
    for combo in CRITICAL_COMBOS:
        if combo.issubset(symptoms_set):
            return True

    return False


def get_emergency_message(symptom_list: list) -> str:
    if is_emergency(symptom_list):
        return (
            "⚠️ EMERGENCY ALERT: One or more of your symptoms may indicate a serious "
            "medical condition. Please call 108 (Ambulance) or 112 immediately. "
            "Do not delay seeking help!"
        )
    return ""
