import React from 'react'

export default function StatusBadge({ estado }) {
  let cls = 'badge text-bg-secondary'
  if (estado === 'presente') cls = 'badge text-bg-success'
  if (estado === 'ausente') cls = 'badge text-bg-danger'
  if (estado === 'tardanza') cls = 'badge text-bg-warning'
  if (estado === 'justificado') cls = 'badge text-bg-primary'
  return <span className={cls}>{estado}</span>
}
