"use client";
import { useState } from "react";
import { X, Users, MapPin } from "lucide-react";
import Button from "@/components/ui/Button";
import SingleDatePicker from "./SingleDatePicker";

export default function ScheduleRideModal({ isOpen, onClose, route }) {
  const [selectedDate, setSelectedDate] = useState(null);

  if (!isOpen || !route) return null;

  const handleSchedule = () => {
    // Schedule logic here
    console.log("Scheduling ride for route:", route.id, "on date:", selectedDate);
    onClose();
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Schedule Ride</h2>
            <p className="text-sm text-gray-600 mt-1">Create a ride based on the selected route.</p>
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
          {/* Route Information */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 text-lg">{route.name}</h3>
            <p className="text-sm text-gray-600">Route ID: {route.id}</p>
          </div>

          {/* Date Selection */}
          <div className="mb-6">
            <SingleDatePicker
              selected={selectedDate}
              onSelect={handleDateSelect}
            />
          </div>

          {/* Route Details */}
          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Users size={16} />
              <span>{route.students} students</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={16} />
              <span>{route.stops} stops, {route.distance}</span>
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
            onClick={handleSchedule}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700"
          >
            Schedule Ride
          </Button>
        </div>
      </div>
    </div>
  );
}
