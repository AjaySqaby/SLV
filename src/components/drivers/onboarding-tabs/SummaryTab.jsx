"use client";
import { useState } from "react";
import { RiCheckLine, RiCloseLine, RiTimeLine, RiFileTextLine, RiDownloadLine, RiSendPlaneLine } from "react-icons/ri";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge";

export default function SummaryTab({ driverId }) {
  const [onboardingSummary] = useState({
    driverName: "Sam Kebede",
    driverId: "D-001",
    startDate: "3/15/2023",
    dueDate: "Apr 15, 2023",
    overallProgress: 0,
    steps: [
      {
        name: "Background Check",
        status: "Pending",
        notes: "Background check needs to be completed"
      },
      {
        name: "Fingerprinting",
        status: "Pending",
        notes: "Fingerprinting appointment needs to be scheduled"
      },
      {
        name: "Document Collection",
        status: "In Progress",
        notes: "Some documents still pending"
      },
      {
        name: "Medical Exam",
        status: "Pending",
        notes: "Medical exam needs to be scheduled"
      },
      {
        name: "Drug & Alcohol Test",
        status: "Pending",
        notes: "Drug test needs to be scheduled"
      },
      {
        name: "Vehicle Inspection",
        status: "Pending",
        notes: "Vehicle inspection not yet scheduled"
      },
      {
        name: "Training & Assessments",
        status: "In Progress",
        notes: "Training sessions need to be arranged"
      }
    ]
  });

  const getStatusType = (status) => {
    switch (status) {
      case "Completed":
        return "active";
      case "In Progress":
        return "info";
      case "Scheduled":
        return "warning";
      case "Pending":
        return "warning";
      case "Not Started":
        return "inactive";
      default:
        return "default";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Completed":
        return <RiCheckLine className="w-4 h-4 text-[var(--green-600)]" />;
      case "In Progress":
        return <RiTimeLine className="w-4 h-4 text-[var(--blue-600)]" />;
      case "Scheduled":
        return <RiTimeLine className="w-4 h-4 text-[var(--amber-500)]" />;
      case "Pending":
        return <RiTimeLine className="w-4 h-4 text-[var(--amber-500)]" />;
      case "Not Started":
        return <RiCloseLine className="w-4 h-4 text-[var(--gray-400)]" />;
      default:
        return <RiFileTextLine className="w-4 h-4 text-[var(--gray-400)]" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Onboarding Summary Section */}
      <div className="bg-white rounded-lg p-6 border border-[var(--gray-200)] shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <RiFileTextLine className="w-5 h-5 text-[var(--blue-600)]" />
          <h3 className="text-lg font-semibold text-[var(--heading)]">Onboarding Summary</h3>
        </div>
        
        <div className="space-y-4">
          {onboardingSummary.steps.map((step, index) => (
            <div key={index} className="flex items-center justify-between p-3 border border-[var(--gray-200)] rounded-md">
              <div className="flex items-center gap-3">
                {getStatusIcon(step.status)}
                <div>
                  <h5 className="font-medium text-[var(--gray-700)]">{step.name}</h5>
                  <p className="text-sm text-[var(--gray-600)]">{step.notes}</p>
                </div>
              </div>
              <StatusBadge status={step.status} type={getStatusType(step.status)} />
            </div>
          ))}
        </div>
        
        <div className="mt-6 pt-6 border-t border-[var(--gray-200)] text-center">
          <p className="text-sm text-[var(--gray-600)]">
            Complete all onboarding steps to finalize the process.
          </p>
        </div>
      </div>
    </div>
  );
}
