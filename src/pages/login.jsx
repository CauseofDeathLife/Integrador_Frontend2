import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [username, setUsername] = useState('maestro')
  const [password, setPassword] = useState('123456')
  const [error, setError] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    try {
      login(username, password)
      nav('/')
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión')
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6 col-lg-4">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="h4 mb-3">Entrar al panel</h2>
              <form onSubmit={onSubmit} className="row g-3">
                <div className="col-12">
                  <label className="form-label">Usuario</label>
                  <input className="form-control" value={username} onChange={e=>setUsername(e.target.value)} placeholder="usuario" />
                </div>
                <div className="col-12">
                  <label className="form-label">Contraseña</label>
                  <input className="form-control" type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="••••••" />
                </div>
                {error && <div className="col-12"><div className="alert alert-danger py-2">{error}</div></div>}
                <div className="col-12 d-grid">
                  <button className="btn btn-primary" type="submit">Ingresar</button>
                </div>
              </form>
              <p className="text-muted mt-3 mb-0">¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
