"""
Symptom checker — loads trained model and predicts disease.
"""
import os
import pickle
import numpy as np

BASE_DIR  = os.path.dirname(os.path.dirname(__file__))
MODEL_DIR = os.path.join(BASE_DIR, 'models')

_model = None
_meta  = None

def _load():
    global _model, _meta
    if _model is None:
        mpath = os.path.join(MODEL_DIR, 'disease_model.pkl')
        mpath2 = os.path.join(MODEL_DIR, 'model_metadata.pkl')
        if os.path.exists(mpath) and os.path.exists(mpath2):
            with open(mpath, 'rb') as f:
                _model = pickle.load(f)
            with open(mpath2, 'rb') as f:
                _meta = pickle.load(f)

def predict_disease(symptom_list):
    """
    symptom_list: list of symptom strings (e.g. ['fever', 'cough'])
    Returns dict with disease, confidence, specialist.
    """
    _load()
    if _model is None or _meta is None:
        return {'disease': 'Model not trained', 'confidence': 0, 'specialist': 'General Physician'}

    all_symptoms = _meta['all_symptoms']
    # Normalise input
    symptoms_clean = [s.strip().lower().replace(' ', '_') for s in symptom_list]

    row = [0] * len(all_symptoms)
    for s in symptoms_clean:
        if s in all_symptoms:
            row[all_symptoms.index(s)] = 1

    proba = _model.predict_proba([row])[0]
    idx   = int(np.argmax(proba))
    le    = _meta['label_encoder']
    disease    = le.inverse_transform([idx])[0]
    confidence = round(float(proba[idx]) * 100, 1)
    specialist = _meta['disease_specialist'].get(disease, 'General Physician')

    return {
        'disease':    disease,
        'confidence': confidence,
        'specialist': specialist,
    }


def get_all_symptoms():
    _load()
    if _meta:
        return _meta['all_symptoms']
    return []
