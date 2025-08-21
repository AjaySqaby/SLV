"use client";
import { useState } from "react";
import { RiFileTextLine, RiUploadLine, RiFolderLine } from "react-icons/ri";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import SendReminderComponent from "./SendReminderComponent";

export default function DocumentCollectionTab({ driverId }) {
  const [documents, setDocuments] = useState({
    registration: { completed: false, file: null },
    vehiclePhoto: { completed: false, file: null },
    insurance: { completed: false, file: null },
    profilePhoto: { completed: true, file: null }
  });
  
  const [notes, setNotes] = useState("");

  const handleDocumentToggle = (docType) => {
    setDocuments(prev => ({
      ...prev,
      [docType]: { ...prev[docType], completed: !prev[docType].completed }
    }));
  };

  const handleSaveNotes = () => {
    console.log("Notes saved:", notes);
  };

  const handleSendReminder = (reminderData) => {
    console.log("Reminder sent:", reminderData);
  };

  return (
    <div className="space-y-6">
      {/* Document Collection Section */}
      <div className="bg-white rounded-lg p-6 border border-[var(--gray-200)] shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <RiFolderLine className="w-5 h-5 text-[var(--blue-600)]" />
          <h3 className="text-lg font-semibold text-[var(--heading)]">Document Collection</h3>
        </div>
        
        <div className="space-y-4">
          {Object.entries(documents).map(([docType, doc]) => (
            <div key={docType} className="flex items-center justify-between p-3 border border-[var(--gray-200)] rounded-md">
              <div className="flex items-center gap-3">
                <input
                  type="radio"
                  id={`${docType}-completed`}
                  checked={doc.completed}
                  onChange={() => handleDocumentToggle(docType)}
                  className="w-4 h-4 text-[var(--blue-600)] border-[var(--gray-300)] focus:ring-[var(--blue-600)]"
                />
                <label htmlFor={`${docType}-completed`} className="text-sm text-[var(--gray-700)] capitalize">
                  {docType.replace(/([A-Z])/g, ' $1').trim()}
                </label>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="flex items-center gap-2"
              >
                <RiUploadLine className="w-4 h-4" />
                Upload
              </Button>
            </div>
          ))}
          
          <Button
            variant="secondary"
            size="sm"
            className="flex items-center gap-2"
          >
            Skip (Already Collected)
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
        stepName="Document Collection"
        onSendReminder={handleSendReminder}
      />
    </div>
  );
}
