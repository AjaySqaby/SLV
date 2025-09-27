"use client";
import { useState, useEffect, useRef } from "react";
import { MoreVertical, Settings } from "lucide-react";

export default function OnboardingActionsDropdown({ driver, onManage }) {
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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="More actions"
      >
        <MoreVertical size={16} className="text-gray-600" />
      </button>
      {isOpen && (
        <div className="absolute right-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[120px]">
          <div className="py-1">
            <button 
              onClick={() => {
                onManage(driver);
                setIsOpen(false);
              }} 
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <Settings size={14} /> Manage
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
