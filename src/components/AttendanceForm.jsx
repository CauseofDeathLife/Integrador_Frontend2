import { useEffect, useMemo, useState } from 'react'

const ESTUDIANTES = [
  { id: 1, nombre: 'Alan Brito', grado: '10°' },
  { id: 2, nombre: 'Zoyla Vaca', grado: '11°' },
  { id: 3, nombre: 'Daniel Quintero', grado: '11°' },
]

const ASIGNATURAS = [
  { value: 'matematicas', label: 'Matemáticas' },
  { value: 'lenguaje', label: 'Lenguaje' },
  { value: 'ciencias', label: 'Ciencias' },
]

const BLANK = {
  estudiante_id: '',
  estudiante_nombre: '',
  grado: '',
  asignatura: '',
  asignatura_label: '',
  fecha: '',
  hora: '',
  estado: 'presente',
  minutos_tardanza: '',
  tipo_justificacion: '',
  observaciones: '',
  notificar_familia: false,
}

export default function AttendanceForm({ initial, onSubmit, onCancel }) {
  const [f, setF] = useState({ ...BLANK, ...(initial||{}) })

  useEffect(()=>{ setF({ ...BLANK, ...(initial||{}) }) }, [initial])

  const update = (name, value) => setF(prev => ({ ...prev, [name]: value }))

  const selectedStudent = useMemo(()=> ESTUDIANTES.find(e=> String(e.id) === String(f.estudiante_id)), [f.estudiante_id])

  useEffect(()=>{
    if (selectedStudent) {
      update('estudiante_nombre', `${selectedStudent.nombre}`)
      update('grado', selectedStudent.grado)
    } else {
      update('estudiante_nombre',''); update('grado','')
    }
  }, [selectedStudent?.id])

  const submit = (e) => {
    e.preventDefault()
    // Validación como en crear-asistencia.js
    if (!f.estudiante_id) return alert('El campo Estudiante es obligatorio')
    if (!f.asignatura) return alert('El campo Asignatura es obligatorio')
    if (!f.fecha) return alert('El campo Fecha es obligatorio')
    if (!f.hora) return alert('El campo Hora es obligatorio')

    // fecha no futura
    if (f.fecha && new Date(f.fecha) > new Date()) return alert('La fecha no puede ser futura')

    // condicionales
    if (f.estado === 'tardanza') {
      const m = Number(f.minutos_tardanza)
      if (!(m >= 1 && m <= 120)) return alert('Los minutos de tardanza deben estar entre 1 y 120')
    }
    if ((f.estado === 'ausente' || f.estado === 'justificado') && !f.tipo_justificacion) {
      return alert('Debe seleccionar un tipo de justificación')
    }

    onSubmit(f)
  }

  return (
    <form id="form-asistencia" onSubmit={submit} className="card">
      <div className="card-body row g-3">
        <div className="col-sm-6">
          <label className="form-label" htmlFor="estudiante-select">Estudiante</label>
          <select id="estudiante-select" className="form-control"
            value={f.estudiante_id} onChange={e=>update('estudiante_id', e.target.value)} required>
            <option value="">Seleccionar Estudiante</option>
            {ESTUDIANTES.map(s => <option key={s.id} value={s.id}>{s.nombre} - {s.grado}</option>)}
          </select>
        </div>
        <div className="col-sm-6">
          <label className="form-label" htmlFor="asignatura-select">Asignatura</label>
          <select id="asignatura-select" className="form-control"
            value={f.asignatura} onChange={e=>{ const v=e.target.value; const label = ASIGNATURAS.find(a=>a.value===v)?.label||v; update('asignatura', v); update('asignatura_label', label) }} required>
            <option value="">Seleccionar Asignatura</option>
            {ASIGNATURAS.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
          </select>
        </div>

        <div className="col-md-6">
          <label className="form-label" htmlFor="fecha-clase">Fecha</label>
          <input id="fecha-clase" type="date" className="form-control" value={f.fecha} onChange={e=>update('fecha', e.target.value)} required />
        </div>
        <div className="col-md-6">
          <label className="form-label" htmlFor="hora-clase">Hora</label>
          <input id="hora-clase" type="time" className="form-control" value={f.hora} onChange={e=>update('hora', e.target.value)} required />
        </div>

        <div className="col-12">
          <label className="form-label d-block">Estado</label>
          <div className="row">
            {['presente','ausente','tardanza','justificado'].map(opt => (
              <div className="col-md-3 mb-3" key={opt}>
                <div className="form-check">
                  <input className="form-check-input" type="radio" name="estado" id={`estado-${opt}`} value={opt}
                    checked={f.estado===opt} onChange={e=>update('estado', e.target.value)} />
                  <label className="form-check-label" htmlFor={`estado-${opt}`}>
                    <span className={`badge bg-${
                      opt==='presente'?'success':opt==='ausente'?'danger':opt==='tardanza'?'warning':'info'
                    }`}>{opt[0].toUpperCase()+opt.slice(1)}</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        </div>

        {f.estado === 'tardanza' && (
          <div id="campo-tardanza" className="form-group">
            <label className="form-label" htmlFor="minutos-tardanza">Minutos de Tardanza</label>
            <input id="minutos-tardanza" type="number" className="form-control" min="1" max="120"
              value={f.minutos_tardanza} onChange={e=>update('minutos_tardanza', e.target.value)} placeholder="Ej: 15" />
          </div>
        )}

        {(f.estado === 'ausente' || f.estado === 'justificado') && (
          <div id="campo-justificacion" className="form-group">
            <label className="form-label" htmlFor="tipo-justificacion">Tipo de Justificación</label>
            <select id="tipo-justificacion" className="form-control"
              value={f.tipo_justificacion} onChange={e=>update('tipo_justificacion', e.target.value)}>
              <option value="">Seleccionar</option>
              <option value="cita_medica">Cita médica</option>
              <option value="familiar">Asunto familiar</option>
              <option value="otro">Otro</option>
            </select>
          </div>
        )}

        <div className="col-12">
          <label className="form-label" htmlFor="observaciones">Observaciones</label>
          <textarea id="observaciones" rows="3" className="form-control" value={f.observaciones} onChange={e=>update('observaciones', e.target.value)} placeholder="Observaciones adicionales sobre la asistencia."></textarea>
        </div>

        <div className="form-group">
          <div className="form-check">
            <input id="notificar-familia" className="form-check-input" type="checkbox" checked={f.notificar_familia} onChange={e=>update('notificar_familia', e.target.checked)} />
            <label className="form-check-label" htmlFor="notificar-familia">Notificar a la familia por correo electrónico</label>
          </div>
        </div>
      </div>

      <div className="card-footer d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-outline-secondary" onClick={onCancel}>Cancelar</button>
        <button type="submit" className="btn btn-primary">Guardar</button>
      </div>
    </form>
  )
}
