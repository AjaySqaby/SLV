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
    1: "On Leave",
    2: "Inactive",
    3: "On Leave",
    4: "Active",
    5: "Inactive",
  });
  const [showAddDriverModal, setShowAddDriverModal] = useState(false);
  const drivers = [
    {
      id: 1,
      name: "John Smith",
      email: "john.123@example.com",
      avatar: "/picture.jpg",
      phone: "123-456-7890",
      city: "Anytown",
      totalRides: 30,
      upcomingRides: 5,
      routes: 0,
    },
    {
      id: 2,
      name: "Alice Johnson",
      email: "john.123@example.com",
      avatar: "/picture.jpg",
      phone: "987-654-3210",
      city: "Anytown",
      totalRides: 15,
      upcomingRides: 2,
      routes: 0,
    },
    {
      id: 3,
      name: "Bob Williams",
      email: "john.123@example.com",
      avatar: "/picture.jpg",
      phone: "555-123-4567",
      city: "Sometown",
      totalRides: 35,
      upcomingRides: 0,
      routes: 0,
    },
    {
      id: 4,
      name: "Emily Brown",
      email: "john.123@example.com",
      avatar: "/picture.jpg",
      phone: "111-222-3333",
      city: "Springfield",
      totalRides: 20,
      upcomingRides: 3,
      routes: 0,
    },
    {
      id: 5,
      name: "Charlie Davis",
      email: "john.123@example.com",
      avatar: "/picture.jpg",
      phone: "444-555-6666",
      city: "Oakville",
      totalRides: 10,
      upcomingRides: 1,
      routes: 0,
    },
  ];

  // Unique status and city options
  const statusOptions = [
    { value: "", label: "All Statuses" },
    ...STATUS_ACTIONS.map((s) => ({ value: s.value, label: s.value })),
  ];
  const cityOptions = [
    { value: "", label: "All Cities" },
    ...Array.from(new Set(drivers.map((d) => d.city))).map((city) => ({
      value: city,
      label: city,
    })),
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
      driver.id.toString().includes(searchQuery);
    const matchesStatus =
      !statusFilter || driverStatuses[driver.id] === statusFilter;
    const matchesCity = !cityFilter || driver.city === cityFilter;
    return matchesSearch && matchesStatus && matchesCity;
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
    <div>
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-[var(--purple-200)] rounded-full flex items-center justify-center mr-4">
          <Users className="h-5 w-5 text-[var(--purple-600)]" />
        </div>
        <div className="flex gap-4">
          <div>
            <h1 className="text-2xl font-bold">Driver Management</h1>
            <p className="text-[var(--gray-600)] text-sm">
              Manage all drivers, create new profiles, and assign vehicles
            </p>
          </div>

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

      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <div className="relative">
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search drivers..."
              width="w-[300px]"
            />
          </div>

          <div className="relative">
            <CustomSelect
              name="status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              options={statusOptions}
              width="w-44"
              iconMap={statusIconMap}
              placeholder="All Statuses"
            />
          </div>

          <div className="relative">
            <CustomSelect
              name="city"
              value={cityFilter}
              onChange={(e) => setCityFilter(e.target.value)}
              options={cityOptions}
              width="w-44"
              placeholder="All Cities"
            />
          </div>

          <Button variant="secondary">Export</Button>
          <Button variant="secondary">Clear Filters</Button>
        </div>

        <div className="flex gap-3">
          <Link href="/onboarding">
            <Button variant="secondary">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 11V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h6"></path>
                <path d="M9 22h9a2 2 0 0 0 2-2v-7"></path>
                <path d="M13 11v5"></path>
                <path d="M16 14H9.5"></path>
              </svg>
              View Onboarding Dashboard
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDrivers.map((driver) => (
          <div
            key={driver.id}
            className="bg-[var(--background)] rounded-lg shadow-sm border border-[var(--border)] overflow-hidden"
          >
            <div className="p-6 flex justify-between items-start">
              <div className="flex items-center">
                <img
                  src={driver.avatar || "/placeholder.svg"}
                  alt={driver.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold text-lg">{driver.name}</h3>
                  <p className="text-[var(--gray-500)] text-sm">
                    {driver.email}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 relative">
                {getStatusBadge(driverStatuses[driver.id])}
                <button
                  className="text-[var(--gray-400)] hover:text-[var(--gray-600)] p-1 rounded-full"
                  onClick={() =>
                    setOpenMenu(openMenu === driver.id ? null : driver.id)
                  }
                >
                  <MoreHorizontal size={20} />
                </button>
                {openMenu === driver.id && (
                  <div className="absolute right-0 mt-[14rem] z-20 w-56 bg-white rounded-xl shadow-xl border border-gray-200 py-2">
                    {STATUS_ACTIONS.map((action) => (
                      <button
                        key={action.value}
                        className={`flex items-center w-full px-4 py-2 text-sm gap-2 text-left hover:bg-[var(--hover-bg)] ${
                          driverStatuses[driver.id] === action.value
                            ? "font-semibold bg-[var(--gray-100)]"
                            : ""
                        }`}
                        onClick={() => {
                          setDriverStatuses((prev) => ({
                            ...prev,
                            [driver.id]: action.value,
                          }));
                          setOpenMenu(null);
                        }}
                      >
                        {driverStatuses[driver.id] === action.value && (
                          <Check
                            size={16}
                            className="text-[var(--green)] mr-1"
                          />
                        )}
                        {action.icon}
                        <span className={action.color}>{action.label}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="px-6 py-3 border-t border-[var(--gray-100)] grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-[var(--muted-text)]">Phone</p>
                <p className="text-sm">{driver.phone}</p>
              </div>
              <div>
                <p className="text-xs text-[var(--muted-text)]">City</p>
                <p className="text-sm">{driver.city}</p>
              </div>
            </div>

            <div className="px-6 py-3 border-t border-[var(--card-border)] grid grid-cols-3 gap-4">
              <div className="text-center">
                <p className="text-xs text-[var(--muted-text)]">Total Rides</p>
                <p className="text-lg font-semibold">{driver.totalRides}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-[var(--muted-text)]">Upcoming</p>
                <p className="text-lg font-semibold">{driver.upcomingRides}</p>
              </div>
              <div className="text-center">
                <p className="text-xs text-[var(--muted-text)]">Routes</p>
                <p className="text-lg font-semibold">{driver.routes}</p>
              </div>
            </div>
          </div>
        ))}
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
