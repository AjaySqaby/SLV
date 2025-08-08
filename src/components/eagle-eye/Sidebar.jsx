import { Search, MapPin, Phone, Clock, User, Car } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge";
import { useState } from "react";
import CurrentRidesTab from "./CurrentRidesTab";
import AvailableDriversTab from "./AvailableDriversTab";

const mockDrivers = [
  {
    id: "D1",
    name: "Michael Johnson",
    avatar: "/placeholder.svg?height=40&width=40",
    vehicle: "Toyota Sienna",
    location: "West Midtown",
    phone: "510-555-1234",
    status: "Ready Now",
    distance: "0.6 miles away",
    rejectedNearby: 2,
    unassignedNearby: 0,
    ridesNearby: 2,
    onRide: false,
    lastActive: "",
  },
  {
    id: "D2",
    name: "Sarah Williams",
    avatar: "/placeholder.svg?height=40&width=40",
    vehicle: "Honda Odyssey",
    location: "Midtown",
    phone: "510-555-2345",
    status: "On Active Ride",
    distance: "0.4 miles away",
    rejectedNearby: 1,
    unassignedNearby: 0,
    ridesNearby: 0,
    onRide: true,
    lastActive: "",
  },
  {
    id: "D3",
    name: "David Thompson",
    avatar: "/placeholder.svg?height=40&width=40",
    vehicle: "Ford Transit",
    location: "Downtown Atlanta",
    phone: "510-555-3456",
    status: "Ready Now",
    distance: "1.3 miles away",
    rejectedNearby: 1,
    unassignedNearby: 2,
    ridesNearby: 3,
    onRide: false,
    lastActive: "",
  },
  {
    id: "D4",
    name: "Jessica Martinez",
    avatar: "/placeholder.svg?height=40&width=40",
    vehicle: "Chevrolet Suburban",
    location: "Buckhead",
    phone: "510-555-4567",
    status: "Offline",
    distance: "1.1 miles away",
    rejectedNearby: 1,
    unassignedNearby: 1,
    ridesNearby: 0,
    onRide: false,
    lastActive: "Last active 5 min ago",
  },
];

export default function Sidebar({
  rides,
  activeStatusFilter,
  setActiveStatusFilter,
  onViewRide,
  sidebarTab,
  setSidebarTab,
}) {
  const [driverFilter, setDriverFilter] = useState("All");

  return (
    <div className="w-80 bg-[var(--sidebar-bg)] border-l border-[var(--border)] flex flex-col">
      <div className="p-4 flex whitespace-nowrap space-x-2">
        <Button
          variant={sidebarTab === "rides" ? "primary" : "secondary"}
          className={`flex-1 flex items-center justify-center text-xs gap-2 px-4 py-2 rounded-md border transition-colors relative ${
            sidebarTab === "rides"
              ? "bg-[var(--primary)] text-[var(--on-primary)] border-[var(--primary)]"
              : "bg-[var(--surface-bg)] text-[var(--muted-text)] border-[var(--border)]"
          }`}
          onClick={() => setSidebarTab("rides")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 6l3 4-3 4"></path>
            <path d="M8 18l-3-4 3-4"></path>
            <path d="M19 10h-6"></path>
            <path d="M5 14h6"></path>
          </svg>
          Current Rides
          <span className="absolute -top-2 -right-2 bg-[var(--blue)] text-white text-xs font-bold px-2 py-0.5 rounded-full border-2 border-white">
            {rides.length}
          </span>
        </Button>
        <Button
          variant={sidebarTab === "drivers" ? "primary" : "secondary"}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md text-sm border transition-colors relative ${
            sidebarTab === "drivers"
              ? "bg-[var(--purple)] text-[var(--on-primary)] border-[var(--purple)]"
              : "bg-[var(--surface-bg)] text-[var(--muted-text)] border-[var(--border)]"
          }`}
          onClick={() => setSidebarTab("drivers")}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          Available Drivers
          <span className="absolute -top-2 -right-2 bg-[var(--purple)] text-white text-xs font-bold px-2 py-0.5 rounded-full border-2 border-white">
            {mockDrivers.length}
          </span>
        </Button>
      </div>

      {sidebarTab === "rides" && (
        <CurrentRidesTab
          rides={rides}
          activeStatusFilter={activeStatusFilter}
          setActiveStatusFilter={setActiveStatusFilter}
          onViewRide={onViewRide}
        />
      )}

      {sidebarTab === "drivers" && (
        <AvailableDriversTab
          mockDrivers={mockDrivers}
          driverFilter={driverFilter}
          setDriverFilter={setDriverFilter}
        />
      )}
    </div>
  );
}
