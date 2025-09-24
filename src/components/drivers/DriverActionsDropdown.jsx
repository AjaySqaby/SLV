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

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
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
      className: 'text-gray-700 hover:bg-gray-50'
    },
    {
      icon: Edit,
      label: 'Edit',
      action: () => handleAction(() => onEdit(driver.id)),
      className: 'text-gray-700 hover:bg-gray-50'
    }
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="More actions"
      >
        <MoreVertical className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <button
                key={index}
                onClick={item.action}
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
