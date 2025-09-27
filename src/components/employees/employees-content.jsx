"use client";
import {
  Users,
  Search,
  Plus,
  MapPin,
  Building2,
  Mail,
  Phone,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  User
} from "lucide-react";
import { useState } from "react";
import SearchInput from "../ui/SearchInput";
import Button from "../ui/Button";
import AddEmployeeModal from "./AddEmployeeModal";
import EmployeeActionsDropdown from "./EmployeeActionsDropdown";

export default function EmployeesContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleViewEmployee = (employee) => {
    console.log("View employee:", employee);
    // Handle view employee logic here
  };

  const handleEditEmployee = (employee) => {
    console.log("Edit employee:", employee);
    // Handle edit employee logic here
  };

  // Mock data - replace with actual data from your API
  const employees = [
    {
      id: "E-001",
      name: "John Smith",
      title: "Principal",
      district: "86022-Z",
      campus: "Riverdale High",
      email: "jsmith@riverdale.edu",
      phone: "(404) 555-1234",
      status: "Active"
    },
    {
      id: "E-002",
      name: "Sarah Johnson",
      title: "Assistant Principal",
      district: "86022-Z",
      campus: "Riverdale High",
      email: "sjohnson@riverdale.edu",
      phone: "(404) 555-2345",
      status: "Active"
    },
    {
      id: "E-003",
      name: "Michael Williams",
      title: "Transportation Director",
      district: "86022-Z",
      campus: "District Level",
      email: "mwilliams@district86022z.edu",
      phone: "(404) 555-3456",
      status: "Active"
    },
    {
      id: "E-004",
      name: "Jennifer Davis",
      title: "Teacher",
      district: "75044-A",
      campus: "Lincoln Middle School",
      email: "jdavis@lincolnms.edu",
      phone: "(404) 555-4567",
      status: "Active"
    }
  ];

  const filteredEmployees = employees.filter((employee) => {
    return employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.campus.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center">
       
        <div>
          <h1 className="text-3xl font-bold mb-8">Employee Management</h1>
        
        </div>
      </div>

      {/* Search Section - Full Width */}
      <div className="flex justify-between items-center mb-6 gap-2">
        <div className="relative w-full">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search employees by name, title or campus"
            width="w-full"
          />
        </div>
        <Button
          variant="primary"
          icon={<Plus className="h-4 w-4" />}
          className="whitespace-nowrap"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add New Employee
        </Button>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-lg shadow-sm border border-[var(--gray-100)] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Title</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">District</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Campus</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Email</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Phone</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Status</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-[var(--gray-700)]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.length > 0 ? (
              filteredEmployees.map((employee) => (
                <tr
                  key={employee.id}
                  className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)] transition-all duration-200"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--purple)] text-white flex items-center justify-center text-sm font-bold">
                        {filteredEmployees.indexOf(employee) + 1}
                      </div>
                      <span className="font-medium">{employee.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium">{employee.name}</td>
                  <td className="px-6 py-4 text-[var(--muted-text)]">{employee.title}</td>
                  <td className="px-6 py-4 text-[var(--muted-text)]">{employee.district}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-[var(--muted-text)]">
                      <Building2 className="h-4 w-4" />
                      {employee.campus}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-[var(--muted-text)]">
                      <Mail className="h-4 w-4" />
                      {employee.email}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-[var(--muted-text)]">
                      <Phone className="h-4 w-4" />
                      {employee.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
                      {employee.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <EmployeeActionsDropdown
                        employee={employee}
                        onView={handleViewEmployee}
                        onEdit={handleEditEmployee}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-[var(--gray-100)] rounded-full flex items-center justify-center mb-4">
                      <Users className="h-8 w-8 text-[var(--muted-text)]" />
                    </div>
                    <p className="text-[var(--muted-text)] text-center">
                      No employees found. Add your first employee!
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Employee Modal */}
      <AddEmployeeModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />
    </div>
  );
}
