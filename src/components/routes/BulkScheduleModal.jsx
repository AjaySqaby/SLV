"use client";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function BulkScheduleModal({ isOpen, onClose }) {
  const [selectedWeek, setSelectedWeek] = useState(new Date());

  if (!isOpen) return null;

  // Calculate week start and end dates
  const getWeekDates = (date) => {
    const start = new Date(date);
    start.setDate(start.getDate() - start.getDay()); // Start of week (Sunday)
    
    const end = new Date(start);
    end.setDate(start.getDate() + 6); // End of week (Saturday)
    
    return { start, end };
  };

  const { start, end } = getWeekDates(selectedWeek);

  const formatWeekRange = () => {
    const startStr = start.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric' 
    });
    const endStr = end.toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    });
    return `Week of ${startStr} - ${endStr}`;
  };

  const goToPreviousWeek = () => {
    const newDate = new Date(selectedWeek);
    newDate.setDate(newDate.getDate() - 7);
    setSelectedWeek(newDate);
  };

  const goToNextWeek = () => {
    const newDate = new Date(selectedWeek);
    newDate.setDate(newDate.getDate() + 7);
    setSelectedWeek(newDate);
  };

  const handleScheduleAllRoutes = () => {
    console.log("Scheduling all routes for week:", formatWeekRange());
    onClose();
  };

  // Count active routes (for demo purposes)
  const activeRoutesCount = 3;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Bulk Schedule Rides</h2>
            <p className="text-sm text-gray-600 mt-1">Create rides for all active routes for the selected week.</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Week Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-900 mb-3">
              Select Week
            </label>
            
            {/* Navigation Buttons */}
            <div className="flex gap-2 mb-4">
              <Button
                variant="secondary"
                onClick={goToPreviousWeek}
                className="flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50"
              >
                <ChevronLeft size={16} />
                Previous Week
              </Button>
              <Button
                variant="secondary"
                onClick={goToNextWeek}
                className="flex items-center gap-2 border border-gray-300 bg-white hover:bg-gray-50"
              >
                Next Week
                <ChevronRight size={16} />
              </Button>
            </div>

            {/* Current Week Display */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <div className="font-semibold text-gray-900 text-lg">
                {formatWeekRange()}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                Will schedule {activeRoutesCount} active routes for this week
              </div>
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
            onClick={handleScheduleAllRoutes}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700"
          >
            Schedule All Routes
          </Button>
        </div>
      </div>
    </div>
  );
}
