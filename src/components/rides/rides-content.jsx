"use client";

import { Search, Plus, Filter, X } from "lucide-react";
import { useState, useEffect } from "react";
import React from "react";
import { useRouter } from "next/navigation";
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

export default function RidesContent({ headerSearchTerm, onHeaderSearch }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [filterType, setFilterType] = useState("Driver");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [search, setSearch] = useState("");
  const [mainSearch, setMainSearch] = useState("");
  const [statsFilter, setStatsFilter] = useState(null);

  const clearFilters = () => {
    setSearch("");
    setMainSearch("");
    setStartDate();
    setEndDate();
    setFilterType("Driver");
    setStatsFilter(null);
  };

  const handleDateRangeChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const handleStatsClick = (statsType) => {
    setStatsFilter(statsType);
    // Also clear other filters to show only the stats-based filter
    setSearch("");
    setMainSearch("");
    setStartDate();
    setEndDate();
    setActiveTab(0); // Reset to 'All' tab
  };

  // Use header search term if provided
  useEffect(() => {
    console.log("Header search term changed:", headerSearchTerm);
    if (headerSearchTerm !== undefined) {
      setMainSearch(headerSearchTerm);
      // Clear other filters when header search is used
      setSearch("");
      setStartDate();
      setEndDate();
      setStatsFilter(null);
      setActiveTab(0); // Reset to 'All' tab
    }
  }, [headerSearchTerm]);
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
      date: "12/25/2024 (Wednesday)",
      scheduledTime: "08:30 AM",
      timezone: "America/Los_Angeles",
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
      date: "12/26/2024 (Thursday)",
      scheduledTime: "09:15 AM",
      timezone: "America/Los_Angeles",
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
      date: "12/27/2024 (Friday)",
      scheduledTime: "08:30 AM",
      timezone: "America/New_York",
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
      date: "12/28/2024 (Saturday)",
      scheduledTime: "09:05 AM",
      timezone: "America/New_York",
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
      date: "12/29/2024 (Sunday)",
      scheduledTime: "09:10 AM",
      timezone: "America/New_York",
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

    // Filter by active tab
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

    // Filter by search term (from filter panel)
    if (search.trim()) {
      const searchTerm = search.toLowerCase().trim();
      filteredRides = filteredRides.filter((ride) => {
        switch (filterType) {
          case "Driver":
            return ride.driver.name.toLowerCase().includes(searchTerm);
          case "District":
            return ride.district.toLowerCase().includes(searchTerm);
          case "Campus":
            return ride.district.toLowerCase().includes(searchTerm);
          case "Student":
            return ride.details.students.toString().includes(searchTerm);
          case "Route":
            return ride.id.toLowerCase().includes(searchTerm);
          case "Ride ID":
            return ride.id.toLowerCase().includes(searchTerm);
          default:
            return (
              ride.driver.name.toLowerCase().includes(searchTerm) ||
              ride.district.toLowerCase().includes(searchTerm) ||
              ride.pickup.location.toLowerCase().includes(searchTerm) ||
              ride.dropoff.location.toLowerCase().includes(searchTerm) ||
              ride.status.toLowerCase().includes(searchTerm) ||
              ride.driver.vehicle.toLowerCase().includes(searchTerm) ||
              ride.id.toLowerCase().includes(searchTerm)
            );
        }
      });
    }

    // Filter by main search term (general search)
    if (mainSearch.trim()) {
      const searchTerm = mainSearch.toLowerCase().trim();
      filteredRides = filteredRides.filter((ride) => {
        return (
          ride.driver.name.toLowerCase().includes(searchTerm) ||
          ride.district.toLowerCase().includes(searchTerm) ||
          ride.pickup.location.toLowerCase().includes(searchTerm) ||
          ride.dropoff.location.toLowerCase().includes(searchTerm) ||
          ride.status.toLowerCase().includes(searchTerm) ||
          ride.driver.vehicle.toLowerCase().includes(searchTerm) ||
          ride.id.toLowerCase().includes(searchTerm)
        );
      });
    }

    // Filter by date range
    if (startDate || endDate) {
      filteredRides = filteredRides.filter((ride) => {
        // Convert ride date to comparable format
        const rideDate = new Date(ride.date.split(' ')[0]);
        
        // Check if ride date is within the selected range
        if (startDate && endDate) {
          return rideDate >= startDate && rideDate <= endDate;
        } else if (startDate) {
          return rideDate >= startDate;
        } else if (endDate) {
          return rideDate <= endDate;
        }
        
        return true;
      });
    }

    // Filter by stats selection
    if (statsFilter && statsFilter !== 'all') {
      filteredRides = filteredRides.filter((ride) => {
        switch (statsFilter) {
          case 'completed':
            return ride.status === 'Completed';
          case 'inProgress':
            return ride.status === 'In Progress';
          case 'canceled':
            return ride.status === 'Canceled' || ride.status === 'Cancelled';
          case 'rejected':
            return ride.status === 'Rejected';
          default:
            return true;
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
      <RidesStats stats={stats} onStatsClick={handleStatsClick} />
      <div className="flex justify-between items-center mb-4 gap-2">
        <div className="relative w-full">
          <Input
            type="text"
            placeholder="Search rides..."
            value={mainSearch}
            onChange={(e) => setMainSearch(e.target.value)}
            className="pl-10 pr-4 w-full"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-[var(--gray-400)]" />
        </div>
        <Button
          onClick={() => setShowFilters((prev) => !prev)}
          className={`flex hover:bg-[var(--purple)] text-[var(--primary-black)] items-center gap-2 ${
            (search.trim() || mainSearch.trim() || startDate || endDate) ? "bg-[var(--purple)] text-white" : ""
          }`}
          variant="secondary"
        >
          <Filter size={18} />
          Filters
          {(search.trim() || mainSearch.trim() || startDate || endDate) && (
            <span className="bg-white text-[var(--purple)] rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {(search.trim() ? 1 : 0) + (mainSearch.trim() ? 1 : 0) + ((startDate || endDate) ? 1 : 0)}
            </span>
          )}
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
          {/* {(search.trim() || mainSearch.trim() || selectedDate) && (
            <div className="absolute top-2 left-2 text-xs text-[var(--gray-500)]">
              Active filters: {[
                search.trim() && `${filterType}: "${search}"`,
                mainSearch.trim() && `General: "${mainSearch}"`,
                selectedDate && `Date: ${selectedDate.toLocaleDateString()}`
              ].filter(Boolean).join(", ")}
            </div>
          )} */}
          <Button
            className="absolute top-2 right-2 text-xl z-50"
            onClick={() => {
              setShowFilters(false);
              clearFilters();
            }}
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
              startDate={startDate}
              endDate={endDate}
              onDateRangeChange={handleDateRangeChange}
            />
          </div>
          {/* <div className="w-full md:w-auto flex items-end">
            <Button
              onClick={clearFilters}
              className="px-4 py-2 text-sm"
              variant="secondary"
            >
              Clear Filters
            </Button>
          </div> */}
        </div>
      )}
      <div className="mb-4">
        <div className="text-sm text-[var(--gray-500)]">
          Showing {getFilteredRides().length} of {rides.length} rides
          {(search.trim() || mainSearch.trim() || startDate || endDate) && (
            <span className="ml-2 text-[var(--purple)]">
              (filtered)
            </span>
          )}
        </div>
      </div>
      <RidesTable
        rides={getFilteredRides()}
        onView={(rideId) => {
          router.push(`/rides/${rideId}`);
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
