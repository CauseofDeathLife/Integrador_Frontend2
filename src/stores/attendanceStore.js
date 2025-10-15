import { SEED_ATTENDANCES } from './seed'

const KEY = 'attendances_v1'

function load() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return []
    return JSON.parse(raw)
  } catch {
    return []
  }
}
function save(list) {
  localStorage.setItem(KEY, JSON.stringify(list))
}
export const AttendanceStore = {
  list() {
    let items = load()
    // ordenar fecha desc, hora desc
    items.sort((a,b) => {
      const ad = `${a.fechaISO} ${a.hora}`
      const bd = `${b.fechaISO} ${b.hora}`
      return ad < bd ? 1 : ad > bd ? -1 : 0
    })
    return items
  },
  get(id) {
    return load().find(x => String(x.id) === String(id)) || null
  },
  add(payload) {
    const id = (crypto.randomUUID && crypto.randomUUID()) || String(Date.now())
    const now = Date.now()
    const next = { ...payload, id, createdAt: now, updatedAt: now }
    const list = load()
    list.push(next)
    save(list)
    return next
  },
  update(id, patch) {
    const list = load()
    const idx = list.findIndex(x => String(x.id) === String(id))
    if (idx === -1) return null
    const now = Date.now()
    list[idx] = { ...list[idx], ...patch, updatedAt: now }
    save(list)
    return list[idx]
  },
  remove(id) {
    const prev = load()
    const next = prev.filter(x => String(x.id) !== String(id))
    save(next)
  },
  seedIfEmpty() {
    const current = load()
    if (!current || current.length === 0) {
      save(SEED_ATTENDANCES)
    }
  }
}

// seed initial data once
AttendanceStore.seedIfEmpty()
