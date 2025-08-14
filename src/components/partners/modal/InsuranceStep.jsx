"use client";

import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";

export default function InsuranceStep({
  formData,
  handleChange,
  prevStep,
  nextStep,
}) {
  return (
    <div className="space-y-6 w-full">
      <div className="grid grid-cols-2 gap-6 w-full">
        <Input
          label="Name of Commercial Insurance Provider"
          name="insuranceProvider"
          value={formData.insuranceProvider}
          onChange={handleChange}
          placeholder="Name of Commercial Insurance Provider"
          className="w-full"
        />
        <Input
          label="NAIC Number"
          name="naicNumber"
          value={formData.naicNumber}
          onChange={handleChange}
          placeholder="NAIC Number"
          className="w-full"
        />
      </div>
      <div className="grid grid-cols-2 gap-6 w-full">
        <Input
          label="General Liability Insurance Combined Limit"
          name="generalLiabilityLimit"
          value={formData.generalLiabilityLimit}
          onChange={handleChange}
          placeholder="General Liability Insurance Combined Limit"
          className="w-full"
        />
        <Input
          label="Auto Liability Insurance Combined Limit"
          name="autoLiabilityLimit"
          value={formData.autoLiabilityLimit}
          onChange={handleChange}
          placeholder="Auto Liability Insurance Combined Limit"
          className="w-full"
        />
      </div>
      <div className="grid grid-cols-2 gap-6 w-full">
        <Select
          name="workersCompInsurance"
          label="Do you have Workers Compensation Insurance?"
          value={formData.workersCompInsurance}
          onChange={handleChange}
          options={[
            { value: "No", label: "No" },
            { value: "Yes", label: "Yes" }
          ]}
          className="w-full"
        />
        <Select
          name="employeeDrivers"
          label="Do you have Employee Drivers working for your company?"
          value={formData.employeeDrivers}
          onChange={handleChange}
          options={[
            { value: "No", label: "No" },
            { value: "Yes", label: "Yes" }
          ]}
          className="w-full"
        />
      </div>
      <div className="w-full">
        <Select
          name="independentContractorDrivers"
          label="Do you also have Independent Contractor Drivers working for your company?"
          value={formData.independentContractorDrivers}
          onChange={handleChange}
          options={[
            { value: "No", label: "No" },
            { value: "Yes", label: "Yes" }
          ]}
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
  );
}
