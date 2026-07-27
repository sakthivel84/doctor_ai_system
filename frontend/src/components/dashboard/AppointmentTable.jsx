import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { CheckCircle2, Clock, XCircle, ChevronRight } from 'lucide-react'

const appointments = [
  { id: 1, doctor: 'Dr. Ananya Sharma', specialty: 'Cardiologist', date: '2026-07-28', time: '10:00 AM', status: 'scheduled', avatar: 'A' },
  { id: 2, doctor: 'Dr. Rahul Verma', specialty: 'Neurologist', date: '2026-07-28', time: '2:00 PM', status: 'scheduled', avatar: 'R' },
  { id: 3, doctor: 'Dr. Priya Patel', specialty: 'Dermatologist', date: '2026-07-25', time: '11:00 AM', status: 'completed', avatar: 'P' },
  { id: 4, doctor: 'Dr. Suresh Kumar', specialty: 'Orthopedist', date: '2026-07-22', time: '9:00 AM', status: 'completed', avatar: 'S' },
  { id: 5, doctor: 'Dr. Meena Iyer', specialty: 'General Physician', date: '2026-07-20', time: '3:00 PM', status: 'cancelled', avatar: 'M' },
  { id: 6, doctor: 'Dr. Arjun Nair', specialty: 'Gastroenterologist', date: '2026-07-30', time: '10:30 AM', status: 'scheduled', avatar: 'A' },
]

const statusConfig = {
  scheduled: { icon: Clock, color: 'text-blue-600 dark:text-blue-400', bg: 'bg-blue-50 dark:bg-blue-500/10', label: 'Scheduled' },
  completed: { icon: CheckCircle2, color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', label: 'Completed' },
  cancelled: { icon: XCircle, color: 'text-red-600 dark:text-red-400', bg: 'bg-red-50 dark:bg-red-500/10', label: 'Cancelled' },
}

const gradients = ['from-blue-500 to-indigo-500', 'from-violet-500 to-purple-500', 'from-teal-500 to-emerald-500', 'from-amber-500 to-orange-500', 'from-pink-500 to-rose-500', 'from-cyan-500 to-blue-500']

export default function AppointmentTable() {
  const { dark } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className={`rounded-2xl overflow-hidden
        ${dark ? 'bg-dark-card border border-dark-border' : 'bg-white border border-border/60'}
        shadow-[0_1px_3px_rgba(0,0,0,0.04)]`}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-border dark:border-dark-border">
        <h2 className="text-lg font-bold">Recent Appointments</h2>
        <button className="text-sm text-primary font-medium hover:underline flex items-center gap-1">
          View All <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className={`text-xs font-medium text-text-secondary uppercase tracking-wider
              ${dark ? 'bg-dark-surface' : 'bg-bg'}`}>
              <th className="text-left px-6 py-3">Doctor</th>
              <th className="text-left px-6 py-3">Date</th>
              <th className="text-left px-6 py-3">Time</th>
              <th className="text-left px-6 py-3">Status</th>
              <th className="text-right px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((a, i) => {
              const s = statusConfig[a.status]
              return (
                <motion.tr
                  key={a.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className={`border-t border-border/40 dark:border-dark-border/40 transition-colors
                    ${dark ? 'hover:bg-dark-surface/50' : 'hover:bg-bg/80'} cursor-pointer`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${gradients[i % gradients.length]}
                        flex items-center justify-center text-white text-sm font-semibold shadow-md`}>
                        {a.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{a.doctor}</p>
                        <p className="text-xs text-text-secondary">{a.specialty}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm">{new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                  <td className="px-6 py-4 text-sm font-medium">{a.time}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${s.color} ${s.bg}`}>
                      <s.icon className="w-3.5 h-3.5" />
                      {s.label}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {a.status === 'scheduled' && (
                      <button className="text-xs font-medium text-primary hover:underline">Details</button>
                    )}
                  </td>
                </motion.tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </motion.div>
  )
}
