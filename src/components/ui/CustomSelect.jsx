import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";

export default function CustomSelect({
  options = [],
  value,
  onChange,
  name,
  label,
  width = "w-44",
  placeholder = "Select an option",
  iconMap = {}, // { value: <Icon /> }
}) {
  const [open, setOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e) {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const selected = options.find((opt) => opt.value === value);

  return (
    <div className={`relative ${width}`}>
      {label && (
        <label className="block text-sm font-medium text-[var(--gray-700)] mb-1">{label}</label>
      )}
      <button
        type="button"
        ref={buttonRef}
        className={`flex items-center justify-between px-4 py-2 border border-[var(--gray-300)] rounded-lg bg-[var(--background)] w-full text-left focus:ring-2 focus:ring-purple-400 focus:outline-none ${open ? "ring-2 ring-purple-400" : ""}`}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="flex items-center gap-2">
          {selected && iconMap[selected.value]}
          {selected ? selected.label : <span className="text-[var(--gray-400)]">{placeholder}</span>}
        </span>
        <ChevronDown className="ml-2 h-5 w-5 text-[var(--gray-400)]" />
      </button>
      {open && (
        <div
          ref={menuRef}
          className="absolute left-0 mt-2 z-30 w-full bg-[var(--background)] rounded-xl shadow-xl border border-[var(--gray-200)] py-1"
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              className={`flex items-center w-full px-4 py-2 text-sm gap-2 text-left hover:bg-[var(--gray-50)] ${value === opt.value ? "font-semibold bg-gray-100" : ""}`}
              onClick={() => {
                onChange({ target: { value: opt.value, name } });
                setOpen(false);
              }}
            >
              {value === opt.value && <Check size={16} className="text-[var(--green)] mr-1" />}
              {iconMap[opt.value]}
              <span>{opt.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
} 