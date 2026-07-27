# 🏥 MediAI — AI-Powered Doctor Appointment Booking System

> A complete final-year level AI healthcare project built with Python Flask, SQLite, Machine Learning, and a polished frontend.

---

## 📋 Project Overview

MediAI is an intelligent healthcare management platform that combines:
- **AI-powered symptom diagnosis** using a trained Random Forest model
- **Smart appointment booking** with conflict prevention
- **Emergency detection** for critical symptom combinations
- **AI chatbot** for 24/7 health assistance
- **Voice-based booking** via Web Speech API
- **Doctor recommendation** based on predicted specialization and ratings

---

## 🗂️ Project Structure

```
doctor_ai_system/
├── app.py                    # Main Flask application (routes + API)
├── requirements.txt          # Python dependencies
├── README.md
├── templates/
│   ├── index.html            # Landing page
│   ├── login.html            # Sign in page
│   ├── register.html         # Registration page
│   ├── dashboard.html        # User dashboard with stats
│   ├── book_appointment.html # Doctor selection + slot booking
│   ├── chatbot.html          # AI chatbot interface
│   └── symptom_checker.html  # AI symptom analysis
├── static/
│   ├── style.css             # Complete design system
│   └── script.js             # Frontend JS (voice, animations, API calls)
├── ml/
│   ├── train_model.py        # Model training script (RandomForest)
│   ├── symptom_checker.py    # Prediction logic
│   └── recommendation.py     # Doctor recommendation engine
├── models/                   # Saved .pkl model files (auto-generated)
├── database/
│   └── schema.sql            # Table definitions + 12 seed doctors
└── utils/
    ├── chatbot.py            # Rule-based chatbot engine
    ├── scheduler.py          # Smart slot availability
    ├── voice.py              # Voice transcript intent parser
    └── emergency.py          # Critical symptom detection
```

---

## ⚙️ Setup Instructions

### 1. Prerequisites
- Python 3.9 or higher
- pip (Python package manager)
- Google Chrome (for voice input feature)

### 2. Install dependencies

```bash
cd doctor_ai_system
pip install -r requirements.txt
```

### 3. Run the application

```bash
python app.py
```

On first run, the app automatically:
1. Creates the SQLite database (`database/hospital.db`)
2. Seeds 12 specialist doctors
3. Trains the ML disease prediction model
4. Saves model files to `/models/`

### 4. Open in browser

```
http://localhost:5000
```

### 5. Demo account (optional)

Register a new account or use the login page to create one.

---

## 🚀 Features Explained

### 🔐 Authentication
- Secure registration and login with SHA-256 password hashing
- Session management via Flask sessions

### 🧠 AI Symptom Checker
- Select from 47 common symptoms
- Random Forest classifier trained on 3,000 synthetic samples
- Predicts from 27 diseases across 12 specializations
- Displays confidence score with animated bar

### 🚨 Emergency Detection
- Detects critical symptom combos (chest pain + shortness of breath, seizures, etc.)
- Shows animated emergency banner with helpline numbers (108, 112)

### 👨‍⚕️ Doctor Recommendation
- Matches predicted specialization to doctors in DB
- Sorted by rating and experience
- Book directly from symptom result page

### 📅 Smart Appointment Booking
- Browse 12+ specialist doctors with search/filter
- Real-time slot availability (no overlapping bookings)
- Prevents past-time slots for today's date
- Sticky booking panel with step-by-step UX

### 🎤 Voice Booking
- Uses Web Speech API (Chrome required)
- Extracts doctor name, date, time from natural speech
- Falls back gracefully on unsupported browsers

### 🤖 AI Chatbot (MediBot)
- Rule-based NLP with regex pattern matching
- Handles 15+ intent categories
- Quick-reply buttons for common queries
- Voice input support in chat

### 📊 Dashboard
- Appointment stats (total, upcoming, completed)
- Full appointment history table
- Cancel appointments with confirmation
- Quick action shortcuts

---

## 🗄️ Database Schema

| Table        | Key Columns |
|-------------|------------|
| patients    | id, name, email, password, phone, age, gender |
| doctors     | id, name, specialization, experience, rating, fee |
| appointments | id, patient_id, doctor_id, date, time_slot, status |
| reviews      | id, patient_id, doctor_id, rating, comment |

---

## 🤖 ML Model Details

- **Algorithm**: Random Forest Classifier (150 trees, max_depth=12)
- **Training data**: 3,000 synthetically generated samples
- **Features**: 47 binary symptom indicators
- **Labels**: 27 disease classes
- **Accuracy**: ~85–92% on held-out test set
- **Persistence**: Saved as `.pkl` via Python pickle

---

## 🛠️ Tech Stack

| Layer      | Technology |
|-----------|------------|
| Backend    | Python 3, Flask |
| Database   | SQLite (via sqlite3) |
| ML         | scikit-learn (RandomForest) |
| Frontend   | HTML5, CSS3, Vanilla JS |
| Fonts      | Google Fonts (Playfair Display, DM Sans) |
| Voice      | Web Speech API |

---

## 📝 Notes

- `spacy` and `opencv-python` are listed as optional — the core system uses `scikit-learn` and `nltk` only
- The ML model auto-trains on first run; subsequent runs skip training
- SQLite is used for simplicity; swap the `get_db()` function for MySQL/PostgreSQL in production
- Voice input requires HTTPS in production (works on localhost without HTTPS)

---

## 👨‍💻 Author

Final Year AI Healthcare Project — Built with Flask + scikit-learn + modern frontend design.
