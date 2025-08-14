"use client"

import Input from "@/components/ui/Input"
import Button from "@/components/ui/Button"

export default function FleetStep({ formData, handleChange, prevStep, nextStep }) {
  return (
    <div className="space-y-6 w-full">
      <div className="grid grid-cols-2 gap-6 w-full">
        <Input
          label="Sedan"
          type="number"
          name="sedans"
          value={formData.sedans}
          onChange={handleChange}
          placeholder="Number of sedans"
          className="w-full"
        />
        <Input
          label="SUV"
          type="number"
          name="suvs"
          value={formData.suvs}
          onChange={handleChange}
          placeholder="Number of SUVs"
          className="w-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-6 w-full">
        <Input
          label="Bus"
          type="number"
          name="buses"
          value={formData.buses}
          onChange={handleChange}
          placeholder="Number of buses"
          className="w-full"
        />
        <Input
          label="Van"
          type="number"
          name="vans"
          value={formData.vans}
          onChange={handleChange}
          placeholder="Number of vans"
          className="w-full"
        />
      </div>

      <div className="flex justify-end gap-3 w-full pt-4">
        <Button variant="secondary" onClick={prevStep} className="w-32">
          Previous
        </Button>
        <Button variant="primary" onClick={nextStep} className="w-32">
          Next
        </Button>
      </div>
    </div>
  )
} 