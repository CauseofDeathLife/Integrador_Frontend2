import StatusBadge from './StatusBadge.jsx'

export default function AttendanceTable({ rows, onView, onEdit, onDelete }) {
  return (
    <div className="table-responsive">
      <table id="table-asistencias" className="table table-hover align-middle">
        <thead className="table-light">
          <tr>
            <th>Fecha</th>
            <th>Hora</th>
            <th>Estudiante</th>
            <th>Grado</th>
            <th>Asignatura</th>
            <th>Docente</th>
            <th>Estado</th>
            <th className="text-end">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 && (
            <tr><td colSpan="8" className="text-center text-muted py-4">Sin registros</td></tr>
          )}
          {rows.map(r => (
            <tr key={r.id}>
              <td>{r.fecha}</td>
              <td>{r.hora}</td>
              <td>{r.estudiante_nombre}</td>
              <td>{r.grado}</td>
              <td>{r.asignatura_label || r.asignatura}</td>
              <td>{r.docente || '-'}</td>
              <td><StatusBadge value={r.estado} /></td>
              <td className="text-end">
                <div className="btn-group">
                  <button className="btn btn-sm btn-outline-info btn-view" onClick={()=>onView(r.id)}>Ver</button>
                  <button className="btn btn-sm btn-outline-secondary btn-edit" onClick={()=>onEdit(r.id)}>Editar</button>
                  <button className="btn btn-sm btn-outline-danger btn-delete" onClick={()=>onDelete(r.id)}>Eliminar</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
