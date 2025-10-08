import { Routes, Route, Navigate } from 'react-router-dom'
import Layout from './layout/Layout.jsx'
import AttendanceList from './pages/AttendanceList.jsx'
import AttendanceCreate from './pages/AttendanceCreate.jsx'
import AttendanceEdit from './pages/AttendanceEdit.jsx'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/asistencias" replace />} />
        <Route path="/asistencias" element={<AttendanceList />} />
        <Route path="/asistencias/nueva" element={<AttendanceCreate />} />
        <Route path="/asistencias/:id/editar" element={<AttendanceEdit />} />
        <Route path="*" element={<div className="p-4">No encontrada</div>} />
      </Routes>
    </Layout>
  )
}
