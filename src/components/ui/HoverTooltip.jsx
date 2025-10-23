"use client";

import { useEffect, useRef, useState } from "react";

export default function HoverTooltip({ content, children, className = "", width = 320 }) {
  const triggerRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [coords, setCoords] = useState({ top: 0, left: 0, arrowLeft: width / 2 });

  const updatePosition = () => {
    const el = triggerRef.current;
    if (!el) return;
    
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return;
    }
    
    const rect = el.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const desiredLeft = rect.left + rect.width / 2 - width / 2;
    const left = Math.max(8, Math.min(desiredLeft, viewportWidth - width - 8));
    
    // Calculate top position relative to viewport, then add scroll offset
    const top = rect.bottom + 10; // 10px offset from bottom of element
    const arrowLeft = Math.max(10, Math.min(width - 10, rect.left + rect.width / 2 - left));
    setCoords({ top, left, arrowLeft });
  };

  useEffect(() => {
    if (!open) return;
    
    // Check if we're in a browser environment
    if (typeof window === 'undefined') {
      return;
    }
    
    updatePosition();
    const onScroll = () => {
      // Use requestAnimationFrame to ensure smooth updates
      requestAnimationFrame(updatePosition);
    };
    const onResize = () => {
      requestAnimationFrame(updatePosition);
    };
    
    // Listen to scroll events on the document and all scrollable containers
    document.addEventListener("scroll", onScroll, true);
    window.addEventListener("scroll", onScroll, true);
    window.addEventListener("resize", onResize);
    
    return () => {
      document.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("scroll", onScroll, true);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <span
      ref={triggerRef}
      className={`inline-flex ${className}`}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open && (
        <div
          role="tooltip"
          className="fixed bg-white text-[var(--primary-black)] text-xs rounded-md border border-[var(--gray-200)] shadow-xl z-[1000] p-3"
          style={{ 
            width, 
            top: `${coords.top}px`, 
            left: `${coords.left}px`,
            position: 'fixed'
          }}
        >
          {/* Arrow */}
          <div
            className="absolute -top-1 w-2 h-2 rotate-45 bg-white border-l border-t border-[var(--gray-200)]"
            style={{ left: `${coords.arrowLeft}px` }}
          />
          {content}
        </div>
      )}
    </span>
  );
}


