"use client";

import { useState } from "react";
import { CheckCircle, Clock, RefreshCw } from "lucide-react";
import BaseModal from "@/components/common/BaseModal";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import BackgroundCheckTab from "@/components/drivers/onboarding-tabs/BackgroundCheckTab";
import FingerprintingTab from "@/components/drivers/onboarding-tabs/FingerprintingTab";
import DocumentCollectionTab from "@/components/drivers/onboarding-tabs/DocumentCollectionTab";
import MedicalDrugTestsTab from "@/components/drivers/onboarding-tabs/MedicalDrugTestsTab";
import VehicleInspectionTab from "@/components/drivers/onboarding-tabs/VehicleInspectionTab";
import TrainingAssessmentsTab from "@/components/drivers/onboarding-tabs/TrainingAssessmentsTab";
import SummaryTab from "@/components/drivers/onboarding-tabs/SummaryTab";

export default function DriverOnboardingModal({ isOpen, onClose, driverId }) {
  const [activeTab, setActiveTab] = useState("background-check");

  // Mock data - in real app, this would come from API
  const driverData = {
    id: driverId,
    name: "Sam Kebede",
    startDate: "3/15/2023",
    progress: 20,
    status: "Just Started",
    dueDate: "Apr 15, 2023",
    email: "sam.kebede@example.com",
    steps: [
      { id: "background-check", name: "Background Check", completed: false, required: true },
      { id: "fingerprinting", name: "Fingerprinting", completed: false, required: true },
      { id: "document-collection", name: "Document Collection", completed: false, required: true },
      { id: "medical-drug-tests", name: "Medical & Drug Tests", completed: false, required: true },
      { id: "vehicle-inspection", name: "Vehicle Inspection", completed: false, required: true },
      { id: "training-assessments", name: "Training & Assessments", completed: false, required: true },
      { id: "summary", name: "Summary", completed: false, required: true },
    ]
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Just Started":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
      case "In Progress":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            {status}
          </span>
        );
      case "Almost Complete":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {status}
          </span>
        );
      case "Completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "green";
    if (progress >= 60) return "blue";
    if (progress >= 40) return "yellow";
    return "gray";
  };

  if (!isOpen || !driverId) return null;

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={`${driverData.name} - Onboarding`} 
      size="xl" 
      widthClass="w-full max-w-[1200px]"
    >
      <div className="max-h-[80vh] overflow-y-auto space-y-6">
        
        {/* Driver Info */}
        <div className="text-sm text-gray-500">
          Driver ID: {driverData.id} | Started: {driverData.startDate}
        </div>

        {/* Driver Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Driver Name</h3>
            <p className="text-lg font-semibold text-gray-900">{driverData.name}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Start Date</h3>
            <p className="text-lg font-semibold text-gray-900">{driverData.startDate}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
            <div className="mt-1">{getStatusBadge(driverData.status)}</div>
          </div>
        </div>

        {/* Progress Overview */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Onboarding Progress</h3>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-lg font-bold text-gray-900">
              {driverData.progress}% Complete
            </span>
            <div className="flex-1">
              <ProgressBar
                progress={driverData.progress}
                className="h-3"
                color={getProgressColor(driverData.progress)}
              />
            </div>
          </div>
          
          {/* Due Date */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <h4 className="font-medium text-gray-900">Due Date</h4>
              <p className="text-sm text-gray-500">Set a deadline for completing onboarding</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-gray-900">{driverData.dueDate}</span>
              <Clock className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 overflow-x-auto">
            {driverData.steps.map((step) => (
              <button
                key={step.id}
                onClick={() => setActiveTab(step.id)}
                className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors whitespace-nowrap ${
                  activeTab === step.id
                    ? 'border-blue-500 text-blue-500'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {step.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === "background-check" && (
            <BackgroundCheckTab driverId={driverId} />
          )}
          {activeTab === "fingerprinting" && (
            <FingerprintingTab driverId={driverId} />
          )}
          {activeTab === "document-collection" && (
            <DocumentCollectionTab driverId={driverId} />
          )}
          {activeTab === "medical-drug-tests" && (
            <MedicalDrugTestsTab driverId={driverId} />
          )}
          {activeTab === "vehicle-inspection" && (
            <VehicleInspectionTab driverId={driverId} />
          )}
          {activeTab === "training-assessments" && (
            <TrainingAssessmentsTab driverId={driverId} />
          )}
          {activeTab === "summary" && (
            <SummaryTab driverId={driverId} />
          )}
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <Button variant="outline" icon={<Clock size={16} />}>
            View History
          </Button>
          <Button variant="outline" icon={<RefreshCw size={16} />}>
            Start Recertification
          </Button>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </BaseModal>
  );
}
