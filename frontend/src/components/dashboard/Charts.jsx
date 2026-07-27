import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts'

const monthlyData = [
  { name: 'Jan', appointments: 12, visits: 18 },
  { name: 'Feb', appointments: 19, visits: 22 },
  { name: 'Mar', appointments: 15, visits: 20 },
  { name: 'Apr', appointments: 22, visits: 28 },
  { name: 'May', appointments: 18, visits: 25 },
  { name: 'Jun', appointments: 24, visits: 30 },
  { name: 'Jul', appointments: 20, visits: 26 },
]

const specData = [
  { name: 'Cardiology', value: 28, color: '#2563EB' },
  { name: 'Neurology', value: 18, color: '#8B5CF6' },
  { name: 'Dermatology', value: 15, color: '#14B8A6' },
  { name: 'General', value: 22, color: '#F59E0B' },
  { name: 'Orthopedics', value: 12, color: '#EC4899' },
]

const healthData = [
  { day: 'Mon', score: 82 },
  { day: 'Tue', score: 85 },
  { day: 'Wed', score: 80 },
  { day: 'Thu', score: 88 },
  { day: 'Fri', score: 87 },
  { day: 'Sat', score: 90 },
  { day: 'Sun', score: 87 },
]

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload) return null
  return (
    <div className="bg-white dark:bg-dark-card border border-border dark:border-dark-border rounded-xl px-3 py-2 shadow-lg text-xs">
      <p className="font-semibold mb-1">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }}>{p.name}: {p.value}</p>
      ))}
    </div>
  )
}

export default function Charts() {
  const { dark } = useTheme()
  const gridColor = dark ? '#334155' : '#E2E8F0'
  const textColor = dark ? '#94A3B8' : '#64748B'

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className={`lg:col-span-2 rounded-2xl p-6
          ${dark ? 'bg-dark-card border border-dark-border' : 'bg-white border border-border/60'}
          shadow-[0_1px_3px_rgba(0,0,0,0.04)]`}
      >
        <h3 className="text-base font-bold mb-4">Appointments Overview</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={monthlyData} barGap={4}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: textColor }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: textColor }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="appointments" fill="#2563EB" radius={[6, 6, 0, 0]} name="Appointments" />
            <Bar dataKey="visits" fill="#14B8A6" radius={[6, 6, 0, 0]} name="Visits" opacity={0.7} />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className={`rounded-2xl p-6
          ${dark ? 'bg-dark-card border border-dark-border' : 'bg-white border border-border/60'}
          shadow-[0_1px_3px_rgba(0,0,0,0.04)]`}
      >
        <h3 className="text-base font-bold mb-4">By Specialization</h3>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={specData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={4}
              dataKey="value"
            >
              {specData.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap gap-3 mt-2">
          {specData.map(s => (
            <div key={s.name} className="flex items-center gap-1.5 text-xs">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: s.color }} />
              <span className="text-text-secondary">{s.name}</span>
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className={`lg:col-span-3 rounded-2xl p-6
          ${dark ? 'bg-dark-card border border-dark-border' : 'bg-white border border-border/60'}
          shadow-[0_1px_3px_rgba(0,0,0,0.04)]`}
      >
        <h3 className="text-base font-bold mb-4">Health Score Trend</h3>
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={healthData}>
            <defs>
              <linearGradient id="healthGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22C55E" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#22C55E" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke={gridColor} vertical={false} />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: textColor }} />
            <YAxis domain={[70, 100]} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: textColor }} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="score" stroke="#22C55E" strokeWidth={3} fill="url(#healthGrad)" name="Score" />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  )
}
