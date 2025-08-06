import React, { useEffect, useRef, useState } from "react";
import TimezoneSelect from "@/components/ui/TimezoneSelect";

const TIMEZONES = [
  "Pacific Time (PT)",
  "Mountain Time (MT)",
  "Central Time (CT)",
  "Eastern Time (ET)",
  "Greenwich Mean Time (GMT)",
  "Central European Time (CET)",
  "Japan Standard Time (JST)",
  "Australian Eastern Time (AET)",
];

export default function TimezoneModal({ open, onClose, onSelect }) {
  const modalRef = useRef();
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    function handle(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    if (open) document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      ref={modalRef}
      className="absolute top-12 mt-2 z-50 bg-[var(--on-primary)] border border-[var(--gray-200)] rounded-xl shadow-xl p-4 w-80"
    >
      <div className="font-semibold text-lg text-[var(--gray-900)] mb-2">
        Convert to different timezone
      </div>
      <TimezoneSelect
        value={selected}
        onChange={(tz) => {
          setSelected(tz);
          onSelect?.(tz);
          onClose();
        }}
      />
    </div>
  );
}
