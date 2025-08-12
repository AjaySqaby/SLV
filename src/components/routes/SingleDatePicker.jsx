"use client";
import { useState, useRef, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { Calendar } from "lucide-react";
import Button from "@/components/ui/Button";

const customStyles = `
  .single-date-picker .rdp-day_selected,
  .single-date-picker .rdp-day_selected:focus,
  .single-date-picker .rdp-day_selected:hover,
  .single-date-picker .rdp-day_selected:active {
    background-color: #8b5cf6 !important;
    color: white !important;
    font-weight: bold !important;
    border-radius: 50% !important;
  }
  .single-date-picker .rdp-day {
    border-radius: 50% !important;
  }
`;

export default function SingleDatePicker({ selected, onSelect }) {
  const [show, setShow] = useState(false);
  const [tempDate, setTempDate] = useState(selected);
  const ref = useRef();

  // Close calendar if clicked outside
  function handleClickOutside(e) {
    if (ref.current && !ref.current.contains(e.target)) {
      setShow(false);
    }
  }
  
  // Attach/detach event
  useEffect(() => {
    if (show) document.addEventListener("mousedown", handleClickOutside);
    else document.removeEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [show]);

  // Update temp values when props change
  useEffect(() => {
    setTempDate(selected);
  }, [selected]);

  const handleDateChange = (date) => {
    setTempDate(date);
  };

  const handleClear = () => {
    setTempDate(null);
    onSelect(null);
    setShow(false);
  };

  const handleCancel = () => {
    setTempDate(selected);
    setShow(false);
  };

  const handleApply = () => {
    onSelect(tempDate);
    setShow(false);
  };

  const formatDate = () => {
    if (selected) {
      return selected.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    }
    return "Select date";
  };

  return (
    <div className="w-full relative" ref={ref}>
      <style>{customStyles}</style>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Select Date
      </label>
      <Button
        type="button"
        className={`w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg py-2 px-4 flex items-center gap-2 focus:outline-none`}
        onClick={() => setShow((v) => !v)}
      >
        <Calendar className="h-5 w-5" />
        {formatDate()}
      </Button>
      {show && (
        <div className="absolute z-50 mt-2 bg-white rounded-lg shadow-lg p-4 min-w-[300px] right-0">
          <div className="space-y-4">
            {/* Single Date Picker */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Date
              </label>
              <DayPicker
                mode="single"
                selected={tempDate}
                onSelect={handleDateChange}
                className="single-date-picker"
                defaultMonth={tempDate || new Date()}
              />
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
                className="px-6 py-2 text-sm bg-purple-600 hover:bg-purple-700"
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
