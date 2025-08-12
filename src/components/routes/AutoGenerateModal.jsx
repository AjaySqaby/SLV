"use client";
import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Button from "@/components/ui/Button";

const customStyles = `
  .auto-generate-picker .rdp-day_selected,
  .auto-generate-picker .rdp-day_selected:focus,
  .auto-generate-picker .rdp-day_selected:hover,
  .auto-generate-picker .rdp-day_selected:active {
    background-color: #8b5cf6 !important;
    color: white !important;
    font-weight: bold !important;
    border-radius: 50% !important;
  }
  .auto-generate-picker .rdp-day {
    border-radius: 50% !important;
  }
`;

export default function AutoGenerateModal({ isOpen, onClose }) {
  const [generationFrequency, setGenerationFrequency] = useState("Weekly");
  const [selectedDate, setSelectedDate] = useState(new Date(2025, 7, 12)); // August 12, 2025
  const [showCalendar, setShowCalendar] = useState(false);

  if (!isOpen) return null;

  const frequencyOptions = ["Daily", "Weekly", "Monthly", "Custom"];

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  const formatPeriod = () => {
    const start = new Date(selectedDate);
    const end = new Date(start);
    end.setDate(start.getDate() + 4); // 5 days period (Aug 12 - Aug 16)
    
    return `${formatDate(start)} - ${formatDate(end)}`;
  };

  const handleGenerateRides = () => {
    console.log("Generating rides with frequency:", generationFrequency, "starting from:", selectedDate);
    onClose();
  };

  // Calculate estimated rides (3 active routes × 5 days = 15 rides)
  const estimatedRides = 15;
  const activeRoutes = 3;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Automatic Ride Generation</h2>
            <p className="text-sm text-gray-600 mt-1">Generate rides automatically based on active routes.</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Generation Frequency */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Generation Frequency
            </label>
            <div className="relative">
              <select
                value={generationFrequency}
                onChange={(e) => setGenerationFrequency(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none bg-white"
              >
                {frequencyOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
            </div>
          </div>

          {/* Starting Period */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Starting Period
            </label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowCalendar(!showCalendar)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-left focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
              >
                {formatDate(selectedDate)}
              </button>
              
              {showCalendar && (
                <div className="absolute z-10 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg p-4">
                  <style>{customStyles}</style>
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      setSelectedDate(date);
                      setShowCalendar(false);
                    }}
                    className="auto-generate-picker"
                    defaultMonth={selectedDate}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h3 className="font-medium text-gray-900 mb-3">Summary</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <div>Period: {formatPeriod()}</div>
              <div>Active Routes: {activeRoutes}</div>
              <div>Estimated Rides: ~{estimatedRides}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <Button
            variant="secondary"
            onClick={onClose}
            className="px-4 py-2"
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleGenerateRides}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700"
          >
            Generate Rides
          </Button>
        </div>
      </div>
    </div>
  );
}
