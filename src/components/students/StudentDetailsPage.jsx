"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import StudentProfileView from "./StudentProfileView"
import StudentEditForm from "./StudentEditForm"

export default function StudentDetailsPage({ params, forceViewModal, isModal = false }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(0)

  // Mock data for the student
  const student = {
    id: params.id,
    name: "Emma Johnson",
    initials: "EJ",
    grade: 9,
    studentId: "S-001",
    campus: "Riverdale High",
    district: "Northside School District",
    address: "123 Lake St, Riverdale, GA",
    status: "Active",
    guardian: {
      name: "Robert Johnson",
      phone: "(404) 555-1234",
      email: "rjohnson@example.com",
    },
    transportation: {
      assignedRoutes: 1,
      scheduledRides: 2,
    },
    routes: [
      {
        id: "RT-30842",
        name: "North District Route",
        stops: 5,
        distance: "12.4 mi",
        status: "Active",
      },
    ],
    rides: [
      {
        id: "RD-12345",
        date: "May 20, 2025",
        driver: "John Smith",
        route: "North District Route",
        status: "Scheduled",
      },
      {
        id: "RD-12346",
        date: "May 21, 2025",
        driver: "Jane Doe",
        route: "North District Route",
        status: "Scheduled",
      },
    ],
    approvedDrivers: [
      {
        id: "DRV-5432",
        name: "John Smith",
        rating: 4.8,
        ridesCompleted: 24,
        status: "Active",
      },
      {
        id: "DRV-7654",
        name: "Jane Doe",
        rating: 4.9,
        ridesCompleted: 36,
        status: "Active",
      },
    ],
    blockedDrivers: [
      {
        id: "DRV-1234",
        name: "Robert Wilson",
        reason: "Inappropriate behavior",
      },
    ],
  }

  // Edit form state
  const [form, setForm] = useState({
    fullName: student.name || "",
    dob: "",
    grade: student.grade ? `${student.grade}th Grade` : "",
    status: student.status || "Active",
    primaryAddress: student.address || "",
    secondaryAddress: "",
    district: student.district || "",
    campus: student.campus || "",
    guardianName: student.guardian?.name || "",
    guardianEmail: student.guardian?.email || "",
    guardianPhone: student.guardian?.phone || "",
    secondaryName: "",
    secondaryEmail: "",
    secondaryPhone: "",
    notes: "",
    // Special equipment flags
    carSeat: false,
    boosterSeat: false,
    monitor: false,
    wheelchair: false,
    walker: false,
    harness: false,
    buckleGuard: false,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Updating student with data:", form);
    // TODO: Implement actual API call to update student
    alert("Student updated successfully!");
    // Close modal if in modal mode
    if (isModal) {
      // This will be handled by parent component
      console.log("Student updated, modal should close");
    }
  };
  const gradeOptions = [
    { value: "9th Grade", label: "9th Grade" },
    { value: "10th Grade", label: "10th Grade" },
    { value: "11th Grade", label: "11th Grade" },
    { value: "12th Grade", label: "12th Grade" },
  ];
  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  if (forceViewModal) {
    return (
      <StudentProfileView
        student={student}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    );
  }
  return (
    <StudentEditForm
      form={form}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      gradeOptions={gradeOptions}
      statusOptions={statusOptions}
      isModal={isModal}
    />
  );
} 