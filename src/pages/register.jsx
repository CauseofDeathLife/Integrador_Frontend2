import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../auth/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const nav = useNavigate()
  const [form, setForm] = useState({ username:'', name:'', password:'', role:'alumno' })
  const [error, setError] = useState('')

  const onChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    try {
      register(form)
      alert('Usuario registrado. Ahora puedes iniciar sesión.')
      nav('/login')
    } catch (err) {
      setError(err.message || 'Error al registrar')
    }
  }

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-7 col-lg-5">
          <div className="card shadow-sm">
            <div className="card-body">
              <h2 className="h4 mb-3">Crear cuenta</h2>
              <form onSubmit={onSubmit} className="row g-3">
                <div className="col-md-6">
                  <label className="form-label">Usuario *</label>
                  <input className="form-control" name="username" value={form.username} onChange={onChange} placeholder="usuario123" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Nombre (opcional)</label>
                  <input className="form-control" name="name" value={form.name} onChange={onChange} placeholder="Tu nombre" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Contraseña *</label>
                  <input className="form-control" type="password" name="password" value={form.password} onChange={onChange} placeholder="••••••" />
                </div>
                <div className="col-md-6">
                  <label className="form-label">Rol *</label>
                  <select className="form-select" name="role" value={form.role} onChange={onChange}>
                    <option value="maestro">Maestro</option>
                    <option value="alumno">Alumno</option>
                    <option value="familiar">Familiar</option>
                  </select>
                </div>
                <div className="col-12 d-flex justify-content-end gap-2">
                  <Link to="/login" className="btn btn-secondary">Cancelar</Link>
                  <button className="btn btn-primary" type="submit">Registrar</button>
                </div>
                {error && <div className="col-12"><div className="alert alert-danger py-2">{error}</div></div>}
              </form>
              <p className="text-muted mt-3 mb-0">¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
