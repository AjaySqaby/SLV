"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function Collapse({ 
  title, 
  children, 
  defaultOpen = false,
  icon = null,
  className = "",
  headerClassName = "",
  contentClassName = "",
  isOpen = false,
  onToggle = () => {}
}) {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);
  
  // Use external state if provided, otherwise use internal state
  const isCollapseOpen = isOpen !== undefined ? isOpen : internalIsOpen;
  
  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalIsOpen(!internalIsOpen);
    }
  };

  return (
    <div className={`border border-gray-200 rounded-lg overflow-hidden transition-all duration-300 ${className}`}>
      {/* Header */}
      <button
        onClick={handleToggle}
        className={`w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-all duration-200 ${headerClassName}`}
      >
        <div className="flex items-center gap-3">
          {icon && (
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center transition-all duration-200">
              {icon}
            </div>
          )}
          <h3 className="text-lg font-semibold text-gray-900 transition-colors duration-200">{title}</h3>
        </div>
        
        <div className="flex items-center gap-2">
          <div className={`transform transition-transform duration-300 ease-in-out ${isCollapseOpen ? 'rotate-180' : 'rotate-0'}`}>
            <ChevronDown className="w-5 h-5 text-gray-500" />
          </div>
        </div>
      </button>

      {/* Content with smooth animation */}
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isCollapseOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className={`px-4 pb-4 border-t border-gray-100 transition-all duration-300 ${contentClassName}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
