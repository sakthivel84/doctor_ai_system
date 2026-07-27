import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'
import { useNavigate } from 'react-router-dom'
import { Activity, Mail, Lock, Eye, EyeOff } from 'lucide-react'

export default function Login() {
  const { dark } = useTheme()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({ email, password })
      })
      if (res.redirected) {
        navigate('/dashboard')
      } else {
        setError('Invalid email or password')
      }
    } catch {
      setError('Connection failed. Try again.')
    }
    setLoading(false)
  }

  return (
    <div className={`min-h-screen flex items-center justify-center p-4
      ${dark ? 'bg-dark-bg' : 'bg-gradient-to-br from-blue-50 via-white to-teal-50'}`}>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className={`relative w-full max-w-md rounded-3xl p-8
          ${dark ? 'bg-dark-card border border-dark-border' : 'bg-white/80 backdrop-blur-xl border border-border/60'}
          shadow-[0_20px_60px_rgba(0,0,0,0.08)] dark:shadow-[0_20px_60px_rgba(0,0,0,0.3)]`}
      >
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-accent mx-auto mb-4 flex items-center justify-center shadow-lg">
            <Activity className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Welcome to MediAI</h1>
          <p className="text-text-secondary text-sm mt-1">Sign in to access your healthcare dashboard</p>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-xl bg-danger/10 text-danger text-sm text-center font-medium">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-medium text-text-secondary mb-1.5 block">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className={`w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all
                  ${dark ? 'bg-dark-surface border border-dark-border text-dark-text placeholder-dark-text-secondary focus:border-primary/50' : 'bg-bg border border-border text-text placeholder-text-secondary focus:border-primary/50 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]'}`}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-text-secondary mb-1.5 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className={`w-full pl-10 pr-12 py-3 rounded-xl text-sm outline-none transition-all
                  ${dark ? 'bg-dark-surface border border-dark-border text-dark-text placeholder-dark-text-secondary focus:border-primary/50' : 'bg-bg border border-border text-text placeholder-text-secondary focus:border-primary/50 focus:shadow-[0_0_0_3px_rgba(37,99,235,0.1)]'}`}
              />
              <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary">
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-semibold
              shadow-[0_4px_16px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_24px_rgba(37,99,235,0.4)]
              transition-all disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-center text-sm text-text-secondary mt-6">
          Don't have an account? <a href="/register" className="text-primary font-medium hover:underline">Sign Up</a>
        </p>
      </motion.div>
    </div>
  )
}
