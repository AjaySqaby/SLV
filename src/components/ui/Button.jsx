export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon,
  disabled = false,
  fullWidth = false,
  ...props
}) {
  const variants = {
    primary: "bg-[var(--primary)] text-[var(--on-primary)] hover:bg-[var(--primary-dark)]",
    secondary: "bg-[var(--surface-bg)] text-[var(--muted-text)] border border-[var(--border)] hover:bg-[var(--hover-bg)]",
    danger: "bg-[var(--danger)] text-[var(--on-danger)] hover:bg-[var(--danger-dark)]",
    success: "bg-[var(--success)] text-[var(--on-success)] hover:bg-[var(--success-dark)]",
    warning: "bg-[var(--warning)] text-[var(--on-warning)] hover:bg-[var(--warning-dark)]",
    ghost: "bg-transparent text-[var(--muted-text)] hover:bg-[var(--hover-bg)]",
  }

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  }

  const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--primary-bg)] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
  const widthStyles = fullWidth ? "w-full" : ""

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${widthStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  )
} 