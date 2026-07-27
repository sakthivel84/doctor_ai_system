import HeroSection from '../components/dashboard/HeroSection'
import StatsCards from '../components/dashboard/StatsCards'
import QuickActions from '../components/dashboard/QuickActions'
import AppointmentTable from '../components/dashboard/AppointmentTable'
import Charts from '../components/dashboard/Charts'
import Timeline from '../components/dashboard/Timeline'
import { motion } from 'framer-motion'

export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 max-w-[1400px] mx-auto"
    >
      <HeroSection />
      <StatsCards />
      <QuickActions />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AppointmentTable />
        </div>
        <Timeline />
      </div>
      <Charts />
    </motion.div>
  )
}
