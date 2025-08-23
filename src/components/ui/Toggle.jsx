import React from "react";

export default function Toggle({ checked, onChange, disabled = false, className = "" }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 border ${
        checked 
          ? "bg-[var(--blue-500)] focus:ring-[var(--blue-400)] border-[var(--blue-500)]" 
          : "bg-[var(--gray-200)] focus:ring-[var(--gray-300)] border-[var(--gray-300)]"
      } ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:shadow-sm"} ${className}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg transition-all duration-200 ease-in-out ${
          checked ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
} 