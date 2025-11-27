import React, { useState } from "react";
import { X } from "lucide-react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import DateRangePicker from "./DateRangePicker";

export default function AddRideModal({ open, onClose }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

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

  const routeOptions = [
    { value: "", label: "Select a route" },
    { value: "R5172", label: "R5172" },
    { value: "R5173", label: "R5173" },
    { value: "R5174", label: "R5174" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted");
    onClose();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-start justify-center z-[9000] pt-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl !max-w-[82rem] mx-4 w-full h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-[var(--gray-200)] flex-shrink-0">
          <h2 className="text-lg font-semibold">Add New Ride</h2>
          <button
            onClick={onClose}
            className="text-[var(--gray-400)] hover:text-[var(--gray-700)] text-2xl font-bold px-2 rounded-full focus:outline-none"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <form id="add-ride-form" onSubmit={handleSubmit} className="flex flex-col h-full">
            <div className="flex-1 p-6 space-y-8 pb-24">
              {/* Route ID and Date Range in same row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <Select
                  name="routeId"
                  label="Route ID"
                  options={routeOptions}
                />
                <DateRangePicker
                  label="Date Range"
                  startDate={startDate}
                  endDate={endDate}
                  onDateRangeChange={(start, end) => {
                    setStartDate(start);
                    setEndDate(end);
                  }}
                />
              </div>

              {/* District, Campus, Driver in same row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
                <Select
                  name="district"
                  label="District"
                  options={districtOptions}
                />
                <Select
                  name="campus"
                  label="Campus"
                  options={campusOptions}
                />
                <Select
                  name="driver"
                  label="Driver"
                  options={driverOptions}
                />
              </div>

              {/* Pickup Address and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <Input
                  type="text"
                  name="pickupAddress"
                  label="Pick-up Address"
                  placeholder="Pick-up Address"
                />
                <Input
                  type="time"
                  name="pickupTime"
                  label="Pick-up Time"
                  placeholder="--:--"
                />
              </div>

              {/* Dropoff Address and Time */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <Input
                  type="text"
                  name="dropoffAddress"
                  label="Drop-off Address"
                  placeholder="Drop-off Address"
                />
                <Input
                  type="time"
                  name="dropoffTime"
                  label="Drop-off Time (Auto-calculated)"
                  placeholder="--:--"
                  readOnly
                />
              </div>

              {/* Payment fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <Input
                  type="number"
                  name="driverPayment"
                  label="Driver Payment ($)"
                  placeholder="Amount to pay driver"
                />
                <Input
                  type="number"
                  name="districtCharge"
                  label="District Charge ($)"
                  placeholder="Amount to charge district"
                />
              </div>

              {/* Students dropdown */}
              <div className="grid grid-cols-1">
                <Select
                  name="students"
                  label="Students"
                  options={studentOptions}
                  defaultValue="1"
                />
              </div>
            </div>

            {/* Footer - Fixed at bottom */}
            <div className="flex justify-end gap-3 p-6 border-t border-[var(--gray-200)] bg-white flex-shrink-0">
              <Button variant="secondary" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Add Ride
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
