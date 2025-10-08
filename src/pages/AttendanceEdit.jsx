import { useNavigate, useParams } from 'react-router-dom'
import AttendanceForm from '../components/AttendanceForm.jsx'
import * as store from '../store/attendanceStore.js'

export default function AttendanceEdit() {
  const { id } = useParams()
  const navigate = useNavigate()
  const item = store.get(Number(id))
  if (!item) return <div className="alert alert-warning">Registro no encontrado.</div>

  const handleSubmit = (data) => {
    store.update(item.id, data)
    navigate('/asistencias')
  }

  return (
    <div className="container-fluid px-0">
      <div className="d-sm-flex align-items-center justify-content-between mb-3">
        <h2 className="mb-0">Editar Asistencia</h2>
      </div>
      <AttendanceForm initial={item} onSubmit={handleSubmit} onCancel={()=>navigate('/asistencias')} />
    </div>
  )
}
