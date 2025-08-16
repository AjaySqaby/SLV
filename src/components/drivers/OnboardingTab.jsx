"use client";
import { RiUserAddLine, RiCheckLine, RiTimeLine, RiCalendarLine, RiDownloadLine, RiEyeLine } from "react-icons/ri";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge";

export default function OnboardingTab({ driverId }) {
  // Real data from user
  const onboardingData = {
    startDate: "03/15/2025",
    completion: 65,
    steps: [
      {
        name: "Background Check",
        status: "Completed",
        documents: ["background_check.pdf"]
      },
      {
        name: "Fingerprinting",
        status: "Completed",
        subStatus: "Scheduled",
        documents: ["fingerprint_results.pdf"]
      },
      {
        name: "Document Collection",
        status: "Pending",
        subItems: [
          { name: "Registration", status: "Completed" },
          { name: "Vehicle Photo", status: "Pending" },
          { name: "Insurance", status: "Completed" },
          { name: "Profile Photo", status: "Completed" }
        ]
      },
      {
        name: "Medical Exam",
        status: "Pending",
        subStatus: "Scheduled"
      },
      {
        name: "Drug & Alcohol Test",
        status: "Pending",
        subStatus: "Not Scheduled"
      },
      {
        name: "Vehicle Inspection",
        status: "Pending",
        subStatus: "Not Scheduled"
      }
    ]
  };

  const getStatusType = (status) => {
    switch (status) {
      case "Completed":
        return "active";
      case "Pending":
        return "warning";
      case "Scheduled":
        return "info";
      case "Not Scheduled":
        return "inactive";
      default:
        return "default";
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">
          Onboarding Progress
        </h3>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" className="flex items-center gap-2">
            <RiTimeLine className="w-4 h-4" />
            View History
          </Button>
          <Button variant="primary" size="sm" className="flex items-center gap-2">
            <RiUserAddLine className="w-4 h-4" />
            View Full Onboarding
          </Button>
        </div>
      </div>

      {/* Progress Header */}
      <div className="bg-white rounded-lg p-6 border border-gray-200 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600">Started on {onboardingData.startDate}</p>
            <p className="text-lg font-semibold text-gray-900">Completion: {onboardingData.completion}%</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-amber-500 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${onboardingData.completion}%` }}
          ></div>
        </div>
      </div>

      {/* Onboarding Steps */}
      <div className="space-y-4">
        {onboardingData.steps.map((step, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">{step.name}</h4>
              <div className="flex gap-2">
                <StatusBadge status={step.status} type={getStatusType(step.status)} />
                {step.subStatus && (
                  <StatusBadge status={step.subStatus} type={getStatusType(step.subStatus)} />
                )}
              </div>
            </div>

            {/* Sub-items for Document Collection */}
            {step.subItems && (
              <div className="space-y-2">
                {step.subItems.map((subItem, subIndex) => (
                  <div key={subIndex} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">{subItem.name}:</span>
                    <StatusBadge status={subItem.status} type={getStatusType(subItem.status)} />
                  </div>
                ))}
              </div>
            )}

            {/* Documents */}
            {step.documents && step.documents.length > 0 && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <RiDownloadLine className="w-4 h-4" />
                  {step.documents.map((doc, docIndex) => (
                    <span key={docIndex} className="text-blue-600 hover:underline cursor-pointer">
                      {doc}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
