"use client";
import { useState } from "react";
import { RiArrowLeftLine, RiCheckLine, RiRefreshLine, RiTimeLine } from "react-icons/ri";
import { useRouter } from "next/navigation";
import Tabs from "@/components/ui/Tabs";
import Button from "@/components/ui/Button";
import BackgroundCheckTab from "./onboarding-tabs/BackgroundCheckTab";
import FingerprintingTab from "./onboarding-tabs/FingerprintingTab";
import DocumentCollectionTab from "./onboarding-tabs/DocumentCollectionTab";
import MedicalDrugTestsTab from "./onboarding-tabs/MedicalDrugTestsTab";
import VehicleInspectionTab from "./onboarding-tabs/VehicleInspectionTab";
import TrainingAssessmentsTab from "./onboarding-tabs/TrainingAssessmentsTab";
import SummaryTab from "./onboarding-tabs/SummaryTab";

export default function OnboardingDetailsContent({ driverId }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [onboardingData, setOnboardingData] = useState({
    driverName: "Sam Kebede",
    driverId: "D-001",
    startDate: "3/15/2023",
    completion: 20,
    dueDate: "Apr 15, 2023"
  });

  const tabs = [
    { id: 0, label: "Background Check" },
    { id: 1, label: "Fingerprinting" },
    { id: 2, label: "Document Collection" },
    { id: 3, label: "Medical & Drug Tests" },
    { id: 4, label: "Vehicle Inspection" },
    { id: 5, label: "Training & Assessments" },
    { id: 6, label: "Summary" }
  ];

  const handleTabChange = (index) => {
    setActiveTab(index);
  };

  const handleBack = () => {
    router.back();
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <BackgroundCheckTab driverId={driverId} />;
      case 1:
        return <FingerprintingTab driverId={driverId} />;
      case 2:
        return <DocumentCollectionTab driverId={driverId} />;
      case 3:
        return <MedicalDrugTestsTab driverId={driverId} />;
      case 4:
        return <VehicleInspectionTab driverId={driverId} />;
      case 5:
        return <TrainingAssessmentsTab driverId={driverId} />;
      case 6:
        return <SummaryTab driverId={driverId} />;
      default:
        return <BackgroundCheckTab driverId={driverId} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleBack}
            className="flex items-center gap-2"
          >
            <RiArrowLeftLine className="w-4 h-4" />
            Back
          </Button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
              <RiCheckLine className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {onboardingData.driverName} - Onboarding
              </h1>
              <p className="text-sm text-gray-600">
                Driver ID: {onboardingData.driverId} | Started: {onboardingData.startDate}
              </p>
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            className="flex items-center gap-2"
          >
            <RiTimeLine className="w-4 h-4" />
            View History
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="flex items-center gap-2"
          >
            <RiRefreshLine className="w-4 h-4" />
            Start Recertification
          </Button>
        </div>
      </div>

      {/* Progress Card */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Onboarding Progress
        </h3>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="text-2xl font-bold text-blue-600">
              {onboardingData.completion}%
            </div>
            <div className="text-sm text-gray-600">Complete</div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Due Date:</span>
            <span className="text-sm font-medium text-gray-900">
              {onboardingData.dueDate}
            </span>
          </div>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${onboardingData.completion}%` }}
          ></div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <Tabs 
            tabs={tabs} 
            activeTab={activeTab} 
            onChange={handleTabChange}
          />
        </div>
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
