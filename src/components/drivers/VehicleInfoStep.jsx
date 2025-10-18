"use client"

import { useState } from "react"
import Input from "@/components/ui/Input"
import Select from "@/components/ui/Select"
import Button from "@/components/ui/Button"
import Toggle from "@/components/ui/Toggle"

export default function VehicleInfoStep({ formData, handleChange, prevStep, nextStep }) {
  const [vehicles, setVehicles] = useState([
    {
      carMake: formData.carMake || "",
      carModel: formData.carModel || "",
      carYear: formData.carYear || "",
      carColor: formData.carColor || "",
      licensePlate: formData.licensePlate || "",
      vehicleType: formData.vehicleType || "Sedan or 5 Passenger SUV",
      isDefaultVehicle: formData.isDefaultVehicle || false,
      registrationAvailable: formData.registrationAvailable || false,
    }
  ]);
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

  const addVehicle = () => {
    const newVehicle = {
      carMake: "",
      carModel: "",
      carYear: "",
      carColor: "",
      licensePlate: "",
      vehicleType: "Sedan or 5 Passenger SUV",
      isDefaultVehicle: false,
      registrationAvailable: false,
    };
    setVehicles([...vehicles, newVehicle]);
  };

  const removeVehicle = (index) => {
    if (vehicles.length > 1) {
      const updatedVehicles = vehicles.filter((_, i) => i !== index);
      setVehicles(updatedVehicles);
    }
  };

  const updateVehicle = (index, field, value) => {
    const updatedVehicles = vehicles.map((vehicle, i) => 
      i === index ? { ...vehicle, [field]: value } : vehicle
    );
    setVehicles(updatedVehicles);
    
    // Update the main form data with the first vehicle
    if (index === 0) {
      handleChange({ target: { name: field, value } });
    }
  };

  return (
    <div className="space-y-6 w-full">
      {vehicles.map((vehicle, index) => (
        <div key={index} className="border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              Vehicle {index + 1}
            </h3>
            {vehicles.length > 1 && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => removeVehicle(index)}
                className="text-red-600 hover:text-red-700"
              >
                Remove
              </Button>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6 w-full">
            <Select
              label="Car Make"
              name="carMake"
              value={vehicle.carMake}
              onChange={(e) => updateVehicle(index, "carMake", e.target.value)}
              options={carMakeOptions}
              className="w-full"
            />
            <Select
              label="Car Model"
              name="carModel"
              value={vehicle.carModel}
              onChange={(e) => updateVehicle(index, "carModel", e.target.value)}
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

          <div className="grid grid-cols-2 gap-6 w-full mt-4">
            <Input
              label="Car Year"
              type="text"
              name="carYear"
              value={vehicle.carYear}
              onChange={(e) => updateVehicle(index, "carYear", e.target.value)}
              placeholder="e.g., 2023"
              className="w-full"
            />
            <Input
              label="Car Color"
              type="text"
              name="carColor"
              value={vehicle.carColor}
              onChange={(e) => updateVehicle(index, "carColor", e.target.value)}
              placeholder="Enter car color"
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-6 w-full mt-4">
            <Input
              label="License Plate Number"
              type="text"
              name="licensePlate"
              value={vehicle.licensePlate}
              onChange={(e) => updateVehicle(index, "licensePlate", e.target.value)}
              placeholder="Enter license plate number"
              className="w-full"
            />
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vehicle Type
              </label>
              <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 cursor-not-allowed">
                {vehicle.vehicleType}
              </div>
            </div>
          </div>

          <div className="space-y-4 mt-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h3 className="font-medium text-gray-900">Set as default vehicle</h3>
                <p className="text-sm text-gray-600">
                  This vehicle will be used as the default for rides and scheduling
                </p>
              </div>
              <Toggle
                checked={vehicle.isDefaultVehicle}
                onChange={(checked) => updateVehicle(index, "isDefaultVehicle", checked)}
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
                checked={vehicle.registrationAvailable}
                onChange={(checked) => updateVehicle(index, "registrationAvailable", checked)}
              />
            </div>
          </div>
        </div>
      ))}

      {/* Add Another Vehicle Button */}
      <div className="flex justify-center pt-4">
        <Button 
          variant="secondary" 
          className="text-sm px-4 py-2"
          onClick={addVehicle}
        >
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
