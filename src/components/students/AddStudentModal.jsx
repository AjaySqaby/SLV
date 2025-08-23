import { useState } from 'react';
import Button from '../ui/Button';
import BaseModal from '../common/BaseModal';
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

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Add New Student" size="full">
      <form onSubmit={handleSubmit} className="space-y-6 max-h-[80vh] overflow-y-auto !w-[700px] mx-auto">
        {/* Basic Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
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
                <label className="text-sm font-medium text-gray-700">
                  Special Needs
                </label>
                <Toggle
                  checked={studentForm.specialNeeds}
                  onChange={(value) => handleToggleChange('specialNeeds', value)}
                />
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Indicate if the student has special transportation needs
              </p>
            </div>
          </div>
        </div>

        {/* School Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">School Information</h3>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Home Address
              </label>
              <textarea
                name="homeAddress"
                value={studentForm.homeAddress}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter home address"
                required
              />
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
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
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medical Notes
              </label>
              <textarea
                name="medicalNotes"
                value={studentForm.medicalNotes}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter any medical notes or special requirements"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transportation Notes
              </label>
              <textarea
                name="transportationNotes"
                value={studentForm.transportationNotes}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter any transportation-specific notes"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
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
            variant="primary"
            className="px-6 py-2"
          >
            ✓ Add Student
          </Button>
        </div>
      </form>
    </BaseModal>
  );
} 