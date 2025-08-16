"use client"

import { useState } from "react"
import { X } from "lucide-react"
import Button from "@/components/ui/Button"
import PersonalInfoStep from "./PersonalInfoStep"
import VehicleInfoStep from "./VehicleInfoStep"
import DriverDocumentsStep from "./DriverDocumentsStep"

const initialValues = {
  // Personal Information
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  dateOfBirth: "",
  gender: "",
  address: "",
  city: "",
  state: "",
  vendor: "",
  avatar: null,

  // Vehicle Information
  carMake: "",
  carModel: "",
  carYear: "",
  carColor: "",
  licensePlate: "",
  vehicleType: "",
  isDefaultVehicle: false,
  registrationAvailable: false,

  // Driver Documents
  driversLicense: null,
  licenseExpiration: "",
  licenseNumber: "",
  licenseState: "",
  insuranceDocument: null,
  insuranceValidFrom: "",
  insuranceValidTo: "",
  policyNumber: "",
  registrationDocument: null,
  registrationValidFrom: "",
  registrationValidTo: "",
  registrationLicensePlate: "",
  vinNumber: "",
  inspectionDocument: null,
}

export default function AddDriverModal({ isOpen, onClose }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState(initialValues)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateStep = (step) => {
    const errors = {}
    switch (step) {
      case 1:
        if (!formData.firstName) errors.firstName = "First name is required"
        if (!formData.lastName) errors.lastName = "Last name is required"
        if (!formData.email) errors.email = "Email is required"
        if (!formData.phone) errors.phone = "Phone number is required"
        if (!formData.dateOfBirth) errors.dateOfBirth = "Date of birth is required"
        if (!formData.gender) errors.gender = "Gender is required"
        if (!formData.address) errors.address = "Address is required"
        if (!formData.city) errors.city = "City is required"
        if (!formData.state) errors.state = "State is required"
        if (!formData.vendor) errors.vendor = "Vendor is required"
        break
      case 2:
        if (!formData.carMake) errors.carMake = "Car make is required"
        if (!formData.carModel) errors.carModel = "Car model is required"
        if (!formData.carYear) errors.carYear = "Car year is required"
        if (!formData.carColor) errors.carColor = "Car color is required"
        if (!formData.licensePlate) errors.licensePlate = "License plate is required"
        if (!formData.vehicleType) errors.vehicleType = "Vehicle type is required"
        break
      case 3:
        if (!formData.driversLicense) errors.driversLicense = "Driver's license is required"
        if (!formData.licenseExpiration) errors.licenseExpiration = "License expiration is required"
        if (!formData.licenseNumber) errors.licenseNumber = "License number is required"
        if (!formData.licenseState) errors.licenseState = "License state is required"
        if (!formData.insuranceDocument) errors.insuranceDocument = "Insurance document is required"
        if (!formData.registrationDocument) errors.registrationDocument = "Registration document is required"
        break
    }
    return errors
  }

  const nextStep = () => {
    const errors = validateStep(currentStep)
    if (Object.keys(errors).length > 0) {
      console.log("Validation errors:", errors)
      return
    }

    if (currentStep < 3) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = () => {
    const errors = validateStep(currentStep)
    if (Object.keys(errors).length > 0) {
      console.log("Validation errors:", errors)
      return
    }

    console.log("Form submitted:", formData)
    onClose()
  }

  const resetForm = () => {
    setFormData(initialValues)
    setCurrentStep(1)
  }

  const handleClose = () => {
    resetForm()
    onClose()
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoStep
            formData={formData}
            handleChange={handleChange}
            onClose={handleClose}
            nextStep={nextStep}
          />
        )
      case 2:
        return (
          <VehicleInfoStep
            formData={formData}
            handleChange={handleChange}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        )
      case 3:
        return (
          <DriverDocumentsStep
            formData={formData}
            handleChange={handleChange}
            prevStep={prevStep}
            handleSubmit={handleSubmit}
          />
        )
      default:
        return null
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Add New Driver</h2>
              <p className="text-sm text-gray-500 mt-1">
                Step {currentStep} of 3: {currentStep === 1 ? "Personal Information" : currentStep === 2 ? "Vehicle Details" : "Documentation"}
              </p>
            </div>
            <Button variant="ghost" onClick={handleClose} className="p-2">
              <X size={20} />
            </Button>
          </div>

          {/* Progress Indicator */}
          <div className="flex justify-center items-center mb-8">
            <div className="flex items-center space-x-4">
              {[1, 2, 3].map((step, index) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 !text-black ${step === currentStep
                        ? "bg-blue-600 text-white shadow-lg ring-2 ring-blue-200"
                        : step < currentStep
                          ? "bg-green-600 text-black shadow-md"
                          : "bg-gray-100 text-gray-800 border-2 border-gray-300 shadow-sm"
                      }`}
                  >
                    {step < currentStep ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <span className="font-bold text-black">{step}</span>
                    )}
                  </div>
                  {index < 2 && (
                    <div
                      className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${step < currentStep ? "bg-green-600" : "bg-gray-300"
                        }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Step Labels */}
          <div className="flex justify-center items-center mb-6">
            <div className="flex items-center space-x-16">
              <div className={`text-sm font-medium ${currentStep >= 1 ? 'text-blue-600' : 'text-gray-400'}`}>
                Personal Information
              </div>
              <div className={`text-sm font-medium ${currentStep >= 2 ? 'text-blue-600' : 'text-gray-400'}`}>
                Vehicle Details
              </div>
              <div className={`text-sm font-medium ${currentStep >= 3 ? 'text-blue-600' : 'text-gray-400'}`}>
                Documentation
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="space-y-6" style={{ maxWidth: "800px", width: "100%", margin: "0 auto" }}>
            {renderStep()}
          </div>
        </div>
      </div>
    </div>
  )
}
