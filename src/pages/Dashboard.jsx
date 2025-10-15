import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()
  return (
    <div className="card">
      <h2 style={{marginTop:0}}>Bienvenido</h2>
      <p>Estás autenticado como <b>{user.role}</b>.</p>
      <div style={{display:'flex', gap:12}}>
        <Link className="btn primary" to="/asistencias">Ir a Asistencias</Link>
        {user.role === 'maestro' && <Link className="btn" to="/asistencias/nueva">Registrar asistencia</Link>}
      </div>
    </div>
  )
}
