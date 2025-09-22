import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Calendar } from "lucide-react";
import Button from "@/components/ui/Button";

const customStyles = `
  .custom-day-picker .rdp-day_selected,
  .custom-day-picker .rdp-day_selected:focus,
  .custom-day-picker .rdp-day_selected:hover,
  .custom-day-picker .rdp-day_selected:active {
    background-color: #8b5cf6 !important;
    color: white !important;
    font-weight: bold !important;
    border-radius: 50% !important;
  }
  .custom-day-picker .rdp-day {
    border-radius: 50% !important;
  }
`;

export default function DateRangePicker({ startDate, endDate, onDateRangeChange }) {
  const [show, setShow] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(startDate);
  const [tempEndDate, setTempEndDate] = useState(endDate);
  const ref = useRef();

  // Close calendar if clicked outside
  function handleClickOutside(e) {
    if (ref.current && !ref.current.contains(e.target)) {
      setShow(false);
    }
  }
  
  // Attach/detach event
  useEffect(() => {
    // Check if we're in a browser environment
    if (typeof document === 'undefined') {
      return;
    }
    
    if (show) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [show]);

  // Update temp values when props change
  useEffect(() => {
    setTempStartDate(startDate);
    setTempEndDate(endDate);
  }, [startDate, endDate]);

  const handleStartDateChange = (date) => {
    setTempStartDate(date);
    // If end date is before start date, clear it
    if (tempEndDate && date && tempEndDate < date) {
      setTempEndDate(null);
    }
  };

  const handleEndDateChange = (date) => {
    setTempEndDate(date);
  };

  const handleClear = () => {
    setTempStartDate(null);
    setTempEndDate(null);
    onDateRangeChange(null, null);
    setShow(false);
  };

  const handleCancel = () => {
    setTempStartDate(startDate);
    setTempEndDate(endDate);
    setShow(false);
  };

  const handleApply = () => {
    onDateRangeChange(tempStartDate, tempEndDate);
    setShow(false);
  };

  const formatDateRange = () => {
    if (startDate && endDate) {
      return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
    } else if (startDate) {
      return `${startDate.toLocaleDateString()} - Select end date`;
    } else if (endDate) {
      return `Select start date - ${endDate.toLocaleDateString()}`;
    }
    return "Select date range";
  };

  return (
    <div className="w-full relative" ref={ref}>
      <style>{customStyles}</style>
      {/* <label className="block text-sm font-medium text-[var(--gray-700)] mb-1">
        Date Range
      </label> */}
      <Button
        type="button"
        className={`w-full bg-background border-2 border-[var(--gray-300)] font-semibold rounded-lg py-2 px-4 flex items-center gap-2 focus:outline-none ${
          startDate || endDate ? "!text-gray-900" : "!text-[var(--gray-400)]"
        }`}
        onClick={() => setShow((v) => !v)}
      >
        <Calendar className="h-5 w-5" />
        {formatDateRange()}
      </Button>
      {show && (
        <div className="absolute z-50 mt-2 bg-background rounded-lg shadow-lg p-4 min-w-[650px] right-0">
          <div className="space-y-4">
            {/* Date Pickers in Same Row */}
            <div className="flex gap-6">
              {/* Start Date Section */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                  Start Date
                </label>
                <DayPicker
                  mode="single"
                  selected={tempStartDate}
                  onSelect={handleStartDateChange}
                  className="custom-day-picker"
                />
              </div>
              
              {/* End Date Section */}
              <div className="flex-1">
                <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                  End Date
                </label>
                <DayPicker
                  mode="single"
                  selected={tempEndDate}
                  onSelect={handleEndDateChange}
                  disabled={!tempStartDate ? [] : { before: tempStartDate }}
                  className="custom-day-picker"
                />
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex gap-3 pt-3 border-t border-gray-200 justify-center">
              <Button
                type="button"
                onClick={handleClear}
                variant="secondary"
                className="px-6 py-2 text-sm"
              >
                Clear
              </Button>
              <Button
                type="button"
                onClick={handleCancel}
                variant="secondary"
                className="px-6 py-2 text-sm"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleApply}
                variant="primary"
                className="px-6 py-2 text-sm bg-purple-500 hover:bg-purple-600"
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
