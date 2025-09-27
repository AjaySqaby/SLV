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
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
          <GraduationCap className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Students Management</h1>
          <p className="text-gray-600 text-sm">Manage all students, create new profiles, and assign them to campuses and districts.</p>
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
          className="whitespace-nowrap"
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
                className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)] transition-all duration-200"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--purple)] text-white flex items-center justify-center text-sm font-bold">
                      {filteredStudents.indexOf(student) + 1}
                    </div>
                    <span className="font-medium">{student.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">{student.name}</td>
                <td className="px-6 py-4">{student.grade}</td>
                <td className="px-6 py-4">
                  <span 
                    className="text-[var(--blue-600)] hover:underline cursor-pointer transition-colors hover:text-[var(--blue-700)]"
                    onClick={() => handleCampusClick(student.campus, student.district, student.address)}
                  >
                    {student.campus}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span 
                    className="text-[var(--blue-600)] hover:underline cursor-pointer transition-colors hover:text-[var(--blue-700)]"
                    onClick={() => handleDistrictClick(student.district)}
                  >
                    {student.district}
                  </span>
                </td>
                <td className="px-6 py-4">{student.address}</td>
                <td className="px-6 py-4">
                  <StatusBadge
                    status={student.status}
                    type={student.status === "Active" ? "active" : "inactive"}
                  />
                </td>
                <td className="px-6 py-4">
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
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => {
            setIsViewModalOpen(false);
            setSelectedStudent(null);
          }}
        >
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Student Details</h2>
              <button
                onClick={() => {
                  setIsViewModalOpen(false);
                  setSelectedStudent(null);
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-4">
              <StudentProfilePage studentId={selectedStudent.id} />
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal - using existing StudentDetailsPage */}
      {isEditModalOpen && selectedStudent && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={handleEditModalClose}
        >
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
              <h2 className="text-xl font-semibold">Edit Student</h2>
              <button
                onClick={handleEditModalClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-0">
              <StudentDetailsPage params={{ id: selectedStudent.id }} forceViewModal={false} isModal={true} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
