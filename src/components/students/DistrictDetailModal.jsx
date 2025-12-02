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

export default function DistrictDetailModal({ open, onClose, districtData }) {
  const [activeTab, setActiveTab] = useState(null);
  const [openCollapse, setOpenCollapse] = useState(null);
  
  const handleCollapseToggle = (collapseId) => {
    setOpenCollapse(openCollapse === collapseId ? null : collapseId);
  };

  if (!districtData) return null;

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
      address: "123 Lake St, Riverdale, GA",
      status: "Active",
    },
    {
      id: "S-002",
      name: "Michael Brown",
      grade: 5,
      campus: "Westview Elementary",
      address: "88 Main Ave, Atlanta, GA",
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
    { id: 0, label: "Campuses", icon: Building2 },
    { id: 1, label: "Students", icon: Users },
    { id: 2, label: "Routes", icon: Route },
    { id: 3, label: "Rides", icon: Car },
  ];

  const renderCampusesTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-[var(--heading)]">
          Campuses ({mockCampuses.length})
        </h3>
        <Button
          variant="primary"
          icon={<Plus size={16} />}
          size="sm"
        >
          Add New Campus
        </Button>
      </div>
      <div className="bg-[var(--surface-bg)] rounded-lg border border-[var(--border)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-[var(--gray-500)] border-b border-[var(--border)]">
              <th className="px-6 py-3 font-medium">Campus ID</th>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Type</th>
              <th className="px-6 py-3 font-medium">Address</th>
              <th className="px-6 py-3 font-medium">Students</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockCampuses.map((campus) => (
              <tr
                key={campus.id}
                className="border-b border-[var(--border)] hover:bg-[var(--gray-50)]"
              >
                <td className="px-6 py-4 font-medium">{campus.id}</td>
                <td className="px-6 py-4 font-medium">{campus.name}</td>
                <td className="px-6 py-4">{campus.type}</td>
                <td className="px-6 py-4">{campus.address}</td>
                <td className="px-6 py-4">{campus.students}</td>
                <td className="px-6 py-4">
                  <StatusBadge
                    status={campus.status}
                    type={campus.status === "Active" ? "active" : "inactive"}
                  />
                </td>
                <td className="px-6 py-4">
                  <button className="px-3 py-1 text-sm border rounded-lg text-[var(--gray-600)] hover:text-[var(--gray-800)] hover:bg-[var(--gray-50)] transition-colors">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderStudentsTab = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-[var(--heading)]">
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
      <div className="bg-[var(--surface-bg)] rounded-lg border border-[var(--border)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-[var(--gray-500)] border-b border-[var(--border)]">
              <th className="px-6 py-3 font-medium">Student ID</th>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Grade</th>
              <th className="px-6 py-3 font-medium">Campus</th>
              <th className="px-6 py-3 font-medium">Address</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockStudents.map((student) => (
              <tr
                key={student.id}
                className="border-b border-[var(--border)] hover:bg-[var(--gray-50)]"
              >
                <td className="px-6 py-4 font-medium">{student.id}</td>
                <td className="px-6 py-4 font-medium">{student.name}</td>
                <td className="px-6 py-4">{student.grade}</td>
                <td className="px-6 py-4">
                  <span className="text-[var(--blue-600)] hover:underline cursor-pointer">
                    {student.campus}
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
                  <button className="px-3 py-1 text-sm border rounded-lg text-[var(--gray-600)] hover:text-[var(--gray-800)] hover:bg-[var(--gray-50)] transition-colors">
                    View
                  </button>
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
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-[var(--heading)]">
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
      <div className="bg-[var(--surface-bg)] rounded-lg border border-[var(--border)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-[var(--gray-500)] border-b border-[var(--border)]">
              <th className="px-6 py-3 font-medium">Route ID</th>
              <th className="px-6 py-3 font-medium">Name</th>
              <th className="px-6 py-3 font-medium">Stops</th>
              <th className="px-6 py-3 font-medium">Distance</th>
              <th className="px-6 py-3 font-medium">Students</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockRoutes.map((route) => (
              <tr
                key={route.id}
                className="border-b border-[var(--border)] hover:bg-[var(--gray-50)]"
              >
                <td className="px-6 py-4 font-medium">{route.id}</td>
                <td className="px-6 py-4 font-medium">{route.name}</td>
                <td className="px-6 py-4">{route.stops}</td>
                <td className="px-6 py-4">{route.distance}</td>
                <td className="px-6 py-4">{route.students}</td>
                <td className="px-6 py-4">
                  <StatusBadge
                    status={route.status}
                    type={route.status === "Active" ? "active" : "inactive"}
                  />
                </td>
                <td className="px-6 py-4">
                  <button className="px-3 py-1 text-sm border rounded-lg text-[var(--gray-600)] hover:text-[var(--gray-800)] hover:bg-[var(--gray-50)] transition-colors">
                    View
                  </button>
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
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold text-[var(--heading)]">
          Rides ({mockRides.length})
        </h3>
        <Button
          variant="primary"
          icon={<Plus size={16} />}
          size="sm"
        >
          Add New Ride
        </Button>
      </div>
      <div className="bg-[var(--surface-bg)] rounded-lg border border-[var(--border)] overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-[var(--gray-500)] border-b border-[var(--border)]">
              <th className="px-6 py-3 font-medium">Ride ID</th>
              <th className="px-6 py-3 font-medium">Route</th>
              <th className="px-6 py-3 font-medium">Scheduled Date</th>
              <th className="px-6 py-3 font-medium">Driver</th>
              <th className="px-6 py-3 font-medium">Status</th>
              <th className="px-6 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockRides.map((ride) => (
              <tr
                key={ride.id}
                className="border-b border-[var(--border)] hover:bg-[var(--gray-50)]"
              >
                <td className="px-6 py-4 font-medium">{ride.id}</td>
                <td className="px-6 py-4 font-medium">{ride.route}</td>
                <td className="px-6 py-4">{ride.scheduledDate}</td>
                <td className="px-6 py-4">{ride.driver}</td>
                <td className="px-6 py-4">
                  <StatusBadge
                    status={ride.status}
                    type={
                      ride.status === "In progress"
                        ? "active"
                        : ride.status === "Assigned"
                        ? "warning"
                        : "inactive"
                    }
                  />
                </td>
                <td className="px-6 py-4">
                  <button className="px-3 py-1 text-sm border rounded-lg text-[var(--gray-600)] hover:text-[var(--gray-800)] hover:bg-[var(--gray-50)] transition-colors">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
              <h2 className="text-2xl font-bold" style={{ color: '#111827' }}>{mockDistrictData.name}</h2>
              <p style={{ color: '#6b7280' }}>District Details</p>
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

        {/* Collapse - District Information */}
        <div className="px-6 pt-4">
          <Collapse 
            title="District Information" 
            icon={<Building2 className="w-4 h-4 text-purple-600" />}
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
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-2 mt-4 ml-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-6 py-3 text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:opacity-90"
              style={{
                backgroundColor: activeTab === tab.id ? '#8b5cf6' : '#f3f4f6',
                color: activeTab === tab.id ? '#ffffff' : '#6b7280',
                border: activeTab === tab.id ? 'none' : '1px solid #e5e7eb',
                borderRadius: '12px'
              }}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}
