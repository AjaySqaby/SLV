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
          {/* Main Onboarding Details Card - Single Card Design */}
          <div className="bg-white rounded-lg shadow-sm border border-[var(--gray-200)] p-6 mb-8">
            {/* Header Section */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--blue-600)' }}>
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold">Onboarding Details</h3>
            </div>

            {/* Driver Profile Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border border-[var(--gray-200)] overflow-hidden bg-[var(--gray-100)] flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-[var(--blue-600)]" />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-2xl text-[var(--primary-black)]">{driverData.name}</div>
                  <div className="text-sm text-[var(--muted-text)]">Driver ID: {driverData.id}</div>
                  <div className="text-sm text-[var(--muted-text)]">Started: {driverData.startDate}</div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <div className="bg-[var(--green)] text-white px-3 py-1 rounded-full text-sm font-medium">
                  {driverData.status}
                </div>
                <div className="text-sm text-[var(--muted-text)]">
                  Progress: {driverData.progress}%
                </div>
              </div>
            </div>

            {/* Driver Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--blue-100)] flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-[var(--blue-600)]" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-[var(--muted-text)]">DRIVER NAME</div>
                  <div className="text-sm font-medium text-[var(--primary-black)]">{driverData.name}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--green-100)] flex items-center justify-center">
                  <Clock className="w-4 h-4 text-[var(--green-600)]" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-[var(--muted-text)]">START DATE</div>
                  <div className="text-sm font-medium text-[var(--primary-black)]">{driverData.startDate}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--purple-100)] flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-[var(--purple-600)]" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-[var(--muted-text)]">COMPLETED STEPS</div>
                  <div className="text-sm font-medium text-[var(--primary-black)]">{driverData.completedSteps}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--orange-100)] flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-[var(--orange-600)]" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-[var(--muted-text)]">TOTAL STEPS</div>
                  <div className="text-sm font-medium text-[var(--primary-black)]">{driverData.totalSteps}</div>
                </div>
              </div>
            </div>

            {/* Progress Information Section */}
            <div className="mt-6 pt-6 border-t border-[var(--gray-200)]">
              <h4 className="text-md font-semibold text-[var(--primary-black)] mb-4">Progress Overview</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-[var(--muted-text)]">
                    {driverData.completedSteps} of {driverData.totalSteps} steps completed
                  </div>
                  <div className="text-sm font-medium text-[var(--primary-black)]">
                    {driverData.progress}%
                  </div>
                </div>
                <ProgressBar
                  progress={driverData.progress}
                  className="h-3"
                  color={getProgressColor(driverData.progress)}
                />
                <div className="flex justify-between text-sm">
                  <span className="text-[var(--muted-text)]">Progress: {driverData.progress}%</span>
                  <span className="text-[var(--muted-text)]">Estimated completion: {driverData.estimatedCompletion}</span>
                </div>
              </div>
            </div>

            {/* Due Date Section */}
            <div className="mt-6 pt-6 border-t border-[var(--gray-200)]">
              <h4 className="text-md font-semibold text-[var(--primary-black)] mb-4">Due Date Information</h4>
              <div className="flex items-center justify-between p-4 bg-[var(--gray-50)] rounded-lg">
                <div>
                  <div className="font-medium text-[var(--primary-black)]">Due Date</div>
                  <div className="text-sm text-[var(--muted-text)]">Set a deadline for completing onboarding</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[var(--primary-black)]">{driverData.dueDate}</span>
                  <Clock className="h-4 w-4 text-[var(--gray-400)]" />
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-lg">
            <div className="flex items-center space-x-2 mb-6 overflow-x-auto custom-scrollbar">
              <button 
                onClick={() => setActiveTab('background-check')}
                className={`px-6 py-3 text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:opacity-90 rounded-lg whitespace-nowrap ${
                  activeTab === 'background-check' 
                    ? 'text-white' 
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                }`}
                style={activeTab === 'background-check' ? { backgroundColor: 'var(--primary)' } : {}}
              >
                <CheckCircle className="w-4 h-4" />
                Background Check
              </button>
              <button 
                onClick={() => setActiveTab('fingerprinting')}
                className={`px-6 py-3 text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:opacity-90 rounded-lg whitespace-nowrap ${
                  activeTab === 'fingerprinting' 
                    ? 'text-white' 
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                }`}
                style={activeTab === 'fingerprinting' ? { backgroundColor: 'var(--primary)' } : {}}
              >
                <CheckCircle className="w-4 h-4" />
                Fingerprinting
              </button>
              <button 
                onClick={() => setActiveTab('document-collection')}
                className={`px-6 py-3 text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:opacity-90 rounded-lg whitespace-nowrap ${
                  activeTab === 'document-collection' 
                    ? 'text-white' 
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                }`}
                style={activeTab === 'document-collection' ? { backgroundColor: 'var(--primary)' } : {}}
              >
                <CheckCircle className="w-4 h-4" />
                Document Collection
              </button>
              <button 
                onClick={() => setActiveTab('medical-drug-tests')}
                className={`px-6 py-3 text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:opacity-90 rounded-lg whitespace-nowrap ${
                  activeTab === 'medical-drug-tests' 
                    ? 'text-white' 
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                }`}
                style={activeTab === 'medical-drug-tests' ? { backgroundColor: 'var(--primary)' } : {}}
              >
                <CheckCircle className="w-4 h-4" />
                Medical & Drug Tests
              </button>
              <button 
                onClick={() => setActiveTab('vehicle-inspection')}
                className={`px-6 py-3 text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:opacity-90 rounded-lg whitespace-nowrap ${
                  activeTab === 'vehicle-inspection' 
                    ? 'text-white' 
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                }`}
                style={activeTab === 'vehicle-inspection' ? { backgroundColor: 'var(--primary)' } : {}}
              >
                <CheckCircle className="w-4 h-4" />
                Vehicle Inspection
              </button>
              <button 
                onClick={() => setActiveTab('training-assessments')}
                className={`px-6 py-3 text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:opacity-90 rounded-lg whitespace-nowrap ${
                  activeTab === 'training-assessments' 
                    ? 'text-white' 
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                }`}
                style={activeTab === 'training-assessments' ? { backgroundColor: 'var(--primary)' } : {}}
              >
                <CheckCircle className="w-4 h-4" />
                Training & Assessments
              </button>
              <button 
                onClick={() => setActiveTab('summary')}
                className={`px-6 py-3 text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:opacity-90 rounded-lg whitespace-nowrap ${
                  activeTab === 'summary' 
                    ? 'text-white' 
                    : 'bg-gray-100 text-gray-600 border border-gray-200'
                }`}
                style={activeTab === 'summary' ? { backgroundColor: 'var(--primary)' } : {}}
              >
                <CheckCircle className="w-4 h-4" />
                Summary
              </button>
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
