import { Calendar } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Button from "@/components/ui/Button";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { createPortal } from "react-dom";

export default function RouteEditSchedule() {
  const [selectedDays, setSelectedDays] = useState([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ]);
  const [dateRange, setDateRange] = useState({
    from: undefined,
    to: undefined,
  });
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef();

  const handleDayToggle = (day) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter((d) => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  // Close calendar if clicked outside
  function handleClickOutside(e) {
    if (pickerRef.current && !pickerRef.current.contains(e.target)) {
      setShowPicker(false);
    }
  }
  // Attach/detach event
  useEffect(() => {
    if (showPicker) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPicker]);

  // When both from and to are selected, close the picker
  useEffect(() => {
    if (dateRange.from && dateRange.to) {
      setShowPicker(false);
    }
  }, [dateRange]);

  function formatDate(date) {
    if (!date) return "";
    return date.toLocaleDateString("en-US");
  }

  return (
    <div className="bg-[var(--surface-bg)] rounded-lg border border-[var(--border)] overflow-visible">
      <div className="px-6 py-4 border-b border-[var(--border)]">
        <h2 className="font-medium text-[var(--heading)]">Schedule</h2>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          {[
            "Sunday",
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
          ].map((day) => (
            <Button
              key={day}
              variant={selectedDays.includes(day) ? "primary" : "secondary"}
              className={`px-3 py-1 rounded-full text-sm`}
              onClick={() => handleDayToggle(day)}
            >
              {day}
            </Button>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium text-[var(--heading)] mb-1">
            Effective Date Range
          </label>
          <div className="relative" ref={pickerRef}>
            <button
              type="button"
              className="flex items-center border border-[var(--border)] rounded-md px-3 py-2 w-full text-left focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
              onClick={() => setShowPicker((v) => !v)}
            >
              <Calendar size={16} className="text-[var(--muted-text)] mr-2" />
              <span className="text-sm">
                {dateRange.from && dateRange.to
                  ? `${formatDate(dateRange.from)} - ${formatDate(
                      dateRange.to
                    )}`
                  : "Select date range"}
              </span>
            </button>
            {showPicker &&
              createPortal(
                <div className="fixed left-0 top-0 z-[9999] flex items-start justify-center w-full h-full pointer-events-none">
                  <div
                    className="bg-white rounded-lg shadow-lg p-4 border border-[var(--border)] pointer-events-auto"
                    style={{
                      position: "absolute",
                      left: pickerRef.current?.getBoundingClientRect().left,
                      top:
                        pickerRef.current?.getBoundingClientRect().bottom +
                        window.scrollY,
                    }}
                  >
                    <DayPicker
                      mode="range"
                      selected={dateRange}
                      onSelect={(range) => {
                        console.log('Selected range:', range);
                        if (range && range.from) setDateRange(range);
                      }}
                      numberOfMonths={2}
                      defaultMonth={dateRange.from}
                      modifiersClassNames={{
                        selected: "bg-[var(--primary)] text-white rounded-full",
                        range_start: "bg-[var(--primary)] text-white rounded-full",
                        range_end: "bg-[var(--primary)] text-white rounded-full",
                        in_range: "bg-[var(--primary-light)] text-[var(--primary)]",
                      }}
                    />
                  </div>
                </div>,
                document.body
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
