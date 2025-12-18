"use client";

import { useState } from "react";
import Collapse from "@/components/ui/Collapse";
// Remove Modal import - we'll create custom modal
import Tabs from "@/components/ui/Tabs";
import StatusBadge from "@/components/ui/StatusBadge";
import Button from "@/components/ui/Button";
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
  Globe,
  X,
} from "lucide-react";
import DateRangePicker from "@/components/rides/DateRangePicker";
import RidesTable from "@/components/rides/RidesTable";
import StudentsTable from "@/components/students/StudentsTable";
import RoutesTable from "@/components/routes/RoutesTable";
import CampusesTable from "@/components/campus/CampusesTable";

export default function DistrictDetailModal({ open, onClose, districtData }) {
  // Guard BEFORE any hooks to keep hook order stable
  if (!open || !districtData) return null;
  const [activeTab, setActiveTab] = useState(null);
  const [openCollapse, setOpenCollapse] = useState(null);

  const handleCollapseToggle = (collapseId) => {
    setOpenCollapse(openCollapse === collapseId ? null : collapseId);
  };

  // districtData is guaranteed by the top guard

  // Mock data based on screenshots
  const mockDistrictData = {
    id: districtData?.district || "86022-Z",
    name: "Northside School District",
    region: "North Georgia",
    city: "Atlanta",
    status: "Active",
  };

  const mockCampuses = [
    {
      id: "C-001",
      name: "Riverdale High",
      type: "High School",
      address: "2000 School Rd, Riverdale, GA",
      students: 1250,
      status: "Active",
    },
    {
      id: "C-002",
      name: "Westview Elementary",
      type: "Elementary School",
      address: "100 Education Ln, Atlanta, GA",
      students: 750,
      status: "Active",
    },
  ];

  const mockStudents = [
    {
      id: "S-001",
      name: "Emma Johnson",
      grade: 9,
      campus: "Riverdale High",
      homeroom: "9A",
      address: "123 Lake St, Riverdale, GA",
      transportation: "Route R-002",
      status: "Active",
    },
    {
      id: "S-002",
      name: "Jacob Martinez",
      grade: 11,
      campus: "Westview Elementary",
      homeroom: "11C",
      address: "789 Pine Ave, Sandy Springs, GA",
      transportation: "Route R-001",
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

  // Date range filter state for Rides tab
  const [rideStart, setRideStart] = useState(null);
  const [rideEnd, setRideEnd] = useState(null);
  const parseUsDate = (mmddyyyy) => {
    if (!mmddyyyy) return null;
    const parts = String(mmddyyyy).split("/");
    if (parts.length !== 3) return new Date(mmddyyyy);
    const [mm, dd, yyyy] = parts.map((v) => parseInt(v, 10));
    return new Date(yyyy, mm - 1, dd);
  };
  const filteredRides = mockRides.filter((r) => {
    const d = parseUsDate(r.scheduledDate);
    if (!d || isNaN(d.getTime())) return false;
    if (rideStart && d < new Date(rideStart.getFullYear(), rideStart.getMonth(), rideStart.getDate())) return false;
    if (rideEnd && d > new Date(rideEnd.getFullYear(), rideEnd.getMonth(), rideEnd.getDate())) return false;
    return true;
  });

  const tabs = [
    { id: 0, label: "Campuses", icon: Building2 },
    { id: 1, label: "Students", icon: Users },
    { id: 2, label: "Routes", icon: Route },
    { id: 3, label: "Rides", icon: Car },
  ];

  const renderCampusesTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Campuses ({mockCampuses.length})
        </h3>
      </div>
      <CampusesTable
        campuses={mockCampuses.map((c) => ({ ...c, district: mockDistrictData.id }))}
        onView={() => {}}
        onEdit={() => {}}
      />
    </div>
  );

  const renderStudentsTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Students ({mockStudents.length})
        </h3>
      </div>
      <StudentsTable
        students={mockStudents.map((s) => ({
          id: s.id,
          name: s.name,
          grade: s.grade,
          campus: s.campus,
          district: mockDistrictData.id,
          address: s.address,
          status: s.status,
        }))}
      />
    </div>
  );

  const renderRoutesTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Routes ({mockRoutes.length})
        </h3>
      </div>
      <RoutesTable
        routes={mockRoutes.map((r) => ({
          id: r.id,
          name: r.name,
          district: mockDistrictData.id,
          stops: r.stops,
          distance: r.distance,
          students: r.students,
          status: r.status,
          driver: null,
        }))}
      />
    </div>
  );

  const renderRidesTab = () => (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <h3 className="text-lg font-semibold text-gray-900">Rides</h3>
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
      {/* Reuse the same design as Rides page */}
      <div className="bg-background rounded-lg shadow-sm border border-[var(--gray-200)] overflow-hidden">
        <RidesTable
          rides={filteredRides.map((r) => ({
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
          }))}
          currentPage={1}
          itemsPerPage={filteredRides.length || 10}
        />
      </div>
    </div>
  );

  const renderTabContent = () => {
    if (activeTab === null) return null;
    switch (activeTab) {
      case 0:
        return renderCampusesTab();
      case 1:
        return renderStudentsTab();
      case 2:
        return renderRoutesTab();
      case 3:
        return renderRidesTab();
      default:
        return null;
    }
  };

  const renderContent = () => {
    return renderTabContent();
  };

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
              <h2 className="text-2xl font-bold" style={{ color: '#111827' }}>District Details</h2>
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
            {/* Collapse - District Information */}
            <Collapse
              title="District Information"
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-purple-600">
                  <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
              isOpen={openCollapse === 'district-info'}
              onToggle={() => handleCollapseToggle('district-info')}
            >
              <div className="space-y-6">
                {/* District Profile Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-full border border-[var(--gray-200)] overflow-hidden bg-[var(--gray-100)] flex items-center justify-center">
                      <Building2 className="w-8 h-8 text-[var(--purple-600)]" />
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-2xl text-[var(--primary-black)]">{mockDistrictData.name}</div>
                      <div className="text-sm text-[var(--muted-text)]">District ID: {mockDistrictData.id}</div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="bg-[var(--green)] text-white px-3 py-1 rounded-full text-sm font-medium" style={{ minWidth: '87px', minHeight: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                      {mockDistrictData.status}
                    </div>
                  </div>
                </div>

                {/* District Information Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--blue-100)] flex items-center justify-center">
                      <Hash className="w-4 h-4 text-[var(--blue-600)]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-[var(--muted-text)]">ID</div>
                      <div className="text-sm font-medium text-[var(--primary-black)]">{mockDistrictData.id}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--blue-100)] flex items-center justify-center">
                      <Globe className="w-4 h-4 text-[var(--blue-600)]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-[var(--muted-text)]">REGION</div>
                      <div className="text-sm font-medium text-[var(--primary-black)]">{mockDistrictData.region}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--orange-100)] flex items-center justify-center">
                      <MapPin className="w-4 h-4 text-[var(--orange-600)]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-[var(--muted-text)]">CITY</div>
                      <div className="text-sm font-medium text-[var(--primary-black)]">{mockDistrictData.city}</div>
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
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
