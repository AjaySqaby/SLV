"use client";

import { useState, useRef, useEffect } from "react";
import { MoreVertical, Eye } from "lucide-react";

export default function MaintenanceActionsDropdown({ item, onView }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen((o) => !o);
        }}
        className="p-2 text-[var(--gray-400)] hover:text-[var(--gray-600)] hover:bg-[var(--purple)] rounded-full transition-colors"
        aria-label="More actions"
      >
        <MoreVertical size={16} />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-8 bg-[var(--background)] border border-[var(--card-border)] rounded-lg shadow-lg z-50 min-w-[140px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
              if (onView) onView(item);
            }}
            className="w-full px-4 py-2 text-left text-sm text-[var(--foreground)] hover:bg-[var(--purple)] flex items-center gap-2"
          >
            <Eye size={14} />
            View Details
          </button>
        </div>
      )}
    </div>
  );
}


