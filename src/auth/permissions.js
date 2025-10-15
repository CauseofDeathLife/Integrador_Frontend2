export const PERMISSIONS = {
  alumno:   ['attendance:read:self'],
  familiar: ['attendance:read:linked'],
  maestro:  ['attendance:read:any', 'attendance:write'],
}

export function can(user, action) {
  if (!user) return false
  const perms = PERMISSIONS[user.role] || []
  return perms.includes(action)
}
