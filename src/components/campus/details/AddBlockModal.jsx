import Modal from "@/components/common/Modal";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const blockTypes = [
  { value: "Class", label: "Class" },
  { value: "Arrival", label: "Arrival" },
  { value: "Break", label: "Break" },
  { value: "Lunch", label: "Lunch" },
  { value: "Dismissal", label: "Dismissal" },
];

export default function AddBlockModal({ open, onClose, form, setForm, onSubmit }) {
  return (
    <Modal open={open} onClose={onClose} title="Add Schedule Block">
      <form onSubmit={onSubmit} className="space-y-4">
        <Select
          label="Day"
          options={days.map((d) => ({ value: d, label: d }))}
          value={form.day}
          onChange={e => setForm(f => ({ ...f, day: e.target.value }))}
        />
        <Input
          label="Block Name"
          placeholder="e.g., 1st Period"
          value={form.name}
          onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
          required
        />
        <Select
          label="Block Type"
          options={blockTypes}
          value={form.type}
          onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
        />
        <div className="flex gap-2">
          <Input
            label="Start Time"
            type="time"
            value={form.start}
            onChange={e => setForm(f => ({ ...f, start: e.target.value }))}
            required
          />
          <Input
            label="End Time"
            type="time"
            value={form.end}
            onChange={e => setForm(f => ({ ...f, end: e.target.value }))}
            required
          />
        </div>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="secondary" type="button" onClick={onClose}>Cancel</Button>
          <Button variant="primary" type="submit">Add to Schedule</Button>
        </div>
      </form>
    </Modal>
  );
} 