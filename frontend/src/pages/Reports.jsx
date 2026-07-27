import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { FileText, Download, Calendar } from 'lucide-react'

const reports = [
  { id: 1, title: 'Blood Test Report', date: '2026-07-20', doctor: 'Dr. Meena Iyer', type: 'Lab Report', status: 'Ready' },
  { id: 2, title: 'ECG Report', date: '2026-07-15', doctor: 'Dr. Ananya Sharma', type: 'Cardiology', status: 'Ready' },
  { id: 3, title: 'X-Ray - Lower Back', date: '2026-07-10', doctor: 'Dr. Suresh Kumar', type: 'Radiology', status: 'Ready' },
  { id: 4, title: 'MRI Brain Scan', date: '2026-07-05', doctor: 'Dr. Rahul Verma', type: 'Neurology', status: 'Pending' },
  { id: 5, title: 'General Health Checkup', date: '2026-06-28', doctor: 'Dr. Meena Iyer', type: 'General', status: 'Ready' },
]

const typeColors = {
  'Lab Report': 'from-blue-500 to-indigo-500',
  'Cardiology': 'from-red-500 to-rose-500',
  'Radiology': 'from-violet-500 to-purple-500',
  'Neurology': 'from-teal-500 to-emerald-500',
  'General': 'from-amber-500 to-orange-500',
}

export default function Reports() {
  const { dark } = useTheme()

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[1000px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Medical Reports</h1>
        <p className="text-text-secondary text-sm mt-1">Access and download your medical reports</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {reports.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            whileHover={{ y: -4 }}
            className={`rounded-2xl p-5 ${dark ? 'bg-dark-card border border-dark-border' : 'bg-white border border-border/60'} shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)] transition-shadow`}
          >
            <div className="flex items-start gap-3 mb-3">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${typeColors[r.type] || 'from-gray-400 to-gray-500'} flex items-center justify-center shadow-md`}>
                <FileText className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-sm">{r.title}</h3>
                <p className="text-xs text-text-secondary">{r.type}</p>
              </div>
              <span className={`text-xs font-medium px-2 py-1 rounded-full
                ${r.status === 'Ready' ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10' : 'text-amber-600 bg-amber-50 dark:text-amber-400 dark:bg-amber-500/10'}`}>
                {r.status}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-text-secondary">
              <span>{r.doctor}</span>
              <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {new Date(r.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
            </div>
            {r.status === 'Ready' && (
              <button className="w-full mt-3 py-2 rounded-xl bg-primary/10 text-primary text-sm font-medium hover:bg-primary/20 transition-colors flex items-center justify-center gap-1.5">
                <Download className="w-4 h-4" /> Download Report
              </button>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
