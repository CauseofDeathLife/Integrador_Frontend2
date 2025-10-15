import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import AttendanceList from './pages/attendance/AttendanceList'
import AttendanceCreate from './pages/attendance/AttendanceCreate'
import AttendanceEdit from './pages/attendance/AttendanceEdit'
import Layout from './components/Layout'
import PrivateRoute from './auth/PrivateRoute'
import RoleRoute from './auth/RoleRoute'

export default function App() {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Private routes (auth required) */}
      <Route path="/" element={
        <PrivateRoute>
          <Layout><Dashboard /></Layout>
        </PrivateRoute>
      } />

      <Route path="/asistencias" element={
        <PrivateRoute>
          <Layout><AttendanceList /></Layout>
        </PrivateRoute>
      } />

      {/* Maestro-only for create/edit */}
      <Route path="/asistencias/nueva" element={
        <PrivateRoute>
          <RoleRoute roles={['maestro']}>
            <Layout><AttendanceCreate /></Layout>
          </RoleRoute>
        </PrivateRoute>
      } />

      <Route path="/asistencias/:id/editar" element={
        <PrivateRoute>
          <RoleRoute roles={['maestro']}>
            <Layout><AttendanceEdit /></Layout>
          </RoleRoute>
        </PrivateRoute>
      } />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
