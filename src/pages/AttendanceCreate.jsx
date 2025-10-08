import { useNavigate } from 'react-router-dom'
import AttendanceForm from '../components/AttendanceForm.jsx'
import * as store from '../store/attendanceStore.js'

export default function AttendanceCreate() {
  const navigate = useNavigate()
  const handleSubmit = (data) => { store.add(data); navigate('/asistencias') }
  return (
    <div className="container-fluid px-0">
      <div className="d-sm-flex align-items-center justify-content-between mb-3">
        <h2 className="mb-0">Registrar Asistencia</h2>
      </div>
      <AttendanceForm onSubmit={handleSubmit} onCancel={()=>navigate('/asistencias')} />
    </div>
  )
}
