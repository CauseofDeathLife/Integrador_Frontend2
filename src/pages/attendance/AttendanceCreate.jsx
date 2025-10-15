import React from 'react'
import { useNavigate } from 'react-router-dom'
import AttendanceForm from '../../components/AttendanceForm'
import { AttendanceStore } from '../../stores/attendanceStore'
import { useAuth } from '../../auth/AuthContext'

export default function AttendanceCreate() {
  const nav = useNavigate()
  const { user } = useAuth()

  const onSubmit = (payload) => {
    AttendanceStore.add({ ...payload, creadoPor: user.username })
    alert('Asistencia registrada')
    nav('/asistencias')
  }

  return (
    <div className="card">
      <h2 style={{marginTop:0}}>Registrar asistencia</h2>
      <AttendanceForm onSubmit={onSubmit} />
    </div>
  )
}
