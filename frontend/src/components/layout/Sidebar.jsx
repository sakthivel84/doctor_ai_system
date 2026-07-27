import { NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import {
  LayoutDashboard, CalendarPlus, Stethoscope, BrainCircuit,
  Clock, MessageSquare, FileBarChart, Settings, LogOut,
  ChevronLeft, ChevronRight, Activity
} from 'lucide-react'
import { useState } from 'react'

const links = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/book', icon: CalendarPlus, label: 'Book Appointment' },
  { to: '/doctors', icon: Stethoscope, label: 'Doctors' },
  { to: '/symptoms', icon: BrainCircuit, label: 'Symptom Checker' },
  { to: '/history', icon: Clock, label: 'Medical History' },
  { to: '/reports', icon: FileBarChart, label: 'Reports' },
  { to: '/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar({ collapsed, setCollapsed }) {
  const { dark } = useTheme()
  const navigate = useNavigate()

  const handleLogout = async () => {
    try { await fetch('/logout') } catch {}
    navigate('/login')
  }

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 72 : 260 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`fixed left-0 top-0 h-screen z-40 flex flex-col
        ${dark ? 'bg-dark-card border-r border-dark-border' : 'bg-white border-r border-border'}
        transition-colors duration-300`}
    >
      <div className="flex items-center justify-between px-4 h-16 border-b border-border dark:border-dark-border">
        <AnimatePresence mode="wait">
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                MediAI
              </span>
            </motion.div>
          )}
        </AnimatePresence>
        <button
          onClick={() => setCollapsed(c => !c)}
          className="p-1.5 rounded-lg hover:bg-bg dark:hover:bg-dark-surface transition-colors"
        >
          {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {links.map(link => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group
              ${isActive
                ? 'bg-gradient-to-r from-primary/10 to-accent/5 text-primary font-semibold'
                : 'text-text-secondary hover:bg-bg dark:hover:bg-dark-surface hover:text-text'}
              ${collapsed ? 'justify-center' : ''}`
            }
          >
            <link.icon className="w-5 h-5 shrink-0" />
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="text-sm whitespace-nowrap overflow-hidden"
                >
                  {link.label}
                </motion.span>
              )}
            </AnimatePresence>
          </NavLink>
        ))}
      </nav>

      <div className="p-2 border-t border-border dark:border-dark-border">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-xl
            text-danger hover:bg-danger/10 transition-all duration-200
            ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </motion.aside>
  )
}
