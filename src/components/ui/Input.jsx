import { Search } from "lucide-react"

export default function Input({
  type = "text",
  placeholder,
  className = "",
  width = "w-full",
  icon,
  rightIcon,
  onRightIconClick,
  rightIconAriaLabel,
  value,
  onChange,
  name,
  required = false,
  readOnly = false,
  disabled = false,
  error,
  label,
  ...props
}) {
  const baseStyles = "px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none"
  const errorStyles = error ? "border-red-500 focus:ring-red-400" : ""
  const disabledStyles = disabled ? "bg-gray-100 cursor-not-allowed" : "bg-white"
  
  const inputElement = (
    <div className={`relative ${width}`}>
      {icon && (
        <div className="absolute left-3 top-2.5">
          {icon}
        </div>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`${baseStyles} ${errorStyles} ${disabledStyles} ${icon ? 'pl-10' : ''} ${rightIcon ? 'pr-12' : ''} w-full ${className}`}
        name={name}
        required={required}
        disabled={disabled}
        {...(onChange || readOnly
          ? { value, onChange, readOnly }
          : { defaultValue: value })}
        {...props}
      />
      {rightIcon && (
        onRightIconClick ? (
          <button
            type="button"
            onClick={onRightIconClick}
            className="absolute right-3 top-2.5 text-gray-500 hover:text-gray-700"
            aria-label={rightIconAriaLabel || "Toggle"}
          >
            {rightIcon}
          </button>
        ) : (
          <span className="absolute right-3 top-2.5 text-gray-500">
            {rightIcon}
          </span>
        )
      )}
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  )

  if (label) {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {inputElement}
      </div>
    )
  }

  return inputElement
} 