"use client";

import { useState } from "react";
import { X, Copy, Calendar, Clock } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function DuplicateModal({ isOpen, onClose, rideId, onConfirm }) {
  const [duplicateTripDate, setDuplicateTripDate] = useState("");
  const [duplicateTripTime, setDuplicateTripTime] = useState("");

  const handleSubmit = () => {
    onConfirm({
      rideId,
      newDate: duplicateTripDate,
      newTime: duplicateTripTime
    });
    setDuplicateTripDate("");
    setDuplicateTripTime("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl p-6 w-full max-w-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--blue-600)' }}>
              <Copy className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--heading)' }}>Duplicate Trip</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main Description */}
        <div className="mb-6">
          <p className="text-sm" style={{ color: 'var(--muted-text)' }}>
            Create a copy of ride #{rideId} with the same route, stops, and students.
          </p>
        </div>

        {/* New Trip Date */}
        <div className="mb-4">
          <Input
            type="date"
            label="New Trip Date"
            value={duplicateTripDate}
            onChange={(e) => setDuplicateTripDate(e.target.value)}
            icon={<Calendar className="w-4 h-4" style={{ color: 'var(--muted-text)' }} />}
            className="text-sm"
            width="w-full"
          />
        </div>

        {/* New Trip Time */}
        <div className="mb-6">
          <Input
            type="time"
            label="New Trip Time"
            value={duplicateTripTime}
            onChange={(e) => setDuplicateTripTime(e.target.value)}
            icon={<Clock className="w-4 h-4" style={{ color: 'var(--muted-text)' }} />}
            className="text-sm"
            width="w-full"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          <Button variant="secondary" onClick={onClose} className="px-6 py-2">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="px-6 py-2" style={{ backgroundColor: 'var(--blue-600)', color: 'var(--on-primary)' }}>
            Create Duplicate
          </Button>
        </div>
      </div>
    </div>
  );
}
