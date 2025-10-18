"use client"

import { useState } from "react"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import Button from "@/components/ui/Button"
import { Upload, Calendar, Plus, Trash2 } from "lucide-react"

export default function DriverDocumentsStep({ formData, handleChange, prevStep, handleSubmit }) {
  const [vehicleDocuments, setVehicleDocuments] = useState([
    {
      vehicleId: 1,
      vehicleName: "Vehicle 1",
      registrationDocument: null,
      registrationValidFrom: "",
      registrationValidTo: "",
      registrationLicensePlate: "",
      vinNumber: "",
      inspectionDocument: null,
    }
  ]);
  const stateOptions = [
    { value: "", label: "Select state" },
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
    { value: "WY", label: "Wyoming" },
  ]

  const handleSelectChange = (name, value) => {
    handleChange({ target: { name, value } })
  }

  const handleFileUpload = (name, file) => {
    handleChange({ target: { name, value: file } })
  }

  const addVehicleDocument = () => {
    const newVehicle = {
      vehicleId: vehicleDocuments.length + 1,
      vehicleName: `Vehicle ${vehicleDocuments.length + 1}`,
      registrationDocument: null,
      registrationValidFrom: "",
      registrationValidTo: "",
      registrationLicensePlate: "",
      vinNumber: "",
      inspectionDocument: null,
    };
    setVehicleDocuments([...vehicleDocuments, newVehicle]);
  };

  const removeVehicleDocument = (index) => {
    if (vehicleDocuments.length > 1) {
      const updatedVehicles = vehicleDocuments.filter((_, i) => i !== index);
      setVehicleDocuments(updatedVehicles);
    }
  };

  const updateVehicleDocument = (index, field, value) => {
    const updatedVehicles = vehicleDocuments.map((vehicle, i) => 
      i === index ? { ...vehicle, [field]: value } : vehicle
    );
    setVehicleDocuments(updatedVehicles);
  };

  const FileUploadArea = ({ title, name, description }) => (
    <div className="space-y-4">
      <h3 className="font-medium text-gray-900">{title}</h3>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors cursor-pointer">
        <Upload className="mx-auto h-12 w-12 text-gray-400" />
        <div className="mt-4">
          <p className="text-sm text-gray-600">{description}</p>
          <p className="text-xs text-gray-500 mt-1">PDF, JPG or PNG (max 5MB)</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="space-y-8 w-full">
      {/* Driver's License Section */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-900">Driver's License</h2>
        <FileUploadArea
          title="Upload Driver's License"
          name="driversLicense"
          description="Click to upload or drag and drop"
        />
        <div className="grid grid-cols-3 gap-4">
          <Input
            label="License Expiration Date"
            type="date"
            name="licenseExpiration"
            value={formData.licenseExpiration}
            onChange={handleChange}
            placeholder="Pick a date"
            className="w-full"
          />
          <Input
            label="License Number"
            type="text"
            name="licenseNumber"
            value={formData.licenseNumber}
            onChange={handleChange}
            placeholder="Enter license number"
            className="w-full"
          />
          <Select
            label="State of Issuing License"
            name="licenseState"
            value={formData.licenseState}
            onChange={(val) => handleSelectChange("licenseState", val)}
            options={stateOptions}
            className="w-full"
          />
        </div>
      </div>

      {/* Vehicle Insurance Section */}
      <div className="space-y-6">
        <h2 className="text-lg font-semibold text-gray-900">Vehicle Insurance</h2>
        <FileUploadArea
          title="Upload Insurance Document"
          name="insuranceDocument"
          description="Click to upload or drag and drop"
        />
        <div className="grid grid-cols-3 gap-4">
          <Input
            label="Valid From"
            type="date"
            name="insuranceValidFrom"
            value={formData.insuranceValidFrom}
            onChange={handleChange}
            placeholder="Pick a date"
            className="w-full"
          />
          <Input
            label="Valid To"
            type="date"
            name="insuranceValidTo"
            value={formData.insuranceValidTo}
            onChange={handleChange}
            placeholder="Pick a date"
            className="w-full"
          />
          <Input
            label="Policy Number"
            type="text"
            name="policyNumber"
            value={formData.policyNumber}
            onChange={handleChange}
            placeholder="Enter policy number"
            className="w-full"
          />
        </div>
      </div>

      {/* Vehicle Registration & Inspection Sections */}
      {vehicleDocuments.map((vehicle, index) => (
        <div key={vehicle.vehicleId} className="space-y-6 border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">{vehicle.vehicleName} Registration</h2>
            {vehicleDocuments.length > 1 && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => removeVehicleDocument(index)}
                className="text-red-600 hover:text-red-700"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Remove
              </Button>
            )}
          </div>
          
          <FileUploadArea
            title="Upload Registration Document"
            name={`registrationDocument_${index}`}
            description="Click to upload or drag and drop"
          />
          <div className="grid grid-cols-4 gap-4">
            <Input
              label="Valid From"
              type="date"
              name={`registrationValidFrom_${index}`}
              value={vehicle.registrationValidFrom}
              onChange={(e) => updateVehicleDocument(index, "registrationValidFrom", e.target.value)}
              placeholder="Pick a date"
              className="w-full"
            />
            <Input
              label="Valid To"
              type="date"
              name={`registrationValidTo_${index}`}
              value={vehicle.registrationValidTo}
              onChange={(e) => updateVehicleDocument(index, "registrationValidTo", e.target.value)}
              placeholder="Pick a date"
              className="w-full"
            />
            <Input
              label="License Plate Number"
              type="text"
              name={`registrationLicensePlate_${index}`}
              value={vehicle.registrationLicensePlate}
              onChange={(e) => updateVehicleDocument(index, "registrationLicensePlate", e.target.value)}
              placeholder="Enter license plate number"
              className="w-full"
            />
            <Input
              label="VIN Number"
              type="text"
              name={`vinNumber_${index}`}
              value={vehicle.vinNumber}
              onChange={(e) => updateVehicleDocument(index, "vinNumber", e.target.value)}
              placeholder="Enter VIN number"
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <h3 className="text-md font-semibold text-gray-900">{vehicle.vehicleName} Inspection</h3>
            <FileUploadArea
              title="Upload Inspection Document"
              name={`inspectionDocument_${index}`}
              description="Click to upload or drag and drop"
            />
          </div>
        </div>
      ))}

      {/* Add Another Vehicle Documents Button */}
      <div className="flex justify-center">
        <Button 
          variant="secondary" 
          className="text-sm px-4 py-2"
          onClick={addVehicleDocument}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Another Vehicle Documents
        </Button>
      </div>

      <div className="flex justify-between items-center pt-6 border-t border-gray-200">
        <Button 
          variant="secondary" 
          onClick={prevStep} 
          className="px-6 py-2 text-sm font-medium"
        >
          Back
        </Button>
        <Button 
          variant="primary" 
          onClick={handleSubmit} 
          className="px-6 py-2 text-sm font-medium"
        >
          Complete Registration
        </Button>
      </div>
    </div>
  )
}
