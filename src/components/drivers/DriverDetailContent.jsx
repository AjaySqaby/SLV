"use client";
import React, { useState } from "react";
import { ArrowLeft, X, FileText, Upload, Download, Eye, Trash2, CheckCircle, Calendar } from "lucide-react";
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
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

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

// Driver Documents Form Component
const DriverDocumentsForm = ({ driverData }) => {
  const [formData, setFormData] = useState({
    // Driver's License
    licenseFile: null,
    licenseExpiration: "",
    licenseNumber: "",
    licenseState: "",
    
    // Vehicle Insurance
    insuranceFile: null,
    insuranceValidFrom: "",
    insuranceValidTo: "",
    policyNumber: "",
    
    // Vehicle Registration
    registrationFile: null,
    registrationValidFrom: "",
    registrationValidTo: "",
    licensePlate: "",
    vinNumber: "",
    
    // Vehicle Inspection
    inspectionFile: null
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFileUpload = (field, file) => {
    setFormData(prev => ({
      ...prev,
      [field]: file
    }));
  };

  const states = [
    { value: "AL", label: "Alabama" },
    { value: "AK", label: "Alaska" },
    { value: "AZ", label: "Arizona" },
    { value: "AR", label: "Arkansas" },
    { value: "CA", label: "California" },
    { value: "CO", label: "Colorado" },
    { value: "CT", label: "Connecticut" },
    { value: "DE", label: "Delaware" },
    { value: "FL", label: "Florida" },
    { value: "GA", label: "Georgia" },
    { value: "HI", label: "Hawaii" },
    { value: "ID", label: "Idaho" },
    { value: "IL", label: "Illinois" },
    { value: "IN", label: "Indiana" },
    { value: "IA", label: "Iowa" },
    { value: "KS", label: "Kansas" },
    { value: "KY", label: "Kentucky" },
    { value: "LA", label: "Louisiana" },
    { value: "ME", label: "Maine" },
    { value: "MD", label: "Maryland" },
    { value: "MA", label: "Massachusetts" },
    { value: "MI", label: "Michigan" },
    { value: "MN", label: "Minnesota" },
    { value: "MS", label: "Mississippi" },
    { value: "MO", label: "Missouri" },
    { value: "MT", label: "Montana" },
    { value: "NE", label: "Nebraska" },
    { value: "NV", label: "Nevada" },
    { value: "NH", label: "New Hampshire" },
    { value: "NJ", label: "New Jersey" },
    { value: "NM", label: "New Mexico" },
    { value: "NY", label: "New York" },
    { value: "NC", label: "North Carolina" },
    { value: "ND", label: "North Dakota" },
    { value: "OH", label: "Ohio" },
    { value: "OK", label: "Oklahoma" },
    { value: "OR", label: "Oregon" },
    { value: "PA", label: "Pennsylvania" },
    { value: "RI", label: "Rhode Island" },
    { value: "SC", label: "South Carolina" },
    { value: "SD", label: "South Dakota" },
    { value: "TN", label: "Tennessee" },
    { value: "TX", label: "Texas" },
    { value: "UT", label: "Utah" },
    { value: "VT", label: "Vermont" },
    { value: "VA", label: "Virginia" },
    { value: "WA", label: "Washington" },
    { value: "WV", label: "West Virginia" },
    { value: "WI", label: "Wisconsin" },
    { value: "WY", label: "Wyoming" }
  ];

  const FileUploadArea = ({ title, field, file }) => {
    const fileInputRef = React.useRef(null);
    const [isDragOver, setIsDragOver] = React.useState(false);
    
    const handleDragOver = (e) => {
      e.preventDefault();
      setIsDragOver(true);
    };
    
    const handleDragLeave = (e) => {
      e.preventDefault();
      setIsDragOver(false);
    };
    
    const handleDrop = (e) => {
      e.preventDefault();
      setIsDragOver(false);
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile && (droppedFile.type === 'application/pdf' || droppedFile.type.startsWith('image/'))) {
        handleFileUpload(field, droppedFile);
      }
    };
    
    return (
      <div className="space-y-3">
        <label className="block text-sm font-medium text-[var(--heading)]">
          {title}
        </label>
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
            isDragOver 
              ? 'border-[var(--blue-500)] bg-[var(--blue-100)]' 
              : 'border-[var(--gray-300)] hover:border-[var(--gray-400)]'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className={`w-8 h-8 mx-auto mb-3 ${
            isDragOver ? 'text-[var(--blue-500)]' : 'text-[var(--gray-400)]'
          }`} />
          <p className={`mb-1 ${
            isDragOver ? 'text-[var(--blue-500)]' : 'text-[var(--muted-text)]'
          }`}>
            Click to upload or drag and drop
          </p>
          <p className="text-sm text-[var(--gray-400)]">PDF, JPG or PNG (max 5MB)</p>
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={(e) => handleFileUpload(field, e.target.files[0])}
          />
          <Button
            variant="outline"
            size="sm"
            className="mt-3"
            onClick={(e) => {
              e.stopPropagation();
              fileInputRef.current?.click();
            }}
          >
            Choose File
          </Button>
          {file && (
            <p className="mt-2 text-sm text-[var(--success)]">
              ✓ {file.name}
            </p>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Driver's License Section */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-[var(--heading)]">Driver's License</h2>
        
        <FileUploadArea 
          title="Upload Driver's License" 
          field="licenseFile"
          file={formData.licenseFile}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="date"
            label="License Expiration Date"
            placeholder="Pick a date"
            value={formData.licenseExpiration}
            onChange={(e) => handleInputChange("licenseExpiration", e.target.value)}
            icon={<Calendar className="w-4 h-4 text-[var(--gray-400)]" />}
          />
          
          <Input
            label="License Number"
            placeholder="Enter license number"
            value={formData.licenseNumber}
            onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
          />
          
          <Select
            label="State of Issuing License"
            options={states}
            value={formData.licenseState}
            onChange={(e) => handleInputChange("licenseState", e.target.value)}
            placeholder="Select state"
          />
        </div>
      </div>

      {/* Vehicle Insurance Section */}
      <div className="space-y-6 pt-6 border-t border-[var(--gray-200)]">
        <h2 className="text-lg font-semibold text-[var(--heading)]">Vehicle Insurance</h2>
        
        <FileUploadArea 
          title="Upload Insurance Document" 
          field="insuranceFile"
          file={formData.insuranceFile}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            type="date"
            label="Valid From"
            placeholder="Pick a date"
            value={formData.insuranceValidFrom}
            onChange={(e) => handleInputChange("insuranceValidFrom", e.target.value)}
            icon={<Calendar className="w-4 h-4 text-[var(--gray-400)]" />}
          />
          
          <Input
            type="date"
            label="Valid To"
            placeholder="Pick a date"
            value={formData.insuranceValidTo}
            onChange={(e) => handleInputChange("insuranceValidTo", e.target.value)}
            icon={<Calendar className="w-4 h-4 text-[var(--gray-400)]" />}
          />
          
          <Input
            label="Policy Number"
            placeholder="Enter policy number"
            value={formData.policyNumber}
            onChange={(e) => handleInputChange("policyNumber", e.target.value)}
          />
        </div>
      </div>

      {/* Primary Vehicle Registration Section */}
      <div className="space-y-6 pt-6 border-t border-[var(--gray-200)]">
        <h2 className="text-lg font-semibold text-[var(--heading)]">Primary Vehicle Registration</h2>
        
        <FileUploadArea 
          title="Upload Registration Document" 
          field="registrationFile"
          file={formData.registrationFile}
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="date"
            label="Valid From"
            placeholder="Pick a date"
            value={formData.registrationValidFrom}
            onChange={(e) => handleInputChange("registrationValidFrom", e.target.value)}
            icon={<Calendar className="w-4 h-4 text-[var(--gray-400)]" />}
          />
          
          <Input
            type="date"
            label="Valid To"
            placeholder="Pick a date"
            value={formData.registrationValidTo}
            onChange={(e) => handleInputChange("registrationValidTo", e.target.value)}
            icon={<Calendar className="w-4 h-4 text-[var(--gray-400)]" />}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="License Plate Number"
            placeholder="Enter license plate number"
            value={formData.licensePlate}
            onChange={(e) => handleInputChange("licensePlate", e.target.value)}
          />
          
          <Input
            label="VIN Number"
            placeholder="Enter VIN number"
            value={formData.vinNumber}
            onChange={(e) => handleInputChange("vinNumber", e.target.value)}
          />
        </div>
      </div>

      {/* Primary Vehicle Inspection Section */}
      <div className="space-y-6 pt-6 border-t border-[var(--gray-200)]">
        <h2 className="text-lg font-semibold text-[var(--heading)]">Primary Vehicle Inspection</h2>
        
        <FileUploadArea 
          title="Upload Inspection Document" 
          field="inspectionFile"
          file={formData.inspectionFile}
        />
      </div>
    </div>
  );
};

export default function DriverDetailContent({ driverId }) {
  const [activeTab, setActiveTab] = useState("upcoming-rides");
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);
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

      {/* Driver Profile Header */}
      <DriverProfileHeader driverData={driverData} />

      {/* Main Content */}
      <div className="space-y-6">
        <DriverInformation driverData={driverData} />
        <VehicleInformation driverData={driverData} />
        <TransportationSummary driverData={driverData} onManageDocuments={() => setShowDocumentsModal(true)} />
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

      {/* Documents Modal */}
      {showDocumentsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-[95vw] h-[90vh] max-w-7xl mx-4 overflow-hidden relative">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--gray-200)]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--primary-bg)] rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[var(--primary-black)]">Manage Documents</h2>
                  <p className="text-[var(--muted-text)]">{driverData.name} - {driverData.id}</p>
                </div>
              </div>
              <button
                onClick={() => setShowDocumentsModal(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--hover-bg)] transition-colors"
              >
                <X className="w-6 h-6 text-[var(--gray-500)]" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <DriverDocumentsForm driverData={driverData} />
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-[var(--gray-200)]">
              <Button
                variant="secondary"
                onClick={() => setShowDocumentsModal(false)}
              >
                Close
              </Button>
              <Button
                className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white"
                onClick={() => console.log('Save documents')}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
