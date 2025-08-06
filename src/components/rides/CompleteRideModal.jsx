import Modal from "@/components/common/Modal";
import Button from '@/components/ui/Button';

export default function CompleteRideModal({ open, onClose, rideId, onComplete }) {
  return (
    <Modal open={open} onClose={onClose} title={`Complete Ride ${rideId}`} widthClass="w-full max-w-2xl">
      <div className="mb-6 text-[var(--gray-700)]">Mark ride #{rideId} as completed?</div>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button className="bg-[var(--green)] text-[var(--button-text)]" onClick={() => {
          onComplete();
          onClose();
        }}>
          Complete Ride
        </Button>
      </div>
    </Modal>
  );
} 