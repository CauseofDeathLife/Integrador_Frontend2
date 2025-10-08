export default function StatusBadge({ value }) {
  const map = { presente:'success', tardanza:'warning', ausente:'danger', justificado:'info' }
  const label = value ? value[0].toUpperCase()+value.slice(1) : ''
  return <span className={`badge bg-${map[value]||'secondary'}`}>{label}</span>
}
