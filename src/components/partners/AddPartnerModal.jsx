"use client"

import { useState } from "react"
import { useForm } from "@/hooks/useForm"
import BaseModal from "@/components/common/BaseModal"
import Button from "@/components/ui/Button"
import { Building2, Save, XCircle } from "lucide-react"
import CompanyInfoStep from "./modal/CompanyInfoStep"
import InsuranceStep from "./modal/InsuranceStep"
import FleetStep from "./modal/FleetStep"
import ServiceStep from "./modal/ServiceStep"
import { validateEmail, validatePhone } from "@/utils/common"

const DEFAULT_INITIAL_VALUES = {
  companyName: "",
  contactName: "",
  contactEmail: "",
  contactPhone: "",
  companyAddress: "",
  city: "",
  state: "",

  insuranceProvider: "",
  naicNumber: "",
  generalLiabilityLimit: "",
  autoLiabilityLimit: "",
  workersCompInsurance: "",
  employeeDrivers: "",
  independentContractorDrivers: "",

  sedans: "",
  suvs: "",
  buses: "",
  vans: "",

  serviceArea: "",
  serviceType: "",
  operatingHoursStart: "",
  operatingHoursEnd: "",
}

export default function AddPartnerModal({ isOpen, onClose, initialValues: initialValuesProp, mode = "create" }) {
  const [currentStep, setCurrentStep] = useState(1)

  const validateStep = (values, step) => {
    const errors = {}
    switch (step) {
      case 1:
        if (!values.companyName) errors.companyName = "Company name is required"
        if (!values.contactName) errors.contactName = "Contact name is required"
        if (!validateEmail(values.contactEmail)) errors.contactEmail = "Please enter a valid email"
        if (!validatePhone(values.contactPhone)) errors.contactPhone = "Please enter a valid phone number"
        if (!values.companyAddress) errors.companyAddress = "Address is required"
        if (!values.city) errors.city = "City is required"
        if (!values.state) errors.state = "State is required"
        break
      case 2:
        if (!values.insuranceProvider) errors.insuranceProvider = "Insurance provider is required"
        if (!values.naicNumber) errors.naicNumber = "NAIC number is required"
        if (!values.generalLiabilityLimit) errors.generalLiabilityLimit = "General liability limit is required"
        if (!values.autoLiabilityLimit) errors.autoLiabilityLimit = "Auto liability limit is required"
        if (!values.workersCompInsurance) errors.workersCompInsurance = "Workers comp insurance is required"
        break
      case 3:
        if (!values.sedans && !values.suvs && !values.buses && !values.vans) {
          errors.fleet = "At least one vehicle type is required"
        }
        break
      case 4:
        if (!values.serviceArea) errors.serviceArea = "Service area is required"
        if (!values.serviceType) errors.serviceType = "Service type is required"
        if (!values.operatingHoursStart) errors.operatingHoursStart = "Operating hours start is required"
        if (!values.operatingHoursEnd) errors.operatingHoursEnd = "Operating hours end is required"
        break
    }
    return errors
  }

  const handleSubmit = async (values) => {
    const errors = validateStep(values, currentStep)
    if (Object.keys(errors).length > 0) {
      Object.entries(errors).forEach(([field, message]) => {
        setError(field, message)
      })
      return
    }

    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1)
    } else {
      console.log("Form submitted:", values)
      onClose()
    }
  }

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit: onSubmit,
    setError,
  } = useForm({ ...DEFAULT_INITIAL_VALUES, ...(initialValuesProp || {}) }, handleSubmit)

  const prevStep = () => {
    setCurrentStep((prev) => prev - 1)
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep((prev) => prev + 1)
    } else {
      onClose()
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CompanyInfoStep
            formData={values}
            handleChange={handleChange}
            errors={errors}
            onClose={onClose}
            nextStep={nextStep}
          />
        )
      case 2:
        return (
          <InsuranceStep
            formData={values}
            handleChange={handleChange}
            errors={errors}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        )
      case 3:
        return (
          <FleetStep
            formData={values}
            handleChange={handleChange}
            errors={errors}
            prevStep={prevStep}
            nextStep={nextStep}
          />
        )
      case 4:
        return (
          <ServiceStep
            formData={values}
            handleChange={handleChange}
            errors={errors}
            prevStep={prevStep}
            handleSubmit={onSubmit}
          />
        )
      default:
        return null
    }
  }

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "edit" ? "Edit Partner" : "Add New Partner"}
      widthClass="w-full !max-w-[82rem]"
      className="max-h-[calc(100vh-3rem)] overflow-auto"
    >
      <div className="space-y-6 w-full">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[var(--primary-black)]">
            <Building2 className="w-5 h-5 text-[var(--primary)]" />
            <span className="font-semibold">Company & Compliance</span>
          </div>
        </div>
        <div className="flex justify-center items-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3, 4].map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 !text-black ${step === currentStep
                      ? "bg-blue-600 text-white shadow-lg ring-2 ring-blue-200"
                      : step < currentStep
                        ? "bg-green-600 text-white shadow-md"
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
                    <span className="font-bold">{step}</span>
                  )}
                </div>
                {index < 3 && (
                  <div
                    className={`w-16 h-1 mx-2 rounded-full transition-all duration-300 ${step < currentStep ? "bg-green-600" : "bg-gray-300"
                      }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
         {renderStep()}
         
         {/* Footer Buttons */}
          <div className="flex justify-end gap-3 pt-6 border-t border-[var(--gray-200)]">
           <Button variant="secondary" onClick={onClose} icon={<XCircle className="w-4 h-4" />}>Cancel</Button>
           {currentStep > 1 && (
             <Button variant="outline" onClick={prevStep}>Previous</Button>
           )}
          {currentStep < 4 ? (
             <Button variant="primary" onClick={nextStep}>Next</Button>
           ) : (
             <Button variant="primary" onClick={onSubmit} icon={<Save className="w-4 h-4" />}>{mode === "edit" ? "Save Changes" : "Create Partner"}</Button>
           )}
         </div>
      </div>
    </BaseModal>
  )
}
