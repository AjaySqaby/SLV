"use client";

import { useState } from "react";
// Remove Modal import - we'll create custom modal
import Tabs from "@/components/ui/Tabs";
import StatusBadge from "@/components/ui/StatusBadge";
import Button from "@/components/ui/Button";
import RidesTable from "@/components/rides/RidesTable";
import DateRangePicker from "@/components/rides/DateRangePicker";
import {
  ArrowLeft,
  Building2,
  Users,
  Route,
  Car,
  Plus,
  MapPin,
  Hash,
  GraduationCap,
  Navigation,
  Clock,
  User,
  Calendar,
  X,
} from "lucide-react";
import Collapse from "@/components/ui/Collapse";

export default function CampusDetailModal({ open, onClose, campusData }) {
  const [activeTab, setActiveTab] = useState(null);
  const [openCollapse, setOpenCollapse] = useState('campus-info');
  const [rideStart, setRideStart] = useState(null);
  const [rideEnd, setRideEnd] = useState(null);
  
  const handleCollapseToggle = (collapseId) => {
    setOpenCollapse(openCollapse === collapseId ? null : collapseId);
  };

  if (!campusData) return null;

  // Mock data based on screenshots
  const mockCampusData = {
    id: "C-001",
    name: campusData?.name || "Riverdale High",
    district: campusData?.district || "Northside School District (86022-Z)",
    students: 1250,
    type: "High School",
    status: "Active",
    address: campusData?.address || "2000 School Rd, Riverdale, GA",
  };

  const mockStudents = [
    {
      id: "S-001",
      name: "Emma Johnson",
      grade: 9,
      address: "123 Lake St, Riverdale, GA",
      status: "Active",
    },
    {
      id: "S-002",
      name: "Jacob Martinez",
      grade: 11,
      address: "789 Pine Ave, Sandy Springs, GA",
      status: "Active",
    },
  ];

  const mockRoutes = [
    {
      id: "RT-30842",
      name: "North District Route",
      stops: 5,
      distance: "12.4 mi",
      students: 7,
      status: "Active",
    },
    {
      id: "RT-30843",
      name: "South Campus Route",
      stops: 4,
      distance: "10.2 mi",
      students: 5,
      status: "Active",
    },
  ];

  const mockRides = [
    {
      id: 1,
      route: "RT-30842",
      scheduledDate: "04/02/2025",
      driver: "Yonathan Mekonnen",
      status: "In progress",
    },
    {
      id: 2,
      route: "RT-30843",
      scheduledDate: "04/03/2025",
      driver: "Michael Johnson",
      status: "Assigned",
    },
  ];

  const tabs = [
    { id: 0, label: "Students", icon: Users },
    { id: 1, label: "Routes", icon: Route },
    { id: 2, label: "Rides", icon: Car },
  ];

  const renderStudentsTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Students ({mockStudents.length})
        </h3>
        <Button
          variant="primary"
          icon={<Plus size={16} />}
          size="sm"
        >
          Add New Student
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Student ID</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Grade</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Address</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockStudents.map((student) => (
              <tr
                key={student.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-4 text-sm text-gray-900">{student.id}</td>
                <td className="py-4 px-4 text-sm text-gray-900">{student.name}</td>
                <td className="py-4 px-4 text-sm text-gray-900">{student.grade}</td>
                <td className="py-4 px-4 text-sm text-gray-900">{student.address}</td>
                <td className="py-4 px-4">
                  <StatusBadge status={student.status} />
                </td>
                <td className="py-4 px-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[var(--blue-600)] border-[var(--blue-200)] hover:bg-[var(--blue-50)] hover:border-[var(--blue-300)]"
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderRoutesTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Routes ({mockRoutes.length})
        </h3>
        <Button
          variant="primary"
          icon={<Plus size={16} />}
          size="sm"
        >
          Add New Route
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Route ID</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Stops</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Distance</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Students</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockRoutes.map((route) => (
              <tr
                key={route.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-4 text-sm text-gray-900">{route.id}</td>
                <td className="py-4 px-4 text-sm text-gray-900">{route.name}</td>
                <td className="py-4 px-4 text-sm text-gray-900">{route.stops}</td>
                <td className="py-4 px-4 text-sm text-gray-900">{route.distance}</td>
                <td className="py-4 px-4 text-sm text-gray-900">{route.students}</td>
                <td className="py-4 px-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-[var(--blue-600)] border-[var(--blue-200)] hover:bg-[var(--blue-50)] hover:border-[var(--blue-300)]"
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderRidesTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Rides ({mockRides.length})
        </h3>
        <div className="w-full md:w-80">
          <DateRangePicker
            startDate={rideStart}
            endDate={rideEnd}
            onDateRangeChange={(s, e) => {
              setRideStart(s);
              setRideEnd(e);
            }}
          />
        </div>
      </div>
      <div className="bg-background rounded-lg shadow-sm border border-[var(--gray-200)] overflow-hidden">
        <RidesTable
          rides={(function() {
            const parseUsDate = (mmddyyyy) => {
              if (!mmddyyyy) return null;
              const parts = String(mmddyyyy).split("/");
              if (parts.length !== 3) return new Date(mmddyyyy);
              const [mm, dd, yyyy] = parts.map((v) => parseInt(v, 10));
              return new Date(yyyy, mm - 1, dd);
            };
            const filtered = (mockRides || []).filter((r) => {
              const d = parseUsDate(r.scheduledDate);
              if (!d || isNaN(d.getTime())) return false;
              if (rideStart && d < new Date(rideStart.getFullYear(), rideStart.getMonth(), rideStart.getDate())) return false;
              if (rideEnd && d > new Date(rideEnd.getFullYear(), rideEnd.getMonth(), rideEnd.getDate())) return false;
              return true;
            });
            return filtered.map((r) => ({
            id: r.id,
            district: "86022-Z",
            date: r.scheduledDate,
            scheduledTime: "09:00 AM",
            timezone: "America/Los_Angeles",
            pickup: {
              scheduled: "08:30 AM",
              arrived: "08:30 AM",
              confirmed: "08:35 AM",
              location: "1221 Broadway, Oakland, CA 94612",
            },
            dropoff: {
              scheduled: "10:30 AM",
              arrived: "09:00 AM",
              completed: r.status === "Completed" ? "09:20 AM" : undefined,
              location: "388 9th St, Oakland, CA 94607",
            },
            driver: { name: r.driver, vehicle: "Ford Transit" },
            details: { distance: "3.5 mi", duration: "30 min", stops: 2, students: 1 },
            status: r.status,
            nextStop: { address: "Oakland High School" },
            stops: 2,
            }));
          })()}
          currentPage={1}
          itemsPerPage={(mockRides || []).length || 10}
        />
      </div>
    </div>
  );

  const renderTabContent = () => {
    if (activeTab === null) return null;
    switch (activeTab) {
      case 0:
        return renderStudentsTab();
      case 1:
        return renderRoutesTab();
      case 2:
        return renderRidesTab();
      default:
        return null;
    }
  };

  const renderContent = () => {
    return renderTabContent();
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl !max-w-[82rem] mx-4 w-full h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: '#e5e7eb' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: '#8b5cf6' }}>
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: '#111827' }}>Campus Details</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Close"
            title="Close"
          >
            <X className="w-6 h-6" style={{ color: '#6b7280' }} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 pt-4">
            {/* Collapse - Campus Information */}
            <Collapse 
              title="Campus Information" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-purple-600">
                  <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
              isOpen={openCollapse === 'campus-info'}
              onToggle={() => handleCollapseToggle('campus-info')}
            >
              <div className="space-y-6">
                {/* Campus Profile Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full border border-[var(--gray-200)] overflow-hidden bg-[var(--gray-100)] flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-[var(--purple-600)]" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-2xl text-[var(--primary-black)]">{mockCampusData.name}</div>
                      <div className="text-sm text-[var(--muted-text)]">Campus ID: {mockCampusData.id}</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="bg-[var(--green)] text-white px-3 py-1 rounded-full text-sm font-medium" style={{ minWidth: '87px', minHeight: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                      {mockCampusData.status}
                    </div>
                  </div>
                </div>

                {/* Campus Information Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--blue-100)] flex items-center justify-center">
                      <Hash className="w-4 h-4 text-[var(--blue-600)]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-[var(--muted-text)]">ID</div>
                      <div className="text-sm font-medium text-[var(--primary-black)]">{mockCampusData.id}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--blue-100)] flex items-center justify-center">
                      <Building2 className="w-4 h-4 text-[var(--blue-600)]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-[var(--muted-text)]">DISTRICT</div>
                      <div className="text-sm font-medium text-[var(--primary-black)]">{mockCampusData.district}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--green-100)] flex items-center justify-center">
                      <Users className="w-4 h-4 text-[var(--green-600)]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-[var(--muted-text)]">STUDENTS</div>
                      <div className="text-sm font-medium text-[var(--primary-black)]">{mockCampusData.students}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--purple-100)] flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-[var(--purple-600)]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-[var(--muted-text)]">TYPE</div>
                      <div className="text-sm font-medium text-[var(--primary-black)]">{mockCampusData.type}</div>
                    </div>
                  </div>
                </div>

                {/* Address Section */}
                <div className="pt-4 border-t border-[var(--gray-200)]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--orange-100)] flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-[var(--orange-600)]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-[var(--muted-text)]">ADDRESS</div>
                      <div className="text-sm font-medium text-[var(--primary-black)]">{mockCampusData.address}</div>
                    </div>
                  </div>
                </div>
              </div>
            </Collapse>

            {/* Tabs Section - always visible outside general info */}
            <div className="pt-4 border-t border-[var(--gray-200)]">
              <div className="flex mt-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="px-6 py-3 font-medium cursor-pointer transition-all duration-200 hover:opacity-90 rounded-lg"
                    style={{
                      backgroundColor: activeTab === tab.id ? 'var(--primary)' : 'var(--gray-100)',
                      color: activeTab === tab.id ? 'var(--on-primary)' : 'var(--muted-text)',
                      borderBottom: activeTab === tab.id ? '2px solid var(--primary)' : 'none',
                      marginRight: '4px',
                      fontSize: '14px'
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <tab.icon className="w-4 h-4" />
                      <span>{tab.label}</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-4">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
