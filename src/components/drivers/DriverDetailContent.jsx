"use client";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import DriverTabs from "./DriverTabs";
import DriverProfileHeader from "./DriverProfileHeader";
import DriverInformation from "./DriverInformation";
import VehicleInformation from "./VehicleInformation";
import TransportationSummary from "./TransportationSummary";
import UpcomingRidesTab from "./UpcomingRidesTab";
import CompletedRidesTab from "./CompletedRidesTab";
import AssignedRoutesTab from "./AssignedRoutesTab";
import MaintenanceTab from "./MaintenanceTab";
import OnboardingTab from "./OnboardingTab";
import BlockedStudentsTab from "./BlockedStudentsTab";

// Mock data - in real app, this would come from API
const getDriverData = (driverId) => {
  const drivers = {
    "D-001": {
      id: "D-001",
      name: "Sam Kebede",
      phone: "(404) 555-1234",
      email: "sam.k@example.com",
      address: "789 Peachtree St, Atlanta, GA",
      licenseNumber: "GA-DL-123456789",
      licenseExpires: "2026-05-15",
      vehicle: {
        make: "Ford Transit",
        year: 2023,
        licensePlate: "GEO-1234",
        type: "Van",
        color: "White"
      },
      totalRides: 156,
      upcomingRides: 1,
      assignedRoutes: 2,
      status: "Active"
    }
    // Add more drivers as needed
  };
  
  return drivers[driverId] || null;
};

export default function DriverDetailContent({ driverId }) {
  const [activeTab, setActiveTab] = useState("upcoming-rides");
  const driverData = getDriverData(driverId);
  
  if (!driverData) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="text-center text-gray-500">Driver not found</div>
      </div>
    );
  }

  const tabs = [
    { id: "upcoming-rides", label: "Upcoming Rides", count: 1 },
    { id: "completed-rides", label: "Completed Rides", count: null },
    { id: "assigned-routes", label: "Assigned Routes", count: null },
    { id: "maintenance", label: "Maintenance", count: null },
    { id: "onboarding", label: "Onboarding", count: null },
    { id: "blocked-students", label: "Blocked Students", count: null }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "upcoming-rides":
        return <UpcomingRidesTab driverId={driverId} />;
      case "completed-rides":
        return <CompletedRidesTab driverId={driverId} />;
      case "assigned-routes":
        return <AssignedRoutesTab driverId={driverId} />;
      case "maintenance":
        return <MaintenanceTab driverId={driverId} />;
      case "onboarding":
        return <OnboardingTab driverId={driverId} />;
      case "blocked-students":
        return <BlockedStudentsTab driverId={driverId} />;
      default:
        return <UpcomingRidesTab driverId={driverId} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Back Navigation */}
      <div className="flex items-center">
        <Link 
          href="/drivers" 
          className="flex items-center text-[var(--gray-500)] hover:text-[var(--gray-700)] transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          Back to Drivers
        </Link>
      </div>

      {/* Driver Profile Header */}
      <DriverProfileHeader driverData={driverData} />

      {/* Main Content */}
      <div className="space-y-6">
        <DriverInformation driverData={driverData} />
        <VehicleInformation driverData={driverData} />
        <TransportationSummary driverData={driverData} />
      </div>

      {/* Tabs Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">

        {/* Tabs */}
        <div className="border-b border-gray-200">
          <DriverTabs 
            tabs={tabs} 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          />
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
