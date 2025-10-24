"use client";

import { useState } from "react";
import { X, Settings, Eye, User, Car, Star } from "lucide-react";
import Button from "@/components/ui/Button";

export default function ManageTripModal({ isOpen, onClose, rideId, onConfirm }) {
  const [driverAssignment, setDriverAssignment] = useState('keep-current');
  const [vehicleAssignment, setVehicleAssignment] = useState('keep-current');

  const handleSubmit = () => {
    onConfirm({
      rideId,
      driverAssignment,
      vehicleAssignment
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] backdrop-blur-sm p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl p-8 w-full max-w-6xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-8 sticky top-0 bg-white z-10 pb-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg" style={{ backgroundColor: 'var(--blue-600)' }}>
              <Settings className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--heading)' }}>Trip Assignment Manager</h2>
              <p className="text-base mt-1" style={{ color: 'var(--muted-text)' }}>
                Ride #{rideId} • Thu September 11, 2025
              </p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="px-4 py-2 text-sm rounded-full font-semibold shadow-sm" style={{ backgroundColor: 'var(--green-100)', color: 'var(--green-600)', border: '1px solid var(--green-600)' }}>
              accepted
            </span>
            <button onClick={onClose} className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Three Column Layout */}
        <div className="grid grid-cols-3 gap-8 mb-8">
          {/* Current Assignments */}
          <div className="p-8 rounded-2xl shadow-sm" style={{ backgroundColor: 'var(--light-blue-bg)', border: '2px solid var(--blue-100)' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--blue-600)' }}>
                <Eye className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-xl" style={{ color: 'var(--heading)' }}>Current Assignments</h3>
            </div>

            {/* Current Driver */}
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-md overflow-hidden" style={{ backgroundColor: 'var(--blue-100)' }}>
                  <User className="w-8 h-8" style={{ color: 'var(--blue-600)' }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <button className="font-bold text-lg hover:underline cursor-pointer" style={{ color: 'var(--blue-600)' }}>
                      Lily Tsegaye
                    </button>
                  </div>
                  <p className="text-base mb-2" style={{ color: 'var(--muted-text)' }}>Current driver</p>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" style={{ color: 'var(--amber-500)' }} />
                    <span className="text-base font-semibold" style={{ color: 'var(--heading)' }}>4.96 rating</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Current Vehicle */}
            <div>
              <div className="flex items-center gap-4 mb-3">
                <div className="w-16 h-16 rounded-full flex items-center justify-center shadow-md" style={{ backgroundColor: 'var(--gray-100)' }}>
                  <Car className="w-8 h-8" style={{ color: 'var(--blue-600)' }} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold text-lg" style={{ color: 'var(--heading)' }}>JN1BJ1CWXLW641964</h4>
                  </div>
                  <p className="text-base mb-1" style={{ color: 'var(--muted-text)' }}>Model Y</p>
                  <p className="text-base" style={{ color: 'var(--muted-text)' }}>Current assignment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Driver Assignment */}
          <div className="p-8 rounded-2xl shadow-sm" style={{ backgroundColor: 'var(--green-100)', border: '2px solid var(--green-600)' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--green-600)' }}>
                <User className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-xl" style={{ color: 'var(--heading)' }}>Driver Assignment</h3>
            </div>

            <div className="space-y-4 mb-6">
              <label className="flex items-center gap-4 cursor-pointer p-3 rounded-lg hover:bg-white hover:bg-opacity-50 transition-colors">
                <input
                  type="radio"
                  name="driverAssignment"
                  value="keep-current"
                  checked={driverAssignment === 'keep-current'}
                  onChange={(e) => setDriverAssignment(e.target.value)}
                  className="w-5 h-5"
                  style={{ accentColor: 'var(--green-600)' }}
                />
                <span className="text-base font-semibold" style={{ color: 'var(--heading)' }}>Keep Current Driver</span>
              </label>

              <label className="flex items-center gap-4 cursor-pointer p-3 rounded-lg hover:bg-white hover:bg-opacity-50 transition-colors">
                <input
                  type="radio"
                  name="driverAssignment"
                  value="assign-new"
                  checked={driverAssignment === 'assign-new'}
                  onChange={(e) => setDriverAssignment(e.target.value)}
                  className="w-5 h-5"
                  style={{ accentColor: 'var(--green-600)' }}
                />
                <span className="text-base font-semibold" style={{ color: 'var(--heading)' }}>Assign New Driver</span>
              </label>

              <label className="flex items-center gap-4 cursor-pointer p-3 rounded-lg hover:bg-white hover:bg-opacity-50 transition-colors">
                <input
                  type="radio"
                  name="driverAssignment"
                  value="unassign"
                  checked={driverAssignment === 'unassign'}
                  onChange={(e) => setDriverAssignment(e.target.value)}
                  className="w-5 h-5"
                  style={{ accentColor: 'var(--green-600)' }}
                />
                <span className="text-base font-semibold" style={{ color: 'var(--heading)' }}>Unassign Driver</span>
              </label>
            </div>
          </div>

          {/* Vehicle Assignment */}
          <div className="p-8 rounded-2xl shadow-sm" style={{ backgroundColor: 'var(--primary-bg)', border: '2px solid var(--primary)' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--primary)' }}>
                <Car className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-bold text-xl" style={{ color: 'var(--heading)' }}>Vehicle Assignment</h3>
            </div>

            <div className="space-y-4">
              <label className="flex items-center gap-4 cursor-pointer p-3 rounded-lg hover:bg-white hover:bg-opacity-50 transition-colors">
                <input
                  type="radio"
                  name="vehicleAssignment"
                  value="keep-current"
                  checked={vehicleAssignment === 'keep-current'}
                  onChange={(e) => setVehicleAssignment(e.target.value)}
                  className="w-5 h-5"
                  style={{ accentColor: 'var(--primary)' }}
                />
                <span className="text-base font-semibold" style={{ color: 'var(--heading)' }}>Keep Current Vehicle</span>
              </label>

              <label className="flex items-center gap-4 cursor-pointer p-3 rounded-lg hover:bg-white hover:bg-opacity-50 transition-colors">
                <input
                  type="radio"
                  name="vehicleAssignment"
                  value="assign-new"
                  checked={vehicleAssignment === 'assign-new'}
                  onChange={(e) => setVehicleAssignment(e.target.value)}
                  className="w-5 h-5"
                  style={{ accentColor: 'var(--primary)' }}
                />
                <span className="text-base font-semibold" style={{ color: 'var(--heading)' }}>Assign New Vehicle</span>
              </label>

              <label className="flex items-center gap-4 cursor-pointer p-3 rounded-lg hover:bg-white hover:bg-opacity-50 transition-colors">
                <input
                  type="radio"
                  name="vehicleAssignment"
                  value="unassign"
                  checked={vehicleAssignment === 'unassign'}
                  onChange={(e) => setVehicleAssignment(e.target.value)}
                  className="w-5 h-5"
                  style={{ accentColor: 'var(--primary)' }}
                />
                <span className="text-base font-semibold" style={{ color: 'var(--heading)' }}>Unassign Vehicle</span>
              </label>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-6 border-t sticky bottom-0 bg-white z-10" style={{ borderColor: 'var(--gray-200)' }}>
          <Button
            variant="secondary"
            onClick={onClose}
            className="px-8 py-3 text-base font-semibold rounded-xl shadow-sm"
            style={{ backgroundColor: 'var(--gray-100)', color: 'var(--heading)', border: '2px solid var(--gray-200)' }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="px-8 py-3 text-base font-semibold rounded-xl shadow-lg"
            style={{ backgroundColor: 'var(--green-600)', color: 'var(--on-success)', border: '2px solid var(--green-600)' }}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
