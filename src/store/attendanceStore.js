// src/store/attendanceStore.js
import initial from '../data/attendances.mock.js'

const KEY = 'attendance_store_v2'

// 1) Declaramos data primero y luego la cargamos
let data = []

// solo persiste en localStorage (no toca "data" directamente)
function persist(list) {
  try { localStorage.setItem(KEY, JSON.stringify(list)) } catch {}
}

// 2) Cargar del storage o sembrar con "initial" sin llamar a save()
function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const parsed = JSON.parse(raw)
      if (Array.isArray(parsed)) return parsed
    }
  } catch {}
  // Semilla inicial (sin usar save() para no acceder a "data" aún)
  const seeded = [...initial]
  persist(seeded)
  return seeded
}

// 3) Normalizador (mismo que tenías)
function normalize(r) {
  return {
    id: Number(r.id),
    estudiante_id: r.estudiante_id || '',
    estudiante_nombre: r.estudiante_nombre || '',
    grado: r.grado || '',
    asignatura: r.asignatura || '',
    asignatura_label: r.asignatura_label || '',
    docente: r.docente || '',
    fecha: r.fecha || r.fecha_clase || '',
    hora: r.hora || r.hora_clase || '',
    estado: r.estado || 'presente',
    minutos_tardanza: r.minutos_tardanza || '',
    tipo_justificacion: r.tipo_justificacion || '',
    observaciones: r.observaciones || '',
    notificar_familia: !!r.notificar_familia,
    registrado_por: r.registrado_por || 'Admin Sistema',
    historial: r.historial || []
  }
}

// 4) Inicializamos "data" después de declarar funciones
data = load()

export function list() {
  return [...data].sort((a,b) => (a.fecha + a.hora).localeCompare(b.fecha + b.hora))
}

export function get(id) {
  return data.find(x => x.id === Number(id))
}

export function add(item) {
  const id = Date.now()
  const record = normalize({ ...item, id })
  data = [...data, record]
  persist(data)
  return id
}

export function update(id, patch) {
  data = data.map(x => x.id === Number(id) ? normalize({ ...x, ...patch, id: Number(id) }) : x)
  persist(data)
}

export function remove(id) {
  data = data.filter(x => x.id !== Number(id))
  persist(data)
}
