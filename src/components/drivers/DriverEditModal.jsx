"use client";

import { useState, useEffect } from "react";
import { X, Edit } from "lucide-react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

export default function DriverEditModal({ isOpen, onClose, initialData = {}, onSave }) {
  const [name, setName] = useState(initialData.name || "");
  const [phone, setPhone] = useState(initialData.phone || "");
  const [email, setEmail] = useState(initialData.email || "");
  const [address, setAddress] = useState(initialData.address || "");
  const [license, setLicense] = useState(initialData.license || "");
  const [licenseExpires, setLicenseExpires] = useState(initialData.licenseExpires || "");
  const [vehicleMakeModel, setVehicleMakeModel] = useState(initialData.vehicleMakeModel || initialData.vehicle || "");
  const [licensePlate, setLicensePlate] = useState(initialData.licensePlate || "");
  const [vehicleType, setVehicleType] = useState(initialData.vehicleType || "");
  const [color, setColor] = useState(initialData.color || "");
  const [status, setStatus] = useState(initialData.status || "Active");

  // Sync fields when opening with a new driver
  useEffect(() => {
    if (!isOpen) return;
    setName(initialData.name || "");
    setPhone(initialData.phone || "");
    setEmail(initialData.email || "");
    setAddress(initialData.address || "");
    setLicense(initialData.license || "");
    setLicenseExpires(initialData.licenseExpires || "");
    setVehicleMakeModel(initialData.vehicleMakeModel || initialData.vehicle || "");
    setLicensePlate(initialData.licensePlate || "");
    setVehicleType(initialData.vehicleType || "");
    setColor(initialData.color || "");
    setStatus(initialData.status || "Active");
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const vehicleTypeOptions = [
    { value: "", label: "Select type" },
    { value: "Sedan", label: "Sedan" },
    { value: "Minivan", label: "Minivan" },
    { value: "SUV", label: "SUV" },
    { value: "Van", label: "Van" }
  ];

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
    { value: "On Leave", label: "On Leave" },
    { value: "Pending", label: "Pending" }
  ];

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    onSave?.({
      name,
      phone,
      email,
      address,
      license,
      licenseExpires,
      vehicleMakeModel,
      licensePlate,
      vehicleType,
      color,
      status
    });
    onClose?.();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-start justify-center z-[9999] pt-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl !max-w-[82rem] mx-4 w-full h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--gray-200)' }}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--blue-600)' }}>
              <Edit className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--heading)' }}>Edit Driver</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <form id="driver-edit-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-8 pb-6">
            {/* Basic Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Full Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Driver name" />
              <Input label="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(404) 555-1001" />
              <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@example.com" />
            </div>

            {/* Address */}
            <Input label="Address" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Street, City, State, ZIP" />

            {/* License */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="License #" value={license} onChange={(e) => setLicense(e.target.value)} placeholder="GA-XXXX-XXXX" />
              <Input label="License Expires" type="date" value={licenseExpires} onChange={(e) => setLicenseExpires(e.target.value)} />
              <Select label="Status" options={statusOptions} value={status} onChange={(e) => setStatus(e.target.value)} />
            </div>

            {/* Vehicle */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input label="Make/Model" value={vehicleMakeModel} onChange={(e) => setVehicleMakeModel(e.target.value)} placeholder="Chrysler Pacifica (2022)" />
              <Input label="License Plate" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} placeholder="RT-30842" />
              <Select label="Vehicle Type" options={vehicleTypeOptions} value={vehicleType} onChange={(e) => setVehicleType(e.target.value)} />
              <Input label="Color" value={color} onChange={(e) => setColor(e.target.value)} placeholder="Silver" />
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-[var(--gray-200)] bg-white">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button form="driver-edit-form" type="submit" className="px-6 py-2" style={{ backgroundColor: 'var(--blue-600)', color: 'var(--on-primary)' }}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
