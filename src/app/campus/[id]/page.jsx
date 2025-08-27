"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import CampusHeader from "@/components/campus/details/CampusHeader";
import CampusInfoCard from "@/components/campus/details/CampusInfoCard";
import CampusTabs from "@/components/campus/details/CampusTabs";
import ScheduleTab from "@/components/campus/details/ScheduleTab";
import StudentsTab from "@/components/campus/details/StudentsTab";
import RoutesTab from "@/components/campus/details/RoutesTab";
import RidesTab from "@/components/campus/details/RidesTab";
import EmployeesTab from "@/components/campus/details/EmployeesTab";
import PageLayout from "@/components/layout/page-layout";

const campusData = {
  id: "C-001",
  name: "Riverside High School",
  type: "High School",
  district: "Northside School District",
  address: "2000 School Rd, Riverdale, GA",
  students: 1250,
  status: "Active",
};

const students = [
  {
    id: "ST-001",
    name: "Emma Johnson",
    grade: 9,
    homeroom: "9A",
    address: "123 Lake St, Riverdale, GA",
    transportation: "Route R-002",
    status: "Active",
  },
  {
    id: "ST-002",
    name: "Noah Williams",
    grade: 9,
    homeroom: "9B",
    address: "45 Pine Ave, Riverdale, GA",
    transportation: "Route R-001",
    status: "Active",
  },
  {
    id: "ST-003",
    name: "Olivia Davis",
    grade: 10,
    homeroom: "10A",
    address: "789 Oak Dr, Riverdale, GA",
    transportation: "Eligible",
    status: "Active",
  },
  {
    id: "ST-004",
    name: "Liam Brown",
    grade: 11,
    homeroom: "11C",
    address: "234 Elm St, Riverdale, GA",
    transportation: "Not eligible",
    status: "Inactive",
  },
  {
    id: "ST-005",
    name: "Ava Wilson",
    grade: 12,
    homeroom: "12B",
    address: "567 Maple Rd, Riverdale, GA",
    transportation: "Route R-002",
    status: "Active",
  },
];

const routes = [
  {
    id: "R-001",
    name: "Morning Route A",
    driver: "John Smith",
    vehicle: "Bus 12",
    students: 18,
    schedule: { departure: "07:15 AM", arrival: "07:45 AM" },
    status: "Active",
  },
  {
    id: "R-002",
    name: "Morning Route B",
    driver: "Sarah Johnson",
    vehicle: "Bus 8",
    students: 24,
    schedule: { departure: "07:20 AM", arrival: "07:50 AM" },
    status: "Active",
  },
  {
    id: "R-003",
    name: "Afternoon Route A",
    driver: "John Smith",
    vehicle: "Bus 12",
    students: 18,
    schedule: { departure: "03:15 PM", arrival: "04:00 PM" },
    status: "Active",
  },
  {
    id: "R-004",
    name: "Afternoon Route B",
    driver: "Sarah Johnson",
    vehicle: "Bus 8",
    students: 24,
    schedule: { departure: "03:20 PM", arrival: "04:10 PM" },
    status: "Active",
  },
  {
    id: "R-005",
    name: "Special Events Bus",
    driver: "Michael Roberts",
    vehicle: "Bus 5",
    students: 12,
    schedule: { departure: "Varies", arrival: "Varies" },
    status: "Inactive",
  },
];

const rides = [
  {
    id: "RD-001",
    date: "May 14, 2025",
    route: "Morning Route A",
    driver: "John Smith",
    students: 18,
    time: { start: "07:15 AM", end: "07:45 AM" },
    status: "Completed",
  },
  {
    id: "RD-002",
    date: "May 14, 2025",
    route: "Morning Route B",
    driver: "Sarah Johnson",
    students: 24,
    time: { start: "07:20 AM", end: "07:50 AM" },
    status: "Completed",
  },
  {
    id: "RD-003",
    date: "May 14, 2025",
    route: "Afternoon Route A",
    driver: "John Smith",
    students: 18,
    time: { start: "03:15 PM", end: "04:00 PM" },
    status: "Scheduled",
  },
  {
    id: "RD-004",
    date: "May 14, 2025",
    route: "Afternoon Route B",
    driver: "Sarah Johnson",
    students: 24,
    time: { start: "03:20 PM", end: "04:10 PM" },
    status: "Scheduled",
  },
  {
    id: "RD-005",
    date: "May 13, 2025",
    route: "Afternoon Route A",
    driver: "John Smith",
    students: 16,
    time: { start: "03:15 PM", end: "04:05 PM" },
    status: "Completed",
  },
];

const employees = [
  { name: "Admin", email: "admin@admin.com", phone: "", position: "Principal" },
];

const tabs = [
  { id: 0, label: "Students" },
  { id: 1, label: "Routes" },
  { id: 2, label: "Rides" },
  { id: 3, label: "Schedule" },
  { id: 4, label: "Employees" },
];

const bellSchedule = {
  Monday: [
    {
      name: "Morning Arrival",
      type: "Arrival",
      start: "7:30 AM",
      end: "8:00 AM",
      duration: "30 min",
      color: "bg-purple-50",
    },
    {
      name: "Homeroom",
      type: "Class",
      start: "8:00 AM",
      end: "8:15 AM",
      duration: "15 min",
      color: "bg-blue-50",
    },
  ],
  Tuesday: [
    {
      name: "Morning Arrival",
      type: "Arrival",
      start: "11:30 AM",
      end: "12:00 AM",
      duration: "30 min",
      color: "bg-purple-50",
    },
    {
      name: "Homeroom",
      type: "Class",
      start: "9:00 AM",
      end: "9:15 AM",
      duration: "15 min",
      color: "bg-blue-50",
    },
  ],
  // ...other days
};

export default function CampusDetailsPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(3); // Default to Schedule for demo
  const [activeDay, setActiveDay] = useState("Monday");
  const [showAddBlockModal, setShowAddBlockModal] = useState(false);
  const [bellScheduleState, setBellScheduleState] = useState(bellSchedule);
  const [blockForm, setBlockForm] = useState({
    day: "Monday",
    name: "",
    type: "Class",
    start: "08:00",
    end: "08:45",
  });

  const handleAddBlock = (e) => {
    e.preventDefault();
    const start = blockForm.start;
    const end = blockForm.end;
    // Calculate duration in minutes
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    let startMins = sh * 60 + sm;
    let endMins = eh * 60 + em;
    if (endMins < startMins) endMins += 24 * 60; // handle overnight
    const duration = `${endMins - startMins} min`;
    let color = "bg-blue-50";
    if (blockForm.type === "Arrival") color = "bg-purple-50";
    else if (blockForm.type === "Break") color = "bg-green-50";
    else if (blockForm.type === "Lunch") color = "bg-yellow-50";
    else if (blockForm.type === "Dismissal") color = "bg-orange-50";
    setBellScheduleState((prev) => ({
      ...prev,
      [blockForm.day]: [
        ...(prev[blockForm.day] || []),
        {
          name: blockForm.name,
          type: blockForm.type,
          start: blockForm.start,
          end: blockForm.end,
          duration,
          color,
        },
      ],
    }));
    setShowAddBlockModal(false);
    setBlockForm({
      day: activeDay,
      name: "",
      type: "Class",
      start: "08:00",
      end: "08:45",
    });
  };

  return (
    <PageLayout activePage="Campus" pageTitle="Campus Details">
      <div className="container mx-auto p-6">
        <button
          className="flex items-center text-blue-600 mb-4"
          onClick={() => router.back()}
        >
          &lt; Back to Campuses
        </button>
        <CampusHeader
          name={campusData.name}
          type={campusData.type}
          id={campusData.id}
          status={campusData.status}
          students={campusData.students}
          district={campusData.district}
          onEdit={() => router.push(`/campus/${campusData.id}/edit`)}
        />
        <CampusInfoCard address={campusData.address} />
        <div className="bg-white p-6">
          <CampusTabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
          <div className="mt-6">
            {activeTab === 0 && <StudentsTab students={students} />}
            {activeTab === 1 && <RoutesTab routes={routes} />}
            {activeTab === 2 && <RidesTab rides={rides} />}
            {activeTab === 3 && (
              <ScheduleTab
                activeDay={activeDay}
                setActiveDay={setActiveDay}
                bellScheduleState={bellScheduleState}
                showAddBlockModal={showAddBlockModal}
                setShowAddBlockModal={setShowAddBlockModal}
                blockForm={blockForm}
                setBlockForm={setBlockForm}
                handleAddBlock={handleAddBlock}
              />
            )}
            {activeTab === 4 && <EmployeesTab campusName={campusData.name} />}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
