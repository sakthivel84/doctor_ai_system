import { useTheme } from '../../context/ThemeContext'
import { motion, AnimatePresence } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import {
  Search, Bell, Moon, Sun, User, ChevronDown,
  MessageSquare, Calendar, FileText, X
} from 'lucide-react'

const notifications = [
  { id: 1, icon: Calendar, text: 'Appointment with Dr. Sharma tomorrow at 10:00 AM', time: '2 min ago', color: 'text-primary' },
  { id: 2, icon: FileText, text: 'Your lab reports are ready for review', time: '1 hour ago', color: 'text-accent' },
  { id: 3, icon: Bell, text: 'Medicine reminder: Take evening dose', time: '3 hours ago', color: 'text-warning' },
  { id: 4, icon: MessageSquare, text: 'Dr. Patel sent you a message', time: '5 hours ago', color: 'text-success' },
]

export default function TopNav() {
  const { dark, toggle } = useTheme()
  const [showNotif, setShowNotif] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [searchFocused, setSearchFocused] = useState(false)
  const notifRef = useRef(null)
  const profileRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (notifRef.current && !notifRef.current.contains(e.target)) setShowNotif(false)
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <header className={`sticky top-0 z-30 h-16 flex items-center justify-between px-6
      ${dark ? 'bg-dark-bg/80 border-b border-dark-border' : 'bg-bg/80 border-b border-border'}
      backdrop-blur-xl transition-colors duration-300`}>

      <div className={`relative flex items-center transition-all duration-300
        ${searchFocused ? 'w-96' : 'w-72'}`}>
        <Search className="absolute left-3 w-4 h-4 text-text-secondary" />
        <input
          type="text"
          placeholder="Search doctors, symptoms, reports..."
          onFocus={() => setSearchFocused(true)}
          onBlur={() => setSearchFocused(false)}
          className={`w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none transition-all duration-300
            ${dark
              ? 'bg-dark-surface border border-dark-border text-dark-text placeholder-dark-text-secondary focus:border-primary/50'
              : 'bg-white border border-border text-text placeholder-text-secondary focus:border-primary/50 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]'
            }`}
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggle}
          className={`p-2.5 rounded-xl transition-all duration-200
            ${dark ? 'hover:bg-dark-surface text-yellow-400' : 'hover:bg-white text-text-secondary'}`}
        >
          {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div ref={notifRef} className="relative">
          <button
            onClick={() => setShowNotif(s => !s)}
            className={`relative p-2.5 rounded-xl transition-all duration-200
              ${dark ? 'hover:bg-dark-surface text-dark-text-secondary' : 'hover:bg-white text-text-secondary'}`}
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-danger rounded-full border-2 border-bg dark:border-dark-bg" />
          </button>

          <AnimatePresence>
            {showNotif && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                className={`absolute right-0 top-12 w-80 rounded-2xl overflow-hidden shadow-2xl
                  ${dark ? 'bg-dark-card border border-dark-border' : 'bg-white border border-border'}`}
              >
                <div className="flex items-center justify-between px-4 py-3 border-b border-border dark:border-dark-border">
                  <span className="font-semibold text-sm">Notifications</span>
                  <button onClick={() => setShowNotif(false)}><X className="w-4 h-4 text-text-secondary" /></button>
                </div>
                <div className="max-h-80 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className={`flex items-start gap-3 px-4 py-3 transition-colors
                      ${dark ? 'hover:bg-dark-surface' : 'hover:bg-bg'} cursor-pointer`}>
                      <div className={`mt-0.5 p-2 rounded-xl bg-bg dark:bg-dark-surface ${n.color}`}>
                        <n.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm leading-snug">{n.text}</p>
                        <p className="text-xs text-text-secondary mt-1">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div ref={profileRef} className="relative">
          <button
            onClick={() => setShowProfile(s => !s)}
            className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-xl hover:bg-bg dark:hover:bg-dark-surface transition-colors"
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white text-sm font-semibold">
              S
            </div>
            <div className="text-left hidden md:block">
              <p className="text-sm font-medium leading-tight">Sakthi</p>
              <p className="text-xs text-text-secondary">Patient</p>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-text-secondary" />
          </button>

          <AnimatePresence>
            {showProfile && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                className={`absolute right-0 top-12 w-56 rounded-2xl overflow-hidden shadow-2xl
                  ${dark ? 'bg-dark-card border border-dark-border' : 'bg-white border border-border'}`}
              >
                {['My Profile', 'My Health', 'Billing', 'Help Center'].map(item => (
                  <button key={item} className={`w-full text-left px-4 py-2.5 text-sm
                    ${dark ? 'hover:bg-dark-surface' : 'hover:bg-bg'} transition-colors`}>
                    {item}
                  </button>
                ))}
                <div className="border-t border-border dark:border-dark-border" />
                <button className="w-full text-left px-4 py-2.5 text-sm text-danger hover:bg-danger/5 transition-colors">
                  Sign Out
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}
