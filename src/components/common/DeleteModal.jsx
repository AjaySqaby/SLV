import Modal from "./Modal";
import Button from "@/components/ui/Button";

export default function DeleteModal({ open, onClose, onDelete, itemName }) {
  return (
    <Modal open={open} onClose={onClose} widthClass="max-w-md w-full">
      <div className="p-2">
        <h2 className="text-xl font-semibold mb-2">Are you sure?</h2>
        <p className="text-[var(--muted-text)] mb-6">
          This action cannot be undone. This will permanently delete {itemName} and remove it from our servers.
        </p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button
            className="bg-[var(--warning-dark)] text-white hover:bg-[var(--danger-dark)]"
            onClick={onDelete}
          >
            Delete
          </Button>
        </div>
      </div>
    </Modal>
  );
} 