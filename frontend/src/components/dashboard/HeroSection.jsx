import { motion } from 'framer-motion'
import { useTheme } from '../../context/ThemeContext'
import { Activity, Heart, Calendar, TrendingUp } from 'lucide-react'

export default function HeroSection() {
  const { dark } = useTheme()
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-secondary to-accent p-8 text-white"
    >
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 right-20 w-64 h-64 bg-white rounded-full blur-3xl" />
        <div className="absolute bottom-[-40px] left-40 w-80 h-80 bg-white/20 rounded-full blur-3xl" />
        <div className="absolute top-20 left-1/2 w-40 h-40 bg-accent/30 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex-1">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="text-white/70 text-sm font-medium mb-1"
          >
            {greeting}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl lg:text-4xl font-bold mb-4"
          >
            Welcome back, Sakthi
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="text-white/80 text-sm max-w-md"
          >
            Here's your health overview. You have 2 appointments today and your health score is looking great.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap gap-4 mt-6"
          >
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5">
              <Calendar className="w-4 h-4" />
              <span className="text-sm font-medium">2 Today</span>
            </div>
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5">
              <Heart className="w-4 h-4" />
              <span className="text-sm font-medium">Score: 87/100</span>
            </div>
            <div className="flex items-center gap-2 bg-white/15 backdrop-blur-sm rounded-xl px-4 py-2.5">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm font-medium">+12% This Month</span>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
          className="hidden lg:block"
        >
          <svg viewBox="0 0 200 200" className="w-52 h-52 drop-shadow-2xl animate-float">
            <defs>
              <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="white" stopOpacity="0.3"/>
                <stop offset="100%" stopColor="white" stopOpacity="0.1"/>
              </linearGradient>
            </defs>
            <circle cx="100" cy="100" r="80" fill="url(#g1)" />
            <path d="M100 40 C100 40 140 70 140 100 C140 130 120 150 100 160 C80 150 60 130 60 100 C60 70 100 40 100 40Z" fill="white" fillOpacity="0.2"/>
            <path d="M70 95 L90 115 L130 75" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <circle cx="100" cy="55" r="15" fill="white" fillOpacity="0.3"/>
          </svg>
        </motion.div>
      </div>
    </motion.div>
  )
}
