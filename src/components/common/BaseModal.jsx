import React from "react";
import { RiArrowLeftLine, RiCloseLine } from "react-icons/ri";

export default function BaseModal({
  isOpen,
  onClose,
  onBack,
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
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-40"
      onClick={onClose}
    >
      <div
        className={`bg-[var(--background)] rounded-2xl shadow-xl p-6 ${
          widthClass ? widthClass : sizeClasses[size]
        } relative ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            {onBack && (
              <button
                onClick={onBack}
                className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--hover-bg)] transition-colors"
                aria-label="Back"
              >
                <RiArrowLeftLine className="w-5 h-5" style={{ color: 'var(--gray-600)' }} />
              </button>
            )}
            <h2 className="text-lg font-semibold text-[var(--primary-black)]">{title}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--hover-bg)] transition-colors"
            aria-label="Close modal"
          >
            <RiCloseLine className="w-5 h-5" style={{ color: 'var(--gray-600)' }} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
