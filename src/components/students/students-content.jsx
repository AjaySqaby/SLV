"use client";
import {
  GraduationCap,
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  X,
  Maximize2,
} from "lucide-react";
import { useState } from "react";
import SearchInput from "../ui/SearchInput";
import Select from "../ui/Select";
import { useRouter } from "next/navigation";
import StatusBadge from "../ui/StatusBadge";
import Button from "../ui/Button";
import AddStudentModal from './AddStudentModal';
import CampusDetailModal from './CampusDetailModal';
import DistrictDetailModal from './DistrictDetailModal';
import StudentActionsDropdown from './StudentActionsDropdown';
import StudentProfilePage from './StudentProfilePage';
import StudentDetailsPage from './StudentDetailsPage';

export default function StudentsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");
  const [campusFilter, setCampusFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const router = useRouter();
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [isCampusModalOpen, setIsCampusModalOpen] = useState(false);
  const [selectedCampusData, setSelectedCampusData] = useState(null);
  const [isDistrictModalOpen, setIsDistrictModalOpen] = useState(false);
  const [selectedDistrictData, setSelectedDistrictData] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isBulkUploadModalOpen, setBulkUploadModalOpen] = useState(false);

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  const students = [
    {
      id: "S-001",
      name: "Emma Johnson",
      grade: 9,
      campus: "Riverdale High",
      district: "86022-Z",
      address: "123 Lake St, Riverdale, GA",
      status: "Active",
    },
    {
      id: "S-002",
      name: "Michael Brown",
      grade: 5,
      campus: "Westview Elementary",
      district: "86022-Z",
      address: "88 Main Ave, Atlanta, GA",
      status: "Active",
    },
    {
      id: "S-003",
      name: "Sophia Davis",
      grade: 7,
      campus: "Lincoln Middle School",
      district: "75044-A",
      address: "456 Oak Dr, Marietta, GA",
      status: "Active",
    },
    {
      id: "S-004",
      name: "Jacob Martinez",
      grade: 11,
      campus: "Washington High",
      district: "75044-A",
      address: "789 Pine Ave, Sandy Springs, GA",
      status: "Inactive",
    },
  ];


  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.campus.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.district.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGrade =
      !gradeFilter || student.grade.toString() === gradeFilter;
    const matchesCampus = !campusFilter || student.campus === campusFilter;
    const matchesDistrict = !districtFilter || student.district === districtFilter;
    const matchesStatus = !statusFilter || student.status === (statusFilter === "Not Active" ? "Inactive" : "Active");
    return matchesSearch && matchesGrade && matchesCampus && matchesDistrict && matchesStatus;
  });

  const handleCampusClick = (campusName, district, address) => {
    setSelectedCampusData({
      name: campusName,
      district: district,
      address: address
    });
    setIsCampusModalOpen(true);
  };

  const handleDistrictClick = (districtId) => {
    setSelectedDistrictData({
      district: districtId
    });
    setIsDistrictModalOpen(true);
  };

  const handleViewStudent = (student) => {
    setSelectedStudent(student);
    setIsViewModalOpen(true);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setIsEditModalOpen(true);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedStudent(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Students Management</h1>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-[var(--muted-text)]"
          onClick={handleFullscreen}
        >
          <Maximize2 size={18} />
          {isFullscreen ? "Exit Full Screen" : "Full Screen"}
        </Button>
      </div>

      <div className="bg-[var(--surface-bg)] rounded-lg shadow-sm border border-[var(--card-border)] p-6 mb-8">

        {/* Search and Filter Section */}
        <div className="flex justify-between items-center mb-6 gap-3">
          <div className="relative flex-1 max-none">
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search students by name, ID, campus or district"
              width="w-full"
            />
          </div>
          <div className="w-48">
            <Select
              placeholder="Status"
              options={[{value:"",label:"All"},{value:"Active",label:"Active"},{value:"Not Active",label:"Not Active"}]}
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            />
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Button
              variant="outline"
              className="text-sm flex items-center justify-center font-medium gap-2 whitespace-nowrap transition-all duration-200 hover:shadow-md"
              onClick={() => setBulkUploadModalOpen(true)}
            >
              <Plus size={18} />
              Bulk Upload
            </Button>
            <Button
              className="text-sm flex items-center justify-center font-medium gap-2 bg-gradient-to-r from-[var(--purple-600)] to-[var(--blue)] hover:from-[var(--purple-700)] hover:to-[var(--blue-600)] whitespace-nowrap transition-all duration-200 hover:shadow-md"
              onClick={() => setAddModalOpen(true)}
            >
              <Plus size={18} />
              Add New Student
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
          <thead className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Student ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Grade</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Campus</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">District</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Address</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Status</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-[var(--gray-700)]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr
                key={student.id}
                className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)] transition-all duration-200 cursor-pointer"
                onClick={() => handleViewStudent(student)}
              >
                <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--purple)] text-white flex items-center justify-center text-sm font-bold">
                      {filteredStudents.indexOf(student) + 1}
                    </div>
                    <span className="font-medium">{student.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium hover:bg-[var(--gray-100)] transition-all duration-200">{student.name}</td>
                <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">{student.grade}</td>
                <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                  <span 
                    className="text-[var(--blue-600)] hover:underline cursor-pointer transition-colors hover:text-[var(--blue-700)]"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCampusClick(student.campus, student.district, student.address);
                    }}
                  >
                    {student.campus}
                  </span>
                </td>
                <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                  <span 
                    className="text-[var(--blue-600)] hover:underline cursor-pointer transition-colors hover:text-[var(--blue-700)]"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDistrictClick(student.district);
                    }}
                  >
                    {student.district}
                  </span>
                </td>
                <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">{student.address}</td>
                <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                  <StatusBadge
                    status={student.status}
                    type={student.status === "Active" ? "active" : "inactive"}
                  />
                </td>
                <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                  <div className="flex justify-center">
                    <StudentActionsDropdown
                      student={student}
                      onView={handleViewStudent}
                      onEdit={handleEditStudent}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </div>
      <AddStudentModal
        isOpen={isAddModalOpen}
        onClose={() => setAddModalOpen(false)}
      />
      <CampusDetailModal
        open={isCampusModalOpen}
        onClose={() => setIsCampusModalOpen(false)}
        campusData={selectedCampusData}
      />
      <DistrictDetailModal
        open={isDistrictModalOpen}
        onClose={() => setIsDistrictModalOpen(false)}
        districtData={selectedDistrictData}
      />
      {/* View Modal - using existing StudentProfilePage */}
      {isViewModalOpen && selectedStudent && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] backdrop-blur-sm"
          onClick={() => {
            setIsViewModalOpen(false);
            setSelectedStudent(null);
          }}
        >
          <div 
            className="bg-white rounded-2xl !max-w-[82rem] mx-4 w-full h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: '#e5e7eb' }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: '#8b5cf6' }}>
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold" style={{ color: '#111827' }}>Student Details</h2>
                  <p style={{ color: '#6b7280' }}>{selectedStudent.name} - {selectedStudent.id}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setSelectedStudent(null);
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                aria-label="Close"
                title="Close"
              >
                <X className="w-6 h-6" style={{ color: '#6b7280' }} />
              </button>
            </div>
            <div className="overflow-y-auto flex-1">
              <StudentProfilePage studentId={selectedStudent.id} />
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal - using existing StudentDetailsPage */}
      {isEditModalOpen && selectedStudent && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] backdrop-blur-sm"
          onClick={handleEditModalClose}
        >
          <div 
            className="bg-white rounded-2xl !max-w-[82rem] mx-4 w-full h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-[var(--gray-200)]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--primary-bg)] rounded-full flex items-center justify-center">
                  <Edit className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[var(--primary-black)]">Edit Student</h2>
                  <p className="text-[var(--muted-text)]">{selectedStudent.name} - {selectedStudent.id}</p>
                </div>
              </div>
              <button
                onClick={handleEditModalClose}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--hover-bg)] transition-colors"
              >
                <X className="w-6 h-6 text-[var(--gray-500)]" />
              </button>
            </div>
            <div className="overflow-y-auto flex-1 pb-24">
              <StudentDetailsPage params={{ id: selectedStudent.id }} forceViewModal={false} isModal={true} />
            </div>
            
            {/* Fixed Footer Buttons */}
            <div className="bg-white border-t border-[var(--gray-200)] p-6">
              <div className="flex justify-end gap-3">
                <Button 
                  variant="secondary" 
                  onClick={handleEditModalClose}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Upload Modal */}
      {isBulkUploadModalOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] backdrop-blur-sm"
          onClick={() => setBulkUploadModalOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl w-[95vw] h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] max-w-7xl mx-4 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--gray-200)' }}>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--blue-600)' }}
                  >
                    <Plus className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold" style={{ color: 'var(--heading)' }}>Bulk Upload Students</h1>
                    <p className="text-sm" style={{ color: 'var(--muted-text)' }}>Upload multiple students via CSV file</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setBulkUploadModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* Instructions */}
              <div 
                className="p-4 rounded-lg border mb-6"
                style={{ 
                  backgroundColor: 'var(--blue-100)',
                  borderColor: 'var(--blue-200)'
                }}
              >
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 mt-0.5" style={{ color: 'var(--blue-600)' }}>
                    <Plus className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-1" style={{ color: 'var(--blue-600)' }}>
                      Upload Instructions
                    </p>
                    <p className="text-sm" style={{ color: 'var(--blue-600)' }}>
                      Upload a CSV file with student information. The file should include columns for: Name, Grade, Campus, District, Address, Phone, Email, and Guardian Name.
                    </p>
                  </div>
                </div>
              </div>

            {/* File Upload Area */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2" style={{ color: 'var(--heading)' }}>
                Select CSV File
              </label>
              <div 
                className="border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-gray-50 transition-colors"
                style={{ borderColor: 'var(--gray-300)' }}
                onClick={() => document.getElementById('csvFileInput').click()}
              >
                <Plus className="w-12 h-12 mx-auto mb-4" style={{ color: 'var(--gray-400)' }} />
                <p className="text-lg font-medium mb-2" style={{ color: 'var(--heading)' }}>
                  Click to upload CSV file
                </p>
                <p className="text-sm" style={{ color: 'var(--muted-text)' }}>
                  or drag and drop your file here
                </p>
                <input
                  id="csvFileInput"
                  type="file"
                  accept=".csv"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      console.log('File selected:', file.name);
                    }
                  }}
                />
              </div>
            </div>

            {/* Template Download */}
            <div className="mb-6">
              <p className="text-sm mb-2" style={{ color: 'var(--heading)' }}>
                Need a template? Download our CSV template:
              </p>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
                onClick={() => {
                  // Create and download CSV template
                  const csvContent = "Name,Grade,Campus,District,Address,Phone,Email,Guardian Name\nJohn Doe,5th Grade,Lincoln Elementary,District A,123 Main St,(555) 123-4567,john@example.com,Jane Doe";
                  const blob = new Blob([csvContent], { type: 'text/csv' });
                  const url = window.URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = 'student_template.csv';
                  a.click();
                  window.URL.revokeObjectURL(url);
                }}
              >
                <Plus className="w-4 h-4" />
                Download Template
              </Button>
            </div>

            </div>

            {/* Footer */}
            <div className="bg-white border-t border-[var(--gray-200)] p-6">
              <div className="flex justify-end gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setBulkUploadModalOpen(false)}
                  className="px-6 py-2"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    console.log('Bulk upload started')
                    setBulkUploadModalOpen(false)
                  }}
                  className="px-6 py-2"
                  style={{ 
                    backgroundColor: 'var(--blue-600)', 
                    color: 'var(--on-primary)' 
                  }}
                >
                  Upload Students
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
