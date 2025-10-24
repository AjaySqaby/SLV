"use client";

import { X, UserX } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ForceNoShowModal({ isOpen, onClose, rideId, onConfirm }) {
  const handleSubmit = () => {
    onConfirm({ rideId });
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
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--red-600)' }}>
              <UserX className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--heading)' }}>Mark as No Show</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Main Description */}
        <div className="mb-6">
          <p className="text-sm" style={{ color: 'var(--muted-text)' }}>
            This will mark ride #{rideId} as a no-show, indicating the driver did not appear for the scheduled trip.
          </p>
        </div>

        {/* Warning Section */}
        <div className="p-4 rounded-lg border mb-6" style={{ backgroundColor: 'var(--red-100)', borderColor: 'var(--red-600)' }}>
          <h3 className="font-bold mb-2" style={{ color: 'var(--red-600)' }}>Warning</h3>
          <p className="text-sm" style={{ color: 'var(--red-600)' }}>
            This action will notify parents and may trigger automatic rescheduling procedures.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          <Button variant="secondary" onClick={onClose} className="px-6 py-2">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="px-6 py-2" style={{ backgroundColor: 'var(--red-600)', color: 'var(--on-danger)' }}>
            Mark No Show
          </Button>
        </div>
      </div>
    </div>
  );
}
