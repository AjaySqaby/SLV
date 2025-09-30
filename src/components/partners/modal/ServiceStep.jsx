"use client";

import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

export default function ServiceStep({
  formData,
  handleChange,
  prevStep,
  handleSubmit,
}) {
  return (
    <div className="space-y-6 w-full " >
      <div>
        <label className="block font-semibold mb-1">Service Locations</label>
        <div className="text-sm text-[var(--gray-500)] mb-3">Add states and cities where this partner provides services</div>
        <div className="flex gap-3 w-full mb-3">
          <Select
            name="serviceState"
            value={formData.serviceState || ''}
            onChange={handleChange}
            options={[
              { value: '', label: 'Select an option' },
              { value: 'CA', label: 'California' },
              { value: 'TX', label: 'Texas' },
              { value: 'NY', label: 'New York' },
              // Add more states as needed
            ]}
            className="w-full"
          />
          <Button type="button" variant="primary" className="w-32" disabled>
            Add State
          </Button>
        </div>
        <div className="w-full bg-[var(--background)] border border-[var(--gray-200)] rounded-lg p-8 text-center text-[var(--gray-400)] mb-3">
          No service locations added yet.<br />
          <span className="text-xs">Select a state above to begin adding service locations.</span>
        </div>
      </div>
      <div className="w-full">
        <Select
          name="mediCalLicensed"
          label="Are you currently Medi-Cal licensed?"
          value={formData.mediCalLicensed || 'No'}
          onChange={handleChange}
          options={[
            { value: 'No', label: 'No' },
            { value: 'Yes', label: 'Yes' }
          ]}
          className="w-full"
        />
      </div>
    </div>
  );
}
