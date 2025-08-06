import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { X } from "lucide-react";

export default function FilterPopover({
  onClose,
  onApply,
  onReset,
  search,
  setSearch,
}) {
  return (
    <div className="bg-background rounded-lg shadow-lg p-4 w-80">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button
          className="text-xl"
          onClick={onClose}
          variant="ghost"
          aria-label="Close filters"
        >
          <X size={20} />
        </Button>
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Search</label>
        <Input
          type="text"
          className="w-full"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="flex justify-end gap-2">
        <Button variant="secondary" onClick={onReset}>
          Reset
        </Button>
        <Button onClick={onApply}>Apply</Button>
      </div>
    </div>
  );
}
