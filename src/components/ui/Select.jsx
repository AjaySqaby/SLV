export default function Select({
  options = [],
  value,
  onChange,
  name,
  placeholder = "Select an option",
  className = "",
  width = "w-full",
  disabled = false,
  error,
  label,
  required = false,
  ...props
}) {
  const baseStyles = "px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-400 focus:outline-none appearance-none bg-white"
  const errorStyles = error ? "border-red-500 focus:ring-red-400" : ""
  const disabledStyles = disabled ? "bg-gray-100 cursor-not-allowed" : ""

  const selectElement = (
    <div className={`relative ${width}`}>
      <select
        value={value}
        onChange={onChange}
        name={name}
        className={`${baseStyles} ${errorStyles} ${disabledStyles} w-full ${className}`}
        disabled={disabled}
        required={required}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
        <svg
          className="h-5 w-5 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>
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
        {selectElement}
      </div>
    )
  }

  return selectElement
} 