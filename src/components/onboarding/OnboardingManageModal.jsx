"use client";
import { ArrowLeft, CheckCircle, Clock, RefreshCw, X, Pencil } from "lucide-react";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import Collapse from "@/components/ui/Collapse";
import { useState } from "react";
import BackgroundCheckTab from "@/components/drivers/onboarding-tabs/BackgroundCheckTab";
import FingerprintingTab from "@/components/drivers/onboarding-tabs/FingerprintingTab";
import DocumentCollectionTab from "@/components/drivers/onboarding-tabs/DocumentCollectionTab";
import MedicalDrugTestsTab from "@/components/drivers/onboarding-tabs/MedicalDrugTestsTab";
import VehicleInspectionTab from "@/components/drivers/onboarding-tabs/VehicleInspectionTab";
import TrainingAssessmentsTab from "@/components/drivers/onboarding-tabs/TrainingAssessmentsTab";
import SummaryTab from "@/components/drivers/onboarding-tabs/SummaryTab";

export default function OnboardingManageModal({ open, onClose, driver }) {
  // Guard before any hooks to satisfy Rules of Hooks when modal is closed
  if (!open || !driver) return null;
  
  const [activeTab, setActiveTab] = useState("background-check");
  const [openCollapse, setOpenCollapse] = useState(null);

  // Accordion state - only one collapse can be open at a time
  const handleCollapseToggle = (collapseId) => {
    setOpenCollapse(openCollapse === collapseId ? null : collapseId);
  };

  // Mock data - in real app, this would come from API
  const steps = [
    { id: "background-check", name: "Background Check", completed: false, required: true },
    { id: "fingerprinting", name: "Fingerprinting", completed: false, required: true },
    { id: "document-collection", name: "Document Collection", completed: false, required: true },
    { id: "medical-drug-tests", name: "Medical & Drug Tests", completed: false, required: true },
    { id: "vehicle-inspection", name: "Vehicle Inspection", completed: false, required: true },
    { id: "training-assessments", name: "Training & Assessments", completed: false, required: true },
    { id: "summary", name: "Summary", completed: false, required: true },
  ];

  const driverData = {
    id: driver.id,
    name: driver.name,
    startDate: driver.startDate,
    progress: driver.progress,
    status: driver.status,
    dueDate: "Apr 15, 2023",
    email: "sam.kebede@example.com",
    completedSteps: steps.filter(s => s.completed).length,
    totalSteps: steps.length,
    estimatedCompletion: "May 15, 2023",
    steps: steps
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
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl !max-w-[82rem] mx-4 w-full h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b flex-shrink-0" style={{ borderColor: '#e5e7eb' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: '#8b5cf6' }}>
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: '#111827' }}>{driverData.name} - Onboarding</h2>
              <p style={{ color: '#6b7280' }}>Driver ID: {driverData.id} | Started: {driverData.startDate}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Close"
              title="Close"
            >
              <X className="w-6 h-6" style={{ color: '#6b7280' }} />
            </button>
          </div>
        </div>

        {/* Collapse - Onboarding Information */}
        <div className="px-6 pt-4">
          <Collapse 
            title="Onboarding Details" 
            icon={<CheckCircle className="w-4 h-4 text-purple-600" />}
            isOpen={openCollapse === 'onboarding-info'}
            onToggle={() => handleCollapseToggle('onboarding-info')}
          >
            <div className="space-y-6">
              {/* Driver Profile Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full border border-[var(--gray-200)] overflow-hidden bg-[var(--gray-100)] flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-[var(--purple-600)]" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-2xl text-[var(--primary-black)]">{driverData.name}</div>
                    <div className="text-sm text-[var(--muted-text)]">Driver ID: {driverData.id}</div>
                    <div className="text-sm text-[var(--muted-text)]">Started: {driverData.startDate}</div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="bg-[var(--green)] text-white px-3 py-1 rounded-full text-sm font-medium" style={{ minWidth: '87px', minHeight: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
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
              <div className="pt-4 border-t border-[var(--gray-200)]">
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
              <div className="pt-4 border-t border-[var(--gray-200)]">
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
          </Collapse>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-2 mt-4 ml-8 flex-shrink-0 overflow-x-auto pb-2">
          <button 
            onClick={() => setActiveTab('background-check')}
            className="px-6 py-3 text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:opacity-90 whitespace-nowrap"
            style={{
              backgroundColor: activeTab === 'background-check' ? '#8b5cf6' : '#f3f4f6',
              color: activeTab === 'background-check' ? '#ffffff' : '#6b7280',
              border: activeTab === 'background-check' ? 'none' : '1px solid #e5e7eb',
              borderRadius: '12px'
            }}
          >
            <CheckCircle className="w-4 h-4" />
            <span>Background Check</span>
          </button>
          <button 
            onClick={() => setActiveTab('fingerprinting')}
            className="px-6 py-3 text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:opacity-90 whitespace-nowrap"
            style={{
              backgroundColor: activeTab === 'fingerprinting' ? '#8b5cf6' : '#f3f4f6',
              color: activeTab === 'fingerprinting' ? '#ffffff' : '#6b7280',
              border: activeTab === 'fingerprinting' ? 'none' : '1px solid #e5e7eb',
              borderRadius: '12px'
            }}
          >
            <CheckCircle className="w-4 h-4" />
            <span>Fingerprinting</span>
          </button>
          <button 
            onClick={() => setActiveTab('document-collection')}
            className="px-6 py-3 text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:opacity-90 whitespace-nowrap"
            style={{
              backgroundColor: activeTab === 'document-collection' ? '#8b5cf6' : '#f3f4f6',
              color: activeTab === 'document-collection' ? '#ffffff' : '#6b7280',
              border: activeTab === 'document-collection' ? 'none' : '1px solid #e5e7eb',
              borderRadius: '12px'
            }}
          >
            <CheckCircle className="w-4 h-4" />
            <span>Document Collection</span>
          </button>
          <button 
            onClick={() => setActiveTab('medical-drug-tests')}
            className="px-6 py-3 text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:opacity-90 whitespace-nowrap"
            style={{
              backgroundColor: activeTab === 'medical-drug-tests' ? '#8b5cf6' : '#f3f4f6',
              color: activeTab === 'medical-drug-tests' ? '#ffffff' : '#6b7280',
              border: activeTab === 'medical-drug-tests' ? 'none' : '1px solid #e5e7eb',
              borderRadius: '12px'
            }}
          >
            <CheckCircle className="w-4 h-4" />
            <span>Medical & Drug Tests</span>
          </button>
          <button 
            onClick={() => setActiveTab('vehicle-inspection')}
            className="px-6 py-3 text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:opacity-90 whitespace-nowrap"
            style={{
              backgroundColor: activeTab === 'vehicle-inspection' ? '#8b5cf6' : '#f3f4f6',
              color: activeTab === 'vehicle-inspection' ? '#ffffff' : '#6b7280',
              border: activeTab === 'vehicle-inspection' ? 'none' : '1px solid #e5e7eb',
              borderRadius: '12px'
            }}
          >
            <CheckCircle className="w-4 h-4" />
            <span>Vehicle Inspection</span>
          </button>
          <button 
            onClick={() => setActiveTab('training-assessments')}
            className="px-6 py-3 text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:opacity-90 whitespace-nowrap"
            style={{
              backgroundColor: activeTab === 'training-assessments' ? '#8b5cf6' : '#f3f4f6',
              color: activeTab === 'training-assessments' ? '#ffffff' : '#6b7280',
              border: activeTab === 'training-assessments' ? 'none' : '1px solid #e5e7eb',
              borderRadius: '12px'
            }}
          >
            <CheckCircle className="w-4 h-4" />
            <span>Training & Assessments</span>
          </button>
          <button 
            onClick={() => setActiveTab('summary')}
            className="px-6 py-3 text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:opacity-90 whitespace-nowrap"
            style={{
              backgroundColor: activeTab === 'summary' ? '#8b5cf6' : '#f3f4f6',
              color: activeTab === 'summary' ? '#ffffff' : '#6b7280',
              border: activeTab === 'summary' ? 'none' : '1px solid #e5e7eb',
              borderRadius: '12px'
            }}
          >
            <CheckCircle className="w-4 h-4" />
            <span>Summary</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1 min-h-0">
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
  );
}
