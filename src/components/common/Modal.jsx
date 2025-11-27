import React from "react";

export default function Modal({ open, onClose, title, children, widthClass }) {
  if (!open) return null;
  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4"
      onClick={onClose}
    >
      <div 
        className={`bg-white rounded-2xl shadow-xl p-6 relative max-h-[90vh] flex flex-col ${widthClass || 'min-w-[320px] max-w-full'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4 flex-shrink-0">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-[var(--gray-400)] hover:text-[var(--gray-700)] text-2xl font-bold px-2 rounded-full focus:outline-none"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>
        <div className="flex-1 overflow-hidden min-h-0">{children}</div>
      </div>
    </div>
  );
} 
