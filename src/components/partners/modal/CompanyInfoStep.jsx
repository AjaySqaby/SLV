"use client"

import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

export default function CompanyInfoStep({ formData, handleChange, onClose, nextStep }) {
  return (
    <div className="space-y-6 w-full">
      <div className="grid grid-cols-2 gap-6 w-full">
        <Input
          label="Company Name"
          name="companyName"
          value={formData.companyName}
          onChange={handleChange}
          placeholder="Enter company name"
          className="w-full"
        />
        <Input
          label="Contact Name"
          name="contactName"
          value={formData.contactName}
          onChange={handleChange}
          placeholder="Enter contact name"
          className="w-full"
        />
      </div>
      <div className="grid grid-cols-2 gap-6 w-full">
        <Input
          label="Contact Email"
          name="contactEmail"
          type="email"
          value={formData.contactEmail}
          onChange={handleChange}
          placeholder="Enter email address"
          className="w-full"
        />
        <Input
          label="Contact Phone"
          name="contactPhone"
          value={formData.contactPhone}
          onChange={handleChange}
          placeholder="Enter phone number"
          className="w-full"
        />
      </div>
      <div className="w-full">
        <Input
          label="Company Address"
          name="companyAddress"
          value={formData.companyAddress}
          onChange={handleChange}
          placeholder="Enter company address"
          className="w-full"
        />
      </div>
      <div className="grid grid-cols-2 gap-6 w-full">
        <Input
          label="City"
          name="city"
          value={formData.city}
          onChange={handleChange}
          placeholder="Enter city"
          className="w-full"
        />
        <Input
          label="State"
          name="state"
          value={formData.state}
          onChange={handleChange}
          placeholder="Enter state"
          className="w-full"
        />
      </div>
      <div className="flex justify-end gap-3 w-full pt-4">
        <Button variant="secondary" type="button" onClick={onClose} className="w-32">
          Cancel
        </Button>
        <Button variant="primary" type="button" onClick={nextStep} className="w-32">
          Next
        </Button>
      </div>
    </div>
  );
} 