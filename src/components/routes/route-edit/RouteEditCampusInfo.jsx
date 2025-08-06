import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"

export default function RouteEditCampusInfo() {
  return (
    <div className="bg-[var(--surface-bg)] rounded-lg border border-[var(--border)] overflow-hidden">
      <div className="px-6 py-4 border-b border-[var(--border)]">
        <h2 className="font-medium text-[var(--heading)]">Campus Information</h2>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="text"
            label="Campus Name"
            placeholder="Enter campus name"
          />
          <Select
            label="Campus Type"
            options={[
              { value: "", label: "Select type" },
              { value: "elementary", label: "Elementary" },
              { value: "middle", label: "Middle" },
              { value: "high", label: "High" },
            ]}
          />
        </div>
      </div>
    </div>
  );
} 