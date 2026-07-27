import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import AnimatedCounter from '../common/AnimatedCounter'
import {
  CalendarCheck, Clock, CheckCircle2, Stethoscope,
  XCircle, FileText, Pill, Activity
} from 'lucide-react'

const stats = [
  { label: 'Total Appointments', value: 24, icon: CalendarCheck, gradient: 'from-blue-500 to-blue-600', bgLight: 'bg-blue-50', bgDark: 'bg-blue-500/10', text: 'text-blue-600 dark:text-blue-400' },
  { label: 'Upcoming', value: 8, icon: Clock, gradient: 'from-violet-500 to-purple-600', bgLight: 'bg-violet-50', bgDark: 'bg-violet-500/10', text: 'text-violet-600 dark:text-violet-400' },
  { label: 'Completed', value: 14, icon: CheckCircle2, gradient: 'from-emerald-500 to-green-600', bgLight: 'bg-emerald-50', bgDark: 'bg-emerald-500/10', text: 'text-emerald-600 dark:text-emerald-400' },
  { label: 'Doctors', value: 12, icon: Stethoscope, gradient: 'from-cyan-500 to-teal-600', bgLight: 'bg-cyan-50', bgDark: 'bg-cyan-500/10', text: 'text-cyan-600 dark:text-cyan-400' },
  { label: 'Cancelled', value: 2, icon: XCircle, gradient: 'from-red-500 to-rose-600', bgLight: 'bg-red-50', bgDark: 'bg-red-500/10', text: 'text-red-600 dark:text-red-400' },
  { label: 'Pending Reports', value: 3, icon: FileText, gradient: 'from-amber-500 to-orange-600', bgLight: 'bg-amber-50', bgDark: 'bg-amber-500/10', text: 'text-amber-600 dark:text-amber-400' },
  { label: 'Medicine Reminders', value: 5, icon: Pill, gradient: 'from-pink-500 to-rose-600', bgLight: 'bg-pink-50', bgDark: 'bg-pink-500/10', text: 'text-pink-600 dark:text-pink-400' },
  { label: 'Health Score', value: 87, icon: Activity, gradient: 'from-teal-500 to-emerald-600', bgLight: 'bg-teal-50', bgDark: 'bg-teal-500/10', text: 'text-teal-600 dark:text-teal-400', suffix: '%' },
]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 25 } }
}

export default function StatsCards() {
  const { dark } = useTheme()

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {stats.map((s) => (
        <motion.div
          key={s.label}
          variants={item}
          whileHover={{ y: -6, scale: 1.02 }}
          className={`relative overflow-hidden rounded-2xl p-5 cursor-pointer
            ${dark ? 'bg-dark-card border border-dark-border' : 'bg-white border border-border/60'}
            shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]
            dark:shadow-[0_1px_3px_rgba(0,0,0,0.2)] dark:hover:shadow-[0_8px_30px_rgba(0,0,0,0.25)]
            transition-shadow duration-300`}
        >
          <div className="absolute top-0 right-0 w-24 h-24 opacity-5">
            <div className={`w-full h-full rounded-full bg-gradient-to-br ${s.gradient} translate-x-8 -translate-y-8`} />
          </div>

          <div className="flex items-start justify-between mb-3">
            <div className={`p-2.5 rounded-xl ${dark ? s.bgDark : s.bgLight}`}>
              <s.icon className={`w-5 h-5 ${s.text}`} />
            </div>
          </div>

          <p className="text-2xl font-bold mb-0.5">
            <AnimatedCounter target={s.value} suffix={s.suffix || ''} />
          </p>
          <p className="text-sm text-text-secondary">{s.label}</p>
        </motion.div>
      ))}
    </motion.div>
  )
}
