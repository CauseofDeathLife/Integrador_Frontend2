import React from 'react'
import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge'

export default function AttendanceTable({ items, canWrite, onDelete }) {
  return (
    <div className="table-responsive">
      <table className="table table-hover align-middle">
        <thead>
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Estudiante</th>
            <th>Grado</th>
            <th>Asignatura</th>
            <th>Estado</th>
            <th>Observaciones</th>
            {canWrite && <th className="text-end">Acciones</th>}
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr><td colSpan={canWrite?8:7} className="text-muted">Sin registros</td></tr>
          )}
          {items.map(r => (
            <tr key={r.id}>
              <td>{r.fechaISO}</td>
              <td>{r.hora}</td>
              <td>{r.estudianteNombre}</td>
              <td>{r.grado}</td>
              <td>{r.asignaturaLabel}</td>
              <td><StatusBadge estado={r.estado} /></td>
              <td>{r.observaciones || '-'}</td>
              {canWrite && (
                <td className="text-end">
                  <div className="btn-group">
                    <Link className="btn btn-outline-primary btn-sm" to={`/asistencias/${r.id}/editar`}>Editar</Link>
                    <button className="btn btn-outline-danger btn-sm" onClick={()=>onDelete(r.id)}>Eliminar</button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
