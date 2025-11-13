"use client";
import { useState } from "react";
import { ArrowLeft, Users, User, Mail, Phone, Building2, MapPin, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import PageLayout from "@/components/layout/page-layout";
import PermissionsSelector from "@/components/employees/PermissionsSelector";

export default function AddEmployeePage() {
  const router = useRouter();
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
    router.push('/employees');
  };

  const handleCancel = () => {
    router.push('/employees');
  };

  return (
    <PageLayout activePage="Employees" pageTitle="Add New Employee">
      <div className="container mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={handleCancel}
            className="p-2 hover:bg-[var(--hover-bg)] rounded-lg transition-colors"
          >
            <ArrowLeft className="h-5 w-5 text-[var(--muted-text)]" />
          </button>
          <h1 className="text-2xl font-bold text-[var(--heading)]">Add New Employee</h1>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg shadow-sm border border-[var(--border)]">
          {/* Card Header */}
          <div className="p-6 border-b border-[var(--border)]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-[var(--heading)]">Add New Employee</h2>
                <p className="text-[var(--muted-text)]">Enter the employee details to create a new employee profile.</p>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Employee Type Selection */}
            <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 shadow-sm">
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
              </>
            )}

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

            {/* Permissions Section */}
            <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 shadow-sm">
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

            {/* Footer Buttons */}
            <div className="flex items-center justify-end gap-3 pt-6 border-t border-[var(--border)]">
              <Button
                variant="secondary"
                onClick={handleCancel}
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
    </PageLayout>
  );
}
