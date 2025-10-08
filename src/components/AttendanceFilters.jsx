import { useEffect, useState } from 'react'

const GRADOS = ['8°','9°','10°','11°']
const ASIGNATURAS = [
  { value: 'matematicas', label: 'Matemáticas' },
  { value: 'lenguaje', label: 'Lenguaje' },
  { value: 'ciencias', label: 'Ciencias' },
]

export default function AttendanceFilters({ onChange }) {
  const [fecha, setFecha] = useState('')
  const [grado, setGrado] = useState('')
  const [asignatura, setAsignatura] = useState('')
  const [estado, setEstado] = useState('')
  const [q, setQ] = useState('')

  useEffect(()=>{
    // establecer fecha hoy por defecto (como en el dashboard)
    if (!fecha) {
      const today = new Date().toISOString().split('T')[0]
      setFecha(today)
    }
  }, [])

  useEffect(()=>{
    onChange({ fecha, grado, asignatura, estado, q })
  }, [fecha, grado, asignatura, estado, q])

  return (
    <div className="card mb-3">
      <div className="card-body row g-3">
        <div className="col-md-3">
          <label className="form-label">Fecha</label>
          <input id="filtro-fecha" type="date" className="form-control" value={fecha||''} onChange={e=>setFecha(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Grado</label>
          <select id="filtro-grado" className="form-control" value={grado} onChange={e=>setGrado(e.target.value)}>
            <option value="">Todos</option>
            {GRADOS.map(g=> <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Asignatura</label>
          <select id="filtro-asignatura" className="form-control" value={asignatura} onChange={e=>setAsignatura(e.target.value)}>
            <option value="">Todas</option>
            {ASIGNATURAS.map(a=> <option key={a.value} value={a.value}>{a.label}</option>)}
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Estado</label>
          <select id="filtro-estado" className="form-control" value={estado} onChange={e=>setEstado(e.target.value)}>
            <option value="">Todos</option>
            <option value="presente">Presente</option>
            <option value="tardanza">Tardanza</option>
            <option value="ausente">Ausente</option>
            <option value="justificado">Justificado</option>
          </select>
        </div>

        <div className="col-12">
          <label className="form-label">Buscar</label>
          <input id="search-input" className="form-control" placeholder="Estudiante, asignatura o docente..." value={q} onChange={e=>setQ(e.target.value)} />
        </div>
      </div>
    </div>
  )
}
