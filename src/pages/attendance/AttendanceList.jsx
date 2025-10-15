
import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../auth/AuthContext'
import { can } from '../../auth/permissions'
import { AttendanceStore } from '../../stores/attendanceStore'
import AttendanceTable from '../../components/AttendanceTable'

export default function AttendanceList() {
  const { user } = useAuth()
  const [filters, setFilters] = useState({ fecha:'', grado:'', asignatura:'', estado:'', q:'' })
  const [items, setItems] = useState([])

  const canWrite = useMemo(() => can(user, 'attendance:write'), [user])

  useEffect(() => {
    const data = AttendanceStore.list()
    let next = data
    if (filters.fecha) next = next.filter(x => x.fechaISO === filters.fecha)
    if (filters.grado) next = next.filter(x => x.grado === filters.grado)
    if (filters.asignatura) next = next.filter(x => x.asignatura === filters.asignatura)
    if (filters.estado) next = next.filter(x => x.estado === filters.estado)
    if (filters.q) {
      const q = filters.q.toLowerCase()
      next = next.filter(x =>
        (x.estudianteNombre || '').toLowerCase().includes(q) ||
        (x.observaciones || '').toLowerCase().includes(q)
      )
    }
    setItems(next)
  }, [filters])

  const onDelete = (id) => {
    if (!canWrite) return
    if (confirm('¿Eliminar registro?')) {
      AttendanceStore.remove(id)
      setFilters({...filters}) // recargar
    }
  }

  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h2 className="h3 mb-0">Asistencias</h2>
          {canWrite && (
            <Link className="btn btn-primary text-white" to="/asistencias/nueva">
              Registrar asistencia
            </Link>
          )}
        </div>

        <div className="row g-3 mb-3">
          <div className="col-12 col-md-3">
            <label className="form-label">Fecha</label>
            <input className="form-control" type="date"
                   value={filters.fecha} onChange={e=>setFilters({...filters, fecha:e.target.value})} />
          </div>
          <div className="col-12 col-md-3">
            <label className="form-label">Grado</label>
            <select className="form-select"
                    value={filters.grado} onChange={e=>setFilters({...filters, grado:e.target.value})}>
              <option value="">Todos</option>
              {['6°','7°','8°','9°','10°','11°'].map(g => <option key={g} value={g}>{g}</option>)}
            </select>
          </div>
          <div className="col-12 col-md-3">
            <label className="form-label">Asignatura</label>
            <select className="form-select"
                    value={filters.asignatura} onChange={e=>setFilters({...filters, asignatura:e.target.value})}>
              <option value="">Todas</option>
              <option value="matematicas">Matemáticas</option>
              <option value="lenguaje">Lenguaje</option>
              <option value="ciencias">Ciencias</option>
            </select>
          </div>
          <div className="col-12 col-md-3">
            <label className="form-label">Estado</label>
            <select className="form-select"
                    value={filters.estado} onChange={e=>setFilters({...filters, estado:e.target.value})}>
              <option value="">Todos</option>
              <option value="presente">Presente</option>
              <option value="ausente">Ausente</option>
              <option value="tardanza">Tardanza</option>
              <option value="justificado">Justificado</option>
            </select>
          </div>
          <div className="col-12">
            <label className="form-label">Buscar</label>
            <input className="form-control" placeholder="Nombre u observación…"
                   value={filters.q} onChange={e=>setFilters({...filters, q:e.target.value})} />
          </div>
        </div>

        <AttendanceTable items={items} canWrite={canWrite} onDelete={onDelete} />
      </div>
    </div>
  )
}
