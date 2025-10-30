"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Tabs from "@/components/ui/Tabs";
import ForceStartModal from '@/components/common/modals/ForceStartModal'
import ForceCompleteModal from '@/components/common/modals/ForceCompleteModal'
import ForceNoShowModal from '@/components/common/modals/ForceNoShowModal'
import DuplicateModal from '@/components/common/modals/DuplicateModal'
import ManageTripModal from '@/components/common/modals/ManageTripModal'
import EditTripModal from '@/components/common/modals/EditTripModal'
import DriverDetailModal from '@/components/drivers/DriverDetailModal'
import {
  X,
  MapPin,
  Clock,
  User,
  Car,
  Calendar,
  Map,
  Camera,
  Eye,
  Route,
  Users,
  GraduationCap,
  FileText,
  AlertTriangle,
  Info,
  Star,
  Settings,
  Edit,
} from "lucide-react";
import { FaPlay, FaUsers, FaHistory } from "react-icons/fa";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge";
import DualTimeDisplay from "@/components/ui/DualTimeDisplay";
import { FaRoute } from "react-icons/fa";
// Mock drivers data (same as MapView)
const mockDrivers = [
  {
    id: "D-001",
    name: "Sarah Williams",
    avatar: "/driver1.jpg",
    vehicle: "Honda Odyssey",
    plateNumber: "ABC-1234",
    location: "Midtown",
    address: "999 Peachtree St NE, Atlanta, GA 30309",
    status: "On Ride",
    statusColor: "#10b981",
    position: { top: "32%", left: "52%" },
    rideId: "R123",
    eta: "15 min",
    phone: "(404) 555-1001",
    email: "sarah.w@example.com",
    licenseNumber: "GA-DL-1001001",
    licenseExpires: "2026-08-15",
    vehicleDetails: {
      make: "Honda Odyssey",
      year: 2022,
      licensePlate: "ABC-1234",
      type: "Minivan",
      color: "Silver"
    },
    totalRides: 142,
    upcomingRides: 2,
    assignedRoutes: 1,
    status: "Active"
  },
  {
    id: "D-002",
    name: "Michael Johnson",
    avatar: "/driver2.jpg",
    vehicle: "Toyota Sienna",
    plateNumber: "XYZ-5678",
    location: "West Midtown",
    address: "1234 West Peachtree St NW, Atlanta, GA 30309",
    status: "Ready Now",
    statusColor: "#10b981",
    position: { top: "28%", left: "48%" },
    rideId: "R222",
    eta: "10 min",
    phone: "(404) 555-1002",
    email: "michael.j@example.com",
    licenseNumber: "GA-DL-1001002",
    licenseExpires: "2025-12-20",
    vehicleDetails: {
      make: "Toyota Sienna",
      year: 2023,
      licensePlate: "XYZ-5678",
      type: "Minivan",
      color: "Black"
    },
    totalRides: 128,
    upcomingRides: 1,
    assignedRoutes: 3,
    status: "Active"
  },
  {
    id: "D-003",
    name: "David Thompson",
    avatar: "/driver3.jpg",
    vehicle: "Ford Transit",
    plateNumber: "DEF-9012",
    location: "Downtown Atlanta",
    address: "456 Marietta St NW, Atlanta, GA 30313",
    status: "Delayed",
    statusColor: "#ef4444",
    position: { top: "45%", left: "54%" },
    rideId: "R456",
    eta: "8 min",
    phone: "(404) 555-1003",
    email: "david.t@example.com",
    licenseNumber: "GA-DL-1001003",
    licenseExpires: "2026-03-10",
    vehicleDetails: {
      make: "Ford Transit",
      year: 2021,
      licensePlate: "DEF-9012",
      type: "Van",
      color: "White"
    },
    totalRides: 98,
    upcomingRides: 0,
    assignedRoutes: 2,
    status: "Active"
  },
  {
    id: "D-004",
    name: "Jessica Martinez",
    avatar: "/driver4.jpg",
    vehicle: "Chevrolet Suburban",
    plateNumber: "GHI-3456",
    location: "Buckhead",
    address: "3456 Peachtree Rd NE, Atlanta, GA 30326",
    status: "Ready Now",
    statusColor: "#10b981",
    position: { top: "22%", left: "56%" },
    rideId: "R444",
    eta: "14 min",
    phone: "(404) 555-1004",
    email: "jessica.m@example.com",
    licenseNumber: "GA-DL-1001004",
    licenseExpires: "2027-01-15",
    vehicleDetails: {
      make: "Chevrolet Suburban",
      year: 2023,
      licensePlate: "GHI-3456",
      type: "SUV",
      color: "White"
    },
    totalRides: 156,
    upcomingRides: 1,
    assignedRoutes: 2,
    status: "Active"
  },
  {
    id: "D-005",
    name: "Robert Chen",
    avatar: "/driver5.webp",
    vehicle: "Honda Pilot",
    plateNumber: "JKL-7890",
    location: "Virginia Highland",
    address: "1234 N Highland Ave NE, Atlanta, GA 30306",
    status: "On Ride",
    statusColor: "#10b981",
    position: { top: "35%", left: "60%" },
    rideId: "R789",
    eta: "12 min",
    phone: "(404) 555-1005",
    email: "robert.c@example.com",
    licenseNumber: "GA-DL-1001005",
    licenseExpires: "2026-07-22",
    vehicleDetails: {
      make: "Honda Pilot",
      year: 2022,
      licensePlate: "JKL-7890",
      type: "SUV",
      color: "Blue"
    },
    totalRides: 134,
    upcomingRides: 3,
    assignedRoutes: 1,
    status: "Active"
  }
];

export default function RideDetailModal({
  isOpen,
  onClose,
  rideId = "SLV1001-75185",
  rideStatus = "In Progress",
}) {
  const [activeTab, setActiveTab] = useState(0);
  
  // Modal states
  const [showForceStartModal, setShowForceStartModal] = useState(false)
  const [showForceCompleteModal, setShowForceCompleteModal] = useState(false)
  const [showForceNoShowModal, setShowForceNoShowModal] = useState(false)
  const [showDuplicateModal, setShowDuplicateModal] = useState(false)
  const [showManageTripModal, setShowManageTripModal] = useState(false)
  const [showEditTripModal, setShowEditTripModal] = useState(false)
  const [showDriverDetailModal, setShowDriverDetailModal] = useState(false)
  

  // Find the driver data based on rideId
  const selectedDriver = mockDrivers.find(driver => driver.rideId === rideId) || mockDrivers[0];

  // Function to get status circle color based on ride status
  const getStatusCircleColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'on_time':
      case 'completed':
      case 'in_progress':
      case 'started':
      case 'assigned':
        return 'bg-green-500'; // Green for on time
      case 'delayed':
      case 'late':
        return 'bg-red-500'; // Red for delayed
      case 'potential_delay':
      case 'warning':
        return 'bg-orange-500'; // Orange for potential delay
      case 'unknown':
      case 'not_started':
      case 'pending':
        return 'bg-black'; // Black for unknown
      default:
        return 'bg-gray-400'; // Default gray
    }
  };
  const RideMap = dynamic(() => import("@/components/rides/RideMap"), { ssr: false });
  const tabList = [
    { id: 0, label: "TRIP STOPS", icon: FaPlay },
    { id: 1, label: "LIVE TRACKING", icon: Map },
    { id: 2, label: "STOPS", icon: MapPin },
    { id: 3, label: "STUDENTS", icon: FaUsers },
    { id: 4, label: "TIMELINE", icon: FaHistory },
  ];
  const tabPanelClass = "pt-6";
  const statusType = rideStatus === 'On Time' ? 'active' : (rideStatus === 'Delayed' ? 'warning' : (rideStatus === 'Rejected' ? 'inactive' : 'active'));

  if (!isOpen) return null;

  // Dynamic data based on selected driver
  const rideData = {
    id: rideId,
    date: "05/01/2025, Thursday",
    route: `Route ${rideId}`,
    status: selectedDriver.status,
    driver: {
      name: selectedDriver.name,
      id: selectedDriver.id,
      phone: "(555) 123-4567",
      avatar: selectedDriver.avatar,
    },
    vehicle: {
      name: selectedDriver.vehicle,
      licensePlate: selectedDriver.plateNumber,
      capacity: "8 passengers",
    },
    ride: {
      status: selectedDriver.status === "Delayed" ? "Delayed" : "On Time",
      pickupTime: "7:15 AM",
      estimatedArrival: "7:45 AM",
      distance: "6.2 miles",
      duration: "30 minutes",
    },
    route: {
      pickup: {
        address: selectedDriver.address,
      },
      dropoff: {
        address: "Lincoln Academy High School, 48:50 Riverside Drive, Boston, MA",
      },
    },
    students: [
      {
        name: "Marcus Johnson",
        grade: 10,
        id: "ST-1234",
        status: "Scheduled",
        avatar: "/picture.jpg",
      },
    ],
    stops: [
      {
        type: "Pickup Stop",
        status: "Completed",
        address: selectedDriver.address,
        time: "7:15 AM",
        students: ["Marcus Johnson"],
      },
      {
        type: "Dropoff - School",
        status: "Upcoming",
        address: "Lincoln Academy High School, 48:50 Riverside Drive, Boston, MA",
        eta: "7:45 AM",
        students: ["Marcus Johnson"],
      },
    ],
    events: [
      {
        type: "Speeding Event",
        time: "7:32 AM",
        details: "Speed: 45mph in 35mph zone",
        location: selectedDriver.address,
        severity: "high",
      },
      {
        type: "Hard Braking",
        time: "7:41 AM",
        details: "Sudden deceleration detected",
        location: "Riverside Drive, Boston, MA",
        severity: "medium",
      },
    ],
    history: [
      {
        event: "Ride Created by System",
        time: "April 16, 2025, 7:00 AM",
        icon: "calendar",
      },
      {
        event: `Driver Assigned by Mark`,
        time: "April 16, 2025, 7:05 AM",
        details: `Driver ${selectedDriver.name} was assigned to this ride`,
        icon: "user",
      },
      {
        event: `Ride Started by ${selectedDriver.name}`,
        time: "April 16, 2025, 7:15 AM",
        icon: "car",
      },
      {
        event: `Pickup Completed by ${selectedDriver.name}`,
        time: "April 16, 2025, 7:15 AM",
        details: "1 student picked up",
        icon: "map-pin",
      },
      {
        event: `Dropoff Completed by ${selectedDriver.name}`,
        time: "April 16, 2025, 7:45 AM",
        details: "1 student dropped off at school",
        icon: "map-pin",
      },
    ],
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-start justify-center z-[9000] pt-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl !max-w-[82rem] mx-4 w-full h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-6 px-6 pt-6">
          {/* Top Row - Title and Status */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <Car className="w-6 h-6 text-[var(--blue-600)]" />
              <Route className="w-5 h-5 text-[var(--blue-600)]" />
              <Clock className="w-5 h-5 text-[var(--blue-600)]" />
              <h1 className="text-2xl font-bold text-[var(--blue-600)]">Ride Details #{rideData.id}</h1>
              <StatusBadge status={rideStatus} fontSize="text-lg" />
              <span className="text-sm font-medium text-gray-700">
                ETA: {rideData.ride.estimatedArrival}
              </span>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Bottom Row - Tabs and Action Buttons */}
          <div className="flex items-center justify-start">
            <div className="flex items-center space-x-2">
              {/* Tabs */}
              <button
                onClick={() => setActiveTab(0)}
                className="px-6 py-3 text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:opacity-90"
                style={{
                  backgroundColor: activeTab === 0 ? 'var(--primary)' : 'var(--gray-100)',
                  color: activeTab === 0 ? 'var(--on-primary)' : 'var(--muted-text)',
                  border: activeTab === 0 ? 'none' : '1px solid var(--gray-200)',
                  borderRadius: '12px'
                }}
              >
                <div className="w-4 h-4 border-2 border-white rounded-sm flex items-center justify-center">
                  <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent ml-0.5"></div>
                </div>
                TRIP STOPS
              </button>
              <button
                onClick={() => setActiveTab(1)}
                className="px-6 py-3 text-sm font-medium cursor-pointer transition-all duration-200 hover:opacity-90"
                style={{
                  backgroundColor: activeTab === 1 ? 'var(--primary)' : 'var(--gray-100)',
                  color: activeTab === 1 ? 'var(--on-primary)' : 'var(--muted-text)',
                  border: activeTab === 1 ? 'none' : '1px solid var(--gray-200)',
                  borderRadius: '12px'
                }}
              >
                LIVE TRACKING
              </button>
              <button
                onClick={() => setActiveTab(2)}
                className="px-6 py-3 text-sm font-medium cursor-pointer transition-all duration-200 hover:opacity-90"
                style={{
                  backgroundColor: activeTab === 2 ? 'var(--primary)' : 'var(--gray-100)',
                  color: activeTab === 2 ? 'var(--on-primary)' : 'var(--muted-text)',
                  border: activeTab === 2 ? 'none' : '1px solid var(--gray-200)',
                  borderRadius: '12px'
                }}
              >
                STOPS
              </button>
              <button
                onClick={() => setActiveTab(3)}
                className="px-6 py-3 text-sm font-medium cursor-pointer transition-all duration-200 hover:opacity-90"
                style={{
                  backgroundColor: activeTab === 3 ? 'var(--primary)' : 'var(--gray-100)',
                  color: activeTab === 3 ? 'var(--on-primary)' : 'var(--muted-text)',
                  border: activeTab === 3 ? 'none' : '1px solid var(--gray-200)',
                  borderRadius: '12px'
                }}
              >
                STUDENTS
              </button>
              <button
                onClick={() => setActiveTab(4)}
                className="px-6 py-3 text-sm font-medium cursor-pointer transition-all duration-200 hover:opacity-90"
                style={{
                  backgroundColor: activeTab === 4 ? 'var(--primary)' : 'var(--gray-100)',
                  color: activeTab === 4 ? 'var(--on-primary)' : 'var(--muted-text)',
                  border: activeTab === 4 ? 'none' : '1px solid var(--gray-200)',
                  borderRadius: '12px'
                }}
              >
                TIMELINE
              </button>

              {/* Action Buttons */}
              <Button
                variant="secondary"
                onClick={() => setShowManageTripModal(true)}
                className="flex items-center justify-center px-4 py-2 !rounded-full text-sm font-semibold cursor-pointer border transition-all duration-150 gap-2 bg-white text-black border-card-border"
              >
                <Settings className="w-4 h-4" />
                <span>Manage Trip</span>
              </Button>
              <Button
                variant="secondary"
                onClick={() => setShowEditTripModal(true)}
                className="flex items-center justify-center px-4 py-2 !rounded-full text-sm font-semibold cursor-pointer border transition-all duration-150 gap-2 bg-white text-black border-card-border"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Trip</span>
              </Button>
            </div>
          </div>

          {/* Action Buttons - Single row with custom scrollbar */}

        </div>

               {/* Main Content - Three-column grid */}
               <div className="grid grid-cols-12 gap-6 items-start flex-1 px-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {/* Left Sidebar - Clean Detail Stack */}
          <div className="col-span-3 min-w-0 space-y-4">
            {/* Driver */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow duration-200"
              onClick={() => setShowDriverDetailModal(true)}
            >
              <div className="flex items-center mb-3">
                <Users className="w-5 h-5 text-[var(--blue-600)] mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Driver</h2>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={rideData.driver.avatar || "/picture.jpg"} alt="Driver" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-medium text-gray-900">{rideData.driver.name}</p>
                    <div className="flex items-center text-xs text-gray-600">
                      <Star className="w-3.5 h-3.5 text-yellow-500 mr-1" />
                      <span>4.9 rating</span>
                    </div>
                  </div>
                </div>
                <StatusBadge status={rideStatus} fontSize="text-sm" />
              </div>
            </div>

            {/* Vehicle */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-pointer hover:shadow-md transition-shadow duration-200"
              onClick={() => setShowDriverDetailModal(true)}
            >
              <div className="flex items-center mb-3">
                <Car className="w-5 h-5 text-[var(--blue-600)] mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Vehicle</h2>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded bg-blue-50 flex items-center justify-center">
                    <Car className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{rideData.vehicle.name}</p>
                    <p className="text-xs text-gray-600">ID: {rideData.route.id}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Trip Details */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <Route className="w-5 h-5 text-[var(--blue-600)] mr-2" />
                  <h2 className="text-lg font-semibold text-gray-900">Trip Details</h2>
                </div>
                <Button
                  variant="secondary"
                  onClick={() => console.log('View Route')}
                  className="text-xs px-3 py-1"
                  style={{
                    backgroundColor: 'var(--blue-100)',
                    color: 'var(--blue-600)',
                    border: '1px solid var(--blue-200)'
                  }}
                >
                  View Route
                </Button>
              </div>
              <div className="grid grid-cols-2 gap-y-3">
                <div className="text-sm text-gray-500">Route</div>
                <div className="text-sm font-medium text-gray-900">{rideData.route.id}</div>
                <div className="text-sm text-gray-500">Duration</div>
                <div className="text-sm font-medium text-gray-900">{rideData.ride.duration}</div>
                <div className="text-sm text-gray-500">Distance</div>
                <div className="text-sm font-medium text-gray-900">{rideData.ride.distance}</div>
                <div className="text-sm text-gray-500">Stops</div>
                <div className="text-sm font-medium text-gray-900">{rideData.stops.length}</div>
                <div className="text-sm text-gray-500">Students</div>
                <div className="text-sm font-medium text-gray-900">{rideData.students.length}</div>
                <div className="text-sm text-gray-500">Available Seats</div>
                <div className="text-sm font-medium text-gray-900">{Math.max(0, 6 - (rideData.students?.length || 0))}</div>
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-3">
                <Clock className="w-5 h-5 text-[var(--blue-600)] mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Schedule</h2>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-green-600"><span className="w-2 h-2 rounded-full bg-green-600 mr-2"></span>Start</div>
                  <div className="font-medium text-gray-900">{rideData.ride.pickupTime}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-red-600"><span className="w-2 h-2 rounded-full bg-red-600 mr-2"></span>End</div>
                  <div className="font-medium text-gray-900">{rideData.ride.estimatedArrival}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-gray-600"><span className="w-2 h-2 rounded-full bg-gray-400 mr-2"></span>Completed</div>
                  <div className="font-medium text-gray-900">
                    {rideStatus === 'Completed' ? rideData.ride.estimatedArrival : '--'}
                  </div>
                </div>
              </div>
            </div>

            {/* Additional */}
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center mb-3">
                <FileText className="w-5 h-5 text-[var(--blue-600)] mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Additional</h2>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Equipment</span>
                  <span className="font-medium text-gray-900">Yes</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-500">Billed By</span>
                  <span className="font-medium text-gray-900 truncate">Seattle Public Schools District</span>
                </div>
              </div>
            </div>
          </div>

                 {/* Middle Column - Content */}
                 <div className="col-span-4 min-w-0">
                   <div className="space-y-4">
              {/* Content Cards */}
              <div>
                {activeTab === 0 && (
                  <div className="space-y-6">
                    {/* Trip Route Summary Card */}
                    <div className="rounded-xl p-6" style={{ backgroundColor: 'var(--light-blue-bg)', border: '1px solid var(--blue-100)' }}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--blue-500)' }}>
                            <span className="text-white font-bold text-lg">TR</span>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold" style={{ color: 'var(--heading)' }}>Trip Route</h3>
                            <p className="text-sm" style={{ color: 'var(--muted-text)' }}>{rideData.stops.length} stops • {rideData.students.length} student • {rideData.ride.distance} total</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm" style={{ color: 'var(--muted-text)' }}>Est. Duration</p>
                          <p className="text-xl font-bold" style={{ color: 'var(--heading)' }}>{rideData.ride.duration}</p>
                        </div>
                      </div>
                    </div>

                    {/* Stops with vertical line */}
                    <div className="relative">
                      {/* Vertical line */}
                      <div className="absolute left-6 top-0 bottom-0 w-0.5" style={{ backgroundColor: 'var(--blue-100)' }}></div>

                      <div className="space-y-8">
                        {rideData.stops.map((stop, index) => (
                          <div key={index} className="relative">
                            <div className="flex items-start gap-4">
                              {/* Stop number circle */}
                              <div className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-sm" 
                                style={{ backgroundColor: index === 0 ? 'var(--green-600)' : 'var(--orange)' }}>
                                <span className="text-white font-bold text-lg">{index + 1}</span>
                              </div>

                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="text-lg font-semibold" style={{ color: 'var(--heading)' }}>{stop.address}</h4>
                                  <button className="flex items-center gap-1 text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: 'var(--blue-600)' }}>
                                    <Eye className="w-4 h-4" />
                                    View Details
                                  </button>
                                </div>

                                <div className="space-y-2 text-sm" style={{ color: 'var(--muted-text)' }}>
                                  <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 rounded-sm flex items-center justify-center" style={{ backgroundColor: 'var(--amber-500)' }}>
                                      <span className="text-white text-xs">{index === 0 ? '🏠' : '🏫'}</span>
                                    </div>
                                    <span>{index === 0 ? 'Residential • Door-to-door pickup' : 'School Campus • Main entrance'}</span>
                                  </div>
                                  <div className="ml-6">
                                    <span>Scheduled {stop.time} {index === 0 ? 'Pick up' : 'Drop off'} {stop.students.length} student</span>
                                  </div>
                                </div>

                                {/* Student info */}
                                {stop.students.length > 0 && (
                                  <div className="mt-4 flex items-center gap-3">
                                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--purple-600)' }}>
                                      <User className="w-3 h-3 text-white" />
                                    </div>
                                    <div className="flex items-center gap-3">
                                      <button
                                        className="font-semibold hover:underline cursor-pointer"
                                        style={{ color: 'var(--blue-600)' }}
                                      >
                                        {stop.students[0]}
                                      </button>
                                      <span style={{ color: 'var(--muted-text)' }}>Grade 10</span>
                                      <span className="px-2 py-1 text-xs rounded" style={{ backgroundColor: 'var(--gray-100)', color: 'var(--muted-text)' }}>Scheduled</span>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 1 && (
                  <div className="space-y-6">
                    {/* Route Events Section */}
                    <div className="bg-white rounded-lg p-6 shadow-sm">
                      <h3 className="text-lg font-semibold mb-6 flex items-center" style={{ color: 'var(--heading)' }}>
                        <div className="w-8 h-8 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: 'var(--blue-600)' }}>
                          <MapPin className="w-4 h-4 text-white" />
                        </div>
                        Route Events
                        <div className="ml-auto">
                          <span className="px-3 py-1 text-sm rounded-full" style={{ backgroundColor: 'var(--blue-100)', color: 'var(--blue-700)' }}>
                            {rideData.events.length} Events
                          </span>
                        </div>
                      </h3>

                      <div className="space-y-4">
                        {rideData.events.map((event, index) => (
                          <div
                            key={index}
                            className="p-4 rounded-lg shadow-sm border"
                            style={{
                              backgroundColor: event.severity === "high" ? '#fef2f2' : '#fff7ed',
                              borderColor: event.severity === "high" ? '#fecaca' : '#fed7aa'
                            }}
                          >
                            <div className="flex items-start gap-4">
                              {/* Event Icon with Colored Background */}
                              <div
                                className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm"
                                style={{
                                  backgroundColor: event.severity === "high" ? '#ef4444' : '#f97316'
                                }}
                              >
                                {event.severity === "high" ? (
                                  <AlertTriangle className="w-5 h-5 text-white" />
                                ) : (
                                  <Info className="w-5 h-5 text-white" />
                                )}
                              </div>

                              {/* Event Details */}
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-3">
                                    <h4 className="text-base font-semibold" style={{ color: 'var(--heading)' }}>
                                      {event.type}
                                    </h4>
                                    <span
                                      className="px-2 py-1 text-xs font-medium rounded-full border"
                                      style={{
                                        backgroundColor: event.severity === "high" ? '#fee2e2' : '#fed7aa',
                                        color: event.severity === "high" ? '#b91c1c' : '#c2410c',
                                        borderColor: event.severity === "high" ? '#fecaca' : '#fed7aa'
                                      }}
                                    >
                                      {event.severity === "high" ? "High Priority" : "Medium Priority"}
                                    </span>
                                  </div>
                                  <div className="text-right">
                                    <span
                                      className="text-xs font-medium px-2 py-1 rounded-full"
                                      style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}
                                    >
                                      {event.time}
                                    </span>
                                  </div>
                                </div>

                                <div className="space-y-2">
                                  <p className="text-sm font-medium" style={{ color: '#374151' }}>
                                    {event.details}
                                  </p>
                                  {event.location && (
                                    <div
                                      className="flex items-center gap-2 p-2 rounded-lg border"
                                      style={{ backgroundColor: '#f9fafb', borderColor: '#e5e7eb' }}
                                    >
                                      <MapPin className="w-4 h-4" style={{ color: '#dc2626' }} />
                                      <span className="text-xs font-medium" style={{ color: '#6b7280' }}>
                                        {event.location}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 2 && (
              <div className="space-y-6">
                {/* Stops with vertical line */}
                <div className="relative">
                  {/* Vertical line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5" style={{ backgroundColor: 'var(--blue-100)' }}></div>

                  <div className="space-y-8">
                    {/* Stop 1 - Pickup */}
                    <div className="relative">
                      <div className="flex items-start gap-4">
                        {/* Stop number circle */}
                        <div className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: 'var(--green-600)' }}>
                          <span className="text-white font-bold text-lg">1</span>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-semibold" style={{ color: 'var(--heading)' }}>1425 Oak Street Apt 204, Springfield, MA 01103</h4>
                            <button className="flex items-center gap-1 text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: 'var(--blue-600)' }}>
                              <Eye className="w-4 h-4" />
                              View Details
                            </button>
                          </div>

                          <div className="space-y-2 text-sm" style={{ color: 'var(--muted-text)' }}>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-sm flex items-center justify-center" style={{ backgroundColor: 'var(--amber-500)' }}>
                                <span className="text-white text-xs">🏠</span>
                              </div>
                              <span>Residential • Door-to-door pickup</span>
                            </div>
                            <div className="ml-6">
                              <span>Scheduled 7:15 AM EST Pick up 1 student</span>
                            </div>
                          </div>

                          {/* Student info */}
                          <div className="mt-4 flex items-center gap-3">
                            <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--purple-600)' }}>
                              <User className="w-3 h-3 text-white" />
                            </div>
                            <div className="flex items-center gap-3">
                              <button
                                className="font-semibold hover:underline cursor-pointer"
                                style={{ color: 'var(--blue-600)' }}
                              >
                                Marcus Johnson
                              </button>
                              <span style={{ color: 'var(--muted-text)' }}>Grade 10</span>
                              <span className="px-2 py-1 text-xs rounded" style={{ backgroundColor: 'var(--gray-100)', color: 'var(--muted-text)' }}>Scheduled</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Stop 2 - Drop off */}
                    <div className="relative">
                      <div className="flex items-start gap-4">
                        {/* Stop number circle */}
                        <div className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: 'var(--orange)' }}>
                          <span className="text-white font-bold text-lg">2</span>
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="text-lg font-semibold" style={{ color: 'var(--heading)' }}>48:50 Riverside Drive, Boston, MA</h4>
                            <button className="flex items-center gap-1 text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: 'var(--blue-600)' }}>
                              <Eye className="w-4 h-4" />
                              View Details
                            </button>
                          </div>

                          <div className="space-y-2 text-sm" style={{ color: 'var(--muted-text)' }}>
                            <div className="flex items-center gap-2">
                              <div className="w-4 h-4 rounded-sm flex items-center justify-center" style={{ backgroundColor: 'var(--amber-500)' }}>
                                <span className="text-white text-xs">🏫</span>
                              </div>
                              <span>School Campus • Main entrance</span>
                            </div>
                            <div className="ml-6">
                              <span>Scheduled 7:45 AM EST Drop off 1 student</span>
                            </div>
                          </div>

                          {/* School info */}
                          <div className="mt-4 flex items-center gap-3">
                            <div className="w-6 h-6 rounded-sm flex items-center justify-center" style={{ backgroundColor: 'var(--amber-500)' }}>
                              <span className="text-white text-xs">🏫</span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-semibold" style={{ color: 'var(--heading)' }}>Lincoln Academy High School</span>
                              <span className="px-2 py-1 text-xs rounded" style={{ backgroundColor: 'var(--gray-100)', color: 'var(--muted-text)' }}>Scheduled</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 3 && (
              <div className="space-y-6">
                {/* Student Detail Card */}
                <div className="bg-white rounded-lg shadow-sm border overflow-hidden" style={{ borderColor: 'var(--gray-200)' }}>
                  {/* Student Header */}
                  <div className="p-6 border-b" style={{ borderColor: 'var(--gray-200)' }}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        {/* Simple Profile Picture */}
                        <div className="w-12 h-12 rounded-full overflow-hidden bg-[var(--gray-100)] flex items-center justify-center">
                          <img
                            src={rideData.students[0]?.avatar || "/picture.jpg"}
                            alt={rideData.students[0]?.name}
                            className="w-full h-full object-cover"
                            onError={(e) => { e.currentTarget.style.display = 'none'; e.currentTarget.parentElement.querySelector('[data-fallback]')?.classList.remove('hidden'); }}
                          />
                          <div data-fallback className="hidden w-full h-full flex items-center justify-center text-sm font-semibold text-[var(--heading)]">
                            {rideData.students[0]?.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                          </div>
                        </div>
                        <div>
                          <button
                            className="text-xl font-bold hover:underline cursor-pointer"
                            style={{ color: 'var(--blue-600)' }}
                          >
                            {rideData.students[0]?.name}
                          </button>
                          <p className="text-sm mt-1" style={{ color: 'var(--muted-text)' }}>Grade {rideData.students[0]?.grade}</p>
                        </div>
                      </div>
                      <span
                        className="px-3 py-1 text-xs rounded-full"
                        style={{
                          backgroundColor: 'var(--gray-100)',
                          color: 'var(--muted-text)'
                        }}
                      >
                        {rideData.students[0]?.status}
                      </span>
                    </div>
                  </div>

                  {/* Pickup Section */}
                  <div className="relative">
                    <div
                      className="p-6 rounded-t-lg"
                      style={{ backgroundColor: 'var(--green-100)' }}
                    >
                      <div className="flex items-start gap-4">
                        {/* Pickup Circle */}
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                          style={{ backgroundColor: 'var(--green-600)' }}
                        >
                          1
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold" style={{ color: 'var(--heading)' }}>Pickup</h4>
                            <Clock className="w-4 h-4" style={{ color: 'var(--muted-text)' }} />
                            <span className="text-sm" style={{ color: 'var(--muted-text)' }}>7:15 AM EST</span>
                          </div>
                          <p className="text-sm" style={{ color: 'var(--muted-text)' }}>
                            {selectedDriver.address}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Vertical Line */}
                    <div
                      className="absolute left-6 top-16 w-0.5 h-16"
                      style={{ backgroundColor: 'var(--green-600)' }}
                    ></div>
                  </div>

                  {/* Dropoff Section */}
                  <div className="relative">
                    <div
                      className="p-6"
                      style={{ backgroundColor: 'var(--amber-100)' }}
                    >
                      <div className="flex items-start gap-4">
                        {/* Dropoff Circle */}
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                          style={{ backgroundColor: 'var(--orange)' }}
                        >
                          2
                        </div>

                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h4 className="font-semibold" style={{ color: 'var(--heading)' }}>Dropoff</h4>
                            <Clock className="w-4 h-4" style={{ color: 'var(--muted-text)' }} />
                            <span className="text-sm" style={{ color: 'var(--muted-text)' }}>7:45 AM EST</span>
                          </div>
                          <p className="text-sm" style={{ color: 'var(--muted-text)' }}>
                            Lincoln Academy High School
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Vertical Line */}
                    <div
                      className="absolute left-6 top-16 w-0.5 h-16"
                      style={{ backgroundColor: 'var(--orange)' }}
                    ></div>
                  </div>

                  {/* Notes Section */}
                  <div className="relative">
                    <div
                      className="p-6 rounded-b-lg"
                      style={{ backgroundColor: 'var(--blue-100)' }}
                    >
                      <div className="flex items-start gap-4">
                        {/* Notes Icon */}
                        <div
                          className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                          style={{ backgroundColor: 'var(--blue-600)' }}
                        >
                          <FileText className="w-4 h-4 text-white" />
                        </div>

                        <div className="flex-1">
                          <h4 className="font-semibold mb-2" style={{ color: 'var(--heading)' }}>Notes</h4>
                          <p className="text-sm" style={{ color: 'var(--blue-600)' }}>
                            Guardian requested pickup at main building entrance. Student requires wheelchair accessibility.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 4 && (
              <div className="space-y-6">
                {/* Timeline Header */}


                {/* Timeline Events */}
                <div className="relative">
                  {/* Vertical Line */}
                  <div className="absolute left-6 top-0 bottom-0 w-0.5" style={{ backgroundColor: 'var(--gray-200)' }}></div>

                  <div className="space-y-6">
                    {/* Event 1 - Ride Created */}
                    <div className="relative flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                        style={{ backgroundColor: 'var(--blue-600)' }}
                      >
                        <Calendar className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex-1 pt-2">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-bold underline" style={{ color: 'var(--heading)' }}>Ride Created by System</h4>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full border border-white shadow-sm"
                              style={{ backgroundColor: '#10b981' }}
                            ></div>
                            <span
                              className="px-3 py-1 text-sm rounded-full font-medium"
                              style={{
                                backgroundColor: 'var(--blue-100)',
                                color: 'var(--blue-600)'
                              }}
                            >
                              Created
                            </span>
                          </div>
                        </div>
                        <div className="text-sm" style={{ color: 'var(--muted-text)' }}>
                          <p>April 16, 2025, 7:00 AM</p>
                          <p className="mt-1">System</p>
                        </div>
                      </div>
                    </div>

                    {/* Event 2 - Driver Assigned */}
                    <div className="relative flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                        style={{ backgroundColor: 'var(--blue-600)' }}
                      >
                        <User className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex-1 pt-2">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-bold underline" style={{ color: 'var(--heading)' }}>Driver Assigned by Mark</h4>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full border border-white shadow-sm"
                              style={{ backgroundColor: '#10b981' }}
                            ></div>
                            <span
                              className="px-3 py-1 text-sm rounded-full font-medium"
                              style={{
                                backgroundColor: 'var(--blue-100)',
                                color: 'var(--blue-600)'
                              }}
                            >
                              Assigned
                            </span>
                          </div>
                        </div>
                        <div className="text-sm" style={{ color: 'var(--muted-text)' }}>
                          <p>April 16, 2025, 7:05 AM</p>
                          <p className="mt-1">Mark – admin</p>
                        </div>
                      </div>
                    </div>

                    {/* Event 3 - Ride Started */}
                    <div className="relative flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                        style={{ backgroundColor: 'var(--green-600)' }}
                      >
                        <Car className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex-1 pt-2">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-bold underline" style={{ color: 'var(--heading)' }}>Ride Started by {selectedDriver.name}</h4>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full border border-white shadow-sm"
                              style={{ backgroundColor: '#10b981' }}
                            ></div>
                            <span
                              className="px-3 py-1 text-sm rounded-full font-medium"
                              style={{
                                backgroundColor: 'var(--green-100)',
                                color: 'var(--green-600)'
                              }}
                            >
                              Started
                            </span>
                          </div>
                        </div>
                        <div className="text-sm" style={{ color: 'var(--muted-text)' }}>
                          <p>April 16, 2025, 7:15 AM</p>
                          <p className="mt-1">{selectedDriver.name} – driver</p>
                        </div>
                      </div>
                    </div>

                    {/* Event 4 - First Stop Completed */}
                    <div className="relative flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                        style={{ backgroundColor: 'var(--green-600)' }}
                      >
                        <MapPin className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex-1 pt-2">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-bold underline" style={{ color: 'var(--heading)' }}>Pickup Completed by {selectedDriver.name}</h4>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full border border-white shadow-sm"
                              style={{ backgroundColor: '#10b981' }}
                            ></div>
                            <span
                              className="px-3 py-1 text-sm rounded-full font-medium"
                              style={{
                                backgroundColor: 'var(--green-100)',
                                color: 'var(--green-600)'
                              }}
                            >
                              Completed
                            </span>
                          </div>
                        </div>
                        <div className="text-sm" style={{ color: 'var(--muted-text)' }}>
                          <p>April 16, 2025, 7:15 AM</p>
                          <p className="mt-1">{selectedDriver.name} – driver</p>
                          <p className="mt-1">1 student picked up</p>
                        </div>
                      </div>
                    </div>

                    {/* Event 5 - Second Stop Completed */}
                    <div className="relative flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                        style={{ backgroundColor: 'var(--green-600)' }}
                      >
                        <MapPin className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex-1 pt-2">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-bold underline" style={{ color: 'var(--heading)' }}>Dropoff Completed by {selectedDriver.name}</h4>
                          <span
                            className="px-3 py-1 text-sm rounded-full font-medium"
                            style={{
                              backgroundColor: 'var(--green-100)',
                              color: 'var(--green-600)'
                            }}
                          >
                            Completed
                          </span>
                        </div>
                        <div className="text-sm" style={{ color: 'var(--muted-text)' }}>
                          <p>April 16, 2025, 7:45 AM</p>
                          <p className="mt-1">{selectedDriver.name} – driver</p>
                          <p className="mt-1">1 student dropped off at school</p>
                        </div>
                      </div>
                    </div>

                    {/* Event 6 - Ride Completed */}
                    <div className="relative flex items-start gap-4">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                        style={{ backgroundColor: 'var(--green-600)' }}
                      >
                        <Car className="w-6 h-6 text-white" />
                      </div>

                      <div className="flex-1 pt-2">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="text-lg font-bold underline" style={{ color: 'var(--heading)' }}>Ride Completed by {selectedDriver.name}</h4>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full border border-white shadow-sm"
                              style={{ backgroundColor: '#10b981' }}
                            ></div>
                            <span
                              className="px-3 py-1 text-sm rounded-full font-medium"
                              style={{
                                backgroundColor: 'var(--green-100)',
                                color: 'var(--green-600)'
                              }}
                            >
                              Completed
                            </span>
                          </div>
                        </div>
                        <div className="text-sm" style={{ color: 'var(--muted-text)' }}>
                          <p>April 16, 2025, 7:45 AM</p>
                          <p className="mt-1">{selectedDriver.name} – driver</p>
                          <p className="mt-1">All students dropped off at school</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
              </div>
            </div>
          </div>

          {/* Right Side - Map and Controls */}
          <div className="col-span-5 min-w-0 h-full">
            <div className="h-full">
              {/* Map Container */}
              <div className="h-full bg-gray-200 overflow-hidden">
                <RideMap
                  pickup={rideData.route.pickup}
                  dropoff={rideData.route.dropoff}
                  status={rideStatus}
                  className="w-full h-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-[var(--border)] flex justify-center space-x-4">
          <Button variant="secondary" className="flex items-center gap-2 px-4 py-2 border border-[var(--border)] rounded-md hover:bg-[var(--surface-muted)]">
            <Map size={18} />
            <span>Route Map</span>
          </Button>
          <Button variant="secondary" className="flex items-center gap-2 px-4 py-2 border border-[var(--border)] rounded-md hover:bg-[var(--surface-muted)]">
            <Camera size={18} />
            <span>Stop Photos</span>
          </Button>
          <Button variant="secondary" className="flex items-center gap-2 px-4 py-2 border border-[var(--border)] rounded-md hover:bg-[var(--surface-muted)]">
            <Eye size={18} />
            <span>Street View</span>
          </Button>
        </div>
      </div>
      
      {/* Modal Components */}
      <ForceStartModal
        isOpen={showForceStartModal}
        onClose={() => setShowForceStartModal(false)}
        rideId={rideId}
        onConfirm={(data) => {
          console.log('Force Start confirmed:', data);
          setShowForceStartModal(false);
          // Handle force start logic here
        }}
      />
      
      <ForceCompleteModal
        isOpen={showForceCompleteModal}
        onClose={() => setShowForceCompleteModal(false)}
        rideId={rideId}
        onConfirm={(data) => {
          console.log('Force Complete confirmed:', data);
          setShowForceCompleteModal(false);
          // Handle force complete logic here
        }}
      />
      
      <ForceNoShowModal
        isOpen={showForceNoShowModal}
        onClose={() => setShowForceNoShowModal(false)}
        rideId={rideId}
        onConfirm={(data) => {
          console.log('Force No-Show confirmed:', data);
          setShowForceNoShowModal(false);
          // Handle force no-show logic here
        }}
      />
      
      <DuplicateModal
        isOpen={showDuplicateModal}
        onClose={() => setShowDuplicateModal(false)}
        rideId={rideId}
        onConfirm={(data) => {
          console.log('Duplicate confirmed:', data);
          setShowDuplicateModal(false);
          // Handle duplicate logic here
        }}
      />
      
      <ManageTripModal
        isOpen={showManageTripModal}
        onClose={() => setShowManageTripModal(false)}
        rideId={rideId}
        onConfirm={(data) => {
          console.log('Manage Trip confirmed:', data);
          setShowManageTripModal(false);
          // Handle manage trip logic here
        }}
      />
      
      <EditTripModal
        isOpen={showEditTripModal}
        onClose={() => setShowEditTripModal(false)}
        rideId={rideId}
        onConfirm={(data) => {
          console.log('Edit Trip confirmed:', data);
          setShowEditTripModal(false);
          // Handle edit trip logic here
        }}
      />
      
      <DriverDetailModal
        isOpen={showDriverDetailModal}
        onClose={() => setShowDriverDetailModal(false)}
        driverId={rideData.driver.id}
        onBack={() => setShowDriverDetailModal(false)}
      />
    </div>
  );
}
