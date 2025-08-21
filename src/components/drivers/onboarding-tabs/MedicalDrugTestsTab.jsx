"use client";
import { useState } from "react";
import { RiFileTextLine, RiUploadLine, RiStethoscopeLine } from "react-icons/ri";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import SendReminderComponent from "./SendReminderComponent";

export default function MedicalDrugTestsTab({ driverId }) {
  const [medicalExam, setMedicalExam] = useState("scheduled");
  const [drugTest, setDrugTest] = useState("scheduled");
  const [notes, setNotes] = useState("");

  const handleSaveNotes = () => {
    console.log("Notes saved:", notes);
  };

  const handleSendReminder = (reminderData) => {
    console.log("Reminder sent:", reminderData);
  };

  return (
    <div className="space-y-6">
      {/* Medical Exam & Drug Tests Section */}
      <div className="bg-white rounded-lg p-6 border border-[var(--gray-200)] shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <RiStethoscopeLine className="w-5 h-5 text-[var(--blue-600)]" />
          <h3 className="text-lg font-semibold text-[var(--heading)]">Medical Exam & Drug Tests</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Medical Exam Column */}
          <div className="space-y-4">
            <h4 className="font-medium text-[var(--gray-700)]">Medical Exam</h4>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="medical-scheduled"
                  checked={medicalExam === "scheduled"}
                  onChange={() => setMedicalExam("scheduled")}
                  className="w-4 h-4 text-[var(--blue-600)] border-[var(--gray-300)] focus:ring-[var(--blue-600)]"
                />
                <label htmlFor="medical-scheduled" className="text-sm text-[var(--gray-700)]">
                  Medical exam scheduled
                </label>
              </div>
              
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="medical-completed"
                  checked={medicalExam === "completed"}
                  onChange={() => setMedicalExam("completed")}
                  className="w-4 h-4 text-[var(--blue-600)] border-[var(--gray-300)] focus:ring-[var(--blue-600)]"
                />
                <label htmlFor="medical-completed" className="text-sm text-[var(--gray-700)]">
                  Medical exam completed
                </label>
              </div>
            </div>
            
            <Button
              variant="secondary"
              size="sm"
              className="flex items-center gap-2"
            >
              <RiUploadLine className="w-4 h-4" />
              Upload Medical Exam Document
            </Button>
          </div>

          {/* Drug & Alcohol Test Column */}
          <div className="space-y-4">
            <h4 className="font-medium text-[var(--gray-700)]">Drug & Alcohol Test</h4>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="drug-scheduled"
                  checked={drugTest === "scheduled"}
                  onChange={() => setDrugTest("scheduled")}
                  className="w-4 h-4 text-[var(--blue-600)] border-[var(--gray-300)] focus:ring-[var(--blue-600)]"
                />
                <label htmlFor="drug-scheduled" className="text-sm text-[var(--gray-700)]">
                  Drug test scheduled
                </label>
              </div>
              
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id="drug-completed"
                  checked={drugTest === "completed"}
                  onChange={() => setDrugTest("completed")}
                  className="w-4 h-4 text-[var(--blue-600)] border-[var(--gray-300)] focus:ring-[var(--blue-600)]"
                />
                <label htmlFor="drug-completed" className="text-sm text-[var(--gray-700)]">
                  Drug test completed
                </label>
              </div>
            </div>
            
            <Button
              variant="secondary"
              size="sm"
              className="flex items-center gap-2"
            >
              <RiUploadLine className="w-4 h-4" />
              Upload Drug Test Document
            </Button>
          </div>
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
        stepName="Medical & Drug Tests"
        onSendReminder={handleSendReminder}
      />
    </div>
  );
}
