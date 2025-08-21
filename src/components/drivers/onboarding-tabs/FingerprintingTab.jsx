"use client";
import { useState } from "react";
import { RiFileTextLine, RiUploadLine, RiFingerprintLine } from "react-icons/ri";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import SendReminderComponent from "./SendReminderComponent";

export default function FingerprintingTab({ driverId }) {
  const [isCompleted, setIsCompleted] = useState(false);
  const [notes, setNotes] = useState("Scheduled for next week at local police station.");

  const handleSaveNotes = () => {
    console.log("Notes saved:", notes);
  };

  const handleSendReminder = (reminderData) => {
    console.log("Reminder sent:", reminderData);
  };

  return (
    <div className="space-y-6">
      {/* Fingerprinting Section */}
      <div className="bg-white rounded-lg p-6 border border-[var(--gray-200)] shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <RiFingerprintLine className="w-5 h-5 text-[var(--blue-600)]" />
          <h3 className="text-lg font-semibold text-[var(--heading)]">Fingerprinting</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="fingerprinting-scheduled"
              checked={!isCompleted}
              onChange={(e) => setIsCompleted(!e.target.checked)}
              className="w-4 h-4 text-[var(--blue-600)] border-[var(--gray-300)] focus:ring-[var(--blue-600)]"
            />
            <label htmlFor="fingerprinting-scheduled" className="text-sm text-[var(--gray-700)]">
              Fingerprinting scheduled
            </label>
          </div>
          
          <div className="flex items-center gap-3">
            <input
              type="radio"
              id="fingerprinting-completed"
              checked={isCompleted}
              onChange={(e) => setIsCompleted(e.target.checked)}
              className="w-4 h-4 text-[var(--blue-600)] border-[var(--gray-300)] focus:ring-[var(--blue-600)]"
            />
            <label htmlFor="fingerprinting-completed" className="text-sm text-[var(--gray-700)]">
              Fingerprinting completed
            </label>
          </div>
          
          <Button
            variant="secondary"
            size="sm"
            className="flex items-center gap-2"
          >
            <RiUploadLine className="w-4 h-4" />
            Upload Fingerprinting Document
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
          placeholder="Add notes about fingerprinting..."
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
        stepName="Fingerprinting"
        onSendReminder={handleSendReminder}
      />
    </div>
  );
}
