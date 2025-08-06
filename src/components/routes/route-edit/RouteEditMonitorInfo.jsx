import Input from "@/components/ui/Input";

export default function RouteEditMonitorInfo() {
  return (
    <div className="bg-[var(--surface-bg)] rounded-lg border border-[var(--border)] overflow-hidden">
      <div className="px-6 py-4 border-b border-[var(--border)]">
        <h2 className="font-medium text-[var(--heading)]">Monitor Information</h2>
      </div>
      <div className="p-6">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <Input id="monitor-checkbox" type="checkbox" className="w-4 h-4 border border-[var(--border)] rounded" />
          </div>
          <label htmlFor="monitor-checkbox" className="ml-2 text-sm text-[var(--muted-text)]">
            Add a monitor to this route (Monitor will be picked up first and dropped off last)
          </label>
        </div>
      </div>
    </div>
  );
} 