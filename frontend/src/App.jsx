import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import BookAppointment from './pages/BookAppointment'
import Doctors from './pages/Doctors'
import SymptomChecker from './pages/SymptomChecker'
import MedicalHistory from './pages/MedicalHistory'
import Reports from './pages/Reports'
import Settings from './pages/Settings'
import Login from './pages/Login'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="book" element={<BookAppointment />} />
        <Route path="doctors" element={<Doctors />} />
        <Route path="symptoms" element={<SymptomChecker />} />
        <Route path="history" element={<MedicalHistory />} />
        <Route path="reports" element={<Reports />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
