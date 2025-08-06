export default function DropdownButton({ 
  label, 
  className = "", 
  isOpen = false, 
  onToggle, 
  items = [], 
  onSelect,
  selectedItem
}) {
  return (
    <div className="relative">
      <button
        className={`px-4 py-2 border border-gray-300 rounded-lg bg-white flex items-center justify-between gap-2 ${className}`}
        onClick={onToggle}
      >
        <span>{selectedItem || label}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>
      {isOpen && items.length > 0 && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          {items.map((item, index) => (
            <div
              key={index}
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                item === selectedItem ? "bg-purple-500 text-white" : ""
              }`}
              onClick={() => onSelect?.(item)}
            >
              {item === selectedItem && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="inline mr-2"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 