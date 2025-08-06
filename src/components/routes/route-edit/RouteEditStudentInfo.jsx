import { Plus, Info } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Select from "@/components/ui/Select";

export default function RouteEditStudentInfo() {
  return (
    <div className="bg-[var(--surface-bg)] rounded-lg border border-[var(--border)] overflow-hidden">
      <div className="px-6 py-4 border-b border-[var(--border)] flex justify-between items-center">
        <h2 className="font-medium text-[var(--heading)]">Student Information</h2>
        <span className="bg-[var(--blue-bg)] text-[var(--blue-dark)] text-xs font-medium px-2.5 py-0.5 rounded">0 Students</span>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div>
            <Select
              label="Student Name"
              options={[
                { value: "", label: "Select a campus first" }
              ]}
            />
          </div>
          <div>
            <Input
              type="text"
              label="Pickup Address"
              placeholder="Enter pickup address"
            />
          </div>
          <div>
            <Input
              type="time"
              label="Pickup Time"
              placeholder="--:--"
            />
          </div>
        </div>
        <Button variant="ghost" className="flex items-center text-[var(--blue-dark)] text-sm font-medium">
          <Plus size={16} className="mr-1" />
          Add Student
        </Button>
      </div>
    </div>
  );
} 