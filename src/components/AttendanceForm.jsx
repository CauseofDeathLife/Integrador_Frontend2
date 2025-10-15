import React, { useMemo, useState } from 'react'

const GRADOS = ['6°','7°','8°','9°','10°','11°']
const ASIGNATURAS = [
  { value:'matematicas', label:'Matemáticas' },
  { value:'lenguaje', label:'Lenguaje' },
  { value:'ciencias', label:'Ciencias' },
]

export default function AttendanceForm({ initialValue, onSubmit }) {
  const [form, setForm] = useState(() => ({
    estudianteNombre: '',
    grado: GRADOS[0],
    asignatura: ASIGNATURAS[0].value,
    fechaISO: new Date().toISOString().slice(0,10),
    hora: new Date().toTimeString().slice(0,5),
    estado: 'presente',
    observaciones: '',
    ...initialValue
  }))

  const asignaturaLabel = useMemo(() => {
    const match = ASIGNATURAS.find(a => a.value === form.asignatura)
    return match?.label || ''
  }, [form.asignatura])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.estudianteNombre?.trim()) { alert('Nombre del estudiante es requerido'); return }
    const today = new Date(); today.setHours(0,0,0,0)
    const chosen = new Date(form.fechaISO); chosen.setHours(0,0,0,0)
    if (chosen.getTime() > today.getTime()) { alert('La fecha no puede ser futura'); return }
    onSubmit({ ...form, asignaturaLabel })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Estudiante</label>
          <input className="form-control" name="estudianteNombre"
                 value={form.estudianteNombre} onChange={onChange}
                 placeholder="Nombres y apellidos" />
        </div>
        <div className="col-md-6">
          <label className="form-label">Grado</label>
          <select className="form-select" name="grado"
                  value={form.grado} onChange={onChange}>
            {GRADOS.map(g => <option key={g} value={g}>{g}</option>)}
          </select>
        </div>
        <div className="col-md-6">
          <label className="form-label">Asignatura</label>
          <select className="form-select" name="asignatura"
                  value={form.asignatura} onChange={onChange}>
            {ASIGNATURAS.map(a => <option key={a.value} value={a.value}>{a.label}</option>)}
          </select>
        </div>
        <div className="col-md-3">
          <label className="form-label">Fecha</label>
          <input className="form-control" type="date" name="fechaISO"
                 value={form.fechaISO} onChange={onChange} />
        </div>
        <div className="col-md-3">
          <label className="form-label">Hora</label>
          <input className="form-control" type="time" name="hora"
                 value={form.hora} onChange={onChange} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Estado</label>
          <select className="form-select" name="estado"
                  value={form.estado} onChange={onChange}>
            {['presente','ausente','tardanza','justificado'].map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <div className="col-12">
          <label className="form-label">Observaciones</label>
          <textarea className="form-control" rows={3} name="observaciones"
                    value={form.observaciones} onChange={onChange}
                    placeholder="(opcional)"></textarea>
        </div>
      </div>
      <div className="d-flex gap-2 justify-content-end mt-3">
        <button type="button" className="btn btn-secondary" onClick={()=>history.back()}>
          Cancelar
        </button>
        <button className="btn btn-primary" type="submit">Guardar</button>
      </div>
    </form>
  )
}
