"use client";
import {
  GraduationCap,
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  X,
} from "lucide-react";
import { useState } from "react";
import SearchInput from "../ui/SearchInput";
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
  const [isCampusModalOpen, setIsCampusModalOpen] = useState(false);
  const [selectedCampusData, setSelectedCampusData] = useState(null);
  const [isDistrictModalOpen, setIsDistrictModalOpen] = useState(false);
  const [selectedDistrictData, setSelectedDistrictData] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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
    return matchesSearch && matchesGrade && matchesCampus && matchesDistrict;
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
      <div className="flex items-center">
       
        <div>
          <h1 className="text-3xl font-bold mb-8">Students Management</h1>
           </div>
      </div>
      {/* Search Section - Full Width */}
      <div className="flex justify-between items-center mb-6 gap-2">
        <div className="relative w-full">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search students by name, ID, campus or district"
            width="w-full"
          />
        </div>
        <Button
          variant="primary"
          icon={<Plus size={18} />}
          onClick={() => setAddModalOpen(true)}
          className="whitespace-nowrap bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] hover:from-[var(--primary-dark)] hover:to-[var(--primary)] text-white shadow-lg hover:shadow-xl transition-all duration-300"
        >
          Add New Student
        </Button>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-[var(--gray-100)] overflow-hidden">
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
            className="bg-white rounded-2xl w-[95vw] h-[90vh] max-w-7xl mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-[var(--gray-200)]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--primary-bg)] rounded-full flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[var(--primary-black)]">Student Details</h2>
                  <p className="text-[var(--muted-text)]">{selectedStudent.name} - {selectedStudent.id}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setSelectedStudent(null);
                }}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--hover-bg)] transition-colors"
              >
                <X className="w-6 h-6 text-[var(--gray-500)]" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
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
            className="bg-white rounded-2xl w-[95vw] h-[90vh] max-w-7xl mx-4 overflow-hidden relative"
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
            <div className="overflow-y-auto max-h-[calc(90vh-200px)] pb-24">
              <StudentDetailsPage params={{ id: selectedStudent.id }} forceViewModal={false} isModal={true} />
            </div>
            
            {/* Fixed Footer Buttons */}
            <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[var(--gray-200)] p-6">
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
    </div>
  );
}
