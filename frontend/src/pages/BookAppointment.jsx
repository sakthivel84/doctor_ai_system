import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { CalendarPlus, Clock, Search, ChevronDown } from 'lucide-react'

const doctors = [
  { id: 1, name: 'Dr. Ananya Sharma', spec: 'Cardiologist', exp: 15, rating: 4.8, fee: 1200, avatar: 'A', gradient: 'from-blue-500 to-indigo-500' },
  { id: 2, name: 'Dr. Rahul Verma', spec: 'Neurologist', exp: 12, rating: 4.7, fee: 1500, avatar: 'R', gradient: 'from-violet-500 to-purple-500' },
  { id: 3, name: 'Dr. Priya Patel', spec: 'Dermatologist', exp: 8, rating: 4.6, fee: 800, avatar: 'P', gradient: 'from-teal-500 to-emerald-500' },
  { id: 4, name: 'Dr. Suresh Kumar', spec: 'Orthopedist', exp: 10, rating: 4.5, fee: 1000, avatar: 'S', gradient: 'from-amber-500 to-orange-500' },
  { id: 5, name: 'Dr. Meena Iyer', spec: 'General Physician', exp: 7, rating: 4.4, fee: 600, avatar: 'M', gradient: 'from-pink-500 to-rose-500' },
  { id: 6, name: 'Dr. Arjun Nair', spec: 'Gastroenterologist', exp: 11, rating: 4.7, fee: 1300, avatar: 'A', gradient: 'from-cyan-500 to-blue-500' },
]

const slots = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM']

export default function BookAppointment() {
  const { dark } = useTheme()
  const [selected, setSelected] = useState(null)
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [reason, setReason] = useState('')
  const [search, setSearch] = useState('')

  const filtered = doctors.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.spec.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[1400px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Book an Appointment</h1>
        <p className="text-text-secondary text-sm mt-1">Choose your doctor and preferred time slot</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by name or specialty..."
              className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none
                ${dark ? 'bg-dark-card border border-dark-border text-dark-text placeholder-dark-text-secondary focus:border-primary/50' : 'bg-white border border-border text-text placeholder-text-secondary focus:border-primary/50 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]'}`}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 * i }}
                whileHover={{ y: -4 }}
                onClick={() => setSelected(d)}
                className={`p-4 rounded-2xl cursor-pointer transition-all duration-200
                  ${selected?.id === d.id
                    ? 'ring-2 ring-primary shadow-[0_4px_20px_rgba(37,99,235,0.15)]'
                    : `${dark ? 'bg-dark-card border border-dark-border hover:border-primary/30' : 'bg-white border border-border/60 hover:border-primary/30'}`
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${d.gradient} flex items-center justify-center text-white font-bold text-lg shadow-md`}>
                    {d.avatar}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-sm">{d.name}</p>
                    <p className="text-xs text-text-secondary">{d.spec}</p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-text-secondary">
                      <span>{d.exp}y exp</span>
                      <span className="text-amber-500">★ {d.rating}</span>
                      <span className="text-primary font-semibold">₹{d.fee}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className={`${dark ? 'bg-dark-card border border-dark-border' : 'bg-white border border-border/60'} rounded-2xl p-6 shadow-[0_1px_3px_rgba(0,0,0,0.04)] h-fit sticky top-24`}>
          <h3 className="font-bold text-lg mb-4">Appointment Details</h3>

          {selected ? (
            <div className="flex items-center gap-3 mb-4 p-3 rounded-xl bg-primary/5 border border-primary/10">
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${selected.gradient} flex items-center justify-center text-white font-bold text-sm`}>
                {selected.avatar}
              </div>
              <div>
                <p className="font-semibold text-sm">{selected.name}</p>
                <p className="text-xs text-text-secondary">{selected.spec} — ₹{selected.fee}</p>
              </div>
            </div>
          ) : (
            <p className="text-sm text-text-secondary mb-4">Select a doctor from the list</p>
          )}

          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-text-secondary mb-1 block">Date</label>
              <input
                type="date"
                value={date}
                onChange={e => setDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-3 py-2.5 rounded-xl text-sm outline-none
                  ${dark ? 'bg-dark-surface border border-dark-border text-dark-text focus:border-primary/50' : 'bg-bg border border-border text-text focus:border-primary/50'}`}
              />
            </div>

            <div>
              <label className="text-xs font-medium text-text-secondary mb-1 block">Time Slot</label>
              <div className="grid grid-cols-3 gap-2">
                {slots.map(s => (
                  <button
                    key={s}
                    onClick={() => setTime(s)}
                    className={`px-2 py-2 rounded-lg text-xs font-medium transition-all
                      ${time === s
                        ? 'bg-primary text-white shadow-md'
                        : `${dark ? 'bg-dark-surface hover:bg-dark-surface/80 text-dark-text-secondary' : 'bg-bg hover:bg-gray-100 text-text-secondary'}`
                      }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-text-secondary mb-1 block">Reason</label>
              <textarea
                value={reason}
                onChange={e => setReason(e.target.value)}
                rows={3}
                placeholder="Describe your symptoms..."
                className={`w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none
                  ${dark ? 'bg-dark-surface border border-dark-border text-dark-text placeholder-dark-text-secondary focus:border-primary/50' : 'bg-bg border border-border text-text placeholder-text-secondary focus:border-primary/50'}`}
              />
            </div>

            <button
              disabled={!selected || !date || !time}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold
                shadow-[0_4px_16px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_24px_rgba(37,99,235,0.4)]
                transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Confirm Appointment
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
