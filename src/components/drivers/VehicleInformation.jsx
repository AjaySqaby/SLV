"use client";
import { useState } from "react";
import { RiCarLine, RiAddLine, RiCheckLine, RiArrowLeftLine, RiCloseLine } from "react-icons/ri";
import Button from "@/components/ui/Button";
import BaseModal from "@/components/common/BaseModal";

export default function VehicleInformation({ driverData }) {
  const { vehicle } = driverData;
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
          <span className="w-1 h-6 bg-[var(--green-600)] rounded-full"></span>
          Vehicle Information
        </h2>
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[var(--green-100)] text-[var(--green-600)] gap-1">
            <RiCheckLine className="w-3 h-3" />
            Default Vehicle
          </span>
        </div>
      </div>
      
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Vehicle */}
          <button className="text-center p-4 bg-[var(--blue-100)] rounded-lg hover:opacity-90 transition" onClick={() => setOpen(true)}>
            <RiCarLine className="w-6 h-6 text-[var(--blue-500)] mx-auto mb-2" />
            <h3 className="text-sm font-medium text-gray-500 mb-1">Vehicle</h3>
            <p className="text-sm font-semibold text-gray-900">{vehicle.make} ({vehicle.year})</p>
          </button>

          {/* License Plate */}
          <div className="text-center p-4 bg-[var(--green-100)] rounded-lg">
            <div className="w-6 h-6 bg-gray-800 text-white text-xs font-bold mx-auto mb-2 rounded flex items-center justify-center">
              {vehicle.licensePlate.split('-')[0]}
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">License Plate</h3>
            <p className="text-sm font-semibold text-gray-900">{vehicle.licensePlate}</p>
          </div>

          {/* Type */}
          <div className="text-center p-4 bg-[var(--purple-100)] rounded-lg">
            <div className="w-6 h-6 bg-[var(--purple-600)] text-white text-xs font-bold mx-auto mb-2 rounded flex items-center justify-center">
              {vehicle.type.charAt(0)}
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Type</h3>
            <p className="text-sm font-semibold text-gray-900">{vehicle.type}</p>
          </div>

          {/* Color */}
          <div className="text-center p-4 bg-[var(--amber-100)] rounded-lg">
            <div className="w-6 h-6 bg-gray-300 border-2 border-gray-400 mx-auto mb-2 rounded"></div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Color</h3>
            <p className="text-sm font-semibold text-gray-900">{vehicle.color}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <Button variant="secondary" className="flex items-center gap-2">
          <RiAddLine className="w-4 h-4" />
          Add Another Vehicle
        </Button>
      </div>

      {/* Vehicle Detail Modal (unified size via BaseModal) */}
      <BaseModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onBack={() => setOpen(false)}
        title="Vehicle Details"
        size="xl"
        widthClass="w-[95vw] h-[90vh] max-w-7xl mx-4 overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded border" style={{ borderColor: 'var(--gray-200)' }}>
            <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--heading)' }}>Vehicle Overview</h4>
            <div className="space-y-1 text-sm">
              <div>Make/Model: {vehicle.make}</div>
              <div>Year: {vehicle.year}</div>
              <div>Type: {vehicle.type}</div>
              <div>Color: {vehicle.color}</div>
              <div>License Plate: {vehicle.licensePlate}</div>
            </div>
          </div>
          <div className="p-4 rounded border" style={{ borderColor: 'var(--gray-200)' }}>
            <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--heading)' }}>Documents</h4>
            <p className="text-sm" style={{ color: 'var(--muted-text)' }}>Insurance, Registration and Inspection details will appear here.</p>
          </div>
        </div>
      </BaseModal>
    </div>
  );
}
