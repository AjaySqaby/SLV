"use client";

import { useState } from "react";
import { X, Edit } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

export default function EditTripModal({ isOpen, onClose, rideId, onConfirm, initialData = {} }) {
  // Core fields
  const [editPickupAddress, setEditPickupAddress] = useState(initialData.pickupAddress || "");
  const [editDropoffAddress, setEditDropoffAddress] = useState(initialData.dropoffAddress || "");
  const [editPickupTime, setEditPickupTime] = useState(initialData.pickupTime || "");
  const [editDropoffTime, setEditDropoffTime] = useState(initialData.dropoffTime || "");

  // Extra fields (aligned with Add Ride)
  const [district, setDistrict] = useState(initialData.district || "");
  const [campus, setCampus] = useState(initialData.campus || "");
  const [driver, setDriver] = useState(initialData.driver || "");
  const [students, setStudents] = useState(initialData.students || "1");
  const [driverPayment, setDriverPayment] = useState(initialData.driverPayment || "");
  const [districtCharge, setDistrictCharge] = useState(initialData.districtCharge || "");

  const districtOptions = [
    { value: "", label: "Choose district" },
    { value: "oakland", label: "Oakland Unified School District" },
    { value: "atlanta", label: "Atlanta Public Schools" }
  ];

  const campusOptions = [
    { value: "", label: "Choose campus" },
    { value: "midtown", label: "Midtown High School" },
    { value: "buckhead", label: "Buckhead Elementary" },
    { value: "downtown", label: "Downtown High School" }
  ];

  const driverOptions = [
    { value: "", label: "Choose driver" },
    { value: "michael", label: "Michael Davis" },
    { value: "sophia", label: "Sophia Martinez" },
    { value: "william", label: "William Rodriguez" },
    { value: "maria", label: "Maria Sanchez" },
    { value: "carlos", label: "Carlos Mendez" }
  ];

  const studentOptions = [
    { value: "1", label: "1 Student" },
    { value: "2", label: "2 Students" },
    { value: "3", label: "3 Students" },
    { value: "4", label: "4 Students" },
    { value: "5+", label: "5+ Students" }
  ];

  const handleSubmit = (e) => {
    e?.preventDefault?.();
    onConfirm?.({
      rideId,
      pickupAddress: editPickupAddress,
      dropoffAddress: editDropoffAddress,
      pickupTime: editPickupTime,
      dropoffTime: editDropoffTime,
      district,
      campus,
      driver,
      students,
      driverPayment,
      districtCharge
    });
    onClose?.();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-start justify-center z-[9999] backdrop-blur-sm pt-6"
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
            <h2 className="text-xl font-bold" style={{ color: 'var(--heading)' }}>Edit Trip</h2>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <form id="edit-trip-form" onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-8 pb-6">
            {/* Top info row - District, Campus, Driver */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              <Select
                name="district"
                label="District"
                options={districtOptions}
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              />
              <Select
                name="campus"
                label="Campus"
                options={campusOptions}
                value={campus}
                onChange={(e) => setCampus(e.target.value)}
              />
              <Select
                name="driver"
                label="Driver"
                options={driverOptions}
                value={driver}
                onChange={(e) => setDriver(e.target.value)}
              />
            </div>

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            {/* Payment + Students */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Input
                type="number"
                name="driverPayment"
                label="Driver Payment ($)"
                value={driverPayment}
                onChange={(e) => setDriverPayment(e.target.value)}
                placeholder="Amount to pay driver"
              />
              <Input
                type="number"
                name="districtCharge"
                label="District Charge ($)"
                value={districtCharge}
                onChange={(e) => setDistrictCharge(e.target.value)}
                placeholder="Amount to charge district"
              />
              <Select
                name="students"
                label="Students"
                options={studentOptions}
                value={students}
                onChange={(e) => setStudents(e.target.value)}
              />
            </div>
          </div>
        </form>
        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-[var(--gray-200)] bg-white flex-shrink-0">
          <Button variant="secondary" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button form="edit-trip-form" type="submit" className="px-6 py-2" style={{ backgroundColor: 'var(--blue-600)', color: 'var(--on-primary)' }}>
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
