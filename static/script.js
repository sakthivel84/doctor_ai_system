// MediAI - Frontend JavaScript

// ─── Voice Booking (Web Speech API) ────────────────────────────────────────
function startVoice() {
  if (!('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
    alert('Voice input is not supported in this browser. Please use Google Chrome.');
    return;
  }

  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SR();
  recognition.lang = 'en-IN';
  recognition.continuous = false;
  recognition.interimResults = false;

  const btn    = document.getElementById('voiceBtn');
  const status = document.getElementById('voiceStatus');

  btn.textContent = '🔴 Listening...';
  btn.classList.add('btn-danger');
  if (status) status.textContent = 'Speak now...';

  recognition.start();

  recognition.onresult = async function(event) {
    const transcript = event.results[0][0].transcript;
    btn.textContent = '🎤 Voice Input';
    btn.classList.remove('btn-danger');
    if (status) status.textContent = `Heard: "${transcript}"`;

    // Send to backend to parse intent
    try {
      const res  = await fetch('/api/parse-voice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ transcript })
      });
      const data = await res.json();
      applyVoiceIntent(data);
    } catch (e) {
      console.warn('Voice intent parse failed, applying manually');
      applyVoiceManual(transcript);
    }
  };

  recognition.onerror = function(e) {
    btn.textContent = '🎤 Voice Input';
    btn.classList.remove('btn-danger');
    if (status) status.textContent = 'Voice error: ' + e.error;
  };
}

function applyVoiceIntent(data) {
  if (data.date) {
    const dateInput = document.getElementById('apptDate');
    if (dateInput) { dateInput.value = data.date; dateInput.dispatchEvent(new Event('change')); }
  }
  const status = document.getElementById('voiceStatus');
  if (status) {
    const info = [];
    if (data.doctor_name) info.push('Doctor: ' + data.doctor_name);
    if (data.date) info.push('Date: ' + data.date);
    if (data.time) info.push('Time: ' + data.time);
    status.textContent = info.length ? info.join(' | ') : 'Parsed but no fields detected.';
  }
}

function applyVoiceManual(transcript) {
  const status = document.getElementById('voiceStatus');
  if (status) status.textContent = `Transcript: "${transcript}" — fill fields manually.`;
}

// ─── Animate stats on load ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', function() {
  // Animate stat numbers
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = parseInt(el.textContent);
    if (!isNaN(target) && target > 0) {
      let current = 0;
      const step  = Math.ceil(target / 20);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current;
        if (current >= target) clearInterval(timer);
      }, 40);
    }
  });

  // Fade-in cards with stagger
  const cards = document.querySelectorAll('.stat-card, .feature-card, .action-card, .doctor-card');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    card.style.transition = 'opacity .4s ease, transform .4s ease';
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, 80 + i * 40);
  });
});

// ─── Toast notifications ────────────────────────────────────────────────────
function showToast(message, type = 'info') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; bottom: 24px; right: 24px; z-index: 9999;
    background: ${type === 'error' ? '#FF3B3B' : type === 'success' ? '#34C759' : '#0066FF'};
    color: white; padding: 14px 20px; border-radius: 10px;
    font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 600;
    box-shadow: 0 8px 24px rgba(0,0,0,.2);
    animation: slideUp .3s ease;
    max-width: 360px;
  `;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.animation = 'fadeOut .3s ease'; setTimeout(() => toast.remove(), 300); }, 3500);
}

// ─── Booking form voice route (add to app.py endpoint stub) ────────────────
// The /api/parse-voice endpoint is handled by utils/voice.py
// This is already wired in the backend.

// ─── Hero scroll effect ─────────────────────────────────────────────────────
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    if (window.scrollY > 20) {
      navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,.1)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  }
});
