"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Input from "@/components/ui/Input";
import Toggle from "@/components/ui/Toggle";
import PageLayout from "@/components/layout/page-layout";
import Button from "@/components/ui/Button";

const defaultCampus = {
  name: "Riverside High School",
  type: "High School",
  district: "Northside School District (86022-Z)",
  address: "2000 School Rd",
  city: "Riverdale",
  state: "Georgia",
  zip: "30096",
  schedule: {
    Monday: { enabled: true, start: "08:00", end: "15:00", lunchStart: "12:00", lunchEnd: "12:45" },
    Tuesday: { enabled: true, start: "08:00", end: "15:00", lunchStart: "12:00", lunchEnd: "12:45" },
    Wednesday: { enabled: true, start: "08:00", end: "15:00", lunchStart: "12:00", lunchEnd: "12:45" },
    Thursday: { enabled: true, start: "08:00", end: "15:00", lunchStart: "12:00", lunchEnd: "12:45" },
    Friday: { enabled: true, start: "08:00", end: "15:00", lunchStart: "12:00", lunchEnd: "12:45" },
    Saturday: { enabled: false, start: "", end: "", lunchStart: "", lunchEnd: "" },
    Sunday: { enabled: false, start: "", end: "", lunchStart: "", lunchEnd: "" },
  },
  active: true,
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function EditCampusPage() {
  const params = useParams();
  const router = useRouter();
  const [campus, setCampus] = useState(defaultCampus);

  const handleScheduleChange = (day, field, value) => {
    setCampus((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: {
          ...prev.schedule[day],
          [field]: value,
        },
      },
    }));
  };

  const handleToggleDay = (day) => {
    setCampus((prev) => ({
      ...prev,
      schedule: {
        ...prev.schedule,
        [day]: {
          ...prev.schedule[day],
          enabled: !prev.schedule[day].enabled,
        },
      },
    }));
  };

  return (
    <PageLayout activePage="Campus" pageTitle="Edit Campus">
      <div className="max-w-3xl mx-auto p-6">
        <button className="flex items-center text-blue-600 mb-4" onClick={() => router.back()}>
          <ArrowLeft className="mr-2 h-5 w-5" /> Back
        </button>
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-bold mb-1 text-blue-700">Edit Campus</h2>
          <p className="text-gray-500 mb-6">Add a new campus to your school district</p>
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Campus Name</label>
                <Input className="w-full" value={campus.name} onChange={e => setCampus({ ...campus, name: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Campus Type</label>
                <select className="w-full border rounded px-3 py-2" value={campus.type} onChange={e => setCampus({ ...campus, type: e.target.value })}>
                  <option>High School</option>
                  <option>Middle School</option>
                  <option>Elementary School</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">District</label>
                <select className="w-full border rounded px-3 py-2" value={campus.district} onChange={e => setCampus({ ...campus, district: e.target.value })}>
                  <option>Northside School District (86022-Z)</option>
                  <option>Southside School District (75044-A)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Street Address</label>
                <Input className="w-full" value={campus.address} onChange={e => setCampus({ ...campus, address: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">City</label>
                <Input className="w-full" value={campus.city} onChange={e => setCampus({ ...campus, city: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">State</label>
                <Input className="w-full" value={campus.state} onChange={e => setCampus({ ...campus, state: e.target.value })} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">ZIP Code</label>
                <Input className="w-full" value={campus.zip} onChange={e => setCampus({ ...campus, zip: e.target.value })} />
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium mb-2">Campus Bell Schedule</label>
              <p className="text-xs text-gray-500 mb-2">Configure the schedule for each day of the school week</p>
              <div className="space-y-4">
                {days.map((day) => (
                  <div key={day} className="border rounded-lg p-4 mb-2 bg-gray-50">
                    <div className="flex items-center mb-4 gap-3">
                      <Toggle checked={campus.schedule[day].enabled} onChange={() => handleToggleDay(day)} />
                      <span className="font-medium text-gray-700 text-base">{day}</span>
                    </div>
                    {campus.schedule[day].enabled && (
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                          <label className="block text-xs mb-1">School Start Time</label>
                          <Input type="time" className="w-full" value={campus.schedule[day].start} onChange={e => handleScheduleChange(day, "start", e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-xs mb-1">School End Time</label>
                          <Input type="time" className="w-full" value={campus.schedule[day].end} onChange={e => handleScheduleChange(day, "end", e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-xs mb-1">Lunch Start Time</label>
                          <Input type="time" className="w-full" value={campus.schedule[day].lunchStart} onChange={e => handleScheduleChange(day, "lunchStart", e.target.value)} />
                        </div>
                        <div>
                          <label className="block text-xs mb-1">Lunch End Time</label>
                          <Input type="time" className="w-full" value={campus.schedule[day].lunchEnd} onChange={e => handleScheduleChange(day, "lunchEnd", e.target.value)} />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center mt-6 gap-3">
              <Toggle checked={campus.active} onChange={() => setCampus((prev) => ({ ...prev, active: !prev.active }))} />
              <span className="text-sm font-medium">Active Status</span>
              <span className="ml-2 text-xs text-gray-500">Set the campus as active or inactive in the system</span>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <Button variant="secondary" type="button" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Save Campus
              </Button>
            </div>
          </form>
        </div>
      </div>
    </PageLayout>
  );
} 