import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { Search, Star, MapPin, Clock, Calendar } from 'lucide-react'

const doctors = [
  { id: 1, name: 'Dr. Ananya Sharma', spec: 'Cardiologist', qual: 'MBBS, MD Cardiology', exp: 15, rating: 4.8, fee: 1200, available: true, avatar: 'A', gradient: 'from-blue-500 to-indigo-500' },
  { id: 2, name: 'Dr. Rahul Verma', spec: 'Neurologist', qual: 'MBBS, DM Neurology', exp: 12, rating: 4.7, fee: 1500, available: true, avatar: 'R', gradient: 'from-violet-500 to-purple-500' },
  { id: 3, name: 'Dr. Priya Patel', spec: 'Dermatologist', qual: 'MBBS, MD Dermatology', exp: 8, rating: 4.6, fee: 800, available: true, avatar: 'P', gradient: 'from-teal-500 to-emerald-500' },
  { id: 4, name: 'Dr. Suresh Kumar', spec: 'Orthopedist', qual: 'MBBS, MS Orthopedics', exp: 10, rating: 4.5, fee: 1000, available: false, avatar: 'S', gradient: 'from-amber-500 to-orange-500' },
  { id: 5, name: 'Dr. Meena Iyer', spec: 'General Physician', qual: 'MBBS, MD General Medicine', exp: 7, rating: 4.4, fee: 600, available: true, avatar: 'M', gradient: 'from-pink-500 to-rose-500' },
  { id: 6, name: 'Dr. Arjun Nair', spec: 'Gastroenterologist', qual: 'MBBS, DM Gastroenterology', exp: 11, rating: 4.7, fee: 1300, available: true, avatar: 'A', gradient: 'from-cyan-500 to-blue-500' },
  { id: 7, name: 'Dr. Kavitha Reddy', spec: 'Pulmonologist', qual: 'MBBS, MD Pulmonology', exp: 9, rating: 4.6, fee: 1100, available: true, avatar: 'K', gradient: 'from-emerald-500 to-teal-500' },
  { id: 8, name: 'Dr. Vikram Singh', spec: 'Endocrinologist', qual: 'MBBS, MD Endocrinology', exp: 13, rating: 4.8, fee: 1400, available: false, avatar: 'V', gradient: 'from-orange-500 to-red-500' },
  { id: 9, name: 'Dr. Sunita Joshi', spec: 'Ophthalmologist', qual: 'MBBS, MS Ophthalmology', exp: 6, rating: 4.5, fee: 900, available: true, avatar: 'S', gradient: 'from-blue-400 to-cyan-500' },
  { id: 10, name: 'Dr. Ramesh Pillai', spec: 'ENT Specialist', qual: 'MBBS, MS ENT', exp: 8, rating: 4.3, fee: 750, available: true, avatar: 'R', gradient: 'from-purple-400 to-pink-500' },
  { id: 11, name: 'Dr. Deepa Menon', spec: 'Psychiatrist', qual: 'MBBS, MD Psychiatry', exp: 14, rating: 4.9, fee: 1600, available: true, avatar: 'D', gradient: 'from-rose-400 to-red-500' },
  { id: 12, name: 'Dr. Arun Krishnan', spec: 'Urologist', qual: 'MBBS, MS Urology', exp: 10, rating: 4.6, fee: 1200, available: false, avatar: 'A', gradient: 'from-teal-400 to-blue-500' },
]

export default function Doctors() {
  const { dark } = useTheme()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')

  const filtered = doctors.filter(d => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase()) || d.spec.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || (filter === 'available' && d.available)
    return matchSearch && matchFilter
  })

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[1400px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Our Doctors</h1>
        <p className="text-text-secondary text-sm mt-1">Find the right specialist for your needs</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search doctors..."
            className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none
              ${dark ? 'bg-dark-card border border-dark-border text-dark-text placeholder-dark-text-secondary focus:border-primary/50' : 'bg-white border border-border text-text placeholder-text-secondary focus:border-primary/50'}`}
          />
        </div>
        <div className="flex gap-2">
          {['all', 'available'].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all
                ${filter === f
                  ? 'bg-primary text-white'
                  : `${dark ? 'bg-dark-card border border-dark-border text-dark-text-secondary hover:bg-dark-surface' : 'bg-white border border-border text-text-secondary hover:bg-bg'}`
                }`}
            >
              {f === 'all' ? 'All Doctors' : 'Available Today'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((d, i) => (
          <motion.div
            key={d.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.04 * i }}
            whileHover={{ y: -6 }}
            className={`rounded-2xl p-6 transition-all duration-300
              ${dark ? 'bg-dark-card border border-dark-border hover:border-primary/20' : 'bg-white border border-border/60 hover:border-primary/20'}
              shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]`}
          >
            <div className="flex items-start gap-4 mb-4">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${d.gradient} flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                {d.avatar}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-base">{d.name}</h3>
                <p className="text-sm text-primary font-medium">{d.spec}</p>
                <p className="text-xs text-text-secondary mt-0.5">{d.qual}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 mb-4 text-xs text-text-secondary">
              <span className="flex items-center gap-1"><Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" /> {d.rating}</span>
              <span>{d.exp} years exp</span>
              <span className="font-semibold text-primary">₹{d.fee}</span>
            </div>

            <div className="flex items-center justify-between">
              <span className={`text-xs font-medium px-2.5 py-1 rounded-full
                ${d.available ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10' : 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-500/10'}`}>
                {d.available ? 'Available Today' : 'Not Available'}
              </span>
              <button
                disabled={!d.available}
                className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium
                  hover:bg-primary-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed
                  shadow-[0_2px_8px_rgba(37,99,235,0.25)]"
              >
                <Calendar className="w-4 h-4 inline mr-1" />
                Book
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
