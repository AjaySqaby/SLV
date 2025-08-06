import { Plus } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function RouteEditAdditionalStops() {
  return (
    <div className="bg-[var(--surface-bg)] rounded-lg border border-[var(--border)] overflow-hidden">
      <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-center">
        <h2 className="font-medium text-[var(--heading)]">Additional Stops</h2>
        <span className="bg-[var(--blue-bg)] text-[var(--blue-dark)] text-xs font-medium px-2.5 py-0.5 rounded">0 Stops</span>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="text"
            label="Address"
            placeholder="Enter stop address"
          />
          <Input
            type="time"
            label="Time"
            placeholder="--:--"
          />
          <p className="text-xs text-[var(--muted-text)] mt-1 col-span-2">Auto-generated based on bell times</p>
        </div>
        <Button variant="ghost" className="flex items-center text-[var(--blue-dark)] text-sm font-medium">
          <Plus size={16} className="mr-1" />
          Add Stop
        </Button>
      </div>
    </div>
  );
} 