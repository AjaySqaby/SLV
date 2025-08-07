import React, { useState } from "react";
import Modal from "@/components/common/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import DateRangePicker from "./DateRangePicker";

export default function AddRideModal({ open, onClose }) {
  const [selectedDate, setSelectedDate] = useState();

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

  return (
    <Modal open={open} onClose={onClose} title="Add New Ride">
      <form className="space-y-6">
        {/* Route ID and Date Range in same row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            name="routeId"
            label="Route ID"
            options={routeOptions}
          />
          <DateRangePicker
            selected={selectedDate}
            onSelect={setSelectedDate}
          />
        </div>

        {/* District, Campus, Driver in same row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

        <div className="flex justify-end space-x-3 pt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Add Ride
          </Button>
        </div>
      </form>
    </Modal>
  );
}
