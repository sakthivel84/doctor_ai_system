import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { Clock, CheckCircle2, XCircle, Calendar } from 'lucide-react'

const history = [
  { id: 1, doctor: 'Dr. Ananya Sharma', spec: 'Cardiologist', date: '2026-07-25', time: '10:00 AM', status: 'completed', reason: 'Regular heart checkup', notes: 'Blood pressure normal. Continue current medication.' },
  { id: 2, doctor: 'Dr. Priya Patel', spec: 'Dermatologist', date: '2026-07-20', time: '11:00 AM', status: 'completed', reason: 'Skin rash on arm', notes: 'Prescribed antihistamine cream. Follow up in 2 weeks.' },
  { id: 3, doctor: 'Dr. Suresh Kumar', spec: 'Orthopedist', date: '2026-07-15', time: '09:00 AM', status: 'completed', reason: 'Lower back pain', notes: 'X-ray normal. Recommended physiotherapy.' },
  { id: 4, doctor: 'Dr. Meena Iyer', spec: 'General Physician', date: '2026-07-10', time: '03:00 PM', status: 'cancelled', reason: 'Annual health check', notes: '' },
  { id: 5, doctor: 'Dr. Rahul Verma', spec: 'Neurologist', date: '2026-07-05', time: '02:00 PM', status: 'completed', reason: 'Frequent headaches', notes: 'Migraine diagnosed. Prescribed preventive medication.' },
]

const statusConfig = {
  completed: { icon: CheckCircle2, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10' },
  cancelled: { icon: XCircle, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-500/10' },
}

export default function MedicalHistory() {
  const { dark } = useTheme()

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[1000px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Medical History</h1>
        <p className="text-text-secondary text-sm mt-1">Your past appointments and medical records</p>
      </div>

      <div className="space-y-4">
        {history.map((h, i) => {
          const s = statusConfig[h.status]
          return (
            <motion.div
              key={h.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * i }}
              className={`rounded-2xl p-5 ${dark ? 'bg-dark-card border border-dark-border' : 'bg-white border border-border/60'} shadow-[0_1px_3px_rgba(0,0,0,0.04)]`}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{h.doctor}</p>
                    <p className="text-xs text-text-secondary">{h.spec}</p>
                  </div>
                </div>
                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${s.color} ${s.bg}`}>
                  <s.icon className="w-3.5 h-3.5" />
                  {h.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                <div className="p-2.5 rounded-xl bg-bg dark:bg-dark-surface">
                  <p className="text-xs text-text-secondary">Date & Time</p>
                  <p className="font-medium">{new Date(h.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} at {h.time}</p>
                </div>
                <div className="p-2.5 rounded-xl bg-bg dark:bg-dark-surface">
                  <p className="text-xs text-text-secondary">Reason</p>
                  <p className="font-medium">{h.reason}</p>
                </div>
              </div>
              {h.notes && (
                <div className="p-3 rounded-xl bg-primary/5 border border-primary/10 text-sm">
                  <p className="text-xs font-medium text-primary mb-1">Doctor's Notes</p>
                  <p className="text-text-secondary">{h.notes}</p>
                </div>
              )}
            </motion.div>
          )
        })}
      </div>
    </motion.div>
  )
}
