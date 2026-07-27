-- Doctor AI Appointment System Schema

CREATE TABLE IF NOT EXISTS patients (
    id        INTEGER PRIMARY KEY AUTOINCREMENT,
    name      TEXT NOT NULL,
    email     TEXT UNIQUE NOT NULL,
    password  TEXT NOT NULL,
    phone     TEXT,
    age       INTEGER,
    gender    TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS doctors (
    id             INTEGER PRIMARY KEY AUTOINCREMENT,
    name           TEXT NOT NULL,
    specialization TEXT NOT NULL,
    qualification  TEXT,
    experience     INTEGER DEFAULT 0,
    rating         REAL DEFAULT 4.5,
    phone          TEXT,
    email          TEXT,
    available_days TEXT DEFAULT 'Mon,Tue,Wed,Thu,Fri',
    fee            INTEGER DEFAULT 500,
    photo          TEXT DEFAULT 'default_doctor.png'
);

CREATE TABLE IF NOT EXISTS appointments (
    id               INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id       INTEGER NOT NULL,
    doctor_id        INTEGER NOT NULL,
    appointment_date TEXT NOT NULL,
    time_slot        TEXT NOT NULL,
    reason           TEXT,
    status           TEXT DEFAULT 'scheduled',
    created_at       DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (doctor_id)  REFERENCES doctors(id)
);

CREATE TABLE IF NOT EXISTS reviews (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    patient_id INTEGER NOT NULL,
    doctor_id  INTEGER NOT NULL,
    rating     INTEGER CHECK(rating BETWEEN 1 AND 5),
    comment    TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (patient_id) REFERENCES patients(id),
    FOREIGN KEY (doctor_id)  REFERENCES doctors(id)
);

-- Seed Doctors
INSERT OR IGNORE INTO doctors (id, name, specialization, qualification, experience, rating, phone, email, fee) VALUES
(1,  'Dr. Ananya Sharma',    'Cardiologist',       'MBBS, MD Cardiology',      15, 4.8, '9876543210', 'ananya@hospital.com',  1200),
(2,  'Dr. Rahul Verma',      'Neurologist',        'MBBS, DM Neurology',       12, 4.7, '9876543211', 'rahul@hospital.com',   1500),
(3,  'Dr. Priya Patel',      'Dermatologist',      'MBBS, MD Dermatology',      8, 4.6, '9876543212', 'priya@hospital.com',    800),
(4,  'Dr. Suresh Kumar',     'Orthopedist',        'MBBS, MS Orthopedics',     10, 4.5, '9876543213', 'suresh@hospital.com',  1000),
(5,  'Dr. Meena Iyer',       'General Physician',  'MBBS, MD General Medicine', 7, 4.4, '9876543214', 'meena@hospital.com',    600),
(6,  'Dr. Arjun Nair',       'Gastroenterologist', 'MBBS, DM Gastroenterology',11, 4.7, '9876543215', 'arjun@hospital.com',   1300),
(7,  'Dr. Kavitha Reddy',    'Pulmonologist',      'MBBS, MD Pulmonology',      9, 4.6, '9876543216', 'kavitha@hospital.com', 1100),
(8,  'Dr. Vikram Singh',     'Endocrinologist',    'MBBS, MD Endocrinology',   13, 4.8, '9876543217', 'vikram@hospital.com',  1400),
(9,  'Dr. Sunita Joshi',     'Ophthalmologist',    'MBBS, MS Ophthalmology',    6, 4.5, '9876543218', 'sunita@hospital.com',   900),
(10, 'Dr. Ramesh Pillai',    'ENT Specialist',     'MBBS, MS ENT',              8, 4.3, '9876543219', 'ramesh@hospital.com',   750),
(11, 'Dr. Deepa Menon',      'Psychiatrist',       'MBBS, MD Psychiatry',      14, 4.9, '9876543220', 'deepa@hospital.com',   1600),
(12, 'Dr. Arun Krishnan',    'Urologist',          'MBBS, MS Urology',         10, 4.6, '9876543221', 'arun@hospital.com',    1200);
