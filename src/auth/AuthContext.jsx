import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { seedUsersIfEmpty, UsersStore } from '../stores/usersStore'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    seedUsersIfEmpty()
    const raw = localStorage.getItem('current_user')
    if (raw) setUser(JSON.parse(raw))
  }, [])

  const login = (username, password) => {
    const u = UsersStore.findByUsername(username)
    if (!u || u.password !== password) {
      throw new Error('Usuario o contraseña inválidos')
    }
    const session = { id: u.id, username: u.username, role: u.role, name: u.name || u.username }
    localStorage.setItem('current_user', JSON.stringify(session))
    setUser(session)
    return session
  }

  const logout = () => {
    localStorage.removeItem('current_user')
    setUser(null)
  }

  const register = ({ username, password, role, name }) => {
    if (!username || !password || !role) throw new Error('Completa los campos obligatorios')
    if (UsersStore.findByUsername(username)) throw new Error('Ese usuario ya existe')
    const u = UsersStore.add({ username, password, role, name })
    return u
  }

  const value = useMemo(() => ({ user, login, logout, register }), [user])
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
