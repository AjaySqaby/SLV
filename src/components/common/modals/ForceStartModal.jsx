"use client";

import { useState } from "react";
import { X, Play, Clock, User, Star } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function ForceStartModal({ isOpen, onClose, rideId, onConfirm }) {
  const [forceStartTime, setForceStartTime] = useState("");
  const [forceStartReason, setForceStartReason] = useState("");

  const handleSubmit = () => {
    onConfirm({
      rideId,
      forceStartTime,
      reason: forceStartReason
    });
    setForceStartTime("");
    setForceStartReason("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--green-600)' }}>
              <Play className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--heading)' }}>Force Start Ride</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Admin Override Warning */}
        <div className="p-4 rounded-lg border mb-6" style={{ backgroundColor: 'var(--amber-100)', borderColor: 'var(--amber-500)' }}>
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: 'var(--amber-500)' }}>
              <span className="text-white text-sm">!</span>
            </div>
            <div>
              <h3 className="font-bold mb-2" style={{ color: 'var(--heading)' }}>Admin Override Action</h3>
              <p className="text-sm mb-3" style={{ color: 'var(--muted-text)' }}>
                This function allows dispatch/admins to override the driver app in case it fails. Use this when the driver app is not responding or has technical issues.
              </p>
              <p className="font-bold text-sm mb-2" style={{ color: 'var(--heading)' }}>What this does:</p>
              <ul className="text-sm space-y-1" style={{ color: 'var(--muted-text)' }}>
                <li>• Manually marks ride #{rideId} as started</li>
                <li>• Uses the assigned driver for this ride</li>
                <li>• Bypasses normal driver app check-in process</li>
                <li>• Logs the override action with reason for tracking</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Assigned Driver & Vehicle */}
        <div className="mb-6">
          <h3 className="font-bold mb-3" style={{ color: 'var(--heading)' }}>Assigned Driver & Vehicle</h3>
          <div className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--gray-50)', borderColor: 'var(--gray-200)' }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--blue-100)' }}>
                <User className="w-6 h-6" style={{ color: 'var(--blue-600)' }} />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <button className="font-bold hover:underline cursor-pointer" style={{ color: 'var(--blue-600)' }}>
                    Lily Tsegaye
                  </button>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4" style={{ color: 'var(--amber-500)' }} />
                    <span className="text-sm font-medium" style={{ color: 'var(--heading)' }}>4.96</span>
                  </div>
                </div>
                <p className="text-sm" style={{ color: 'var(--muted-text)' }}>
                  2023 Tesla Model Y • JN1BJ1CWXLW641964
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Force Start Time */}
        <div className="mb-6">
          <Input
            type="time"
            label="Force Start Time"
            value={forceStartTime}
            onChange={(e) => setForceStartTime(e.target.value)}
            icon={<Clock className="w-4 h-4" style={{ color: 'var(--muted-text)' }} />}
            className="text-sm"
            width="w-full"
            placeholder="--:--"
          />
          <p className="text-xs mt-2" style={{ color: 'var(--muted-text)' }}>
            Set the time when the ride should be marked as started
          </p>
        </div>

        {/* Reason */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2" style={{ color: 'var(--heading)' }}>
            Reason (Optional)
          </label>
          <textarea
            value={forceStartReason}
            onChange={(e) => setForceStartReason(e.target.value)}
            placeholder="Enter reason for force start..."
            rows={3}
            className="w-full px-4 py-3 rounded-lg border text-sm resize-none"
            style={{ borderColor: 'var(--gray-200)', backgroundColor: 'var(--surface-bg)', color: 'var(--heading)' }}
          />
          <p className="text-xs mt-2" style={{ color: 'var(--muted-text)' }}>
            Provide details about why this override was necessary (e.g., "Driver app not responding", "Technical issues with device")
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3">
          <Button variant="secondary" onClick={onClose} className="px-6 py-2">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="px-6 py-2" style={{ backgroundColor: 'var(--green-600)', color: 'var(--on-success)' }}>
            Force Start Ride
          </Button>
        </div>
      </div>
    </div>
  );
}
