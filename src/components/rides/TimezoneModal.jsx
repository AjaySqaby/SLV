import React, { useEffect, useRef, useState } from "react";
import TimezoneSelect from "@/components/ui/TimezoneSelect";
import { convertTimeBetweenTimezones, debugLuxonConversion, getUserTimezone, getTimezoneLabel, formatTimeWithTimezone } from "@/utils/timezone";
import { useTimezone } from "@/contexts/TimezoneContext";

export default function TimezoneModal({ open, onClose, onSelect, originalTime = "08:30 AM", initialSelected = null, sourceTimezone = null }) {
  const modalRef = useRef();
  const [selected, setSelected] = useState(initialSelected);
  const { userTimezone, isDetecting } = useTimezone();

  // Update selected when initialSelected prop changes
  useEffect(() => {
    setSelected(initialSelected);
  }, [initialSelected]);

  // Set user's timezone as default if no initial selection
  useEffect(() => {
    if (!initialSelected && userTimezone && !isDetecting) {
      setSelected(userTimezone);
    }
  }, [initialSelected, userTimezone, isDetecting]);

  useEffect(() => {
    function handle(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }
    if (open) document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, [open, onClose]);

  // Convert time based on selected timezone using Luxon
  const getConvertedTime = (timezone) => {
    if (!timezone || !sourceTimezone) return null;

    try {
      // Use debug function to see what's happening
      return debugLuxonConversion(originalTime, sourceTimezone, timezone);
    } catch (error) {
      console.error('Error converting time:', error);
      return null;
    }
  };

  const convertedTime = getConvertedTime(selected);
  const sourceTimezoneLabel = sourceTimezone ? getTimezoneLabel(sourceTimezone) : 'Original timezone';

  if (!open) return null;
  return (
    <div
      ref={modalRef}
      className="absolute top-12 mt-2 z-50 bg-white border border-gray-200 rounded-xl shadow-xl p-6 w-96"
    >
      <div className="font-semibold text-lg text-gray-900 mb-4">
        Convert to different timezone
      </div>
      
      {/* Original time display */}
      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-600 mb-1">Original Time</div>
        <div className="text-lg font-semibold text-gray-900">{originalTime}</div>
        <div className="text-xs text-gray-500">{sourceTimezoneLabel}</div>
      </div>

      {/* Timezone selector */}
      <div className="mb-4">
        <div className="text-sm text-gray-600 mb-2">Select Target Timezone</div>
        <TimezoneSelect
          value={selected}
          onChange={(tz) => {
            setSelected(tz);
            onSelect?.(tz);
          }}
          showAutoDetect={true}
        />
      </div>

      {/* Converted time display */}
      {convertedTime && selected && (
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-sm text-blue-600 mb-1">Converted Time</div>
          <div className="text-2xl font-bold text-blue-900 mb-1">
            {convertedTime}
          </div>
          <div className="text-sm text-blue-700">
            {getTimezoneLabel(selected)}
          </div>
          {userTimezone && selected !== userTimezone && (
            <div className="mt-2 text-xs text-blue-600">
              Your timezone: {getTimezoneLabel(userTimezone)}
            </div>
          )}
        </div>
      )}

      {/* Timezone comparison info */}
      {selected && sourceTimezone && selected !== sourceTimezone && (
        <div className="mt-4 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="text-sm text-yellow-800">
            <strong>Note:</strong> Times are automatically converted from {sourceTimezoneLabel} to {getTimezoneLabel(selected)}
          </div>
        </div>
      )}

      {/* Loading state */}
      {isDetecting && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-sm text-gray-600">
            Detecting your timezone...
          </div>
        </div>
      )}
    </div>
  );
}
