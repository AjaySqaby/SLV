"use client";
import { useState } from "react";
import { RiRefreshLine } from "react-icons/ri";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function SendReminderComponent({ 
  driverName = "Sam Kebede",
  driverEmail = "sam.kebede@example.com",
  stepName = "Background Check",
  onSendReminder 
}) {
  const [reminderData, setReminderData] = useState({
    email: driverEmail,
    subject: `Reminder: Complete ${stepName} for onboarding.`,
    message: `Hi ${driverName},

This is a reminder to complete your ${stepName.toLowerCase()} for the onboarding process. Please complete this step as soon as possible.

Thank you!`
  });

  const handleSendReminder = () => {
    if (onSendReminder) {
      onSendReminder(reminderData);
    } else {
      console.log("Reminder sent:", reminderData);
    }
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-[var(--gray-200)] shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <RiRefreshLine className="w-5 h-5 text-[var(--blue-600)]" />
        <h3 className="text-lg font-semibold text-[var(--heading)]">Send Reminder</h3>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[var(--gray-700)] mb-1">
            Email
          </label>
          <Input
            type="email"
            value={reminderData.email}
            onChange={(e) => setReminderData({...reminderData, email: e.target.value})}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[var(--gray-700)] mb-1">
            Subject
          </label>
          <Input
            type="text"
            value={reminderData.subject}
            onChange={(e) => setReminderData({...reminderData, subject: e.target.value})}
            className="w-full"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[var(--gray-700)] mb-1">
            Message
          </label>
          <textarea
            value={reminderData.message}
            onChange={(e) => setReminderData({...reminderData, message: e.target.value})}
            rows={6}
            className="w-full p-3 border border-[var(--gray-300)] rounded-md focus:ring-2 focus:ring-[var(--blue-600)] focus:border-[var(--blue-600)] resize-none"
          />
        </div>
        
        <Button
          variant="primary"
          size="lg"
          onClick={handleSendReminder}
          className="w-full"
        >
          Send Reminder
        </Button>
      </div>
    </div>
  );
}
