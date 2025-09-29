"use client";
import { useState } from "react";
import { X, ChevronDown } from "lucide-react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";

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
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-xl w-[95vw] h-[90vh] max-w-7xl mx-4 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-[var(--gray-200)]">
          <div>
            <h2 className="text-xl font-bold text-[var(--primary-black)]">Automatic Ride Generation</h2>
            <p className="text-sm text-[var(--muted-text)] mt-1">Generate rides automatically based on active routes.</p>
          </div>
          <button
            onClick={onClose}
            className="text-[var(--gray-400)] hover:text-[var(--gray-600)] transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 pb-24">
          {/* Generation Frequency */}
          <div>
            <label className="block text-sm font-medium text-[var(--primary-black)] mb-2">
              Generation Frequency
            </label>
            <Select
              value={generationFrequency}
              onChange={setGenerationFrequency}
              options={frequencyOptions.map(option => ({
                value: option,
                label: option
              }))}
            />
          </div>

          {/* Starting Period */}
          <div>
            <label className="block text-sm font-medium text-[var(--primary-black)] mb-2">
              Starting Period
            </label>
            <div className="relative">
              <Input
                type="text"
                value={formatDate(selectedDate)}
                onClick={() => setShowCalendar(!showCalendar)}
                readOnly
                className="cursor-pointer"
              />
              
              {showCalendar && (
                <div className="absolute z-10 mt-1 bg-white border border-[var(--gray-200)] rounded-lg shadow-lg p-4">
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
          <div className="bg-[var(--gray-50)] border border-[var(--gray-200)] rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-200">
            <h3 className="font-medium text-[var(--primary-black)] mb-3">Summary</h3>
            <div className="space-y-2 text-sm text-[var(--muted-text)]">
              <div>Period: {formatPeriod()}</div>
              <div>Active Routes: {activeRoutes}</div>
              <div>Estimated Rides: ~{estimatedRides}</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[var(--gray-200)] p-6">
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={onClose}
              className="px-4 py-2"
            >
              Cancel
            </Button>
            <Button
              className="px-4 py-2 bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white"
              onClick={handleGenerateRides}
            >
              Generate Rides
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
