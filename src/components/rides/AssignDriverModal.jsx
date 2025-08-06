import Modal from "@/components/common/Modal";
import Select from "@/components/ui/Select";
import Button from '@/components/ui/Button';
import { useState } from "react";

export default function AssignDriverModal({ open, onClose, rideId, onAssign, partnerOptions = [], driverOptions = [] }) {
  const [selectedPartner, setSelectedPartner] = useState("");
  const [selectedDriver, setSelectedDriver] = useState("");
  return (
    <Modal open={open} onClose={onClose} title={`Assign Driver to Ride ${rideId}`} widthClass="w-full max-w-3xl">
     
      <div className="mb-6">
        <label className="block text-sm font-medium text-[var(--gray-700)] mb-1">Driver</label>
        <Select
          value={selectedDriver}
          onChange={e => setSelectedDriver(e.target.value)}
          options={driverOptions}
          placeholder="Select driver..."
          width="w-full"
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          className="bg-[var(--teal)] text-[var(--button-text)]"
          disabled={!selectedDriver}
          onClick={() => {
            onAssign({ driver: selectedDriver });
            onClose();
          }}
        >
          Assign Driver
        </Button>
      </div>
    </Modal>
  );
}
