import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { User, Home, GraduationCap, Phone, Mail, UserPlus } from 'lucide-react'

export default function StudentFormFields({ form, onChange, className = "" }) {
  const gradeOptions = Array.from({length: 12}, (_, i) => ({
    value: (i+1).toString(), 
    label: `Grade ${i+1}`
  }))

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ]

  const districtOptions = [
    { value: '', label: 'Select District' },
    { value: 'district1', label: 'District 1' },
    { value: 'district2', label: 'District 2' },
  ]

  const campusOptions = [
    { value: '', label: 'Select Campus' },
    { value: 'campus1', label: 'Campus 1' },
    { value: 'campus2', label: 'Campus 2' },
  ]

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Student Information */}
      <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[var(--blue-100)] rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-[var(--blue-600)]" />
          </div>
          <div className="font-semibold text-[var(--primary-black)]">Student Information</div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Input 
            label="Full Name" 
            name="fullName" 
            value={form.fullName} 
            onChange={onChange} 
            required 
          />
          <Input 
            label="Date of Birth" 
            name="dob" 
            type="date" 
            value={form.dob} 
            onChange={onChange} 
            required 
          />
          <Select 
            label="Grade" 
            name="grade" 
            value={form.grade} 
            onChange={onChange} 
            options={gradeOptions} 
            placeholder="Select Grade" 
            required 
          />
        </div>
      </div>

      {/* Address Information */}
      <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[var(--green-100)] rounded-full flex items-center justify-center">
            <Home className="w-5 h-5 text-[var(--green-600)]" />
          </div>
          <div className="font-semibold text-[var(--primary-black)]">Address Information</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input 
            label="Primary Address" 
            name="primaryAddress" 
            value={form.primaryAddress} 
            onChange={onChange} 
            required 
          />
          <Input 
            label="Secondary Address (Optional)" 
            name="secondaryAddress" 
            value={form.secondaryAddress} 
            onChange={onChange} 
          />
        </div>
      </div>

      {/* School Information */}
      <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[var(--purple-100)] rounded-full flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-[var(--purple-600)]" />
          </div>
          <div className="font-semibold text-[var(--primary-black)]">School Information</div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Select 
            label="District" 
            name="district" 
            value={form.district} 
            onChange={onChange} 
            options={districtOptions} 
            required 
          />
          <Select 
            label="Campus" 
            name="campus" 
            value={form.campus} 
            onChange={onChange} 
            options={campusOptions} 
            required 
          />
        </div>
      </div>

      {/* Guardian Information */}
      <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[var(--amber-100)] rounded-full flex items-center justify-center">
            <Phone className="w-5 h-5 text-[var(--amber-600)]" />
          </div>
          <div className="font-semibold text-[var(--primary-black)]">Guardian Information</div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Input 
            label="Guardian Full Name" 
            name="guardianName" 
            value={form.guardianName} 
            onChange={onChange} 
            required 
          />
          <Input 
            label="Guardian Email" 
            name="guardianEmail" 
            value={form.guardianEmail} 
            onChange={onChange} 
            required 
          />
          <Input 
            label="Guardian Phone" 
            name="guardianPhone" 
            value={form.guardianPhone} 
            onChange={onChange} 
            required 
          />
        </div>
      </div>

      {/* Secondary Contact */}
      <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[var(--gray-100)] rounded-full flex items-center justify-center">
            <UserPlus className="w-5 h-5 text-[var(--gray-600)]" />
          </div>
          <div className="font-semibold text-[var(--primary-black)]">Secondary Contact (Optional)</div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Input 
            label="Secondary Contact Name" 
            name="secondaryName" 
            value={form.secondaryName} 
            onChange={onChange} 
          />
          <Input 
            label="Secondary Contact Email" 
            name="secondaryEmail" 
            value={form.secondaryEmail} 
            onChange={onChange} 
          />
          <Input 
            label="Secondary Contact Phone" 
            name="secondaryPhone" 
            value={form.secondaryPhone} 
            onChange={onChange} 
          />
        </div>
      </div>

      {/* Additional Notes */}
      <div>
        <div className="font-semibold mb-2">Additional Notes</div>
        <Input
          as="textarea"
          name="notes"
          value={form.notes}
          onChange={onChange}
          placeholder="Enter any additional information about the student..."
          className="min-h-[60px]"
        />
      </div>
    </div>
  )
}
