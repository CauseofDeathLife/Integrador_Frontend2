import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AttendanceForm from '../../components/AttendanceForm'
import { AttendanceStore } from '../../stores/attendanceStore'
import { useAuth } from '../../auth/AuthContext'

export default function AttendanceEdit() {
  const { id } = useParams()
  const nav = useNavigate()
  const { user } = useAuth()
  const [record, setRecord] = useState(null)

  useEffect(() => {
    const r = AttendanceStore.get(id)
    setRecord(r)
  }, [id])

  const onSubmit = (payload) => {
    AttendanceStore.update(id, { ...payload, actualizadoPor: user.username })
    alert('Asistencia actualizada')
    nav('/asistencias')
  }

  if (!record) return <div className="card">Cargando…</div>

  return (
    <div className="card">
      <h2 style={{marginTop:0}}>Editar asistencia</h2>
      <AttendanceForm initialValue={record} onSubmit={onSubmit} />
    </div>
  )
}
