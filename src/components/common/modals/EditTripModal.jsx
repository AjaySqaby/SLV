"use client";

import { useState } from "react";
import { X, Edit } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function EditTripModal({ isOpen, onClose, rideId, onConfirm, initialData = {} }) {
  const [editPickupAddress, setEditPickupAddress] = useState(initialData.pickupAddress || "");
  const [editDropoffAddress, setEditDropoffAddress] = useState(initialData.dropoffAddress || "");
  const [editPickupTime, setEditPickupTime] = useState(initialData.pickupTime || "");
  const [editDropoffTime, setEditDropoffTime] = useState(initialData.dropoffTime || "");

  const handleSubmit = () => {
    onConfirm({
      rideId,
      pickupAddress: editPickupAddress,
      dropoffAddress: editDropoffAddress,
      pickupTime: editPickupTime,
      dropoffTime: editDropoffTime
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl p-6 w-[82rem] mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--blue-600)' }}>
              <Edit className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--heading)' }}>Edit Trip</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Edit Form */}
        <div className="space-y-6">
          {/* Pickup Address */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--heading)' }}>
              Pickup Address
            </label>
            <Input
              type="text"
              value={editPickupAddress}
              onChange={(e) => setEditPickupAddress(e.target.value)}
              placeholder="Enter pickup address"
              className="text-sm"
              width="w-full"
            />
          </div>

          {/* Dropoff Address */}
          <div>
            <label className="block text-sm font-medium mb-2" style={{ color: 'var(--heading)' }}>
              Dropoff Address
            </label>
            <Input
              type="text"
              value={editDropoffAddress}
              onChange={(e) => setEditDropoffAddress(e.target.value)}
              placeholder="Enter dropoff address"
              className="text-sm"
              width="w-full"
            />
          </div>

          {/* Time Fields */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--heading)' }}>
                Pickup Time
              </label>
              <Input
                type="time"
                value={editPickupTime}
                onChange={(e) => setEditPickupTime(e.target.value)}
                className="text-sm"
                width="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--heading)' }}>
                Dropoff Time
              </label>
              <Input
                type="time"
                value={editDropoffTime}
                onChange={(e) => setEditDropoffTime(e.target.value)}
                className="text-sm"
                width="w-full"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 mt-8">
          <Button variant="secondary" onClick={onClose} className="px-6 py-2">
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="px-6 py-2" style={{ backgroundColor: 'var(--blue-600)', color: 'var(--on-primary)' }}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
