"use client";
import { useState, useRef, useEffect } from "react";
import { MoreVertical, Eye, Edit } from "lucide-react";

export default function CampusActionsDropdown({ campus, onView, onEdit }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleView = () => {
    onView(campus);
    setIsOpen(false);
  };

  const handleEdit = () => {
    onEdit(campus);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-2 text-[var(--gray-400)] hover:text-[var(--gray-600)] hover:bg-[var(--purple)] rounded-full transition-colors"
        aria-label="More actions"
      >
        <MoreVertical size={16} />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-10 bg-white border border-[var(--gray-200)] rounded-lg shadow-lg z-50 min-w-[120px]">
          <div className="py-1">
            <button
              onClick={handleView}
              className="w-full px-4 py-2 text-left text-sm text-[var(--foreground)] hover:bg-[var(--purple)] flex items-center gap-2"
            >
              <Eye size={14} />
              View
            </button>
            <button
              onClick={handleEdit}
              className="w-full px-4 py-2 text-left text-sm text-[var(--foreground)] hover:bg-[var(--purple)] flex items-center gap-2"
            >
              <Edit size={14} />
              Edit
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
