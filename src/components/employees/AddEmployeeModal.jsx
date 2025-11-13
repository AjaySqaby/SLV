"use client";
import { useState } from "react";
import { X, Users, User, Mail, Phone, Building2, MapPin, GraduationCap, Settings, Shield } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import PermissionsSelector from "./PermissionsSelector";

export default function AddEmployeeModal({ open, onClose }) {
  const [formData, setFormData] = useState({
    employeeType: "district", // "slv" or "district"
    firstName: "",
    lastName: "",
    district: "",
    campus: "",
    title: "",
    email: "",
    phone: "",
    permissions: []
  });

  // Mock data for districts and campuses
  const districts = [
    { value: "Northside School District (86022-Z)", label: "Northside School District (86022-Z)" },
    { value: "Southview School District (75044-A)", label: "Southview School District (75044-A)" },
    { value: "Eastside School District (92733-B)", label: "Eastside School District (92733-B)" },
    { value: "Westview School District (61855-C)", label: "Westview School District (61855-C)" }
  ];

  const campuses = [
    { value: "District Level (No Campus)", label: "District Level (No Campus)" },
    { value: "Lincoln Middle School", label: "Lincoln Middle School" },
    { value: "Washington High", label: "Washington High" },
    { value: "Riverdale High", label: "Riverdale High" }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePermissionsChange = (permissions) => {
    setFormData(prev => ({
      ...prev,
      permissions
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Employee data:", formData);
    // Handle form submission here
    onClose();
  };

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl w-[95vw] h-[90vh] max-w-7xl mx-4 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--gray-200)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[var(--primary-bg)] rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-[var(--primary)]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--primary-black)]">Add New Employee</h2>
              <p className="text-[var(--muted-text)]">Create a new employee profile</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--hover-bg)] transition-colors"
          >
            <X className="w-6 h-6 text-[var(--gray-500)]" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)] pb-24">
          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-6">
              {/* Employee Type Selection */}
              <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[var(--orange-100)] rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-[var(--orange-600)]" />
                  </div>
                  <div className="font-semibold text-[var(--primary-black)]">Employee Type</div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, employeeType: "slv" }))}
                    className={`
                      p-4 rounded-lg border-2 transition-all duration-200 text-left
                      ${formData.employeeType === "slv"
                        ? "border-[var(--purple-600)] bg-[var(--purple-50)]"
                        : "border-[var(--gray-200)] bg-white hover:border-[var(--purple-300)]"
                      }
                    `}
                  >
                    <div className="font-medium text-[var(--primary-black)]">SLV Employee</div>
                    <div className="text-sm text-[var(--muted-text)] mt-1">
                      Internal SLV staff with full dashboard access
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, employeeType: "district" }))}
                    className={`
                      p-4 rounded-lg border-2 transition-all duration-200 text-left
                      ${formData.employeeType === "district"
                        ? "border-[var(--purple-600)] bg-[var(--purple-50)]"
                        : "border-[var(--gray-200)] bg-white hover:border-[var(--purple-300)]"
                      }
                    `}
                  >
                    <div className="font-medium text-[var(--primary-black)]">District Employee</div>
                    <div className="text-sm text-[var(--muted-text)] mt-1">
                      School district staff with limited access
                    </div>
                  </button>
                </div>
              </div>

              {/* Personal Information Section */}
              <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[var(--blue-100)] rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-[var(--blue-600)]" />
                  </div>
                  <div className="font-semibold text-[var(--primary-black)]">Personal Information</div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <Input
                    label="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    placeholder="Enter first name"
                    required
                    icon={<User className="h-4 w-4 text-[var(--muted-text)]" />}
                  />
                  
                  <Input
                    label="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    placeholder="Enter last name"
                    required
                    icon={<User className="h-4 w-4 text-[var(--muted-text)]" />}
                  />
                </div>
              </div>

              {/* Work Information Section */}
              <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[var(--green-100)] rounded-full flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-[var(--green-600)]" />
                  </div>
                  <div className="font-semibold text-[var(--primary-black)]">Work Information</div>
                </div>
                <div className="space-y-6">
                  {formData.employeeType === "district" && (
                    <>
                      <Select
                        label="District"
                        name="district"
                        value={formData.district}
                        onChange={handleInputChange}
                        options={districts}
                        placeholder="Select a district"
                        required
                      />

                      <Select
                        label="Campus (Optional for district-level employees)"
                        name="campus"
                        value={formData.campus}
                        onChange={handleInputChange}
                        options={campuses}
                        placeholder="Select a campus"
                        helperText="Leave empty for district-level employees"
                      />
                    </>
                  )}

                  <Input
                    label="Job Title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter job title"
                    required
                    icon={<Building2 className="h-4 w-4 text-[var(--muted-text)]" />}
                  />
                </div>
              </div>

              {/* Contact Information Section */}
              <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[var(--purple-100)] rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-[var(--purple-600)]" />
                  </div>
                  <div className="font-semibold text-[var(--primary-black)]">Contact Information</div>
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <Input
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter email address"
                    required
                    icon={<Mail className="h-4 w-4 text-[var(--muted-text)]" />}
                  />
                  
                  <Input
                    label="Phone Number"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Enter phone number"
                    required
                    icon={<Phone className="h-4 w-4 text-[var(--muted-text)]" />}
                  />
                </div>
              </div>

              {/* Permissions Section */}
              <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[var(--purple-100)] rounded-full flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[var(--purple-600)]" />
                  </div>
                  <div className="font-semibold text-[var(--primary-black)]">Dashboard Permissions</div>
                </div>
                <PermissionsSelector
                  selectedPermissions={formData.permissions}
                  onChange={handlePermissionsChange}
                />
                {formData.employeeType === "district" && formData.permissions.length === 0 && (
                  <p className="text-sm text-[var(--muted-text)] mt-4">
                    Select permissions to grant this district employee access to specific dashboard sections.
                  </p>
                )}
                {formData.employeeType === "slv" && (
                  <p className="text-sm text-[var(--blue-600)] mt-4 font-medium">
                    SLV employees typically have full access. You can customize permissions if needed.
                  </p>
                )}
              </div>

            </form>
        </div>
        
        {/* Fixed Footer Buttons */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[var(--gray-200)] p-6">
          <div className="flex justify-end gap-3">
            <Button 
              variant="secondary" 
              onClick={onClose}
            >
              Cancel
            </Button>
            <Button 
              className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white"
              onClick={handleSubmit}
            >
              Add Employee
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
