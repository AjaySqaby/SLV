"use client";

import { useState } from "react";
import { Calendar, Upload } from "lucide-react";
import BaseModal from "@/components/common/BaseModal";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

export default function DriverDocumentsModal({ isOpen, onClose, driverId }) {
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
        <label className="block text-sm font-medium text-gray-700">
          {title}
        </label>
        <div 
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
            isDragOver 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className={`w-8 h-8 mx-auto mb-3 ${
            isDragOver ? 'text-blue-500' : 'text-gray-400'
          }`} />
          <p className={`mb-1 ${
            isDragOver ? 'text-blue-500' : 'text-gray-500'
          }`}>
            Click to upload or drag and drop
          </p>
          <p className="text-sm text-gray-400">PDF, JPG or PNG (max 5MB)</p>
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
            <p className="mt-2 text-sm text-green-600">
              ✓ {file.name}
            </p>
          )}
        </div>
      </div>
    );
  };

  if (!isOpen || !driverId) return null;

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Driver Documents" 
      size="xl" 
      widthClass="w-full max-w-[1000px]"
    >
      <div className="max-h-[80vh] overflow-y-auto space-y-8">
        
        {/* Driver's License Section */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900">Driver's License</h2>
          
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
              icon={<Calendar className="w-4 h-4 text-gray-400" />}
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
        <div className="space-y-6 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Vehicle Insurance</h2>
          
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
              icon={<Calendar className="w-4 h-4 text-gray-400" />}
            />
            
            <Input
              type="date"
              label="Valid To"
              placeholder="Pick a date"
              value={formData.insuranceValidTo}
              onChange={(e) => handleInputChange("insuranceValidTo", e.target.value)}
              icon={<Calendar className="w-4 h-4 text-gray-400" />}
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
        <div className="space-y-6 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Primary Vehicle Registration</h2>
          
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
              icon={<Calendar className="w-4 h-4 text-gray-400" />}
            />
            
            <Input
              type="date"
              label="Valid To"
              placeholder="Pick a date"
              value={formData.registrationValidTo}
              onChange={(e) => handleInputChange("registrationValidTo", e.target.value)}
              icon={<Calendar className="w-4 h-4 text-gray-400" />}
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
        <div className="space-y-6 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">Primary Vehicle Inspection</h2>
          
          <FileUploadArea 
            title="Upload Inspection Document" 
            field="inspectionFile"
            file={formData.inspectionFile}
          />
        </div>

        {/* Bottom Navigation Buttons */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>
          
          <Button
            variant="primary"
            onClick={() => {
              // Handle form submission
              console.log("Form data:", formData);
              onClose();
            }}
          >
            Save Documents
          </Button>
        </div>
      </div>
    </BaseModal>
  );
}
