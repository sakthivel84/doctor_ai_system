import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { BrainCircuit, AlertTriangle, X, Stethoscope } from 'lucide-react'

const ALL_SYMPTOMS = [
  'fever','cough','fatigue','headache','chest_pain','shortness_of_breath',
  'nausea','vomiting','diarrhea','abdominal_pain','back_pain','joint_pain',
  'skin_rash','itching','dizziness','blurred_vision','runny_nose','sore_throat',
  'muscle_pain','loss_of_appetite','weight_loss','excessive_thirst','frequent_urination',
  'swollen_lymph_nodes','high_blood_pressure','palpitations','sweating',
  'chills','stiff_neck','seizures','numbness','tingling','hearing_loss',
  'ear_pain','eye_redness','watery_eyes','difficulty_swallowing','hoarseness',
  'bloating','constipation','blood_in_urine','painful_urination',
  'irregular_heartbeat','swollen_joints','cold_hands','yellowing_skin','dark_urine'
]

export default function SymptomChecker() {
  const { dark } = useTheme()
  const [selected, setSelected] = useState(new Set())
  const [search, setSearch] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [emergency, setEmergency] = useState(false)

  const filtered = ALL_SYMPTOMS.filter(s => s.includes(search.replace(/ /g, '_').toLowerCase()))

  const toggle = (s) => {
    const next = new Set(selected)
    next.has(s) ? next.delete(s) : next.add(s)
    setSelected(next)
  }

  const analyze = async () => {
    if (selected.size === 0) return
    setLoading(true)
    try {
      const res = await fetch('/api/check-symptoms', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ symptoms: [...selected] })
      })
      const data = await res.json()
      setResult(data)
      setEmergency(data.emergency)
    } catch {}
    setLoading(false)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[1400px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">AI Symptom Checker</h1>
        <p className="text-text-secondary text-sm mt-1">Select your symptoms and our AI will predict the likely condition</p>
      </div>

      <AnimatePresence>
        {emergency && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-red-500 to-rose-600 text-white"
          >
            <AlertTriangle className="w-8 h-8 shrink-0" />
            <div>
              <p className="font-bold text-lg">EMERGENCY ALERT!</p>
              <p className="text-sm text-white/90">Your symptoms may indicate a serious condition. Call <strong>108</strong> or <strong>112</strong> immediately!</p>
            </div>
            <button onClick={() => setEmergency(false)} className="ml-auto text-white/70 hover:text-white"><X className="w-5 h-5" /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className={`lg:col-span-2 rounded-2xl p-6 ${dark ? 'bg-dark-card border border-dark-border' : 'bg-white border border-border/60'} shadow-[0_1px_3px_rgba(0,0,0,0.04)]`}>
          <div className="relative mb-4">
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search symptoms..."
              className={`w-full px-4 py-3 rounded-xl text-sm outline-none
                ${dark ? 'bg-dark-surface border border-dark-border text-dark-text placeholder-dark-text-secondary focus:border-primary/50' : 'bg-bg border border-border text-text placeholder-text-secondary focus:border-primary/50'}`}
            />
          </div>

          {selected.size > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {[...selected].map(s => (
                <span key={s} className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
                  {s.replace(/_/g, ' ')}
                  <button onClick={() => toggle(s)} className="hover:text-danger"><X className="w-3 h-3" /></button>
                </span>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto pr-2">
            {filtered.map(s => (
              <button
                key={s}
                onClick={() => toggle(s)}
                className={`px-3 py-2 rounded-xl text-xs font-medium transition-all
                  ${selected.has(s)
                    ? 'bg-primary text-white shadow-md'
                    : `${dark ? 'bg-dark-surface text-dark-text-secondary hover:bg-dark-surface/80' : 'bg-bg text-text-secondary hover:bg-gray-100'}`
                  }`}
              >
                {s.replace(/_/g, ' ')}
              </button>
            ))}
          </div>

          <div className="flex justify-end mt-4">
            <button
              onClick={analyze}
              disabled={selected.size === 0 || loading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold
                shadow-[0_4px_16px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_24px_rgba(37,99,235,0.4)]
                transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? 'Analyzing...' : 'Analyze Symptoms'}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {result && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={`rounded-2xl p-6 ${dark ? 'bg-dark-card border border-dark-border' : 'bg-white border border-border/60'} shadow-[0_1px_3px_rgba(0,0,0,0.04)] h-fit sticky top-24`}
            >
              <div className="flex items-center gap-2 mb-4">
                <BrainCircuit className="w-5 h-5 text-primary" />
                <h3 className="font-bold">AI Diagnosis</h3>
              </div>

              <div className="text-center mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent mx-auto mb-3 flex items-center justify-center shadow-lg">
                  <Stethoscope className="w-10 h-10 text-white" />
                </div>
                <p className="text-xl font-bold">{result.disease}</p>
                <p className="text-sm text-text-secondary mt-1">Confidence: {result.confidence}%</p>
                <div className="w-full bg-bg dark:bg-dark-surface rounded-full h-2 mt-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${result.confidence}%` }}
                    transition={{ duration: 1, ease: 'easeOut' }}
                    className="bg-gradient-to-r from-primary to-accent h-2 rounded-full"
                  />
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between p-3 rounded-xl bg-bg dark:bg-dark-surface">
                  <span className="text-text-secondary">Specialist</span>
                  <span className="font-semibold">{result.specialist}</span>
                </div>
              </div>

              {result.doctors && result.doctors.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs font-medium text-text-secondary mb-2">Recommended Doctors</p>
                  {result.doctors.map((d, i) => (
                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-bg dark:hover:bg-dark-surface transition-colors mb-1">
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xs font-bold">
                        {d.name[3]}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{d.name}</p>
                        <p className="text-xs text-text-secondary">{d.specialization}</p>
                      </div>
                      <span className="text-xs font-semibold text-primary">₹{d.fee}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}
