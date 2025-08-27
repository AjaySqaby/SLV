"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import PageLayout from "@/components/layout/page-layout";
import Tabs from "@/components/ui/Tabs";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { Switch } from "@headlessui/react";
import { Check, Building, ArrowLeft, Upload, Download } from "lucide-react";

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

export default function AddCampusPage() {
  const router = useRouter();
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

  const handleCancel = () => router.push("/campus");
  const handleSave = (e) => {
    e.preventDefault();
    // Save logic here
    router.push("/campus");
  };

  return (
    <PageLayout activePage="Campus" pageTitle="Add Campus">
      <div className="p-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <button
            onClick={() => router.push("/campus")}
            className="mr-4 p-2 hover:bg-[var(--gray-100)] rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-[var(--gray-600)]" />
          </button>
          <div className="w-10 h-10 bg-[var(--orange-100)] rounded-full flex items-center justify-center mr-4">
            <Building className="h-5 w-5 text-[var(--orange-600)]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Add Campus</h1>
            <p className="text-[var(--gray-600)] text-sm">
              Add a new campus to the system or bulk upload multiple campuses.
            </p>
          </div>
        </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-[var(--gray-100)] p-6">
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
             <div className="space-y-6">
               {/* Upload Section */}
               <div className="border-2 border-dashed border-[var(--gray-300)] rounded-lg p-12 flex flex-col items-center justify-center">
                 <div className="w-16 h-16 bg-[var(--blue-100)] rounded-full flex items-center justify-center mb-4">
                   <Upload className="w-8 h-8 text-[var(--blue-600)]" />
                 </div>
                 <h3 className="text-xl font-semibold text-[var(--gray-900)] mb-2">
                   Upload Campus Data File
                 </h3>
                 <p className="text-[var(--gray-600)] text-center mb-6">
                   Upload a CSV or Excel file with campus information.{" "}
                   <button className="text-[var(--blue-600)] hover:text-[var(--blue-700)] font-medium">
                     Download template
                   </button>
                 </p>
                 <Button variant="primary" icon={<Upload size={18} />}>
                   Select File
                 </Button>
               </div>

               {/* Instructions */}
               <div className="bg-[var(--gray-50)] rounded-lg p-6">
                 <h4 className="font-semibold text-[var(--gray-900)] mb-3">
                   Instructions
                 </h4>
                 <ol className="list-decimal ml-6 space-y-2 text-[var(--gray-600)]">
                   <li>Download the campus template Excel file</li>
                   <li>Fill in the campus details in the spreadsheet</li>
                   <li>Upload the completed Excel file</li>
                 </ol>
               </div>

               {/* Action Buttons */}
               <div className="flex justify-end gap-3 pt-4 border-t border-[var(--gray-200)]">
                 <Button
                   variant="secondary"
                   type="button"
                   onClick={handleCancel}
                 >
                   Cancel
                 </Button>
                 <Button variant="primary" icon={<Upload size={18} />}>
                   Upload and Process
                 </Button>
               </div>
             </div>
           )}
                 </div>
       </div>
     </div>
   </PageLayout>
   );
 }
