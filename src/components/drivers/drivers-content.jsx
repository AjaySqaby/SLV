"use client";
import {
  Search,
  Plus,
  FileText,
  MoreHorizontal,
  Check,
  X,
  Pause,
  Clock,
  Filter,
} from "lucide-react";
import { useState } from "react";
import SearchInput from "@/components/ui/SearchInput";
import Button from "@/components/ui/Button";
import CustomSelect from "@/components/ui/CustomSelect";
import AddDriverModal from "@/components/drivers/AddDriverModal";
import DriverActionsDropdown from "@/components/drivers/DriverActionsDropdown";
import DriverDetailModal from "@/components/drivers/DriverDetailModal";
import StatusBadge from "@/components/ui/StatusBadge";
import Link from "next/link";

const STATUS_ACTIONS = [
  {
    value: "Active",
    label: "Activate Driver",
    icon: <Check size={18} className="text-green-500" />,
    color: "text-green-600",
    bg: "bg-green-50",
  },
  {
    value: "Inactive",
    label: "Deactivate Driver",
    icon: <X size={18} className="text-red-500" />,
    color: "text-red-600",
    bg: "bg-red-50",
  },
  {
    value: "On Leave",
    label: "Set On Leave",
    icon: <Pause size={18} className="text-yellow-500" />,
    color: "text-yellow-600",
    bg: "bg-yellow-50",
  },
  {
    value: "Pending",
    label: "Mark as Pending",
    icon: <Clock size={18} className="text-blue-500" />,
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
];

export default function DriversContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [cityFilter, setCityFilter] = useState("");
  const [openMenu, setOpenMenu] = useState(null); // driver id
  const [driverStatuses, setDriverStatuses] = useState({
    "D-001": "Active",
    "D-002": "Active",
    "D-003": "Active",
    "D-004": "On Leave",
  });
  const [showAddDriverModal, setShowAddDriverModal] = useState(false);
  const [showDriverDetailModal, setShowDriverDetailModal] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState(null);

  const drivers = [
    {
      id: "D-001",
      name: "Sam Kebede",
      phone: "(404) 555-1234",
      email: "sam.k@example.com",
      vehicle: "Ford Transit",
      totalRides: 156,
    },
    {
      id: "D-002",
      name: "Lily Tesfaye",
      phone: "(404) 555-5678",
      email: "lily.t@example.com",
      vehicle: "Tesla X",
      totalRides: 142,
    },
    {
      id: "D-003",
      name: "David Chen",
      phone: "(404) 555-9012",
      email: "david.c@example.com",
      vehicle: "Honda Odyssey",
      totalRides: 128,
    },
    {
      id: "D-004",
      name: "Maria Rodriguez",
      phone: "(404) 555-3456",
      email: "maria.r@example.com",
      vehicle: "Toyota Sienna",
      totalRides: 98,
    },
  ];

  // Unique status and city options
  const statusOptions = [
    { value: "", label: "All Statuses" },
    ...STATUS_ACTIONS.map((s) => ({ value: s.value, label: s.value })),
  ];

  const statusIconMap = {
    Active: <Check size={16} className="text-green-500" />,
    Inactive: <X size={16} className="text-red-500" />,
    "On Leave": <Pause size={16} className="text-yellow-500" />,
    Pending: <Clock size={16} className="text-blue-500" />,
  };

  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      !statusFilter || driverStatuses[driver.id] === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => (
    <StatusBadge
      status={status}
      type={
        status === "Active"
          ? "active"
          : status === "Inactive"
            ? "inactive"
            : status === "On Leave"
              ? "warning"
              : status === "Pending"
                ? "pending"
                : "default"
      }
    />
  );

  const handleViewDriver = (driverId) => {
    setSelectedDriverId(driverId);
    setShowDriverDetailModal(true);
  };

  const handleEditDriver = (driverId) => {
    // TODO: Implement edit driver functionality
    console.log('Edit driver:', driverId);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
         
          <div>
            <h1 className="text-3xl font-bold mb-8">Driver Management</h1>
           
          </div>
        </div>

        <div className="flex gap-3">
          <Link href="/onboarding">
            <Button variant="secondary" icon={<FileText size={18} />}>
              Onboarding
            </Button>
          </Link>
          <Button
            variant="primary"
            icon={<Plus size={18} />}
            onClick={() => setShowAddDriverModal(true)}
          >
            Add New Driver
          </Button>
        </div>
      </div>

      {/* Search Section */}
      <div className="flex justify-between items-center mb-6 gap-2">
        <div className="relative w-full">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search drivers by name, ID or vehicle"
            width="w-full"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Driver ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Contact</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Vehicle</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Status</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-[var(--gray-700)]">Total Rides</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-[var(--gray-700)]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDrivers.map((driver) => (
              <tr key={driver.id} className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)] transition-all duration-200">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--purple)] text-white flex items-center justify-center text-sm font-bold">
                      {filteredDrivers.indexOf(driver) + 1}
                    </div>
                    <span className="font-medium">{driver.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {driver.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  <div>
                    <div>{driver.phone}</div>
                    <div>{driver.email}</div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {driver.vehicle}
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(driverStatuses[driver.id] || "Unknown")}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900 text-center">
                  {driver.totalRides}
                </td>
                 <td className="px-6 py-4">
                   <div className="flex justify-center">
                     <DriverActionsDropdown
                       driver={driver}
                       onView={handleViewDriver}
                       onEdit={handleEditDriver}
                     />
                   </div>
                 </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AddDriverModal
        isOpen={showAddDriverModal}
        onClose={() => setShowAddDriverModal(false)}
      />
      
      <DriverDetailModal
        isOpen={showDriverDetailModal}
        onClose={() => {
          setShowDriverDetailModal(false);
          setSelectedDriverId(null);
        }}
        driverId={selectedDriverId}
      />
    </div>
  );
}

function Users(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
