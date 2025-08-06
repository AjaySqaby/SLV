export default function Card({ icon, title, description, color }) {
  return (
    <div className="dashboard-card">
      <div className={`icon-circle ${color} text-[var(--on-primary)]`}>{icon}</div>
      <h3 className="text-lg font-semibold mb-1">{title}</h3>
      <p className="text-sm text-[var(--gray-500)] text-center">{description}</p>
    </div>
  )
}
