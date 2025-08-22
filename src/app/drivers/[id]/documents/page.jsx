"use client";
import React, { useState } from "react";
import { ArrowLeft, Calendar, Upload } from "lucide-react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import PageLayout from "@/components/layout/page-layout";

export default function DriverDocumentsPage({ params }) {
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
    <PageLayout activePage="Drivers" pageTitle="Driver Documents">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href={`/drivers/${params.id}`}
              className="flex items-center text-[var(--gray-500)] hover:text-[var(--gray-700)] transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back to Driver Details
            </Link>
            <h1 className="text-2xl font-bold text-[var(--blue-500)]">Driver Documents</h1>
          </div>
          <div className="text-sm text-[var(--muted-text)]">
            Step 3 of 3: Documentation
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-lg shadow-sm border border-[var(--card-border)] p-6 space-y-8">
          
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

          {/* Bottom Navigation Buttons */}
          <div className="flex justify-between pt-6 border-t border-[var(--gray-200)]">
            <Button
              variant="secondary"
              onClick={() => window.history.back()}
            >
              Back
            </Button>
            
            <Button
              variant="primary"
              onClick={() => {
                // Handle form submission
                console.log("Form data:", formData);
              }}
            >
              Complete Registration
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
