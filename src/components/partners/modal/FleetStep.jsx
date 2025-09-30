"use client"

import Input from "@/components/ui/Input"

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

    </div>
  )
} 