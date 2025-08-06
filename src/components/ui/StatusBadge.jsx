export default function StatusBadge({ status, type = "default" }) {
  const variants = {
  active: "bg-[var(--green-100)] text-[var(--green-800)]",
  inactive: "bg-[var(--gray-100)] text-[var(--gray-800)]",
  pending: "bg-[var(--blue-100)] text-[var(--blue-800)]",
  warning: "bg-[var(--amber-100)] text-[var(--warning-dark)]",
  error: "bg-[var(--red-100)] text-[var(--red-800)]",
  default: "bg-[var(--gray-100)] text-[var(--gray-800)]",
  }

  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${variants[type]}`}>
      {status}
    </span>
  )
} 