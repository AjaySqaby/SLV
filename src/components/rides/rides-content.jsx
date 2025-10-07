"use client";

import { Search, Plus } from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import React from "react";
import { useRouter } from "next/navigation";
import RidesTabs from "./RidesTabs";
import RidesTable from "./RidesTable";
import FilterDropdown from "./FilterDropdown";
import DateRangePicker from "./DateRangePicker";
import AddRideModal from "./AddRideModal";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";

export default function RidesContent({ headerSearchTerm, onHeaderSearch }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState(0);
  const [filterType, setFilterType] = useState("Driver");
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [search, setSearch] = useState("");
  const [mainSearch, setMainSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  

  const clearFilters = () => {
    setSearch("");
    setMainSearch("");
    setStartDate();
    setEndDate();
    setFilterType("Driver");
    setCurrentPage(1);
  };

  const handleDateRangeChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1); // Reset to first page when changing items per page
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
      setActiveTab(0); // Reset to 'All' tab
      setCurrentPage(1);
    }
  }, [headerSearchTerm]);
  const [showAddRide, setShowAddRide] = useState(false);

  // Dynamic State and City options (USA) using country-state-city
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
        state: "California",
        city: "Oakland",
      },
      partner: "ABC Transportation",
      details: {
        distance: "3.5 mi",
        duration: "30 min",
        stops: 2,
        students: 2,
      },
      status: "Completed",
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
        state: "California",
        city: "Oakland",
      },
      partner: "XYZ Logistics",
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
        state: "Georgia",
        city: "Atlanta",
      },
      partner: "Atlanta Express",
      details: {
        distance: "2.8 mi",
        duration: "30 min",
        stops: 2,
        students: 1,
      },
      status: "Upcoming",
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
        arrived: "10:15 AM",
        location: "145 Ralph McGill Blvd NE, Atlanta, GA 30308",
      },
      driver: {
        name: "Maria Sanchez",
        vehicle: "Honda Odyssey",
        state: "Georgia",
        city: "Atlanta",
      },
      partner: "Southeast Transport",
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
        state: "Georgia",
        city: "Atlanta",
      },
      partner: "Metro Rides",
      details: {
        distance: "2.4 mi",
        duration: "30 min",
        stops: 2,
        students: 1,
      },
      status: "Assigned",
      statusColor: "[var(--warning)]",
      rowColor: "border-[var(--warning)]",
    },
    {
      id: "1003",
      number: 6,
      district: "San Francisco Unified School District",
      date: "12/30/2024 (Monday)",
      scheduledTime: "07:45 AM",
      timezone: "America/Los_Angeles",
      pickup: {
        scheduled: "07:45 AM",
        arrived: "07:45 AM",
        location: "Golden Gate Elementary",
      },
      dropoff: {
        scheduled: "08:15 AM",
        arrived: "08:15 AM",
        location: "Mission District Center",
      },
      driver: {
        name: "Jennifer Kim",
        vehicle: "Toyota Sienna",
        state: "California",
        city: "San Francisco",
      },
      partner: "Bay Area Transit",
      details: {
        distance: "4.1 mi",
        duration: "30 min",
        stops: 3,
        students: 4,
      },
      status: "Accepted",
      statusColor: "blue",
      rowColor: "border-green-500",
    },
    {
      id: "1004",
      number: 7,
      district: "San Francisco Unified School District",
      date: "12/31/2024 (Tuesday)",
      scheduledTime: "08:00 AM",
      timezone: "America/Los_Angeles",
      pickup: {
        scheduled: "08:00 AM",
        location: "Richmond High School",
      },
      dropoff: {
        scheduled: "08:30 AM",
        location: "Sunset Boulevard Campus",
      },
      driver: {
        name: "David Thompson",
        vehicle: "Ford Transit",
        state: "California",
        city: "San Francisco",
      },
      partner: "Golden Gate Transport",
      details: {
        distance: "5.2 mi",
        duration: "30 min",
        stops: 2,
        students: 3,
      },
      status: "Unassigned",
      statusColor: "[var(--warning)]",
      rowColor: "border-orange-500",
    },
    {
      id: "1005",
      number: 8,
      district: "Los Angeles Unified School District",
      date: "01/01/2025 (Wednesday)",
      scheduledTime: "07:30 AM",
      timezone: "America/Los_Angeles",
      pickup: {
        scheduled: "07:30 AM",
        location: "Hollywood High School",
      },
      dropoff: {
        scheduled: "08:00 AM",
        location: "Beverly Hills Campus",
      },
      driver: {
        name: "Amanda Johnson",
        vehicle: "Honda Odyssey",
        state: "California",
        city: "Los Angeles",
      },
      partner: "LA School Transport",
      details: {
        distance: "6.8 mi",
        duration: "30 min",
        stops: 4,
        students: 6,
      },
      status: "Unaccepted",
      statusColor: "[var(--warning)]",
      rowColor: "border-orange-500",
    },
    {
      id: "1006",
      number: 9,
      district: "Los Angeles Unified School District",
      date: "01/02/2025 (Thursday)",
      scheduledTime: "09:00 AM",
      timezone: "America/Los_Angeles",
      pickup: {
        scheduled: "09:00 AM",
        location: "Venice Beach Elementary",
      },
      dropoff: {
        scheduled: "09:30 AM",
        location: "Santa Monica Center",
      },
      driver: {
        name: "Robert Garcia",
        vehicle: "Ford Transit",
        state: "California",
        city: "Los Angeles",
      },
      partner: "West Coast Rides",
      details: {
        distance: "3.7 mi",
        duration: "30 min",
        stops: 2,
        students: 2,
      },
      status: "Started",
      statusColor: "[var(--green)]",
      rowColor: "border-green-500",
    },
    {
      id: "1007",
      number: 10,
      district: "Chicago Public Schools",
      date: "01/03/2025 (Friday)",
      scheduledTime: "08:15 AM",
      timezone: "America/Chicago",
      pickup: {
        scheduled: "08:15 AM",
        location: "Lincoln Park High School",
      },
      dropoff: {
        scheduled: "08:45 AM",
        location: "Downtown Chicago Campus",
      },
      driver: {
        name: "Michelle Brown",
        vehicle: "Toyota Sienna",
        state: "Illinois",
        city: "Chicago",
      },
      partner: "Windy City Transport",
      details: {
        distance: "4.5 mi",
        duration: "30 min",
        stops: 3,
        students: 4,
      },
      status: "Substitute Needed",
      statusColor: "[var(--warning)]",
      rowColor: "border-yellow-500",
    },
    {
      id: "1008",
      number: 11,
      district: "Chicago Public Schools",
      date: "01/04/2025 (Saturday)",
      scheduledTime: "07:50 AM",
      timezone: "America/Chicago",
      pickup: {
        scheduled: "07:50 AM",
        arrived: "08:10 AM",
        location: "North Side Elementary",
      },
      dropoff: {
        scheduled: "08:20 AM",
        location: "Millennium Park Center",
      },
      driver: {
        name: "Christopher Wilson",
        vehicle: "Honda Odyssey",
        state: "Illinois",
        city: "Chicago",
      },
      partner: "Chicago School Services",
      details: {
        distance: "5.1 mi",
        duration: "30 min",
        stops: 2,
        students: 3,
      },
      status: "Late",
      statusColor: "[var(--red)]",
      rowColor: "border-red-500",
    },
    {
      id: "1009",
      number: 12,
      district: "Boston Public Schools",
      date: "01/05/2025 (Sunday)",
      scheduledTime: "08:30 AM",
      timezone: "America/New_York",
      pickup: {
        scheduled: "08:30 AM",
        location: "Back Bay High School",
      },
      dropoff: {
        scheduled: "09:00 AM",
        location: "Cambridge Campus",
      },
      driver: {
        name: "Sarah Davis",
        vehicle: "Ford Transit",
        state: "Massachusetts",
        city: "Boston",
      },
      partner: "New England Transport",
      details: {
        distance: "3.9 mi",
        duration: "30 min",
        stops: 2,
        students: 2,
      },
      status: "Rejected",
      statusColor: "[var(--red)]",
      rowColor: "border-red-500",
    },
    {
      id: "1010",
      number: 13,
      district: "Boston Public Schools",
      date: "01/06/2025 (Monday)",
      scheduledTime: "09:15 AM",
      timezone: "America/New_York",
      pickup: {
        scheduled: "09:15 AM",
        location: "South End Elementary",
      },
      dropoff: {
        scheduled: "09:45 AM",
        location: "Harbor District Center",
      },
      driver: {
        name: "Kevin Martinez",
        vehicle: "Toyota Sienna",
        state: "Massachusetts",
        city: "Boston",
      },
      partner: "Northeast Rides",
      details: {
        distance: "4.3 mi",
        duration: "30 min",
        stops: 3,
        students: 5,
      },
      status: "Cancelled",
      statusColor: "[var(--red)]",
      rowColor: "border-red-500",
    },
    {
      id: "1011",
      number: 14,
      district: "Miami-Dade County Public Schools",
      date: "01/07/2025 (Tuesday)",
      scheduledTime: "07:45 AM",
      timezone: "America/New_York",
      pickup: {
        scheduled: "07:45 AM",
        arrived: "07:45 AM",
        confirmed: "07:50 AM",
        location: "South Beach High School",
      },
      dropoff: {
        scheduled: "08:15 AM",
        arrived: "08:15 AM",
        completed: "08:25 AM",
        location: "Downtown Miami Campus",
      },
      driver: {
        name: "Luis Rodriguez",
        vehicle: "Honda Odyssey",
        state: "Florida",
        city: "Miami",
      },
      partner: "Miami-Dade Transport",
      details: {
        distance: "6.2 mi",
        duration: "30 min",
        stops: 4,
        students: 7,
      },
      status: "Completed",
      statusColor: "blue",
      rowColor: "border-green-500",
    },
    {
      id: "1012",
      number: 15,
      district: "Miami-Dade County Public Schools",
      date: "01/08/2025 (Wednesday)",
      scheduledTime: "08:00 AM",
      timezone: "America/New_York",
      pickup: {
        scheduled: "08:00 AM",
        arrived: "08:00 AM",
        location: "Coral Gables Elementary",
      },
      dropoff: {
        scheduled: "08:30 AM",
        arrived: "08:30 AM",
        location: "Brickell Center",
      },
      driver: {
        name: "Maria Gonzalez",
        vehicle: "Ford Transit",
        state: "Florida",
        city: "Miami",
      },
      partner: "Sunshine State Rides",
      details: {
        distance: "5.8 mi",
        duration: "30 min",
        stops: 3,
        students: 4,
      },
      status: "In Progress",
      statusColor: "blue",
      rowColor: "border-green-500",
    },
    {
      id: "1013",
      number: 16,
      district: "Houston Independent School District",
      date: "01/09/2025 (Thursday)",
      scheduledTime: "07:30 AM",
      timezone: "America/Chicago",
      pickup: {
        scheduled: "07:30 AM",
        location: "Heights Elementary",
      },
      dropoff: {
        scheduled: "08:00 AM",
        location: "Downtown Houston Campus",
      },
      driver: {
        name: "James Anderson",
        vehicle: "Toyota Sienna",
        state: "Texas",
        city: "Houston",
      },
      partner: "Lone Star Transport",
      details: {
        distance: "7.1 mi",
        duration: "30 min",
        stops: 2,
        students: 3,
      },
      status: "Upcoming",
      statusColor: "blue",
      rowColor: "border-blue-500",
    },
    {
      id: "1014",
      number: 17,
      district: "Houston Independent School District",
      date: "01/10/2025 (Friday)",
      scheduledTime: "08:45 AM",
      timezone: "America/Chicago",
      pickup: {
        scheduled: "08:45 AM",
        location: "Memorial High School",
      },
      dropoff: {
        scheduled: "09:15 AM",
        location: "Galleria District Center",
      },
      driver: {
        name: "Patricia White",
        vehicle: "Honda Odyssey",
        state: "Texas",
        city: "Houston",
      },
      partner: "Texas Express",
      details: {
        distance: "4.7 mi",
        duration: "30 min",
        stops: 3,
        students: 5,
      },
      status: "Assigned",
      statusColor: "blue",
      rowColor: "border-purple-500",
    },
    {
      id: "1015",
      number: 18,
      district: "Phoenix Union High School District",
      date: "01/11/2025 (Saturday)",
      scheduledTime: "09:00 AM",
      timezone: "America/Phoenix",
      pickup: {
        scheduled: "09:00 AM",
        location: "Desert Ridge High School",
      },
      dropoff: {
        scheduled: "09:30 AM",
        location: "Scottsdale Campus",
      },
      driver: {
        name: "Mark Johnson",
        vehicle: "Ford Transit",
        state: "Arizona",
        city: "Phoenix",
      },
      partner: "Desert Transport",
      details: {
        distance: "8.3 mi",
        duration: "30 min",
        stops: 2,
        students: 2,
      },
      status: "Accepted",
      statusColor: "blue",
      rowColor: "border-teal-500",
    },
    {
      id: "1016",
      number: 19,
      district: "Phoenix Union High School District",
      date: "01/12/2025 (Sunday)",
      scheduledTime: "08:15 AM",
      timezone: "America/Phoenix",
      pickup: {
        scheduled: "08:15 AM",
        location: "Central Phoenix Elementary",
      },
      dropoff: {
        scheduled: "08:45 AM",
        location: "Tempe District Center",
      },
      driver: {
        name: "Lisa Thompson",
        vehicle: "Toyota Sienna",
        state: "Arizona",
        city: "Phoenix",
      },
      partner: "Southwest Rides",
      details: {
        distance: "6.4 mi",
        duration: "30 min",
        stops: 4,
        students: 6,
      },
      status: "In Progress",
      statusColor: "blue",
      rowColor: "border-indigo-500",
    },
    {
      id: "1017",
      number: 20,
      district: "Seattle Public Schools",
      date: "01/13/2025 (Monday)",
      scheduledTime: "07:45 AM",
      timezone: "America/Los_Angeles",
      pickup: {
        scheduled: "07:45 AM",
        location: "Capitol Hill High School",
      },
      dropoff: {
        scheduled: "08:15 AM",
        location: "University District Campus",
      },
      driver: {
        name: "Daniel Lee",
        vehicle: "Honda Odyssey",
        state: "Washington",
        city: "Seattle",
      },
      partner: "Pacific Northwest Transport",
      details: {
        distance: "5.5 mi",
        duration: "30 min",
        stops: 3,
        students: 4,
      },
      status: "Delayed",
      statusColor: "[var(--red)]",
      rowColor: "border-red-500",
    },
    {
      id: "1018",
      number: 21,
      district: "Portland Public Schools",
      date: "01/14/2025 (Tuesday)",
      scheduledTime: "08:30 AM",
      timezone: "America/Los_Angeles",
      pickup: {
        scheduled: "08:30 AM",
        location: "Pearl District Elementary",
      },
      dropoff: {
        scheduled: "09:00 AM",
        location: "Northwest Portland Campus",
      },
      driver: {
        name: "Emily Johnson",
        vehicle: "Honda Odyssey",
        state: "Oregon",
        city: "Portland",
      },
      partner: "Northwest Transport",
      details: {
        distance: "4.8 mi",
        duration: "30 min",
        stops: 2,
        students: 3,
      },
      status: "Not Started",
      statusColor: "[var(--gray)]",
      rowColor: "border-gray-400",
    },
    {
      id: "1019",
      number: 22,
      district: "Denver Public Schools", 
      date: "01/15/2025 (Wednesday)",
      scheduledTime: "07:45 AM",
      timezone: "America/Denver",
      pickup: {
        scheduled: "07:45 AM",
        location: "Capitol Hill High School",
      },
      dropoff: {
        scheduled: "08:15 AM",
        location: "Downtown Denver Campus",
      },
      driver: {
        name: "Michael Clark",
        vehicle: "Ford Transit",
        state: "Colorado",
        city: "Denver",
      },
      partner: "Rocky Mountain Transport",
      details: {
        distance: "5.2 mi",
        duration: "30 min",
        stops: 3,
        students: 4,
      },
      status: "Not Started",
      statusColor: "[var(--gray)]",
      rowColor: "border-gray-400",
    },
    {
      id: "1020",
      number: 23,
      district: "Nashville-Davidson County Schools",
      date: "01/16/2025 (Thursday)",
      scheduledTime: "08:00 AM",
      timezone: "America/Chicago",
      pickup: {
        scheduled: "08:00 AM",
        arrived: "08:05 AM",
        location: "Music City Elementary",
      },
      dropoff: {
        scheduled: "08:30 AM",
        location: "Downtown Nashville Center",
      },
      driver: {
        name: "Sarah Wilson",
        vehicle: "Toyota Sienna",
        state: "Tennessee",
        city: "Nashville",
      },
      partner: "Music City Transport",
      details: {
        distance: "6.1 mi",
        duration: "30 min",
        stops: 2,
        students: 5,
      },
      status: "Substitute Needed",
      statusColor: "[var(--warning)]",
      rowColor: "border-yellow-500",
    },
    {
      id: "1021",
      number: 24,
      district: "Austin Independent School District",
      date: "01/17/2025 (Friday)",
      scheduledTime: "09:00 AM",
      timezone: "America/Chicago",
      pickup: {
        scheduled: "09:00 AM",
        arrived: "09:00 AM",
        confirmed: "09:05 AM",
        location: "South Austin High School",
      },
      dropoff: {
        scheduled: "09:30 AM",
        location: "University of Texas Campus",
      },
      driver: {
        name: "David Rodriguez",
        vehicle: "Honda Odyssey",
        state: "Texas",
        city: "Austin",
      },
      partner: "Lone Star Education Transport",
      details: {
        distance: "7.3 mi",
        duration: "30 min",
        stops: 4,
        students: 6,
      },
      status: "Substitute Needed",
      statusColor: "[var(--warning)]",
      rowColor: "border-yellow-500",
    },
    {
      id: "1022",
      number: 25,
      district: "Las Vegas Clark County School District",
      date: "01/18/2025 (Saturday)",
      scheduledTime: "08:15 AM",
      timezone: "America/Los_Angeles",
      pickup: {
        scheduled: "08:15 AM",
        arrived: "08:15 AM",
        confirmed: "08:20 AM",
        location: "Summerlin High School",
      },
      dropoff: {
        scheduled: "08:45 AM",
        arrived: "08:45 AM",
        location: "Vegas Strip Campus",
      },
      driver: {
        name: "Maria Lopez",
        vehicle: "Ford Transit",
        state: "Nevada",
        city: "Las Vegas",
      },
      partner: "Desert Valley Transport",
      details: {
        distance: "8.7 mi",
        duration: "30 min",
        stops: 3,
        students: 4,
      },
      status: "In Progress",
      statusColor: "[var(--warning)]",
      rowColor: "border-orange-500",
    },
    {
      id: "1023",
      number: 26,
      district: "Salt Lake City School District",
      date: "01/19/2025 (Sunday)",
      scheduledTime: "07:30 AM",
      timezone: "America/Denver",
      pickup: {
        scheduled: "07:30 AM",
        arrived: "07:30 AM",
        confirmed: "07:35 AM",
        location: "Millcreek Elementary",
      },
      dropoff: {
        scheduled: "08:00 AM",
        arrived: "08:00 AM",
        location: "Sugar House Center",
      },
      driver: {
        name: "Robert Taylor",
        vehicle: "Toyota Sienna",
        state: "Utah",
        city: "Salt Lake City",
      },
      partner: "Mountain West Transport",
      details: {
        distance: "5.9 mi",
        duration: "30 min",
        stops: 2,
        students: 3,
      },
      status: "In Progress",
      statusColor: "[var(--warning)]",
      rowColor: "border-orange-500",
    },
  ];

  const tabCounts = {
    all: rides.length,
    upcoming: rides.filter((r) => r.status === "Upcoming").length,
    completed: rides.filter((r) => r.status === "Completed").length,
    assigned: rides.filter((r) => r.status === "Assigned").length,
    accepted: rides.filter((r) => r.status === "Accepted").length,
    inProgress: rides.filter((r) => r.status === "In Progress").length,
    unassigned: rides.filter((r) => r.status === "Unassigned").length,
    unaccepted: rides.filter((r) => r.status === "Unaccepted").length,
    notStarted: rides.filter((r) => r.status === "Not Started").length,
    started: rides.filter((r) => r.status === "Started").length,
    substituteNeeded: rides.filter((r) => r.status === "Substitute Needed").length,
    late: rides.filter((r) => r.status === "Late" || r.status === "Delayed").length,
    rejected: rides.filter((r) => r.status === "Rejected").length,
    cancelled: rides.filter((r) => r.status === "Canceled" || r.status === "Cancelled").length,
  };




  function getFilteredRides() {
    let filteredRides = rides;

    // Filter by active tab
    switch (activeTab) {
      case 0: // All Rides
        filteredRides = rides;
        break;
      case 1: // Upcoming
        filteredRides = rides.filter((r) => r.status === "Upcoming");
        break;
      case 2: // Completed
        filteredRides = rides.filter((r) => r.status === "Completed");
        break;
      case 3: // Assigned
        filteredRides = rides.filter((r) => r.status === "Assigned");
        break;
      case 4: // Unassigned
        filteredRides = rides.filter((r) => r.status === "Unassigned");
        break;
      case 5: // Accepted
        filteredRides = rides.filter((r) => r.status === "Accepted");
        break;
      case 6: // Unaccepted
        filteredRides = rides.filter((r) => r.status === "Unaccepted");
        break;
      case 7: // Not Started
        filteredRides = rides.filter((r) => r.status === "Not Started");
        break;
      case 8: // Started
        filteredRides = rides.filter((r) => r.status === "Started");
        break;
      case 9: // Substitute Needed
        filteredRides = rides.filter((r) => r.status === "Substitute Needed");
        break;
      case 10: // In Progress
        filteredRides = rides.filter((r) => r.status === "In Progress");
        break;
      case 11: // Late
        filteredRides = rides.filter((r) => r.status === "Late" || r.status === "Delayed");
        break;
      case 12: // Rejected
        filteredRides = rides.filter((r) => r.status === "Rejected");
        break;
      case 13: // Cancelled
        filteredRides = rides.filter((r) => r.status === "Canceled" || r.status === "Cancelled");
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
            // Also allow searching by partner when user is looking for a driver
            return (
              ride.driver.name.toLowerCase().includes(searchTerm) ||
              ride.partner.toLowerCase().includes(searchTerm)
            );
          case "Partners":
            return ride.partner.toLowerCase().includes(searchTerm);
          case "District":
            return ride.district.toLowerCase().includes(searchTerm);
          case "Campus":
            // No explicit campus field, approximate via pickup/dropoff locations
            return (
              (ride.pickup.location || "").toLowerCase().includes(searchTerm) ||
              (ride.dropoff.location || "").toLowerCase().includes(searchTerm)
            );
          case "Student":
            // Students can be searched by count, district, or campus-like locations
            return (
              ride.details.students.toString().includes(searchTerm) ||
              ride.district.toLowerCase().includes(searchTerm) ||
              (ride.pickup.location || "").toLowerCase().includes(searchTerm) ||
              (ride.dropoff.location || "").toLowerCase().includes(searchTerm)
            );
          case "Route":
            return ride.id.toLowerCase().includes(searchTerm);
          case "Ride ID":
            return ride.id.toLowerCase().includes(searchTerm);
          default:
            return (
              ride.driver.name.toLowerCase().includes(searchTerm) ||
              ride.partner.toLowerCase().includes(searchTerm) ||
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
          ride.partner.toLowerCase().includes(searchTerm) ||
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


    // State/City specific filters removed as per requirement

    return filteredRides;
  }

  function getPaginatedRides() {
    const filtered = getFilteredRides();
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filtered.slice(startIndex, endIndex);
  }

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, mainSearch, startDate, endDate, activeTab, itemsPerPage]);

  const filteredRides = getFilteredRides();
  const paginatedRides = getPaginatedRides();

  return (
    <div className="min-h-screen">
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
      <div className="flex flex-col gap-3 mb-4">
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
        {/* Inline filters row (moved above status tabs) */}
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div className="w-full md:w-1/4">
            <FilterDropdown value={filterType} onChange={setFilterType} />
          </div>
          <div className="w-full md:w-1/2">
            <label className="block text-sm font-medium text-[var(--gray-700)] mb-1">
              Search
            </label>
            <Input
              placeholder={`Search by ${filterType} (e.g., District/Campus for students, Partner for drivers)`}
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
        </div>
      </div>
      <div className="mb-4">
        <RidesTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          tabCounts={tabCounts}
        />
      </div>
      <div className="bg-background rounded-lg shadow-sm border border-[var(--gray-200)] overflow-hidden">
        <RidesTable 
          rides={paginatedRides}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
        <Pagination
          currentPage={currentPage}
          totalItems={filteredRides.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={handleItemsPerPageChange}
        />
      </div>
      <AddRideModal open={showAddRide} onClose={() => setShowAddRide(false)} />
    </div>
  );
}
