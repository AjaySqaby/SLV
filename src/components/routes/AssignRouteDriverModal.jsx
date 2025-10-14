"use client";

import { useState } from "react";
import { RiArrowLeftLine, RiCloseLine, RiUserLine, RiCalendarCheckLine, RiCalendarLine, RiCheckLine, RiSunLine, RiMoonLine, RiCalendar2Line, RiTimeLine } from "react-icons/ri";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Select from "@/components/ui/Select";
import Input from "@/components/ui/Input";
import Toggle from "@/components/ui/Toggle";

export default function AssignRouteDriverModal({
  isOpen,
  onClose,
  routeId,
  currentDriverId,
  currentDriverName,
  driverOptions = [],
  onApply,
  schoolStart = "8:00 AM",
  schoolEnd = "3:00 PM",
  initialMode,
  initialSelectedDriver,
}) {
  const [mode, setMode] = useState(initialMode || "keep"); // keep | assign | unassign
  const [selectedDriver, setSelectedDriver] = useState(initialSelectedDriver || "");
  const [scope, setScope] = useState("all"); // all | specific
  // US K-12: Show only school days (Mon-Fri)
  const [days, setDays] = useState({ Mon: false, Tue: false, Wed: false, Thu: false, Fri: false });
  const [timesOfDay, setTimesOfDay] = useState({ Morning: true, Afternoon: false });
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pickupTime, setPickupTime] = useState("07:30");
  const [dropoffTime, setDropoffTime] = useState("15:30");

  if (!isOpen) return null;

  const toggleDay = (day) => setDays((d) => ({ ...d, [day]: !d[day] }));
  const toggleTime = (time) => setTimesOfDay((t) => ({ ...t, [time]: !t[time] }));

  const handleApply = () => {
    onApply?.({
      routeId,
      action: mode, // keep | assign | unassign
      driverId: mode === "assign" ? selectedDriver : undefined,
      scope,
      days: scope === "specific" ? Object.keys(days).filter((d) => days[d]) : undefined,
      timesOfDay: scope === "specific" ? Object.keys(timesOfDay).filter((t) => timesOfDay[t]) : undefined,
    });
    onClose();
  };

  const selectedDays = Object.keys(days).filter((d) => days[d]);
  const selectedTimes = Object.keys(timesOfDay).filter((t) => timesOfDay[t]);
  const isApplyDisabled = (scope === 'specific' && (selectedDays.length === 0 || selectedTimes.length === 0)) || (mode === 'assign' && !selectedDriver);

  const selectWeekdays = () => setDays({ Mon: true, Tue: true, Wed: true, Thu: true, Fri: true });
  const clearDays = () => setDays({ Mon: false, Tue: false, Wed: false, Thu: false, Fri: false });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-[95vw] h-[90vh] max-w-7xl mx-4 overflow-hidden relative" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--gray-200)' }}>
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--hover-bg)] transition-colors" aria-label="Back">
              <RiArrowLeftLine className="w-5 h-5" style={{ color: 'var(--gray-600)' }} />
            </button>
            <div>
              <h2 className="text-xl font-bold" style={{ color: 'var(--heading)' }}>Assign Driver for Route {routeId}</h2>
              <p className="text-sm" style={{ color: 'var(--muted-text)' }}>
                Current: {currentDriverName || "Unassigned"}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[var(--hover-bg)] transition-colors" aria-label="Close">
            <RiCloseLine className="w-5 h-5" style={{ color: 'var(--gray-600)' }} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-180px)] pb-24 space-y-4">
          <Card className="p-4">
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="mode" value="keep" checked={mode === "keep"} onChange={() => setMode("keep")} className="w-4 h-4" />
                <span className="text-sm font-medium" style={{ color: 'var(--heading)' }}>Keep current driver</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="mode" value="assign" checked={mode === "assign"} onChange={() => setMode("assign")} className="w-4 h-4" />
                <span className="text-sm font-medium" style={{ color: 'var(--heading)' }}>Assign new driver</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name="mode" value="unassign" checked={mode === "unassign"} onChange={() => setMode("unassign")} className="w-4 h-4" />
                <span className="text-sm font-medium" style={{ color: 'var(--heading)' }}>Unassign driver</span>
              </label>
            </div>
            {mode === "assign" && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--heading)' }}>Select driver</label>
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-[var(--blue-100)] rounded-full flex items-center justify-center">
                    <RiUserLine className="w-4 h-4" style={{ color: 'var(--blue-600)' }} />
                  </div>
                  <Select value={selectedDriver} onChange={(value) => setSelectedDriver(value)} options={driverOptions} placeholder="Choose driver" />
                </div>
              </div>
            )}
          </Card>

          <Card className="p-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2" style={{ color: 'var(--heading)' }}>
              <RiCalendar2Line className="w-4 h-4" style={{ color: 'var(--muted-text)' }} />
              Apply to
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <button
                className={`flex items-center gap-2 px-3 py-2 rounded border ${scope === 'all' ? 'bg-[var(--blue-100)] border-[var(--blue-200)]' : 'border-[var(--gray-200)]'}`}
                onClick={() => setScope('all')}
              >
                <RiCalendarCheckLine className="w-4 h-4" style={{ color: 'var(--blue-600)' }} />
                <span className="text-sm">All generated rides</span>
              </button>
              <button
                className={`flex items-center gap-2 px-3 py-2 rounded border ${scope === 'specific' ? 'bg-[var(--blue-100)] border-[var(--blue-200)]' : 'border-[var(--gray-200)]'}`}
                onClick={() => setScope('specific')}
              >
                <RiCalendarLine className="w-4 h-4" style={{ color: 'var(--blue-600)' }} />
                <span className="text-sm">Specific days/times</span>
              </button>
            </div>

            {scope === 'specific' && (
              <div className="mt-4 space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-medium" style={{ color: 'var(--muted-text)' }}>Days</p>
                    <div className="flex items-center gap-2">
                      <button onClick={selectWeekdays} className="px-2 py-1 rounded text-xs border border-[var(--gray-200)] hover:bg-[var(--gray-50)]">Weekdays</button>
                      <button onClick={clearDays} className="px-2 py-1 rounded text-xs border border-[var(--gray-200)] hover:bg-[var(--gray-50)]">Clear</button>
                    </div>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {Object.keys(days).map((day) => (
                      <button
                        key={day}
                        onClick={() => toggleDay(day)}
                        className={`px-2 py-1 rounded text-xs border flex items-center justify-center gap-1 ${days[day] ? 'bg-[var(--purple-100)] border-[var(--purple-200)] text-[var(--purple-700)]' : 'border-[var(--gray-200)] text-[var(--muted-text)]'}`}
                        aria-pressed={days[day]}
                      >
                        {days[day] && <RiCheckLine className="w-3 h-3" />}
                        {day}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-medium" style={{ color: 'var(--muted-text)' }}>Times of day</p>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px]" style={{ backgroundColor: 'var(--blue-100)', color: 'var(--blue-700)' }}>
                      <RiTimeLine className="w-3 h-3" /> School: {schoolStart} – {schoolEnd}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {Object.keys(timesOfDay).map((t) => (
                      <button
                        key={t}
                        onClick={() => toggleTime(t)}
                        className={`px-3 py-1 rounded text-xs border flex items-center gap-1 ${timesOfDay[t] ? 'bg-[var(--green-100)] border-[var(--green-200)] text-[var(--green-700)]' : 'border-[var(--gray-200)] text-[var(--muted-text)]'}`}
                        aria-pressed={timesOfDay[t]}
                      >
                        {t === 'Morning' ? <RiSunLine className="w-3 h-3" /> : <RiMoonLine className="w-3 h-3" />}
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </Card>

          {/* Schedule section styled like Add Route */}
          <Card className="p-4">
            <div className="space-y-4">
              {/* Operating Days */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--heading)' }}>Operating Days</label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {Object.keys(days).map((key) => (
                    <div key={key} className="flex items-center p-3 border border-[var(--gray-200)] rounded-lg hover:bg-[var(--gray-50)] cursor-pointer transition-all duration-200">
                      <Toggle
                        checked={days[key]}
                        onChange={(checked) => setDays((prev) => ({ ...prev, [key]: checked }))}
                        className="mr-3"
                      />
                      <span className="text-sm font-medium" style={{ color: 'var(--heading)' }}>
                        {key === 'Mon' ? 'Monday' : key === 'Tue' ? 'Tuesday' : key === 'Wed' ? 'Wednesday' : key === 'Thu' ? 'Thursday' : 'Friday'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Effective Date Range */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--heading)' }}>Effective Date Range</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-[11px] text-[var(--muted-text)] mb-1">Start Date</label>
                    <div className="relative">
                      <RiCalendarLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--gray-400)' }} />
                      <Input type="date" className="pl-10" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-[11px] text-[var(--muted-text)] mb-1">End Date</label>
                    <div className="relative">
                      <RiCalendarLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--gray-400)' }} />
                      <Input type="date" className="pl-10" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>

              {/* Default Times */}
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--heading)' }}>Default Times</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <label className="block text-[11px] text-[var(--muted-text)] mb-1">Default Pickup Time</label>
                    <div className="relative">
                      <RiTimeLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--gray-400)' }} />
                      <Input type="time" className="pl-10" value={pickupTime} onChange={(e) => setPickupTime(e.target.value)} />
                    </div>
                  </div>
                  <div className="relative">
                    <label className="block text-[11px] text-[var(--muted-text)] mb-1">Default Dropoff Time</label>
                    <div className="relative">
                      <RiTimeLine className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: 'var(--gray-400)' }} />
                      <Input type="time" className="pl-10" value={dropoffTime} onChange={(e) => setDropoffTime(e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Footer - fixed bottom right */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t" style={{ borderColor: 'var(--gray-200)' }}>
          <div className="flex items-center justify-end gap-3 p-4">
            <Button variant="secondary" onClick={onClose} className="px-5" icon={<RiCloseLine className="w-4 h-4" />}>Cancel</Button>
            <Button disabled={isApplyDisabled} onClick={handleApply} className="px-6" icon={<RiCheckLine className="w-4 h-4" />}>Apply</Button>
          </div>
        </div>
      </div>
    </div>
  );
}


