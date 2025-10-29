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
  User,
  X,
  GraduationCap
} from "lucide-react";
import { useState } from "react";
import SearchInput from "../ui/SearchInput";
import Select from "../ui/Select";
import Button from "../ui/Button";
import Collapse from "../ui/Collapse";
import AddEmployeeModal from "./AddEmployeeModal";
import EmployeeActionsDropdown from "./EmployeeActionsDropdown";

export default function EmployeesContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openCollapse, setOpenCollapse] = useState(null);

  // Accordion state - only one collapse can be open at a time
  const handleCollapseToggle = (collapseId) => {
    setOpenCollapse(openCollapse === collapseId ? null : collapseId);
  };

  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsViewModalOpen(true);
  };

  const handleEditEmployee = (employee) => {
    setSelectedEmployee(employee);
    setIsEditModalOpen(true);
  };

  const handleViewModalClose = () => {
    setIsViewModalOpen(false);
    setSelectedEmployee(null);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedEmployee(null);
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
    const matchesText = employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.campus.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || employee.status === (statusFilter === "Not Active" ? "Inactive" : "Active");
    return matchesText && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center">
       
        <div>
          <h1 className="text-3xl font-bold mb-2">Employee Management</h1>
        
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
        <div className="w-48">
          <Select
            placeholder="Status"
            options={[{value:"",label:"All"},{value:"Active",label:"Active"},{value:"Not Active",label:"Not Active"}]}
            value={statusFilter}
            onChange={(e)=>setStatusFilter(e.target.value)}
          />
        </div>
        <Button
          className="bg-gradient-to-r from-[var(--primary)] to-[var(--purple)] hover:from-[var(--primary-dark)] hover:to-[var(--purple-dark)] text-white shadow-lg hover:shadow-xl transition-all duration-300 w-max whitespace-nowrap"
          icon={<Plus className="h-4 w-4" />}
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
                  className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)] transition-all duration-200 cursor-pointer"
                  onClick={() => handleViewEmployee(employee)}
                >
                  <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--purple)] text-white flex items-center justify-center text-sm font-bold">
                        {filteredEmployees.indexOf(employee) + 1}
                      </div>
                      <span className="font-medium">{employee.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium hover:bg-[var(--gray-100)] transition-all duration-200">{employee.name}</td>
                  <td className="px-6 py-4 text-[var(--muted-text)] hover:bg-[var(--gray-100)] transition-all duration-200">{employee.title}</td>
                  <td className="px-6 py-4 text-[var(--muted-text)] hover:bg-[var(--gray-100)] transition-all duration-200">{employee.district}</td>
                  <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                    <div className="flex items-center gap-2 text-[var(--muted-text)]">
                      <Building2 className="h-4 w-4" />
                      {employee.campus}
                    </div>
                  </td>
                  <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                    <div className="flex items-center gap-2 text-[var(--muted-text)]">
                      <Mail className="h-4 w-4" />
                      {employee.email}
                    </div>
                  </td>
                  <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                    <div className="flex items-center gap-2 text-[var(--muted-text)]">
                      <Phone className="h-4 w-4" />
                      {employee.phone}
                    </div>
                  </td>
                  <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
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

      {/* View Employee Modal */}
      {isViewModalOpen && selectedEmployee && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] backdrop-blur-sm"
          onClick={handleViewModalClose}
        >
          <div 
            className="bg-white rounded-2xl w-[95vw] h-[90vh] max-w-7xl mx-4 overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-[var(--gray-200)]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--primary-bg)] rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[var(--primary-black)]">Employee Details</h2>
                  <p className="text-[var(--muted-text)]">{selectedEmployee.name} - {selectedEmployee.id}</p>
                </div>
              </div>
              <button
                onClick={handleViewModalClose}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--hover-bg)] transition-colors"
              >
                <X className="w-6 h-6 text-[var(--gray-500)]" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)] pb-24">
              {/* Single Collapse with All Employee Information */}
              <Collapse 
                title="Employee Information" 
                icon={
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-purple-600">
                    <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                }
                isOpen={openCollapse === 'employee-info'}
                onToggle={() => handleCollapseToggle('employee-info')}
              >
                <div className="space-y-6">
                  {/* Employee Profile Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 rounded-full border border-[var(--gray-200)] overflow-hidden bg-[var(--gray-100)] flex items-center justify-center">
                        <User className="w-8 h-8 text-[var(--purple-600)]" />
                      </div>
                      <div className="flex-1">
                        <div className="font-semibold text-2xl text-[var(--primary-black)]">{selectedEmployee.name}</div>
                        <div className="text-sm text-[var(--muted-text)]">Employee ID: {selectedEmployee.id}</div>
                        <div className="text-sm text-[var(--muted-text)]">Title: {selectedEmployee.title}</div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="bg-[var(--green)] text-white px-3 py-1 rounded-full text-sm font-medium">
                        {selectedEmployee.status}
                      </div>
                      <div className="text-sm text-[var(--muted-text)]">
                        Performance: 4.8/5
                      </div>
                    </div>
                  </div>

                  {/* Employee Information Section */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--blue-100)] flex items-center justify-center">
                      <User className="w-4 h-4 text-[var(--blue-600)]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-[var(--muted-text)]">NAME</div>
                      <div className="text-sm font-medium text-[var(--primary-black)]">{selectedEmployee.name}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--green-100)] flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-[var(--green-600)]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-[var(--muted-text)]">TITLE</div>
                      <div className="text-sm font-medium text-[var(--primary-black)]">{selectedEmployee.title}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--purple-100)] flex items-center justify-center">
                      <Mail className="w-4 h-4 text-[var(--purple-600)]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-[var(--muted-text)]">EMAIL</div>
                      <div className="text-sm font-medium text-[var(--primary-black)]">{selectedEmployee.email}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--orange-100)] flex items-center justify-center">
                      <Phone className="w-4 h-4 text-[var(--orange-600)]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-[var(--muted-text)]">PHONE</div>
                      <div className="text-sm font-medium text-[var(--primary-black)]">{selectedEmployee.phone}</div>
                    </div>
                  </div>
                </div>

                {/* Work Information Section */}
                <div className="mt-6 pt-6 border-t border-[var(--gray-200)]">
                  <h4 className="text-md font-semibold text-[var(--primary-black)] mb-4">Work Information</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--blue-100)] flex items-center justify-center">
                        <MapPin className="w-4 h-4 text-[var(--blue-600)]" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-[var(--muted-text)]">DISTRICT</div>
                        <div className="text-sm font-medium text-[var(--primary-black)]">{selectedEmployee.district}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--green-100)] flex items-center justify-center">
                        <Building2 className="w-4 h-4 text-[var(--green-600)]" />
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-[var(--muted-text)]">CAMPUS</div>
                        <div className="text-sm font-medium text-[var(--primary-black)]">{selectedEmployee.campus}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Employment Details Section */}
                <div className="mt-6 pt-6 border-t border-[var(--gray-200)]">
                  <h4 className="text-md font-semibold text-[var(--primary-black)] mb-4">Employment Details</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--green-100)] flex items-center justify-center">
                        <div className="w-4 h-4 text-[var(--green-600)] font-bold text-xs">📅</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-[var(--muted-text)]">HIRE DATE</div>
                        <div className="text-sm font-medium text-[var(--primary-black)]">Jan 15, 2020</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--purple-100)] flex items-center justify-center">
                        <div className="w-4 h-4 text-[var(--purple-600)] font-bold text-xs">🏢</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-[var(--muted-text)]">DEPARTMENT</div>
                        <div className="text-sm font-medium text-[var(--primary-black)]">Administration</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--orange-100)] flex items-center justify-center">
                        <div className="w-4 h-4 text-[var(--orange-600)] font-bold text-xs">⏰</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-[var(--muted-text)]">WORK HOURS</div>
                        <div className="text-sm font-medium text-[var(--primary-black)]">Full-time (40 hrs/week)</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Performance & Skills Section */}
                <div className="mt-6 pt-6 border-t border-[var(--gray-200)]">
                  <h4 className="text-md font-semibold text-[var(--primary-black)] mb-4">Performance & Skills</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--blue-100)] flex items-center justify-center">
                        <div className="w-4 h-4 text-[var(--blue-600)] font-bold text-xs">⭐</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-[var(--muted-text)]">PERFORMANCE RATING</div>
                        <div className="text-sm font-medium text-[var(--primary-black)]">Excellent (4.8/5)</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--purple-100)] flex items-center justify-center">
                        <div className="w-4 h-4 text-[var(--purple-600)] font-bold text-xs">🎓</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-[var(--muted-text)]">EDUCATION</div>
                        <div className="text-sm font-medium text-[var(--primary-black)]">Master's in Education</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--orange-100)] flex items-center justify-center">
                        <div className="w-4 h-4 text-[var(--orange-600)] font-bold text-xs">🏆</div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-[var(--muted-text)]">CERTIFICATIONS</div>
                        <div className="text-sm font-medium text-[var(--primary-black)]">3 Active Certifications</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              </Collapse>
            </div>
            
            {/* Fixed Footer Buttons */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[var(--gray-200)] p-6">
              <div className="flex justify-end gap-3">
                <Button 
                  variant="secondary" 
                  onClick={handleViewModalClose}
                  className="flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Close
                </Button>
                <Button 
                  className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white flex items-center gap-2"
                  onClick={() => {
                    handleViewModalClose();
                    handleEditEmployee(selectedEmployee);
                  }}
                >
                  <Edit className="w-4 h-4" />
                  Edit Employee
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Edit Employee Modal */}
      {isEditModalOpen && selectedEmployee && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] backdrop-blur-sm"
          onClick={handleEditModalClose}
        >
          <div 
            className="bg-white rounded-2xl w-[95vw] h-[90vh] max-w-7xl mx-4 overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-[var(--gray-200)]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--primary-bg)] rounded-full flex items-center justify-center">
                  <Edit className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[var(--primary-black)]">Edit Employee</h2>
                  <p className="text-[var(--muted-text)]">{selectedEmployee.name} - {selectedEmployee.id}</p>
                </div>
              </div>
              <button
                onClick={handleEditModalClose}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--hover-bg)] transition-colors"
              >
                <X className="w-6 h-6 text-[var(--gray-500)]" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)] pb-24">
              <form className="space-y-6">
                {/* Personal Information Section */}
                <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[var(--blue-100)] rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-[var(--blue-600)]" />
                    </div>
                    <div className="font-semibold text-[var(--primary-black)]">Personal Information</div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">First Name</label>
                      <input 
                        type="text" 
                        defaultValue={selectedEmployee.name.split(' ')[0]}
                        className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">Last Name</label>
                      <input 
                        type="text" 
                        defaultValue={selectedEmployee.name.split(' ')[1] || ''}
                        className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                      />
                    </div>
                  </div>
                </div>

                {/* Work Information Section */}
                <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[var(--green-100)] rounded-full flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-[var(--green-600)]" />
                    </div>
                    <div className="font-semibold text-[var(--primary-black)]">Work Information</div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">Job Title</label>
                      <input 
                        type="text" 
                        defaultValue={selectedEmployee.title}
                        className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">District</label>
                        <input 
                          type="text" 
                          defaultValue={selectedEmployee.district}
                          className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">Campus</label>
                        <input 
                          type="text" 
                          defaultValue={selectedEmployee.campus}
                          className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information Section */}
                <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[var(--purple-100)] rounded-full flex items-center justify-center">
                      <Phone className="w-6 h-6 text-[var(--purple-600)]" />
                    </div>
                    <div className="font-semibold text-[var(--primary-black)]">Contact Information</div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">Email Address</label>
                      <input 
                        type="email" 
                        defaultValue={selectedEmployee.email}
                        className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">Phone Number</label>
                      <input 
                        type="text" 
                        defaultValue={selectedEmployee.phone}
                        className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[var(--gray-200)] p-6">
              <div className="flex justify-end gap-3">
                <Button 
                  variant="secondary" 
                  onClick={handleEditModalClose}
                  className="flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
                <Button 
                  className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white flex items-center gap-2"
                >
                  <Edit className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
