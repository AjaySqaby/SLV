"use client";
import React, { useState } from "react";
import { ArrowLeft, X, FileText, Upload, Download, Eye, Trash2, CheckCircle, Calendar } from "lucide-react";
import { RiCarLine } from "react-icons/ri";
import BaseModal from "@/components/common/BaseModal";
import Link from "next/link";
import DriverTabs from "./DriverTabs";
import DriverProfileHeader from "./DriverProfileHeader";
import DriverInformation from "./DriverInformation";
import VehicleInformation from "./VehicleInformation";
import TransportationSummary from "./TransportationSummary";
import UpcomingRidesTab from "./UpcomingRidesTab";
import CompletedRidesTab from "./CompletedRidesTab";
import AssignedRoutesTab from "./AssignedRoutesTab";
import VehicleInfoStep from "./VehicleInfoStep";
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
  const [showVehicleModal, setShowVehicleModal] = useState(false);
  const [showEditVehicleModal, setShowEditVehicleModal] = useState(false);
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
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
      {/* Driver Profile Header - Redesigned */}
      <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border border-[var(--gray-200)] overflow-hidden bg-[var(--gray-100)] flex items-center justify-center">
              <img
                src={driverData.avatar || "/picture.jpg"}
                alt={driverData.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.querySelector('[data-fallback]')?.classList.remove('hidden');
                }}
              />
              <div data-fallback className="hidden w-full h-full flex items-center justify-center text-2xl font-bold text-[var(--primary)]">
                {driverData.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-2xl text-[var(--primary-black)]">{driverData.name}</div>
              <div className="text-sm text-[var(--muted-text)]">Driver ID: {driverData.id}</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-yellow-500 text-base">★</span>
                <span className="text-sm font-medium text-[var(--primary-black)]">4.9</span>
                <span className="text-xs text-[var(--muted-text)]">/ 5</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="bg-[var(--green)] text-white px-3 py-1 rounded-full text-sm font-medium">
              Active
            </div>
            <div className="flex gap-2">
              <Button className="flex items-center gap-1 bg-[var(--gray-100)] text-[var(--primary-black)] px-3 py-1 rounded font-medium text-sm border border-[var(--gray-200)]" variant="secondary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="mr-1">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                Text
              </Button>
              <Button className="flex items-center gap-1 bg-[var(--blue)] text-white px-3 py-1 rounded font-medium text-sm" variant="primary">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="mr-1">
                  <path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.72 3.06a2 2 0 0 1-.45 2.11l-.27.27a16 16 0 0 0 6.29 6.29l.27-.27a2 2 0 0 1 2.11-.45c.99.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z" />
                </svg>
                Call
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content - Professional grid layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Driver Information */}
        <div className="bg-[var(--surface-bg)] p-6 rounded-lg border border-[var(--gray-200)]">
          <h3 className="text-lg font-semibold mb-4 text-[var(--primary-black)]">Driver Information</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--blue-bg)] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-[var(--blue)]">
                  <path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.72 3.06a2 2 0 0 1-.45 2.11l-.27.27a16 16 0 0 0 6.29 6.29l.27-.27a2 2 0 0 1 2.11-.45c.99.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-[var(--primary-black)]">{driverData.phone}</div>
                <div className="text-sm text-[var(--muted-text)]">Phone Number</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--green-bg)] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-[var(--green)]">
                  <path d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-[var(--primary-black)]">{driverData.email}</div>
                <div className="text-sm text-[var(--muted-text)]">Email Address</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--purple-bg)] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-[var(--purple)]">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-[var(--primary-black)]">{driverData.address}</div>
                <div className="text-sm text-[var(--muted-text)]">Home Address</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--orange-bg)] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-[var(--orange)]">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-[var(--primary-black)]">{driverData.licenseNumber}</div>
                <div className="text-sm text-[var(--muted-text)]">License • Expires: {driverData.licenseExpires}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="bg-[var(--surface-bg)] p-6 rounded-lg border border-[var(--gray-200)]">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-[var(--primary-black)]">Vehicle Information</h3>
            <div className="bg-[var(--green-bg)] text-[var(--green)] px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M5 13l4 4L19 7" />
              </svg>
              Default Vehicle
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--blue-bg)] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-[var(--blue)]">
                  <path d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-[var(--primary-black)]">{driverData.vehicle.make}</div>
                <div className="text-sm text-[var(--muted-text)]">({driverData.vehicle.year})</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--green-bg)] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-[var(--green)]">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-[var(--primary-black)]">{driverData.vehicle.licensePlate}</div>
                <div className="text-sm text-[var(--muted-text)]">License Plate</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--purple-bg)] flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-[var(--purple)]">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <div className="font-medium text-[var(--primary-black)]">{driverData.vehicle.type}</div>
                <div className="text-sm text-[var(--muted-text)]">Vehicle Type</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[var(--orange-bg)] flex items-center justify-center">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: driverData.vehicle.color.toLowerCase() }}></div>
              </div>
              <div>
                <div className="font-medium text-[var(--primary-black)]">{driverData.vehicle.color}</div>
                <div className="text-sm text-[var(--muted-text)]">Color</div>
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-[var(--gray-200)]">
            <Button 
              variant="secondary" 
              className="w-full flex items-center justify-center gap-2 text-[var(--muted-text)] border border-[var(--gray-200)]"
              onClick={() => setShowVehicleModal(true)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Add Another Vehicle
            </Button>
          </div>
        </div>
      </div>

      {/* Transportation Summary */}
      <div className="bg-[var(--surface-bg)] p-6 rounded-lg border border-[var(--gray-200)]">
        <h3 className="text-lg font-semibold mb-4 text-[var(--primary-black)]">Transportation Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[var(--blue-bg)] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-[var(--blue)]">
                <path d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-[var(--primary-black)]">156</div>
              <div className="text-sm text-[var(--muted-text)]">Total Rides</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[var(--green-bg)] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-[var(--green)]">
                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-[var(--primary-black)]">1</div>
              <div className="text-sm text-[var(--muted-text)]">Upcoming Rides</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-[var(--purple-bg)] flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-[var(--purple)]">
                <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
            <div>
              <div className="text-2xl font-bold text-[var(--primary-black)]">2</div>
              <div className="text-sm text-[var(--muted-text)]">Assigned Routes</div>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-[var(--gray-200)] grid grid-cols-1 md:grid-cols-2 gap-3">
          <Button 
            variant="secondary" 
            className="flex items-center justify-center gap-2 text-[var(--muted-text)] border border-[var(--gray-200)]"
            onClick={() => setShowDocumentsModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Manage Documents
          </Button>
          <Button 
            variant="secondary" 
            className="flex items-center justify-center gap-2 text-[var(--muted-text)] border border-[var(--gray-200)]"
            onClick={() => setShowVehicleModal(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Manage Vehicle Information
          </Button>
        </div>
      </div>

      {/* Driver Tabs */}
      <div className="bg-white rounded-lg border border-[var(--gray-200)]">
          <DriverTabs 
            activeTab={activeTab} 
            onTabChange={setActiveTab} 
          tabs={tabs}
          />
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
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowDocumentsModal(false)}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--hover-bg)] transition-colors"
                  aria-label="Back"
                >
                  <X className="w-6 h-6 text-[var(--gray-500)]" />
                </button>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--primary-bg)] rounded-full flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[var(--primary-black)]">Manage Documents</h2>
                  <p className="text-[var(--muted-text)]">{driverData.name} - {driverData.id}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowDocumentsModal(false)}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--hover-bg)] transition-colors"
                aria-label="Close"
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

      {/* Vehicle Management Modal - Using existing BaseModal */}
      <BaseModal
        isOpen={showVehicleModal}
        onClose={() => setShowVehicleModal(false)}
        title="Manage Vehicle Information"
        size="xl"
        widthClass="w-[95vw] h-[90vh] max-w-7xl mx-4 overflow-hidden"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Current Vehicle</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Make/Model:</span>
                  <span className="font-medium">{driverData.vehicle.make} ({driverData.vehicle.year})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Type:</span>
                  <span className="font-medium">{driverData.vehicle.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Color:</span>
                  <span className="font-medium">{driverData.vehicle.color}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">License Plate:</span>
                  <span className="font-medium">{driverData.vehicle.licensePlate}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Vehicle Actions</h3>
              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  variant="primary"
                  onClick={() => {
                    setShowVehicleModal(false);
                    setShowEditVehicleModal(true);
                  }}
                >
                  Edit Vehicle Details
                </Button>
                <Button 
                  className="w-full" 
                  variant="secondary"
                  onClick={() => {
                    setShowVehicleModal(false);
                    setShowAddVehicleModal(true);
                  }}
                >
                  Add Another Vehicle
                </Button>
                <Button 
                  className="w-full" 
                  variant="outline"
                  onClick={() => {
                    console.log('View Vehicle History clicked');
                    // TODO: Open vehicle history modal
                  }}
                >
                  View Vehicle History
                </Button>
              </div>
            </div>
          </div>
        </div>
      </BaseModal>

      {/* Edit Vehicle Modal */}
      <BaseModal
        isOpen={showEditVehicleModal}
        onClose={() => setShowEditVehicleModal(false)}
        title="Edit Vehicle Details"
        size="xl"
        widthClass="w-[95vw] h-[90vh] max-w-7xl mx-4 overflow-hidden flex flex-col"
      >
        <div className="flex-1 overflow-y-auto p-6">
          <VehicleInfoStep
            formData={{
              carMake: driverData.vehicle.make,
              carModel: driverData.vehicle.make, // Using make as model for demo
              carYear: driverData.vehicle.year.toString(),
              carColor: driverData.vehicle.color,
              licensePlate: driverData.vehicle.licensePlate,
              vehicleType: driverData.vehicle.type,
              isDefaultVehicle: true,
              registrationAvailable: true,
            }}
            handleChange={() => {}} // No-op for edit mode
            prevStep={() => setShowEditVehicleModal(false)}
            nextStep={() => {
              console.log('Vehicle updated successfully');
              setShowEditVehicleModal(false);
            }}
          />
        </div>
      </BaseModal>

      {/* Add Vehicle Modal */}
      <BaseModal
        isOpen={showAddVehicleModal}
        onClose={() => setShowAddVehicleModal(false)}
        title="Add Another Vehicle"
        size="xl"
        widthClass="w-[95vw] h-[90vh] max-w-7xl mx-4 overflow-hidden flex flex-col"
      >
        <div className="flex-1 overflow-y-auto p-6">
          <VehicleInfoStep
            formData={{
              carMake: "",
              carModel: "",
              carYear: "",
              carColor: "",
              licensePlate: "",
              vehicleType: "Sedan or 5 Passenger SUV",
              isDefaultVehicle: false,
              registrationAvailable: false,
            }}
            handleChange={() => {}} // No-op for add mode
            prevStep={() => setShowAddVehicleModal(false)}
            nextStep={() => {
              console.log('New vehicle added successfully');
              setShowAddVehicleModal(false);
            }}
          />
        </div>
      </BaseModal>
    </div>
  );
}
