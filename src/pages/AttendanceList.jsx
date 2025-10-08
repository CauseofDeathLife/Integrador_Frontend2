import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import AttendanceFilters from '../components/AttendanceFilters.jsx'
import AttendanceTable from '../components/AttendanceTable.jsx'
import ViewAttendanceModal from '../components/ViewAttendanceModal.jsx'
import * as store from '../store/attendanceStore.js'

function applyFilters(rows, { fecha, grado, asignatura, estado, q }) {
  let result = [...rows]
  if (fecha) result = result.filter(r => r.fecha === fecha)
  if (grado) result = result.filter(r => r.grado === grado)
  if (asignatura) result = result.filter(r => r.asignatura === asignatura)
  if (estado) result = result.filter(r => r.estado === estado)
  if (q) {
    const t = q.toLowerCase()
    result = result.filter(r =>
      r.estudiante_nombre.toLowerCase().includes(t) ||
      (r.asignatura_label||'').toLowerCase().includes(t) ||
      (r.docente||'').toLowerCase().includes(t)
    )
  }
  return result
}

export default function AttendanceList() {
  const navigate = useNavigate()
  const [rows, setRows] = useState(store.list())
  const [filters, setFilters] = useState({ fecha:'', grado:'', asignatura:'', estado:'', q:'' })
  const [viewId, setViewId] = useState(null)

  useEffect(()=>{ setRows(store.list()) }, [])

  const filtered = useMemo(()=>applyFilters(rows, filters), [rows, filters])

  const handleDelete = (id) => {
    if (confirm('¿Está seguro de que desea eliminar este registro de asistencia?')) {
      store.remove(id)
      setRows(store.list())
    }
  }

  return (
    <div className="container-fluid px-0">
      <div className="d-sm-flex align-items-center justify-content-between mb-3">
        <h2 className="mb-0">Asistencias</h2>
        <button className="btn btn-primary" onClick={()=>navigate('/asistencias/nueva')}>
          + Registrar Asistencia
        </button>
      </div>

      <AttendanceFilters onChange={setFilters} />
      <AttendanceTable
        rows={filtered}
        onView={(id)=>setViewId(id)}
        onEdit={(id)=>navigate(`/asistencias/${id}/editar`)}
        onDelete={handleDelete}
      />

      <ViewAttendanceModal
        show={viewId != null}
        onClose={()=>setViewId(null)}
        item={store.get(viewId)}
      />
    </div>
  )
}
