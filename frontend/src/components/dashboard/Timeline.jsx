import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { Clock, Pill, Calendar, AlertCircle } from 'lucide-react'

const timeline = [
  { time: '08:00 AM', title: 'Morning Medication', desc: 'Take blood pressure medicine', icon: Pill, color: 'bg-blue-500', dot: 'border-blue-200 dark:border-blue-800' },
  { time: '10:00 AM', title: 'Dr. Ananya Sharma', desc: 'Cardiology checkup — Room 204', icon: Calendar, color: 'bg-violet-500', dot: 'border-violet-200 dark:border-violet-800' },
  { time: '02:00 PM', title: 'Dr. Rahul Verma', desc: 'Neurology consultation — Room 108', icon: Calendar, color: 'bg-teal-500', dot: 'border-teal-200 dark:border-teal-800' },
  { time: '06:00 PM', title: 'Evening Medication', desc: 'Take vitamin D supplement', icon: Pill, color: 'bg-amber-500', dot: 'border-amber-200 dark:border-amber-800' },
  { time: '09:00 PM', title: 'Health Check-in', desc: 'Log daily health metrics', icon: AlertCircle, color: 'bg-rose-500', dot: 'border-rose-200 dark:border-rose-800' },
]

export default function Timeline() {
  const { dark } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className={`rounded-2xl p-6
        ${dark ? 'bg-dark-card border border-dark-border' : 'bg-white border border-border/60'}
        shadow-[0_1px_3px_rgba(0,0,0,0.04)]`}
    >
      <h2 className="text-lg font-bold mb-5">Today's Schedule</h2>
      <div className="space-y-0">
        {timeline.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * i }}
            className="flex gap-4"
          >
            <div className="flex flex-col items-center">
              <div className={`w-3 h-3 rounded-full ${item.color} ring-4 ${item.dot} z-10`} />
              {i < timeline.length - 1 && (
                <div className="w-0.5 flex-1 bg-border dark:bg-dark-border" />
              )}
            </div>
            <div className="pb-6 flex-1">
              <p className="text-xs font-medium text-text-secondary mb-1">{item.time}</p>
              <p className="text-sm font-semibold">{item.title}</p>
              <p className="text-xs text-text-secondary mt-0.5">{item.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
