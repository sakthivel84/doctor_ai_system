import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { User, Bell, Shield, Palette, Save } from 'lucide-react'

export default function Settings() {
  const { dark, toggle } = useTheme()
  const [name, setName] = useState('Sakthi')
  const [email, setEmail] = useState('sakthivel52570@gmail.com')
  const [phone, setPhone] = useState('9876543210')

  const inputCls = `w-full px-4 py-3 rounded-xl text-sm outline-none transition-all
    ${dark ? 'bg-dark-surface border border-dark-border text-dark-text focus:border-primary/50' : 'bg-bg border border-border text-text focus:border-primary/50 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]'}`

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-[800px] mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-text-secondary text-sm mt-1">Manage your account preferences</p>
      </div>

      <div className={`rounded-2xl p-6 ${dark ? 'bg-dark-card border border-dark-border' : 'bg-white border border-border/60'} shadow-[0_1px_3px_rgba(0,0,0,0.04)]`}>
        <div className="flex items-center gap-2 mb-5">
          <User className="w-5 h-5 text-primary" />
          <h2 className="font-bold">Profile Information</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-text-secondary mb-1.5 block">Full Name</label>
            <input value={name} onChange={e => setName(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="text-xs font-medium text-text-secondary mb-1.5 block">Email</label>
            <input value={email} onChange={e => setEmail(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="text-xs font-medium text-text-secondary mb-1.5 block">Phone</label>
            <input value={phone} onChange={e => setPhone(e.target.value)} className={inputCls} />
          </div>
        </div>
      </div>

      <div className={`rounded-2xl p-6 ${dark ? 'bg-dark-card border border-dark-border' : 'bg-white border border-border/60'} shadow-[0_1px_3px_rgba(0,0,0,0.04)]`}>
        <div className="flex items-center gap-2 mb-5">
          <Bell className="w-5 h-5 text-primary" />
          <h2 className="font-bold">Notifications</h2>
        </div>
        <div className="space-y-3">
          {['Appointment reminders', 'Medicine alerts', 'Report notifications', 'Email updates'].map(item => (
            <label key={item} className="flex items-center justify-between p-3 rounded-xl bg-bg dark:bg-dark-surface cursor-pointer">
              <span className="text-sm">{item}</span>
              <div className="relative">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full peer-checked:bg-primary transition-colors" />
                <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform" />
              </div>
            </label>
          ))}
        </div>
      </div>

      <div className={`rounded-2xl p-6 ${dark ? 'bg-dark-card border border-dark-border' : 'bg-white border border-border/60'} shadow-[0_1px_3px_rgba(0,0,0,0.04)]`}>
        <div className="flex items-center gap-2 mb-5">
          <Palette className="w-5 h-5 text-primary" />
          <h2 className="font-bold">Appearance</h2>
        </div>
        <label className="flex items-center justify-between p-3 rounded-xl bg-bg dark:bg-dark-surface cursor-pointer">
          <span className="text-sm">Dark Mode</span>
          <div className="relative">
            <input type="checkbox" checked={dark} onChange={toggle} className="sr-only peer" />
            <div className="w-10 h-5 bg-gray-300 dark:bg-gray-600 rounded-full peer-checked:bg-primary transition-colors" />
            <div className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow peer-checked:translate-x-5 transition-transform" />
          </div>
        </label>
      </div>

      <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold
        shadow-[0_4px_16px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_24px_rgba(37,99,235,0.4)] transition-all flex items-center gap-2">
        <Save className="w-4 h-4" /> Save Changes
      </button>
    </motion.div>
  )
}
