
import { Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Topbar() {
  const { user, logout } = useAuth()
  return (
    <header className="topbar py-2 px-3 d-flex align-items-center justify-content-between">
      <strong>Panel Académico</strong>
      <nav className="d-flex align-items-center gap-3">
        {user && (
          <span className="small text-muted">
            Hola, <strong>{user.name || user.username}</strong> · {user.role}
          </span>
        )}
        <Link to="/asistencias" className="text-decoration-none">Asistencias</Link>
        <a href="#" className="text-decoration-none" onClick={(e)=>e.preventDefault()}>Mi cuenta</a>
        {user && (
          <a href="#" className="text-decoration-none" onClick={(e)=>{e.preventDefault(); logout();}}>
            Cerrar sesión
          </a>
        )}
      </nav>
    </header>
  )
}
