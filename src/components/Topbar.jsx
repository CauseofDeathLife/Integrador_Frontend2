import { Link } from 'react-router-dom'

export default function Topbar() {
  return (
    <header className="topbar py-2 px-3 d-flex align-items-center justify-content-between">
      <strong>Panel Académico</strong>
      <nav className="d-flex align-items-center gap-3">
        <Link to="/asistencias" className="text-decoration-none">Asistencias</Link>
        <a href="#" className="text-decoration-none" onClick={(e)=>e.preventDefault()}>Mi cuenta</a>
        {/* boton para cerrar sesion */}
        <a href="#" className="text-decoration-none" onClick={()=>{
          localStorage.removeItem('user')
          window.location.href = '/login'
        }}>Cerrar sesión</a>
      </nav>
    </header>
  )
}
