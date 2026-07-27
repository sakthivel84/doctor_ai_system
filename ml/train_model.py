"""
Train disease prediction model using symptom data.
Saves models to /models/ directory.
"""
import os
import pickle
import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import LabelEncoder
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

BASE_DIR   = os.path.dirname(os.path.dirname(__file__))
MODEL_DIR  = os.path.join(BASE_DIR, 'models')

# All possible symptoms
ALL_SYMPTOMS = [
    'fever', 'cough', 'fatigue', 'headache', 'chest_pain', 'shortness_of_breath',
    'nausea', 'vomiting', 'diarrhea', 'abdominal_pain', 'back_pain', 'joint_pain',
    'skin_rash', 'itching', 'dizziness', 'blurred_vision', 'runny_nose', 'sore_throat',
    'muscle_pain', 'loss_of_appetite', 'weight_loss', 'excessive_thirst', 'frequent_urination',
    'swollen_lymph_nodes', 'high_blood_pressure', 'palpitations', 'sweating',
    'chills', 'stiff_neck', 'seizures', 'numbness', 'tingling', 'hearing_loss',
    'ear_pain', 'eye_redness', 'watery_eyes', 'difficulty_swallowing', 'hoarseness',
    'bloating', 'constipation', 'blood_in_urine', 'painful_urination', 'erectile_dysfunction',
    'irregular_heartbeat', 'swollen_joints', 'cold_hands', 'yellowing_skin', 'dark_urine'
]

# Disease → specialist mapping
DISEASE_SPECIALIST = {
    'Common Cold':        'General Physician',
    'Influenza':          'General Physician',
    'Pneumonia':          'Pulmonologist',
    'Tuberculosis':       'Pulmonologist',
    'Asthma':             'Pulmonologist',
    'Heart Disease':      'Cardiologist',
    'Hypertension':       'Cardiologist',
    'Migraine':           'Neurologist',
    'Epilepsy':           'Neurologist',
    'Stroke':             'Neurologist',
    'Diabetes':           'Endocrinologist',
    'Hypothyroidism':     'Endocrinologist',
    'Gastroenteritis':    'Gastroenterologist',
    'GERD':               'Gastroenterologist',
    'Jaundice':           'Gastroenterologist',
    'Urinary Tract Infection': 'Urologist',
    'Kidney Stones':      'Urologist',
    'Arthritis':          'Orthopedist',
    'Osteoporosis':       'Orthopedist',
    'Eczema':             'Dermatologist',
    'Psoriasis':          'Dermatologist',
    'Conjunctivitis':     'Ophthalmologist',
    'Glaucoma':           'Ophthalmologist',
    'Sinusitis':          'ENT Specialist',
    'Tonsillitis':        'ENT Specialist',
    'Depression':         'Psychiatrist',
    'Anxiety':            'Psychiatrist',
}

# Symptom patterns per disease (which symptoms are strongly associated)
DISEASE_SYMPTOMS = {
    'Common Cold':      ['runny_nose', 'cough', 'sore_throat', 'fever', 'fatigue'],
    'Influenza':        ['fever', 'cough', 'muscle_pain', 'fatigue', 'headache', 'chills'],
    'Pneumonia':        ['fever', 'cough', 'shortness_of_breath', 'chest_pain', 'fatigue'],
    'Tuberculosis':     ['cough', 'weight_loss', 'fever', 'sweating', 'fatigue', 'loss_of_appetite'],
    'Asthma':           ['shortness_of_breath', 'cough', 'chest_pain', 'wheezing'],
    'Heart Disease':    ['chest_pain', 'shortness_of_breath', 'fatigue', 'palpitations', 'sweating'],
    'Hypertension':     ['headache', 'dizziness', 'high_blood_pressure', 'blurred_vision', 'palpitations'],
    'Migraine':         ['headache', 'nausea', 'blurred_vision', 'dizziness', 'fatigue'],
    'Epilepsy':         ['seizures', 'fatigue', 'headache', 'numbness', 'tingling'],
    'Stroke':           ['numbness', 'headache', 'dizziness', 'blurred_vision', 'tingling'],
    'Diabetes':         ['excessive_thirst', 'frequent_urination', 'fatigue', 'blurred_vision', 'weight_loss'],
    'Hypothyroidism':   ['fatigue', 'weight_loss', 'cold_hands', 'loss_of_appetite', 'dizziness'],
    'Gastroenteritis':  ['nausea', 'vomiting', 'diarrhea', 'abdominal_pain', 'fever'],
    'GERD':             ['abdominal_pain', 'nausea', 'bloating', 'difficulty_swallowing', 'chest_pain'],
    'Jaundice':         ['yellowing_skin', 'dark_urine', 'fatigue', 'abdominal_pain', 'loss_of_appetite'],
    'Urinary Tract Infection': ['painful_urination', 'frequent_urination', 'blood_in_urine', 'fever', 'abdominal_pain'],
    'Kidney Stones':    ['back_pain', 'abdominal_pain', 'blood_in_urine', 'nausea', 'painful_urination'],
    'Arthritis':        ['joint_pain', 'swollen_joints', 'stiff_neck', 'back_pain', 'fatigue'],
    'Osteoporosis':     ['back_pain', 'joint_pain', 'fatigue', 'muscle_pain'],
    'Eczema':           ['itching', 'skin_rash', 'swollen_lymph_nodes', 'fatigue'],
    'Psoriasis':        ['skin_rash', 'itching', 'joint_pain', 'fatigue'],
    'Conjunctivitis':   ['eye_redness', 'watery_eyes', 'itching', 'blurred_vision'],
    'Glaucoma':         ['blurred_vision', 'headache', 'eye_redness', 'nausea'],
    'Sinusitis':        ['headache', 'runny_nose', 'sore_throat', 'fever', 'fatigue'],
    'Tonsillitis':      ['sore_throat', 'fever', 'difficulty_swallowing', 'swollen_lymph_nodes'],
    'Depression':       ['fatigue', 'loss_of_appetite', 'weight_loss', 'headache'],
    'Anxiety':          ['palpitations', 'sweating', 'dizziness', 'shortness_of_breath', 'fatigue'],
}


def generate_dataset(n_samples=2000):
    """Synthesize a training dataset."""
    symptom_idx = {s: i for i, s in enumerate(ALL_SYMPTOMS)}
    diseases    = list(DISEASE_SYMPTOMS.keys())
    X, y        = [], []

    np.random.seed(42)
    for _ in range(n_samples):
        disease     = np.random.choice(diseases)
        core_syms   = DISEASE_SYMPTOMS[disease]
        row         = [0] * len(ALL_SYMPTOMS)
        for s in core_syms:
            if s in symptom_idx and np.random.random() > 0.2:
                row[symptom_idx[s]] = 1
        # Noise
        for i in range(len(row)):
            if row[i] == 0 and np.random.random() < 0.05:
                row[i] = 1
        X.append(row)
        y.append(disease)

    return np.array(X), np.array(y)


def train_and_save():
    """Train model and save to disk (skip if already exists)."""
    model_path = os.path.join(MODEL_DIR, 'disease_model.pkl')
    meta_path  = os.path.join(MODEL_DIR, 'model_metadata.pkl')

    if os.path.exists(model_path):
        return

    os.makedirs(MODEL_DIR, exist_ok=True)
    print('[ML] Training disease prediction model...')

    X, y         = generate_dataset(3000)
    le           = LabelEncoder()
    y_enc        = le.fit_transform(y)
    X_tr, X_te, y_tr, y_te = train_test_split(X, y_enc, test_size=0.2, random_state=42)

    model = RandomForestClassifier(n_estimators=150, max_depth=12, random_state=42)
    model.fit(X_tr, y_tr)

    acc = accuracy_score(y_te, model.predict(X_te))
    print(f'[ML] Accuracy: {acc:.2%}')

    with open(model_path, 'wb') as f:
        pickle.dump(model, f)

    meta = {
        'label_encoder':      le,
        'all_symptoms':       ALL_SYMPTOMS,
        'disease_specialist': DISEASE_SPECIALIST,
    }
    with open(meta_path, 'wb') as f:
        pickle.dump(meta, f)

    print('[ML] Models saved.')


if __name__ == '__main__':
    train_and_save()
    print('Training complete.')
