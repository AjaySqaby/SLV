import Select from "@/components/ui/Select"
import Input from "@/components/ui/Input"

export default function RouteEditBasicInfo({ routeId, setRouteId, district, setDistrict, districts }) {
  return (
    <div className="bg-[var(--surface-bg)] rounded-lg border border-[var(--border)] overflow-hidden">
      <div className="px-6 py-4 border-b border-[var(--border)]">
        <h2 className="font-medium text-[var(--heading)]">Basic Information</h2>
      </div>
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              type="text"
              label="Route ID"
              className="mb-1"
              placeholder="RT-07223"
              value={routeId}
              onChange={e => setRouteId(e.target.value)}
            />
          </div>
          <Select
            name="district"
            label="District"
            value={district}
            onChange={e => setDistrict(e.target.value)}
            options={[
              { value: "", label: "Select a District" },
              ...(districts?.map(d => ({ value: d, label: d })) || [])
            ]}
          />
        </div>
      </div>
    </div>
  );
} 