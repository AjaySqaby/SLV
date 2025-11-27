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

export default function DateRangePicker({ startDate, endDate, onDateRangeChange, selected, onSelect, label, ...props }) {
  // Support both APIs: selected/onSelect (simple) and startDate/endDate/onDateRangeChange (range)
  const isSimpleMode = selected !== undefined || onSelect !== undefined;
  const actualStartDate = isSimpleMode ? selected : startDate;
  const actualEndDate = isSimpleMode ? null : endDate;
  
  const handleDateRangeChange = (start, end) => {
    if (isSimpleMode && onSelect) {
      onSelect(start);
    } else if (onDateRangeChange) {
      onDateRangeChange(start, end);
    }
  };
  const [show, setShow] = useState(false);
  const [tempStartDate, setTempStartDate] = useState(actualStartDate);
  const [tempEndDate, setTempEndDate] = useState(actualEndDate);
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
    setTempStartDate(actualStartDate);
    setTempEndDate(actualEndDate);
  }, [actualStartDate, actualEndDate]);

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
    handleDateRangeChange(null, null);
    setShow(false);
  };

  const handleCancel = () => {
    setTempStartDate(actualStartDate);
    setTempEndDate(actualEndDate);
    setShow(false);
  };

  const handleApply = () => {
    handleDateRangeChange(tempStartDate, tempEndDate);
    setShow(false);
  };

  const formatDateRange = () => {
    if (actualStartDate && actualEndDate) {
      return `${actualStartDate.toLocaleDateString()} - ${actualEndDate.toLocaleDateString()}`;
    } else if (actualStartDate) {
      return `${actualStartDate.toLocaleDateString()} - Select end date`;
    } else if (actualEndDate) {
      return `Select start date - ${actualEndDate.toLocaleDateString()}`;
    }
    return "Select date range";
  };

  const buttonElement = (
    <div className="w-full relative" ref={ref}>
      <style>{customStyles}</style>
      <Button
        type="button"
        className={`w-full bg-white border border-gray-300 font-normal rounded-lg py-2 px-4 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-purple-400 ${
          actualStartDate || actualEndDate ? "text-gray-900" : "text-gray-500"
        }`}
        onClick={() => setShow((v) => !v)}
      >
        <Calendar className="h-5 w-5 text-gray-400" />
        <span className="flex-1 text-left">{formatDateRange()}</span>
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

  if (label) {
    return (
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        {buttonElement}
      </div>
    );
  }

  return buttonElement;
}
