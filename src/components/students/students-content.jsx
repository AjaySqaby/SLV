"use client";
import {
  GraduationCap,
  Search,
  Plus,
} from "lucide-react";
import { useState } from "react";
import SearchInput from "../ui/SearchInput";
import { useRouter } from "next/navigation";
import StatusBadge from "../ui/StatusBadge";
import Button from "../ui/Button";
import AddStudentModal from './AddStudentModal';

export default function StudentsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [gradeFilter, setGradeFilter] = useState("");
  const [campusFilter, setCampusFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const router = useRouter();
  const [isAddModalOpen, setAddModalOpen] = useState(false);
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
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search students by name, ID, campus or district"
            width="w-[400px]"
          />
         
        </div>
        <div className="flex gap-3">
         
          <Button
            variant="primary"
            icon={<Plus size={18} />}
            onClick={() => setAddModalOpen(true)}
          >
            Add New Student
          </Button>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border border-[var(--gray-100)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-[var(--gray-500)] border-b border-[var(--gray-100)]">
              <th className="px-6 py-3 font-medium">Student ID</th>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Grade</th>
              <th className="px-6 py-3 font-medium">Campus</th>
              <th className="px-6 py-3 font-medium">District</th>
              <th className="px-6 py-3 font-medium">Address</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student) => (
              <tr
                key={student.id}
                className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)]"
              >
                <td className="px-6 py-4 font-medium">{student.id}</td>
                <td className="px-6 py-4 font-medium">{student.name}</td>
                <td className="px-6 py-4">{student.grade}</td>
                <td className="px-6 py-4">
                  <span className="text-[var(--blue-600)] hover:underline cursor-pointer">
                    {student.campus}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[var(--blue-600)] hover:underline cursor-pointer">
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
                  <div className="flex gap-2">
                    <button
                      className="px-3 py-1 text-sm border rounded-lg text-[var(--gray-600)] hover:text-[var(--gray-800)]"
                      onClick={() =>
                        router.push(`/students/${student.id}?view=1`)
                      }
                    >
                      View
                    </button>
                    <button
                      className="px-3 py-1 text-sm border rounded-lg text-[var(--gray-600)] hover:text-[var(--gray-800)]"
                      onClick={() => router.push(`/students/${student.id}`)}
                    >
                      Edit
                    </button>
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
    </div>
  );
}
