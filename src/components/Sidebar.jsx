import { NavLink } from 'react-router-dom'

export default function Sidebar() {
  return (
    <aside className="sidebar p-3">
      <div className="h5 mb-3">Sistema Educativo</div>
      <nav className="nav flex-column gap-2">
        <NavLink to="/asistencias" className="nav-link">📋 Asistencias</NavLink>
        <span className="nav-link disabled">👨‍👩‍👧‍👦 Familiares</span>
        <span className="nav-link disabled">🎓 Estudiantes</span>
        <span className="nav-link disabled">📝 Notas</span>
      </nav>
    </aside>
  )
}
