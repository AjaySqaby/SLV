import { useState } from "react";
import Modal from "@/components/common/Modal";
import Tabs from "@/components/ui/Tabs";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Switch } from "@headlessui/react";
import { Check } from "lucide-react";

function TimeInput({ label, value, onChange, name }) {
  return (
    <Input
      type="time"
      label={label}
      value={value}
      onChange={onChange}
      name={name}
      className="w-full"
    />
  );
}

export default function AddCampusModal({ open, onClose }) {
  const [activeTab, setActiveTab] = useState(0);
  const [form, setForm] = useState({
    name: "",
    type: "",
    district: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    active: true,
    schedule: {
      Monday: {
        enabled: true,
        start: "08:00",
        end: "15:00",
        lunchStart: "12:00",
        lunchEnd: "12:45",
      },
      Tuesday: {
        enabled: true,
        start: "08:00",
        end: "15:00",
        lunchStart: "12:00",
        lunchEnd: "12:45",
      },
      Wednesday: {
        enabled: true,
        start: "08:00",
        end: "15:00",
        lunchStart: "12:00",
        lunchEnd: "12:45",
      },
      Thursday: {
        enabled: true,
        start: "08:00",
        end: "15:00",
        lunchStart: "12:00",
        lunchEnd: "12:45",
      },
      Friday: {
        enabled: true,
        start: "08:00",
        end: "15:00",
        lunchStart: "12:00",
        lunchEnd: "12:45",
      },
      Saturday: {
        enabled: false,
        start: "08:00",
        end: "15:00",
        lunchStart: "12:00",
        lunchEnd: "12:45",
      },
      Sunday: {
        enabled: false,
        start: "08:00",
        end: "15:00",
        lunchStart: "12:00",
        lunchEnd: "12:45",
      },
    },
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleScheduleChange = (day, field, value) => {
    setForm((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: { ...prev.schedule[day], [field]: value },
      },
    }));
  };

  const handleDayToggle = (day) => {
    setForm((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: { ...prev.schedule[day], enabled: !prev.schedule[day].enabled },
      },
    }));
  };

  const handleActiveToggle = () => {
    setForm((prev) => ({ ...prev, active: !prev.active }));
  };

  const handleCancel = () => onClose();
  const handleSave = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Add Campus" size="xl">
      <div className="max-h-[90vh] overflow-y-auto pr-2">
        <div className="mb-6">
          <p className="text-[var(--gray-600)] text-sm">
            Add a new campus to the system or bulk upload multiple campuses.
          </p>
        </div>
        
        <Tabs
          tabs={[
            { id: 0, label: "Add Single Campus" },
            { id: 1, label: "Bulk Upload" },
          ]}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
        <div className="mt-6">
          {activeTab === 0 && (
            <form onSubmit={handleSave} className="space-y-8">
              {/* Campus Details Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Campus Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Campus Name"
                    name="name"
                    value={form.name}
                    onChange={handleFormChange}
                    placeholder="Riverdale High School"
                    required
                  />
                  <div>
                    <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                      Campus Type
                    </label>
                    <select
                      name="type"
                      value={form.type}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)] focus:border-transparent"
                      required
                    >
                      <option value="">Select Campus Type</option>
                      <option value="Elementary School">Elementary School</option>
                      <option value="Middle School">Middle School</option>
                      <option value="High School">High School</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                      District
                    </label>
                    <select
                      name="district"
                      value={form.district}
                      onChange={handleFormChange}
                      className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)] focus:border-transparent"
                      required
                    >
                      <option value="">Select District</option>
                      <option value="Northside School District (86022-Z)">Northside School District (86022-Z)</option>
                      <option value="Southside School District (75044-A)">Southside School District (75044-A)</option>
                    </select>
                  </div>
                  <Input
                    label="Street Address"
                    name="address"
                    value={form.address}
                    onChange={handleFormChange}
                    placeholder="2000 School Rd"
                    required
                  />
                  <Input
                    label="City"
                    name="city"
                    value={form.city}
                    onChange={handleFormChange}
                    placeholder="Atlanta"
                    required
                  />
                  <Input
                    label="State"
                    name="state"
                    value={form.state}
                    onChange={handleFormChange}
                    placeholder="Georgia"
                    required
                  />
                  <Input
                    label="Zip Code"
                    name="zip"
                    value={form.zip}
                    onChange={handleFormChange}
                    placeholder="30033"
                    required
                  />
                </div>
              </div>

              {/* Campus Bell Schedule Section */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Campus Bell Schedule</h3>
                <p className="text-[var(--gray-600)] text-sm mb-4">
                  Define when school starts and ends each day. This will be used for route planning.
                </p>
                
                <div className="space-y-4">
                  {Object.entries(form.schedule).map(([day, sched]) => (
                    <div key={day} className="border border-[var(--gray-200)] rounded-lg p-4">
                                             <div className="flex items-center mb-3">
                         <button
                           type="button"
                           onClick={() => handleDayToggle(day)}
                           className={`relative w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                             sched.enabled
                               ? "bg-[var(--blue-600)] border-[var(--blue-600)]"
                               : "bg-white border-[var(--gray-300)] hover:border-[var(--blue-400)]"
                           }`}
                         >
                           {sched.enabled && (
                             <Check className="w-3 h-3 text-white" />
                           )}
                         </button>
                         <span className="ml-3 font-medium text-[var(--gray-700)]">
                           {day}
                         </span>
                       </div>
                      {sched.enabled && (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <TimeInput
                            label="School Start Time"
                            name="start"
                            value={sched.start}
                            onChange={(e) =>
                              handleScheduleChange(day, "start", e.target.value)
                            }
                          />
                          <TimeInput
                            label="School End Time"
                            name="end"
                            value={sched.end}
                            onChange={(e) =>
                              handleScheduleChange(day, "end", e.target.value)
                            }
                          />
                          <TimeInput
                            label="Lunch Start Time"
                            name="lunchStart"
                            value={sched.lunchStart}
                            onChange={(e) =>
                              handleScheduleChange(
                                day,
                                "lunchStart",
                                e.target.value
                              )
                            }
                          />
                          <TimeInput
                            label="Lunch End Time"
                            name="lunchEnd"
                            value={sched.lunchEnd}
                            onChange={(e) =>
                              handleScheduleChange(
                                day,
                                "lunchEnd",
                                e.target.value
                              )
                            }
                          />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Status Section */}
              <div>
                <h3 className="text-lg font-semibold mb-2">Active Status</h3>
                <p className="text-[var(--gray-600)] text-sm mb-4">
                  Set whether this campus is currently active.
                </p>
                <div className="flex items-center">
                  <Switch
                    checked={form.active}
                    onChange={handleActiveToggle}
                    className={`${
                      form.active ? "bg-[var(--blue-600)]" : "bg-[var(--gray-300)]"
                    } relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none`}
                  >
                    <span className="sr-only">Set campus active</span>
                    <span
                      className={`${
                        form.active ? "translate-x-6" : "translate-x-1"
                      } inline-block h-4 w-4 transform rounded-full bg-white transition-transform`}
                    />
                  </Switch>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-[var(--gray-200)]">
                <Button
                  variant="secondary"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button variant="primary" type="submit">
                  Add Campus
                </Button>
              </div>
            </form>
          )}
          {activeTab === 1 && (
            <div className="flex flex-col items-center justify-center min-h-[200px]">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 w-full flex flex-col items-center">
                <p className="mb-4 text-gray-500">
                  Drag and drop an Excel file here, or click the button below to
                  select a file
                </p>
                <Button variant="primary">Upload Excel File</Button>
              </div>
              <div className="mt-4 text-sm text-gray-500">
                <ol className="list-decimal ml-6">
                  <li>Download the campus template Excel file</li>
                  <li>Fill in the campus details in the spreadsheet</li>
                  <li>Upload the completed Excel file</li>
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
