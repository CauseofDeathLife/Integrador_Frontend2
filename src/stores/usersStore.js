import { SEED_USERS } from './seed'

const KEY = 'users_v1'

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

export const UsersStore = {
  all() { return load() },
  add({ username, password, role, name }) {
    const list = load()
    const id = list.length ? Math.max(...list.map(x=>x.id || 0)) + 1 : 1
    const u = { id, username, password, role, name }
    list.push(u)
    save(list)
    return u
  },
  findByUsername(username) {
    return load().find(u => u.username === username) || null
  }
}

export function seedUsersIfEmpty() {
  const cur = load()
  if (!cur || cur.length === 0) {
    save(SEED_USERS)
  }
}
