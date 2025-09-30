import { useState } from 'react';
import { X, User, GraduationCap, Home, Phone, Mail, FileText, Plus } from 'lucide-react';
import Button from '../ui/Button';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Toggle from '../ui/Toggle';

export default function AddStudentModal({ isOpen, onClose }) {
  const [studentForm, setStudentForm] = useState({
    firstName: '',
    lastName: '',
    grade: 'Kindergarten',
    specialNeeds: false,
    schoolDistrict: 'Springfield Public Schools',
    campus: 'Springfield Elementary',
    homeAddress: '',
    guardianName: '',
    guardianPhone: '',
    guardianEmail: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    medicalNotes: '',
    transportationNotes: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentForm(prev => ({ ...prev, [name]: value }));
  };

  const handleToggleChange = (name, value) => {
    setStudentForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Handle form submission
    console.log('Student form data:', studentForm);
    onClose();
  };

  const gradeOptions = [
    { value: 'Kindergarten', label: 'Kindergarten' },
    { value: '1st Grade', label: '1st Grade' },
    { value: '2nd Grade', label: '2nd Grade' },
    { value: '3rd Grade', label: '3rd Grade' },
    { value: '4th Grade', label: '4th Grade' },
    { value: '5th Grade', label: '5th Grade' },
    { value: '6th Grade', label: '6th Grade' },
    { value: '7th Grade', label: '7th Grade' },
    { value: '8th Grade', label: '8th Grade' },
    { value: '9th Grade', label: '9th Grade' },
    { value: '10th Grade', label: '10th Grade' },
    { value: '11th Grade', label: '11th Grade' },
    { value: '12th Grade', label: '12th Grade' },
  ];

  const districtOptions = [
    { value: 'Springfield Public Schools', label: 'Springfield Public Schools' },
    { value: 'Northside School District', label: 'Northside School District' },
    { value: 'Southside School District', label: 'Southside School District' },
  ];

  const campusOptions = [
    { value: 'Springfield Elementary', label: 'Springfield Elementary' },
    { value: 'Springfield Middle School', label: 'Springfield Middle School' },
    { value: 'Springfield High School', label: 'Springfield High School' },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] backdrop-blur-sm">
      <div className="bg-white rounded-2xl w-[95vw] h-[90vh] max-w-7xl mx-4 overflow-hidden relative">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--gray-200)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[var(--primary-bg)] rounded-full flex items-center justify-center">
              <Plus className="w-6 h-6 text-[var(--primary)]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--primary-black)]">Add New Student</h2>
              <p className="text-[var(--muted-text)]">Create a new student profile</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--hover-bg)] transition-colors"
          >
            <X className="w-6 h-6 text-[var(--gray-500)]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)] pb-24">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[var(--blue-100)] rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-[var(--blue-600)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--primary-black)]">Basic Information</h3>
              </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="First Name"
              name="firstName"
              value={studentForm.firstName}
              onChange={handleChange}
              required
            />
            <Input
              label="Last Name"
              name="lastName"
              value={studentForm.lastName}
              onChange={handleChange}
              required
            />
            <div className="md:col-span-2">
              <Select
                label="Grade"
                name="grade"
                value={studentForm.grade}
                onChange={handleChange}
                options={gradeOptions}
                required
              />
            </div>
              <div className="md:col-span-2">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-[var(--gray-700)]">
                    Special Needs
                  </label>
                  <Toggle
                    checked={studentForm.specialNeeds}
                    onChange={(value) => handleToggleChange('specialNeeds', value)}
                  />
                </div>
                <p className="text-sm text-[var(--muted-text)] mt-1">
                  Indicate if the student has special transportation needs
                </p>
              </div>
            </div>
          </div>

            {/* School Information */}
            <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[var(--green-100)] rounded-full flex items-center justify-center">
                  <GraduationCap className="w-8 h-8 text-[var(--green-600)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--primary-black)]">School Information</h3>
              </div>
          <div className="space-y-4">
            <Select
              label="School District"
              name="schoolDistrict"
              value={studentForm.schoolDistrict}
              onChange={handleChange}
              options={districtOptions}
              required
            />
            <Select
              label="Campus"
              name="campus"
              value={studentForm.campus}
              onChange={handleChange}
              options={campusOptions}
              required
            />
              <div>
                <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                  Home Address
                </label>
                <textarea
                  name="homeAddress"
                  value={studentForm.homeAddress}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  placeholder="Enter home address"
                  required
                />
              </div>
            </div>
          </div>

            {/* Contact Information */}
            <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[var(--purple-100)] rounded-full flex items-center justify-center">
                  <Phone className="w-8 h-8 text-[var(--purple-600)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--primary-black)]">Contact Information</h3>
              </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Parent/Guardian Name"
              name="guardianName"
              value={studentForm.guardianName}
              onChange={handleChange}
              required
            />
            <Input
              label="Parent/Guardian Phone"
              name="guardianPhone"
              value={studentForm.guardianPhone}
              onChange={handleChange}
              type="tel"
              required
            />
            <div className="md:col-span-2">
              <Input
                label="Parent/Guardian Email"
                name="guardianEmail"
                value={studentForm.guardianEmail}
                onChange={handleChange}
                type="email"
                required
              />
            </div>
            <Input
              label="Emergency Contact Name"
              name="emergencyContactName"
              value={studentForm.emergencyContactName}
              onChange={handleChange}
              required
            />
            <Input
              label="Emergency Contact Phone"
              name="emergencyContactPhone"
              value={studentForm.emergencyContactPhone}
              onChange={handleChange}
              type="tel"
              required
            />
          </div>
        </div>

            {/* Additional Notes */}
            <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-[var(--amber-100)] rounded-full flex items-center justify-center">
                  <FileText className="w-8 h-8 text-[var(--amber-600)]" />
                </div>
                <h3 className="text-lg font-semibold text-[var(--primary-black)]">Additional Notes</h3>
              </div>
          <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                  Medical Notes
                </label>
                <textarea
                  name="medicalNotes"
                  value={studentForm.medicalNotes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  placeholder="Enter any medical notes or special requirements"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                  Transportation Notes
                </label>
                <textarea
                  name="transportationNotes"
                  value={studentForm.transportationNotes}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent"
                  placeholder="Enter any transportation-specific notes"
                />
              </div>
            </div>
          </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 p-6 border-t border-[var(--gray-200)] absolute bottom-0 left-0 right-0 bg-white">
              <Button
                type="button"
                variant="secondary"
                onClick={onClose}
                className="px-6 py-2"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white px-6 py-2"
              >
                ✓ Add Student
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 