import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { CalendarPlus, BrainCircuit, MessageSquare, ClipboardList, Pill, Siren } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const actions = [
  { label: 'Book Appointment', icon: CalendarPlus, to: '/book', gradient: 'from-blue-500 to-indigo-600', ring: 'ring-blue-500/20' },
  { label: 'Symptom Checker', icon: BrainCircuit, to: '/symptoms', gradient: 'from-teal-500 to-emerald-600', ring: 'ring-teal-500/20' },
  { label: 'AI Chatbot', icon: MessageSquare, to: '/dashboard', gradient: 'from-violet-500 to-purple-600', ring: 'ring-violet-500/20' },
  { label: 'Medical History', icon: ClipboardList, to: '/history', gradient: 'from-amber-500 to-orange-600', ring: 'ring-amber-500/20' },
  { label: 'Prescriptions', icon: Pill, to: '/reports', gradient: 'from-pink-500 to-rose-600', ring: 'ring-pink-500/20' },
  { label: 'Emergency', icon: Siren, to: '/symptoms', gradient: 'from-red-500 to-red-600', ring: 'ring-red-500/20' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } }
}

export default function QuickActions() {
  const { dark } = useTheme()
  const navigate = useNavigate()

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Quick Actions</h2>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4"
      >
        {actions.map((a) => (
          <motion.button
            key={a.label}
            variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
            whileHover={{ y: -8, scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(a.to)}
            className={`group relative overflow-hidden rounded-2xl p-5 text-left
              ${dark ? 'bg-dark-card border border-dark-border' : 'bg-white border border-border/60'}
              shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.1)]
              dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]
              transition-all duration-300`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${a.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${a.gradient} flex items-center justify-center mb-3
              ring-4 ${a.ring} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <a.icon className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm font-semibold relative z-10">{a.label}</p>
          </motion.button>
        ))}
      </motion.div>
    </div>
  )
}
