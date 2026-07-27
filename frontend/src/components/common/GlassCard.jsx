import { useTheme } from '../../context/ThemeContext'
import { motion } from 'framer-motion'

export default function GlassCard({ children, className = '', hover = true, gradient = false, ...props }) {
  const { dark } = useTheme()

  return (
    <motion.div
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={`
        ${dark ? 'bg-dark-card border-dark-border' : 'bg-white border-border/60'}
        border rounded-2xl
        shadow-[0_1px_3px_rgba(0,0,0,0.04),0_4px_12px_rgba(0,0,0,0.03)]
        dark:shadow-[0_1px_3px_rgba(0,0,0,0.2),0_4px_12px_rgba(0,0,0,0.15)]
        transition-shadow duration-300
        ${hover ? 'hover:shadow-[0_4px_20px_rgba(0,0,0,0.08),0_8px_32px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)]' : ''}
        ${gradient ? 'gradient-border' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </motion.div>
  )
}
