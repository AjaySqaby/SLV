import React from "react";

export default function BaseModal({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  className = "",
  widthClass,
}) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: "max-w-md",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      onClick={onClose}
    >
      <div
        className={`bg-[var(--background)] rounded-2xl shadow-xl p-6 ${
          widthClass ? widthClass : sizeClasses[size]
        } relative ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-[var(--gray-400)] hover:[var(--gray-700)] text-2xl font-bold px-2 rounded-full focus:outline-none"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
