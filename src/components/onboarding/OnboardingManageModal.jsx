"use client";
import { ArrowLeft, CheckCircle, Clock, RefreshCw, X } from "lucide-react";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import { useState } from "react";
import BackgroundCheckTab from "@/components/drivers/onboarding-tabs/BackgroundCheckTab";
import FingerprintingTab from "@/components/drivers/onboarding-tabs/FingerprintingTab";
import DocumentCollectionTab from "@/components/drivers/onboarding-tabs/DocumentCollectionTab";
import MedicalDrugTestsTab from "@/components/drivers/onboarding-tabs/MedicalDrugTestsTab";
import VehicleInspectionTab from "@/components/drivers/onboarding-tabs/VehicleInspectionTab";
import TrainingAssessmentsTab from "@/components/drivers/onboarding-tabs/TrainingAssessmentsTab";
import SummaryTab from "@/components/drivers/onboarding-tabs/SummaryTab";

export default function OnboardingManageModal({ open, onClose, driver }) {
  const [activeTab, setActiveTab] = useState("background-check");

  if (!open || !driver) return null;

  // Mock data - in real app, this would come from API
  const driverData = {
    id: driver.id,
    name: driver.name,
    startDate: driver.startDate,
    progress: driver.progress,
    status: driver.status,
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

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-7xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">{driverData.name} - Onboarding</h2>
              <p className="text-[var(--gray-600)] text-sm">
                Driver ID: {driverData.id} | Started: {driverData.startDate}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" icon={<Clock size={16} />} size="sm">
              View History
            </Button>
            <Button variant="outline" icon={<RefreshCw size={16} />} size="sm">
              Start Recertification
            </Button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors ml-2"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-6 space-y-6">
          {/* Driver Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-[var(--gray-500)] mb-1">Driver Name</h3>
              <p className="text-lg font-semibold text-[var(--heading)]">{driverData.name}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[var(--gray-500)] mb-1">Start Date</h3>
              <p className="text-lg font-semibold text-[var(--heading)]">{driverData.startDate}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-[var(--gray-500)] mb-1">Status</h3>
              <div className="mt-1">{getStatusBadge(driverData.status)}</div>
            </div>
          </div>

          {/* Progress Overview */}
          <div>
            <h3 className="text-lg font-semibold text-[var(--heading)] mb-4">Onboarding Progress</h3>
            <div className="flex items-center gap-4 mb-4">
              <span className="text-lg font-bold text-[var(--heading)]">
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
            <div className="flex items-center justify-between p-4 bg-[var(--gray-50)] rounded-lg">
              <div>
                <h4 className="font-medium text-[var(--heading)]">Due Date</h4>
                <p className="text-sm text-[var(--muted-text)]">Set a deadline for completing onboarding</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-[var(--heading)]">{driverData.dueDate}</span>
                <Clock className="h-4 w-4 text-[var(--gray-400)]" />
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="border-b border-[var(--gray-200)]">
            <div className="flex space-x-8">
              {driverData.steps.map((step) => (
                <button
                  key={step.id}
                  onClick={() => setActiveTab(step.id)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === step.id
                      ? 'border-[var(--blue-500)] text-[var(--blue-500)]'
                      : 'border-transparent text-[var(--gray-500)] hover:text-[var(--gray-700)]'
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
              <BackgroundCheckTab driverId={driverData.id} />
            )}
            {activeTab === "fingerprinting" && (
              <FingerprintingTab driverId={driverData.id} />
            )}
            {activeTab === "document-collection" && (
              <DocumentCollectionTab driverId={driverData.id} />
            )}
            {activeTab === "medical-drug-tests" && (
              <MedicalDrugTestsTab driverId={driverData.id} />
            )}
            {activeTab === "vehicle-inspection" && (
              <VehicleInspectionTab driverId={driverData.id} />
            )}
            {activeTab === "training-assessments" && (
              <TrainingAssessmentsTab driverId={driverData.id} />
            )}
            {activeTab === "summary" && (
              <SummaryTab driverId={driverData.id} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
