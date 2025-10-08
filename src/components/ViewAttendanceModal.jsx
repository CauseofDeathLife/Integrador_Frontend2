import Modal from './Modal.jsx'
import StatusBadge from './StatusBadge.jsx'

export default function ViewAttendanceModal({ show, onClose, item }) {
  if (!item) return null

  const badgeMap = {presente:'success', ausente:'danger', tardanza:'warning', justificado:'info'}
  const estadoClass = badgeMap[item.estado] || 'secondary'

  return (
    <Modal show={show} title="Detalle de asistencia" onClose={onClose} footer={
      <button className="btn btn-primary" onClick={onClose}>Cerrar</button>
    }>
      <div className="row g-3">
        <div className="col-md-6">
          <strong>Estudiante:</strong> {item.estudiante_nombre}<br/>
          <strong>Grado:</strong> {item.grado}<br/>
          <strong>Asignatura:</strong> {item.asignatura_label || item.asignatura}<br/>
          <strong>Docente:</strong> {item.docente || '-'}
        </div>
        <div className="col-md-6">
          <strong>Fecha:</strong> {new Date(item.fecha).toLocaleDateString('es-ES')}<br/>
          <strong>Hora:</strong> {item.hora}<br/>
          <strong>Estado:</strong> <span className={`badge bg-${estadoClass}`}>{item.estado[0].toUpperCase()+item.estado.slice(1)}</span><br/>
          <strong>Registrado por:</strong> {item.registrado_por || 'Admin Sistema'}
        </div>
        <div className="col-12">
          <strong>Observaciones:</strong>
          <div className="mt-1">{item.observaciones || 'No hay observaciones registradas'}</div>
        </div>

        <div className="col-12">
          <strong>Historial:</strong>
          {item.historial && item.historial.length > 0 ? (
            <div className="mt-2">
              {item.historial.map((h, idx)=>{
                const c = badgeMap[h.estado] || 'secondary'
                return (
                  <div key={idx} className="d-flex justify-content-between align-items-center mb-1">
                    <span>{new Date(h.fecha).toLocaleDateString('es-ES')} - {h.asignatura}</span>
                    <span className={`badge bg-${c}`}>{h.estado[0].toUpperCase()+h.estado.slice(1)}</span>
                  </div>
                )
              })}
            </div>
          ) : <div className="text-muted small">No hay historial disponible</div>}
        </div>
      </div>
    </Modal>
  )
}
