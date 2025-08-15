"use client"

import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import Button from "@/components/ui/Button"
import Toggle from "@/components/ui/Toggle"

export default function VehicleInfoStep({ formData, handleChange, prevStep, nextStep }) {
  const carMakeOptions = [
    { value: "", label: "Select car make" },
    { value: "Toyota", label: "Toyota" },
    { value: "Honda", label: "Honda" },
    { value: "Ford", label: "Ford" },
    { value: "Chevrolet", label: "Chevrolet" },
    { value: "Nissan", label: "Nissan" },
    { value: "BMW", label: "BMW" },
    { value: "Mercedes", label: "Mercedes" },
    { value: "Audi", label: "Audi" },
    { value: "Tesla", label: "Tesla" },
  ]

  const vehicleTypeOptions = [
    { value: "", label: "Select vehicle type" },
    { value: "Sedan or 5 Passenger SUV", label: "Sedan or 5 Passenger SUV" },
    { value: "7 Passenger SUV", label: "7 Passenger SUV" },
    { value: "Van", label: "Van" },
    { value: "Bus", label: "Bus" },
    { value: "Truck", label: "Truck" },
  ]

  const handleSelectChange = (name, value) => {
    handleChange({ target: { name, value } })
  }

  const handleToggleChange = (name, value) => {
    handleChange({ target: { name, value } })
  }

  return (
    <div className="space-y-6 w-full">
      <div className="grid grid-cols-2 gap-6 w-full">
        <Select
          label="Car Make"
          name="carMake"
          value={formData.carMake}
          onChange={(val) => handleSelectChange("carMake", val)}
          options={carMakeOptions}
          className="w-full"
        />
        <Select
          label="Car Model"
          name="carModel"
          value={formData.carModel}
          onChange={(val) => handleSelectChange("carModel", val)}
          options={[
            { value: "", label: "Select car model" },
            { value: "Camry", label: "Camry" },
            { value: "Corolla", label: "Corolla" },
            { value: "Civic", label: "Civic" },
            { value: "Accord", label: "Accord" },
            { value: "Focus", label: "Focus" },
            { value: "Fusion", label: "Fusion" },
            { value: "Model 3", label: "Model 3" },
            { value: "Model X", label: "Model X" },
          ]}
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-6 w-full">
        <Input
          label="Car Year"
          type="text"
          name="carYear"
          value={formData.carYear}
          onChange={handleChange}
          placeholder="e.g., 2023"
          className="w-full"
        />
        <Input
          label="Car Color"
          type="text"
          name="carColor"
          value={formData.carColor}
          onChange={handleChange}
          placeholder="Enter car color"
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-6 w-full">
        <Input
          label="License Plate Number"
          type="text"
          name="licensePlate"
          value={formData.licensePlate}
          onChange={handleChange}
          placeholder="Enter license plate number"
          className="w-full"
        />
        <Select
          label="Vehicle Type"
          name="vehicleType"
          value={formData.vehicleType}
          onChange={(val) => handleSelectChange("vehicleType", val)}
          options={vehicleTypeOptions}
          className="w-full"
        />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-900">Set as default vehicle</h3>
            <p className="text-sm text-gray-600">
              This vehicle will be used as the default for rides and scheduling
            </p>
          </div>
          <Toggle
            checked={formData.isDefaultVehicle}
            onChange={(checked) => handleToggleChange("isDefaultVehicle", checked)}
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div>
            <h3 className="font-medium text-gray-900">Registration available</h3>
            <p className="text-sm text-gray-600">
              Confirm that you have the vehicle registration document ready to upload
            </p>
          </div>
          <Toggle
            checked={formData.registrationAvailable}
            onChange={(checked) => handleToggleChange("registrationAvailable", checked)}
          />
        </div>
      </div>

      {/* Add Another Vehicle Button - Inside Form */}
      <div className="flex justify-center pt-4">
        <Button variant="secondary" className="text-sm px-4 py-2">
          + Add Another Vehicle
        </Button>
      </div>

      {/* Navigation Buttons */}
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
          onClick={nextStep} 
          className="px-6 py-2 text-sm font-medium"
        >
          Next
        </Button>
      </div>
    </div>
  )
}
