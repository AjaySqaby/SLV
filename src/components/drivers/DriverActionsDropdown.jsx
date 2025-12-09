"use client";

import { useState, useRef, useEffect } from 'react';
import { MoreVertical, Eye, Edit } from 'lucide-react';

export default function DriverActionsDropdown({ 
  driver, 
  onView, 
  onEdit
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (typeof window !== 'undefined') {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, []);

  const handleAction = (action) => {
    setIsOpen(false);
    action();
  };

  const menuItems = [
    {
      icon: Eye,
      label: 'View',
      action: () => handleAction(() => onView(driver.id)),
      className: 'text-[var(--primary-black)] hover:bg-[var(--purple)] hover:text-white'
    },
    {
      icon: Edit,
      label: 'Edit',
      action: () => handleAction(() => onEdit(driver.id)),
      className: 'text-[var(--primary-black)] hover:bg-[var(--purple)] hover:text-white'
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        className="p-2 text-[var(--gray-400)] hover:text-[var(--gray-600)] hover:bg-[var(--purple)] hover:text-white rounded-full transition-all duration-200"
        aria-label="More actions"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-[var(--background)] rounded-lg shadow-lg border border-[var(--card-border)] py-1 z-50">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation();
                  item.action();
                }}
                className={`w-full px-4 py-2 text-left flex items-center gap-3 transition-colors ${item.className}`}
              >
                <IconComponent className="w-4 h-4" />
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
