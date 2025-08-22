"use client";
import { ArrowLeft, CheckCircle, Clock, RefreshCw } from "lucide-react";
import Link from "next/link";
import PageLayout from "@/components/layout/page-layout";
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

export default function DriverOnboardingDetailPage({ params }) {
  const [activeTab, setActiveTab] = useState("background-check");

  // Mock data - in real app, this would come from API
  const driverData = {
    id: params.id,
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

  return (
    <PageLayout activePage="Onboarding" pageTitle="Driver Onboarding">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/onboarding"
              className="flex items-center text-[var(--gray-500)] hover:text-[var(--gray-700)] transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
            </Link>
            <div className="flex items-center gap-3">
              <CheckCircle className="h-5 w-5 text-[var(--blue-500)]" />
              <h1 className="text-2xl font-bold text-[var(--heading)]">
                {driverData.name} - Onboarding
              </h1>
            </div>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" icon={<Clock size={16} />}>
              View History
            </Button>
            <Button variant="outline" icon={<RefreshCw size={16} />}>
              Start Recertification
            </Button>
          </div>
        </div>

        {/* Driver Info */}
        <div className="text-sm text-[var(--muted-text)]">
          Driver ID: {driverData.id} | Started: {driverData.startDate}
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-[var(--card-border)] p-6 space-y-6">
          
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
              <BackgroundCheckTab driverId={params.id} />
            )}
            {activeTab === "fingerprinting" && (
              <FingerprintingTab driverId={params.id} />
            )}
            {activeTab === "document-collection" && (
              <DocumentCollectionTab driverId={params.id} />
            )}
            {activeTab === "medical-drug-tests" && (
              <MedicalDrugTestsTab driverId={params.id} />
            )}
            {activeTab === "vehicle-inspection" && (
              <VehicleInspectionTab driverId={params.id} />
            )}
            {activeTab === "training-assessments" && (
              <TrainingAssessmentsTab driverId={params.id} />
            )}
            {activeTab === "summary" && (
              <SummaryTab driverId={params.id} />
            )}
          </div>

        
        </div>
      </div>
    </PageLayout>
  );
}
