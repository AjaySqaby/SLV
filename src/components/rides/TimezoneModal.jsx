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

// Timezone offset mapping (in hours from UTC)
const TIMEZONE_OFFSETS = {
  "Pacific Time (PT)": -8,
  "Mountain Time (MT)": -7,
  "Central Time (CT)": -6,
  "Eastern Time (ET)": -5,
  "Greenwich Mean Time (GMT)": 0,
  "Central European Time (CET)": 1,
  "Japan Standard Time (JST)": 9,
  "Australian Eastern Time (AET)": 10,
};

export default function TimezoneModal({ open, onClose, onSelect, originalTime = "08:30 AM", initialSelected = null }) {
  const modalRef = useRef();
  const [selected, setSelected] = useState(initialSelected);

  // Update selected when initialSelected prop changes
  useEffect(() => {
    setSelected(initialSelected);
  }, [initialSelected]);

  useEffect(() => {
    function handle(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    if (open) document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open, onClose]);

  // Convert time based on selected timezone
  const getConvertedTime = (timezone) => {
    if (!timezone) return null;

    const offset = TIMEZONE_OFFSETS[timezone];
    if (offset === undefined) return null;

    // Parse original time (assuming 24-hour format)
    const [hours, minutes] = originalTime.split(':');
    const isPM = originalTime.includes('PM');
    let hour = parseInt(hours);
    if (isPM && hour !== 12) hour += 12;
    if (!isPM && hour === 12) hour = 0;

    // Apply timezone offset
    let convertedHour = hour + offset;

    // Handle day wrapping
    if (convertedHour >= 24) convertedHour -= 24;
    if (convertedHour < 0) convertedHour += 24;

    // Convert back to 12-hour format
    const period = convertedHour >= 12 ? 'PM' : 'AM';
    const displayHour = convertedHour === 0 ? 12 : convertedHour > 12 ? convertedHour - 12 : convertedHour;

    return `${displayHour}:${minutes.split(' ')[0]} ${period}`;
  };

  const convertedTime = getConvertedTime(selected);

  if (!open) return null;
  return (
    <div
      ref={modalRef}
      className="absolute top-12 mt-2 z-50 bg-white border border-gray-200 rounded-xl shadow-xl p-4 w-80"
    >
      <div className="font-semibold text-lg text-gray-900 mb-2">
        Convert to different timezone
      </div>
      <TimezoneSelect
        value={selected}
        onChange={(tz) => {
          setSelected(tz);
          onSelect?.(tz);
          // Don't close the modal - let it stay open to show converted time
        }}
      />
      {convertedTime && selected && (
        <div className="mt-4 text-center">
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {convertedTime}
          </div>
          <div className="text-sm text-gray-600">
            {selected}
          </div>
        </div>
      )}
    </div>
  );
}
