"use client";

import { Search, Plus, Filter, X } from "lucide-react";
import { useState } from "react";
import RidesStats from "./RidesStats";
import RidesTabs from "./RidesTabs";
import RidesTable from "./RidesTable";
import FilterDropdown from "./FilterDropdown";
import DateRangePicker from "./DateRangePicker";
import AddRideModal from "./AddRideModal";
import RideDetailModal from "../eagle-eye/ride-detail-modal";
import LiveTrackingDrawer from "./LiveTrackingDrawer";
import AssignDriverModal from "./AssignDriverModal";
import CompleteRideModal from "./CompleteRideModal";
import CancelRideModal from "./CancelRideModal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function RidesContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [filterType, setFilterType] = useState("Driver");
  const [selectedDate, setSelectedDate] = useState();
  const [search, setSearch] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [showAddRide, setShowAddRide] = useState(false);
  const [showRideModal, setShowRideModal] = useState(false);
  const [selectedRideId, setSelectedRideId] = useState(null);
  const [showTrackingDrawer, setShowTrackingDrawer] = useState(false);
  const [trackingRideId, setTrackingRideId] = useState(null);
  const [showAssignDriver, setShowAssignDriver] = useState(false);
  const [showCompleteRide, setShowCompleteRide] = useState(false);
  const [showCancelRide, setShowCancelRide] = useState(false);
  const [actionRideId, setActionRideId] = useState(null);

  const rides = [
    {
      id: "1001",
      number: 1,
      district: "Oakland Unified School District",
      date: "1/1/1970 (Thursday)",
      scheduledTime: "08:30 AM",
      pickup: {
        scheduled: "08:30 AM",
        arrived: "08:30 AM",
        confirmed: "8:35 AM",
        location: "1221 Broadway, Oakland, CA 94612",
      },
      dropoff: {
        scheduled: "09:00 AM",
        arrived: "09:00 AM",
        completed: "09:20 AM",
        location: "388 9th St, Oakland, CA 94607",
      },
      driver: {
        name: "Michael Davis",
        vehicle: "Ford Transit",
      },
      details: {
        distance: "3.5 mi",
        duration: "30 min",
        stops: 2,
        students: 2,
      },
      status: "In Progress",
      statusColor: "blue",
      rowColor: "border-green-500",
    },
    {
      id: "1002",
      number: 2,
      district: "Oakland Unified School District",
      date: "1/1/1970 (Thursday)",
      scheduledTime: "09:15 AM",
      pickup: {
        scheduled: "09:15 AM",
        arrived: "09:15 AM",
        confirmed: "9:20 AM",
        location: "365 14th St, Oakland, CA 94612",
      },
      dropoff: {
        scheduled: "09:45 AM",
        arrived: "09:45 AM",
        location: "460 8th St, Oakland, CA 94607",
      },
      driver: {
        name: "Sophia Martinez",
        vehicle: "Honda Odyssey",
      },
      details: {
        distance: "4.2 mi",
        duration: "30 min",
        stops: 3,
        students: 5,
      },
      status: "In Progress",
      statusColor: "[var(--warning)]",
      rowColor: "border-orange-500",
    },
    {
      id: "D-1001",
      number: 3,
      district: "Atlanta Public Schools",
      date: "1/1/1970 (Thursday)",
      scheduledTime: "08:30 AM",
      pickup: {
        scheduled: "08:30 AM",
        arrived: "08:30 AM",
        confirmed: "8:35 AM",
        location: "Midtown High School",
      },
      dropoff: {
        scheduled: "09:00 AM",
        arrived: "09:00 AM",
        location: "1500 Broadway, Oakland, CA 94612",
      },
      driver: {
        name: "William Rodriguez",
        vehicle: "Toyota Sienna",
      },
      details: {
        distance: "2.8 mi",
        duration: "30 min",
        stops: 2,
        students: 1,
      },
      status: "In Progress",
      statusColor: "blue",
      rowColor: "border-green-500",
    },
    {
      id: "D-1002",
      number: 4,
      district: "Atlanta Public Schools",
      date: "1/1/1970 (Thursday)",
      scheduledTime: "09:05 AM",
      pickup: {
        scheduled: "09:05 AM",
        arrived: "09:05 AM",
        location: "Buckhead Elementary",
      },
      dropoff: {
        scheduled: "09:35 AM",
        arrived: "09:35 AM",
        location: "145 Ralph McGill Blvd NE, Atlanta, GA 30308",
      },
      driver: {
        name: "Maria Sanchez",
        vehicle: "Honda Odyssey",
      },
      details: {
        distance: "3.2 mi",
        duration: "30 min",
        stops: 2,
        students: 1,
      },
      status: "Delayed",
      statusColor: "[var(--red)]",
      rowColor: "border-[var(--red)]",
    },
    {
      id: "D-1003",
      number: 5,
      district: "Atlanta Public Schools",
      date: "1/1/1970 (Thursday)",
      scheduledTime: "09:10 AM",
      pickup: {
        scheduled: "09:10 AM",
        arrived: "09:10 AM",
        location: "Downtown High School",
      },
      dropoff: {
        scheduled: "09:40 AM",
        arrived: "09:40 AM",
        location: "218 14th St NE, Atlanta, GA 30309",
      },
      driver: {
        name: "Carlos Mendez",
        vehicle: "Ford Transit",
      },
      details: {
        distance: "2.4 mi",
        duration: "30 min",
        stops: 2,
        students: 1,
      },
      status: "Potential Delay",
      statusColor: "[var(--warning)]",
      rowColor: "border-[var(--warning)]",
    },
  ];

  const tabCounts = {
    all: rides.length,
    upcoming: 0,
    unassigned: 0,
    completed: 0,
    canceled: 0,
    rejected: 0,
    assigned: rides.length,
    inProgress: rides.filter((r) => r.status === "In Progress").length,
  };

  const stats = {
    total: rides.length,
    completed: tabCounts.completed,
    inProgress: tabCounts.inProgress,
    canceled: tabCounts.canceled,
    rejected: tabCounts.rejected,
  };

  const driverOptions = rides.map((r) => ({
    value: r.driver.name,
    label: r.driver.name,
  }));

  function getFilteredRides() {
    let filteredRides = rides;

    switch (activeTab) {
      case 0:
        filteredRides = rides;
        break;
      case 1:
        filteredRides = [];
        break;
      case 2:
        filteredRides = [];
        break;
      case 3:
        filteredRides = [];
        break;
      case 4:
        filteredRides = [];
        break;
      case 5:
        filteredRides = [];
        break;
      case 6:
        filteredRides = rides;
        break;
      case 7:
        filteredRides = rides.filter((r) => r.status === "In Progress");
        break;
      default:
        filteredRides = rides;
    }

    if (search.trim()) {
      const searchTerm = search.toLowerCase().trim();
      filteredRides = filteredRides.filter((ride) => {
        switch (filterType) {
          case "Driver":
            return ride.driver.name.toLowerCase().includes(searchTerm);
          case "District":
            return ride.district.toLowerCase().includes(searchTerm);
          case "Location":
            return (
              ride.pickup.location.toLowerCase().includes(searchTerm) ||
              ride.dropoff.location.toLowerCase().includes(searchTerm)
            );
          case "Status":
            return ride.status.toLowerCase().includes(searchTerm);
          case "Vehicle":
            return ride.driver.vehicle.toLowerCase().includes(searchTerm);
          default:
            return (
              ride.driver.name.toLowerCase().includes(searchTerm) ||
              ride.district.toLowerCase().includes(searchTerm) ||
              ride.pickup.location.toLowerCase().includes(searchTerm) ||
              ride.dropoff.location.toLowerCase().includes(searchTerm) ||
              ride.status.toLowerCase().includes(searchTerm) ||
              ride.driver.vehicle.toLowerCase().includes(searchTerm)
            );
        }
      });
    }

    return filteredRides;
  }

  return (
    <div className="bg-[var(--gray-50)] min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Rides Management</h1>
        <Button
          onClick={() => setShowAddRide(true)}
          className="flex !bg-blue-600 items-center gap-2"
          variant="primary"
        >
          <Plus size={18} />
          Add New Ride
        </Button>
      </div>
      <RidesStats stats={stats} />
      <div className="flex justify-between items-center mb-4 gap-2">
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search rides..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 pr-4 w-full"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-[var(--gray-400)]" />
        </div>
        <Button
          onClick={() => setShowFilters((prev) => !prev)}
          className="flex hover:bg-[var(--purple)] text-[var(--primary-black)] items-center gap-2"
          variant="secondary"
        >
          <Filter size={18} />
          Filters
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-1"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Button>
      </div>
      <div className="mb-4">
        <RidesTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabCounts={tabCounts}
        />
      </div>
      {showFilters && (
        <div className="bg-background rounded-xl shadow px-6 py-4 mb-4 flex flex-col md:flex-row gap-4 items-center relative">
          <Button
            className="absolute top-2 right-2 text-xl z-50"
            onClick={() => setShowFilters(false)}
            aria-label="Close filters"
            variant="ghost"
          >
            <X />
          </Button>
          <div className="w-full md:w-1/4">
            <FilterDropdown value={filterType} onChange={setFilterType} />
          </div>
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-[var(--gray-700)] mb-1">
              Search
            </label>
            <Input
              placeholder={`Search by ${filterType}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="w-full md:w-1/4">
            <DateRangePicker
              selected={selectedDate}
              onSelect={setSelectedDate}
            />
          </div>
        </div>
      )}
      <RidesTable
        rides={getFilteredRides()}
        onView={(rideId) => {
          setSelectedRideId(rideId);
          setShowRideModal(true);
        }}
        onTrack={(rideId) => {
          setTrackingRideId(rideId);
          setShowTrackingDrawer(true);
        }}
        onAssignDriver={(rideId) => {
          setActionRideId(rideId);
          setShowAssignDriver(true);
        }}
        onCompleteRide={(rideId) => {
          setActionRideId(rideId);
          setShowCompleteRide(true);
        }}
        onCancelRide={(rideId) => {
          setActionRideId(rideId);
          setShowCancelRide(true);
        }}
      />
      <AddRideModal open={showAddRide} onClose={() => setShowAddRide(false)} />
      <RideDetailModal
        isOpen={showRideModal}
        onClose={() => setShowRideModal(false)}
        rideId={selectedRideId}
      />
      <LiveTrackingDrawer
        isOpen={showTrackingDrawer}
        onClose={() => setShowTrackingDrawer(false)}
        rideId={trackingRideId}
      />
      <AssignDriverModal
        open={showAssignDriver}
        onClose={() => setShowAssignDriver(false)}
        rideId={actionRideId}
        driverOptions={driverOptions}
        onAssign={(driver) => {
          /* handle assign logic here */
        }}
      />
      <CompleteRideModal
        open={showCompleteRide}
        onClose={() => setShowCompleteRide(false)}
        rideId={actionRideId}
        onComplete={() => {
          /* handle complete logic here */
        }}
      />
      <CancelRideModal
        open={showCancelRide}
        onClose={() => setShowCancelRide(false)}
        rideId={actionRideId}
        onCancel={() => {
          /* handle cancel logic here */
        }}
      />
    </div>
  );
}
