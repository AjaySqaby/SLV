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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mr-4">
            <Users className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Driver Management</h1>
            <p className="text-gray-600 text-sm">
              Manage all drivers, create new profiles, and assign vehicles
            </p>
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

      {/* Search and Filter Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <div className="relative">
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search drivers by name, ID or vehicle"
              width="w-[400px]"
            />
          </div>

          <Button variant="secondary" icon={<Filter size={18} />}>
            Filter
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Driver ID</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Contact</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Vehicle</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
              <th className="text-center py-3 px-4 font-medium text-gray-700">Total Rides</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDrivers.map((driver) => (
              <tr key={driver.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4 text-sm font-medium text-gray-900">
                  {driver.id}
                </td>
                <td className="py-4 px-4 text-sm text-gray-900">
                  {driver.name}
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">
                  <div>
                    <div>{driver.phone}</div>
                    <div>{driver.email}</div>
                  </div>
                </td>
                <td className="py-4 px-4 text-sm text-gray-900">
                  {driver.vehicle}
                </td>
                <td className="py-4 px-4">
                  {getStatusBadge(driverStatuses[driver.id] || "Unknown")}
                </td>
                <td className="py-4 px-4 text-sm text-gray-900 text-center">
                  {driver.totalRides}
                </td>
                <td className="py-4 px-4">
                  <div className="flex gap-2">
                    <Link href={`/drivers/${driver.id}`}>
                      <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                        View
                      </button>
                    </Link>
                    <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors">
                      Edit
                    </button>
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
