export default function IconButton({ 
  icon: Icon, 
  onClick, 
  variant = "default",
  size = "md",
  className = "" 
}) {
  const variants = {
    default: "text-[var(--gray-400)] hover:text-[var(--gray-600)]",
    primary: "text-[var(--blue)] hover:text-[var(--blue-600)]",
    danger: "text-[var(--red)] hover:text-[var(--red-600)]",
    success: "text-[var(--green)] hover:text-[var(--green-600)]"
  }

  const sizes = {
    sm: "p-1",
    md: "p-2",
    lg: "p-3"
  }

  return (
    <button 
      onClick={onClick}
      className={`${variants[variant]} ${sizes[size]} rounded-md hover:bg-gray-50 transition-colors ${className}`}
    >
      <Icon size={size === "sm" ? 16 : size === "lg" ? 24 : 20} />
    </button>
  )
} 