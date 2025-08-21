"use client";
import { useState } from "react";
import { RiFileTextLine, RiUploadLine, RiCarLine } from "react-icons/ri";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import SendReminderComponent from "./SendReminderComponent";

export default function VehicleInspectionTab({ driverId }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [notes, setNotes] = useState("");

  const handleSaveNotes = () => {
    console.log("Notes saved:", notes);
  };

  const handleSendReminder = (reminderData) => {
    console.log("Reminder sent:", reminderData);
  };

  return (
    <div className="space-y-6">
      {/* Vehicle Inspection Section */}
      <div className="bg-white rounded-lg p-6 border border-[var(--gray-200)] shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <RiCarLine className="w-5 h-5 text-[var(--blue-600)]" />
          <h3 className="text-lg font-semibold text-[var(--heading)]">Vehicle Inspection</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="inspection-scheduled"
              checked={!isCompleted}
              onChange={(e) => setIsCompleted(!e.target.checked)}
              className="w-4 h-4 text-[var(--blue-600)] border-[var(--gray-300)] focus:ring-[var(--blue-600)]"
            />
            <label htmlFor="inspection-scheduled" className="text-sm text-[var(--gray-700)]">
              Vehicle inspection scheduled
            </label>
          </div>
          
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="inspection-completed"
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
              className="w-4 h-4 text-[var(--blue-600)] border-[var(--gray-300)] focus:ring-[var(--blue-600)]"
            />
            <label htmlFor="inspection-completed" className="text-sm text-[var(--gray-700)]">
              Vehicle inspection completed
            </label>
          </div>
          
          <Button
            variant="secondary"
            size="sm"
            className="flex items-center gap-2"
          >
            <RiUploadLine className="w-4 h-4" />
            Upload Inspection Document
          </Button>
        </div>
      </div>

      {/* Notes Section */}
      <div className="bg-white rounded-lg p-6 border border-[var(--gray-200)] shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <RiFileTextLine className="w-5 h-5 text-[var(--blue-600)]" />
          <h3 className="text-lg font-semibold text-[var(--heading)]">Notes</h3>
        </div>
        
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={4}
          className="w-full p-3 border border-[var(--gray-300)] rounded-md focus:ring-2 focus:ring-[var(--blue-600)] focus:border-[var(--blue-600)] resize-none"
          placeholder="Add notes about this onboarding stage..."
        />
        
        <div className="mt-4">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleSaveNotes}
          >
            Save Notes
          </Button>
        </div>
      </div>

      {/* Send Reminder Section */}
      <SendReminderComponent 
        stepName="Vehicle Inspection"
        onSendReminder={handleSendReminder}
      />
    </div>
  );
}
