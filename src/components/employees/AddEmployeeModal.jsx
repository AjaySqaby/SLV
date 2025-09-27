"use client";
import { useState } from "react";
import { X, Users, User, Mail, Phone, Building2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";

export default function AddEmployeeModal({ open, onClose }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    district: "",
    campus: "",
    title: "",
    email: "",
    phone: ""
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Employee data:", formData);
    // Handle form submission here
    onClose();
  };

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl w-full max-w-7xl "
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Add New Employee</h2>
              <p className="text-[var(--gray-600)] text-sm">
                Enter the employee details to create a new employee profile
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6">
          {/* Form Content */}
          <form onSubmit={handleSubmit} className="space-y-6">
              {/* First Name and Last Name - Two Columns */}
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

              {/* District - Single Column */}
              <Select
                label="District"
                name="district"
                value={formData.district}
                onChange={handleInputChange}
                options={districts}
                placeholder="Select a district"
                required
              />

              {/* Campus - Single Column */}
              <Select
                label="Campus (Optional for district-level employees)"
                name="campus"
                value={formData.campus}
                onChange={handleInputChange}
                options={campuses}
                placeholder="Select a campus"
                helperText="Leave empty for district-level employees"
              />

              {/* Title - Single Column */}
              <Input
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Enter job title"
                required
                icon={<Building2 className="h-4 w-4 text-[var(--muted-text)]" />}
              />

              {/* Email - Single Column */}
              <Input
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                required
                icon={<Mail className="h-4 w-4 text-[var(--muted-text)]" />}
              />

              {/* Phone Number - Single Column */}
              <Input
                label="Phone Number"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Enter phone number"
                required
                icon={<Phone className="h-4 w-4 text-[var(--muted-text)]" />}
              />

              {/* Footer Buttons */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-[var(--border)]">
                <Button
                  variant="secondary"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                >
                  Add Employee
                </Button>
              </div>
            </form>
        </div>
      </div>
    </div>
  );
}
