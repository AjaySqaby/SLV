import Input from "@/components/ui/Input";

export default function RouteEditBellTimes() {
  return (
    <div className="bg-[var(--surface-bg)] rounded-lg border border-[var(--border)] overflow-hidden">
      <div className="px-6 py-4 border-b border-[var(--border)]">
        <h2 className="font-medium text-[var(--heading)]">Bell Times</h2>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="text"
            label="Start Time"
            placeholder="--:--"
          />
          <Input
            type="text"
            label="End Time"
            placeholder="--:--"
          />
        </div>
      </div>
    </div>
  );
} 