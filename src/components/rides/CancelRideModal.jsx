import Modal from "@/components/common/Modal";
import Button from '@/components/ui/Button';

export default function CancelRideModal({ open, onClose, rideId, onCancel }) {
  return (
    <Modal open={open} onClose={onClose} title="Cancel Ride">
      <div className="mb-4 text-[var(--gray-700)]">
        Are you sure you want to cancel ride #{rideId}? This action cannot be undone.
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>
          No, keep ride
        </Button>
        <Button className="bg-[var(--red)] text-[var(--button-text)]" onClick={() => {
          onCancel();
          onClose();
        }}>
          Yes, cancel ride
        </Button>
      </div>
    </Modal>
  );
} 