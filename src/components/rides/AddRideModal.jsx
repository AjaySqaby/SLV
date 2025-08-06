import React from "react";
import Modal from "@/components/common/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

export default function AddRideModal({ open, onClose }) {
  return (
    <Modal open={open} onClose={onClose} title="Add New Ride">
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Input
            type="text"
            name="routeId"
            label="Route ID"
            placeholder="R5172"
          />
          <Input
            type="text"
            name="dateRange"
            label="Date Range"
            placeholder="Select date range"
          />
          <Select
            name="district"
            label="District"
            options={[{ value: "", label: "Select District" }]}
          />
          <Select
            name="campus"
            label="Campus"
            options={[{ value: "", label: "Select Campus" }]}
          />
          <Select
            name="driver"
            label="Driver"
            options={[{ value: "", label: "Select Driver" }]}
          />
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
          <Select
            name="students"
            label="Students"
            options={[{ value: "1", label: "1 Student" }]}
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
