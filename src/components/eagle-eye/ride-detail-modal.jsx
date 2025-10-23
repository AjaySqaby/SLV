"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Tabs from "@/components/ui/Tabs";
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
} from "lucide-react";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge";
import DualTimeDisplay from "@/components/ui/DualTimeDisplay";
import { FaRoute } from "react-icons/fa";
export default function RideDetailModal({
  isOpen,
  onClose,
  rideId = "SLV1001-75185",
  rideStatus = "In Progress",
}) {
  const [activeTab, setActiveTab] = useState(0);

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
    { id: 0, label: "Overview" },
    { id: 1, label: "Live Tracking" },
    { id: 2, label: "Stops" },
    { id: 3, label: "Students" },
    { id: 4, label: "Timeline" },
  ];
  const tabPanelClass = "pt-6";
  const statusType = rideStatus === 'On Time' ? 'active' : (rideStatus === 'Delayed' ? 'warning' : (rideStatus === 'Rejected' ? 'inactive' : 'active'));

  if (!isOpen) return null;

  // Mock data (your original content)
  const rideData = {
    id: rideId,
    date: "05/01/2025, Thursday",
    route: "Route SLV1001",
    status: "In Progress",
    driver: {
      name: "Michael Davis",
      id: "DR-1001",
      phone: "(555) 123-4567",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    vehicle: {
      name: "Toyota Sienna",
      licensePlate: "ABC-1234",
      capacity: "8 passengers",
    },
    ride: {
      status: "On Time",
      pickupTime: "08:30 AM",
      estimatedArrival: "09:00 AM",
      distance: "12.5 miles",
      duration: "35 minutes",
    },
    route: {
      pickup: {
        address: "1221 Broadway, Oakland, CA 94612",
      },
      dropoff: {
        address: "388 9th St, Oakland, CA 94607",
      },
    },
    students: [
      {
        name: "John Smith",
        grade: 4,
        id: "ST-1234",
        status: "Picked up",
        avatar: "/placeholder.svg?height=60&width=60",
      },
      {
        name: "Emma Johnson",
        grade: 2,
        id: "ST-2345",
        status: "Picked up",
        avatar: "/placeholder.svg?height=60&width=60",
      },
      {
        name: "Michael Lee",
        grade: 3,
        id: "ST-3456",
        status: "Waiting",
        avatar: "/placeholder.svg?height=60&width=60",
      },
    ],
    stops: [
      {
        type: "Pickup Stop",
        status: "Completed",
        address: "1221 Broadway, Oakland, CA 94612",
        time: "12:15 PM",
        students: ["John Smith", "Emma Johnson"],
      },
      {
        type: "Stop 2",
        status: "In Progress",
        address: "456 Oak St, San Francisco CA",
        eta: "12:45 PM",
        students: ["Michael Lee"],
      },
      {
        type: "Dropoff - School",
        status: "Upcoming",
        address: "388 9th St, Oakland, CA 94607",
        eta: "1:15 PM",
        students: [],
      },
    ],
    events: [
      {
        type: "Speeding Event",
        time: "7:32 AM",
        details: "Speed: 45mph in 35mph zone",
        location: "Peachtree St NE, Atlanta, GA",
        severity: "high",
      },
      {
        type: "Hard Braking",
        time: "7:41 AM",
        details: "Sudden deceleration detected",
        severity: "medium",
      },
    ],
    history: [
      {
        event: "Ride Created by System",
        time: "April 16, 2025, 8:00 AM",
        icon: "calendar",
      },
      {
        event: "Driver Assigned by Mark",
        time: "April 16, 2025, 8:15 AM",
        details: "Driver Michael Davis was assigned to this ride",
        icon: "user",
      },
      {
        event: "Ride Started by Michael",
        time: "April 16, 2025, 12:00 PM",
        icon: "car",
      },
      {
        event: "First Stop Completed by Michael",
        time: "April 16, 2025, 12:15 PM",
        details: "2 students picked up",
        icon: "map-pin",
      },
      {
        event: "Second Stop Completed by Michael",
        time: "April 16, 2025, 12:30 PM",
        details: "1 student picked up",
        icon: "map-pin",
      },
      {
        event: "Ride Completed by Michael",
        time: "April 16, 2025, 1:15 PM",
        details: "All students dropped off at school",
        icon: "car",
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
              <div className="flex items-center gap-3">
                <StatusBadge status={rideStatus} fontSize="text-lg" />
                <div className="flex items-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full border border-white shadow-sm"
                    style={{
                      backgroundColor: getStatusCircleColor(rideStatus) === 'bg-green-500' ? '#10b981' :
                                      getStatusCircleColor(rideStatus) === 'bg-red-500' ? '#ef4444' :
                                      getStatusCircleColor(rideStatus) === 'bg-orange-500' ? '#f97316' :
                                      getStatusCircleColor(rideStatus) === 'bg-black' ? '#000000' :
                                      '#6b7280'
                    }}
                  ></div>
                  <span className="text-sm font-medium text-gray-700">
                    ETA: {rideData.ride.estimatedArrival}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          <Tabs tabs={tabList} activeTab={activeTab} onChange={setActiveTab} />
        </div>

        <div className="px-6 pb-6 flex-1 overflow-y-auto">
          <div className={tabPanelClass}>
            {activeTab === 0 && (
              <div className="grid grid-cols-2 gap-8">
                <div className="bg-[var(--surface-bg)] p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-[var(--gray-200)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--blue-600)' }}>
                      <User className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">Driver Information</h3>
                  </div>
                  <div className="flex items-center mb-4">
                    {/* Map Pin Style Profile Container */}
                    <div className="relative mr-4">
                      {/* Main Pin Container */}
                      <div className="bg-white rounded-lg p-3 shadow-lg border border-[var(--gray-200)] relative">
                        {/* Profile Picture */}
                        <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden bg-[var(--gray-100)] flex items-center justify-center">
                          <img
                            src={rideData.driver.avatar || "/picture.jpg"}
                            alt={rideData.driver.name}
                            className="w-full h-full object-cover"
                            onError={(e)=>{ e.currentTarget.style.display='none'; e.currentTarget.parentElement.querySelector('[data-fallback]')?.classList.remove('hidden'); }}
                          />
                          <div data-fallback className="hidden w-full h-full flex items-center justify-center text-lg font-bold text-[var(--primary)]">
                            {rideData.driver.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                          </div>
                        </div>
                      </div>
                      {/* Pin Pointer */}
                      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-white"></div>
                      {/* Shadow */}
                      <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-300 opacity-50"></div>
                    </div>
                    <div className="flex-1">
                      <div className="font-semibold text-lg text-[var(--primary-black)]">{rideData.driver.name}</div>
                      <div className="text-sm text-[var(--muted-text)]">{rideData.driver.phone}</div>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="text-yellow-500 text-base">★</span>
                        <span className="text-sm font-medium text-[var(--primary-black)]">4.9</span>
                        <span className="text-xs text-[var(--muted-text)]">/ 5</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 ml-4">
                      <Button className="flex items-center gap-1 bg-[var(--gray-100)] text-[var(--primary-black)] px-3 py-1 rounded font-medium text-sm border border-[var(--gray-200)]" variant="secondary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="mr-1">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                          <polyline points="17 8 12 3 7 8" />
                          <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        Text
                      </Button>
                      <Button className="flex items-center gap-1 bg-[var(--blue)] text-white px-3 py-1 rounded font-medium text-sm" variant="primary">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="mr-1">
                          <path d="M22 16.92V19a2 2 0 0 1-2.18 2A19.72 19.72 0 0 1 3 5.18 2 2 0 0 1 5 3h2.09a2 2 0 0 1 2 1.72c.13 1.05.37 2.07.72 3.06a2 2 0 0 1-.45 2.11l-.27.27a16 16 0 0 0 6.29 6.29l.27-.27a2 2 0 0 1 2.11-.45c.99.35 2.01.59 3.06.72A2 2 0 0 1 22 16.92z" />
                        </svg>
                        Call
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-[var(--surface-bg)] p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-[var(--gray-200)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--green-600)' }}>
                      <Car className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">Vehicle Information</h3>
                  </div>
                  <div>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-[var(--blue-100)] flex items-center justify-center mr-3">
                          <Car className="w-5 h-5 text-[var(--blue-600)]" />
                        </div>
                        <div className="flex-1 flex justify-between">
                          <span className="text-sm text-[var(--muted-text)]">Vehicle:</span>
                          <span className="text-sm font-medium">{rideData.vehicle.name}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-[var(--green-100)] flex items-center justify-center mr-3">
                          <MapPin className="w-5 h-5 text-[var(--green-600)]" />
                        </div>
                        <div className="flex-1 flex justify-between">
                          <span className="text-sm text-[var(--muted-text)]">License Plate:</span>
                          <span className="text-sm font-medium">{rideData.vehicle.licensePlate}</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-[var(--purple-100)] flex items-center justify-center mr-3">
                          <User className="w-5 h-5 text-[var(--purple-600)]" />
                        </div>
                        <div className="flex-1 flex justify-between">
                          <span className="text-sm text-[var(--muted-text)]">Capacity:</span>
                          <span className="text-sm font-medium">{rideData.vehicle.capacity}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[var(--surface-bg)] p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-[var(--gray-200)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--purple-600)' }}>
                      <Clock className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">Ride Information</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[var(--green-100)] flex items-center justify-center mr-3">
                        <Clock className="w-5 h-5 text-[var(--green-600)]" />
                      </div>
                      <div className="flex-1 flex justify-between">
                        <span className="text-sm text-[var(--muted-text)]">Status:</span>
                        <span className="text-sm font-medium text-[var(--success)]">{rideData.ride.status}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[var(--blue-100)] flex items-center justify-center mr-3">
                        <Clock className="w-5 h-5 text-[var(--blue-600)]" />
                      </div>
                      <div className="flex-1 flex justify-between">
                        <span className="text-sm text-[var(--muted-text)]">Pickup Time:</span>
                        <div className="text-sm font-medium">
                          <DualTimeDisplay rideTime={rideData.ride.pickupTime} rideTimezone="America/Los_Angeles" showLabels={false} />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[var(--purple-100)] flex items-center justify-center mr-3">
                        <Clock className="w-5 h-5 text-[var(--purple-600)]" />
                      </div>
                      <div className="flex-1 flex justify-between">
                        <span className="text-sm text-[var(--muted-text)]">Estimated Arrival:</span>
                        <div className="text-sm font-medium">
                          <DualTimeDisplay rideTime={rideData.ride.estimatedArrival} rideTimezone="America/Los_Angeles" showLabels={false} />
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[var(--orange-100)] flex items-center justify-center mr-3">
                        <MapPin className="w-5 h-5 text-[var(--orange-600)]" />
                      </div>
                      <div className="flex-1 flex justify-between">
                        <span className="text-sm text-[var(--muted-text)]">Distance:</span>
                        <span className="text-sm font-medium">{rideData.ride.distance}</span>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-[var(--pink-100)] flex items-center justify-center mr-3">
                        <Clock className="w-5 h-5 text-[var(--pink-600)]" />
                      </div>
                      <div className="flex-1 flex justify-between">
                        <span className="text-sm text-[var(--muted-text)]">Duration:</span>
                        <span className="text-sm font-medium">{rideData.ride.duration}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[var(--surface-bg)] p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-[var(--gray-200)]">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--blue-600)' }}>
                    <FaRoute  className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">Route Information</h3>
                  </div>
                  <div>
                    <div className="mb-4">
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-[var(--success)] flex items-center justify-center text-[var(--on-success)] mr-3 mt-1">
                          <MapPin size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Pickup</p>
                          <p className="text-sm text-[var(--muted-text)]">{rideData.route.pickup.address}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-start">
                        <div className="w-8 h-8 rounded-full bg-[var(--danger)] flex items-center justify-center text-[var(--on-danger)] mr-3 mt-1">
                          <MapPin size={16} />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Dropoff</p>
                          <p className="text-sm text-[var(--muted-text)]">{rideData.route.dropoff.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[var(--surface-bg)] p-6 rounded-lg col-span-2 shadow-sm hover:shadow-md transition-shadow duration-200 border border-[var(--gray-200)] mt-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--blue-600)' }}>
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">Students</h3>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {rideData.students.map((student, index) => {
                      const iconBackgroundColors = [
                        'bg-[var(--blue-100)]',
                        'bg-[var(--green-100)]', 
                        'bg-[var(--purple-100)]'
                      ];
                      const iconColors = [
                        'text-[var(--blue-600)]',
                        'text-[var(--green-600)]',
                        'text-[var(--purple-600)]'
                      ];
                      return (
                        <div key={index} className="flex items-center">
                          {/* Map Pin Style Student Container */}
                          <div className="relative mr-3">
                            {/* Main Pin Container */}
                            <div className="bg-white rounded-lg p-2 shadow-lg border border-[var(--gray-200)] relative">
                              {/* Student Icon */}
                              <div className={`w-8 h-8 rounded-full ${iconBackgroundColors[index]} flex items-center justify-center`}>
                                <GraduationCap size={16} className={iconColors[index]} />
                              </div>
                            </div>
                            {/* Pin Pointer */}
                            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent border-t-white"></div>
                            {/* Shadow */}
                            <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent border-t-gray-300 opacity-50"></div>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{student.name}</p>
                            <p className="text-xs text-[var(--muted-text)]">(Grade {student.grade}) • {student.id}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 1 && (
              <div className={tabPanelClass}>
                <div className="bg-[var(--surface-muted)] rounded-lg overflow-hidden h-96 mb-6">
                  <RideMap
                    embed
                    className="h-96"
                    pickup={{ coords: { lat: 33.7489, lng: -84.3880 } }}
                    dropoff={{ coords: { lat: 33.7740, lng: -84.3510 } }}
                    status="In-progress"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <MapPin size={18} className="mr-2" />
                    Route Events
                  </h3>
                  <div className="space-y-4">
                    {rideData.events.map((event, index) => (
                      <div
                        key={index}
                        className={`p-4 rounded-lg ${
                          event.severity === "high"
                            ? "bg-[var(--danger-bg)] border border-[var(--danger-bg)]"
                            : "bg-[var(--warning-bg)] border border-[var(--warning-bg)]"
                        }`}
                      >
                        <div className="flex items-start">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                              event.severity === "high"
                                ? "bg-[var(--danger-bg)] text-[var(--danger)]"
                                : "bg-[var(--warning-bg)] text-[var(--warning)]"
                            }`}
                          >
                            {event.severity === "high" ? (
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                                <line x1="12" y1="9" x2="12" y2="13"></line>
                                <line x1="12" y1="17" x2="12.01" y2="17"></line>
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10"></circle>
                                <line x1="12" y1="8" x2="12" y2="12"></line>
                                <line x1="12" y1="16" x2="12.01" y2="16"></line>
                              </svg>
                            )}
                          </div>
                          <div>
                            <h4 className={`font-medium ${event.severity === "high" ? "text-[var(--danger-dark)]" : "text-[var(--warning-dark)]"}`}>{event.type}</h4>
                            <p className={`text-sm ${event.severity === "high" ? "text-[var(--danger)]" : "text-[var(--warning)]"}`}>{event.time} - {event.details}</p>
                            {event.location && (
                              <p className={`text-sm ${event.severity === "high" ? "text-[var(--danger)]" : "text-[var(--warning)]"}`}>Location: {event.location}</p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 2 && (
              <div className={"space-y-6 "+tabPanelClass}>
                {rideData.stops.map((stop, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-lg ${
                      stop.status === "Completed"
                        ? "bg-[var(--success-bg)] border border-[var(--success-bg)]"
                        : stop.status === "In Progress"
                        ? "bg-[var(--primary-bg)] border border-[var(--primary-bg)]"
                        : "bg-[var(--surface-bg)] border border-[var(--surface-muted)]"
                    }`}
                  >
                    <div className="flex items-start">
                      <div className="mr-4">
                        <Clock size={24} className="text-[var(--muted-text)]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-lg">{stop.type} {stop.status === "Completed" && "(Completed)"}</h3>
                            <p className="text-[var(--muted-text)]">{stop.address}</p>
                          </div>
                          <div className="text-right">
                            {stop.time ? (
                              <p className="text-[var(--success)] font-medium">{stop.time}</p>
                            ) : (
                              <p className="text-[var(--muted-text)]">ETA: {stop.eta}</p>
                            )}
                          </div>
                        </div>
                        {stop.students.length > 0 && (
                          <div className="mt-4">
                            {stop.students.map((student, idx) => (
                              <div key={idx} className="flex justify-between items-center mb-2">
                                <p>{student}</p>
                                {stop.status === "Completed" ? (
                                  <StatusBadge status="Picked up" type="active" />
                                ) : (
                                  <StatusBadge status="Waiting" type="default" />
                                )}
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 3 && (
              <div className={"space-y-6 "+tabPanelClass}>
                {rideData.students.map((student, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border-b border-[var(--surface-muted)]">
                    <div className="flex items-center">
                      {/* Map Pin Style Student Container */}
                      <div className="relative mr-4">
                        {/* Main Pin Container */}
                        <div className="bg-white rounded-lg p-2 shadow-lg border border-[var(--gray-200)] relative">
                          {/* Student Profile Picture */}
                          <div className="w-10 h-10 rounded-full border-2 border-white overflow-hidden bg-[var(--gray-100)] flex items-center justify-center">
                            <img src={student.avatar || "/picture.jpg"} alt={student.name} className="w-full h-full object-cover" onError={(e)=>{ e.currentTarget.style.display='none'; e.currentTarget.parentElement.querySelector('[data-fallback]')?.classList.remove('hidden'); }} />
                            <div data-fallback className="hidden w-full h-full flex items-center justify-center text-sm font-semibold text-[var(--heading)]">
                              {student.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                            </div>
                          </div>
                        </div>
                        {/* Pin Pointer */}
                        <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent border-t-white"></div>
                        {/* Shadow */}
                        <div className="absolute -bottom-0.5 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-3 border-r-3 border-t-3 border-transparent border-t-gray-300 opacity-50"></div>
                      </div>
                      <div>
                        <h4 className="font-medium">{student.name}</h4>
                        <p className="text-sm text-[var(--muted-text)]">Grade {student.grade} • ID: {student.id}</p>
                      </div>
                    </div>
                    <div>
                      <StatusBadge status={student.status} type={student.status === "Picked up" ? "active" : "default"} />
                    </div>
                  </div>
                ))}
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
                          <p>April 16, 2025, 8:00 AM</p>
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
                          <p>April 16, 2025, 8:15 AM</p>
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
                          <h4 className="text-lg font-bold underline" style={{ color: 'var(--heading)' }}>Ride Started by Michael</h4>
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
                          <p>April 16, 2025, 12:00 PM</p>
                          <p className="mt-1">Michael – driver</p>
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
                          <h4 className="text-lg font-bold underline" style={{ color: 'var(--heading)' }}>First Stop Completed by Michael</h4>
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
                          <p>April 16, 2025, 12:15 PM</p>
                          <p className="mt-1">Michael – driver</p>
                          <p className="mt-1">2 students picked up</p>
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
                          <h4 className="text-lg font-bold underline" style={{ color: 'var(--heading)' }}>Second Stop Completed by Michael</h4>
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
                          <p>April 16, 2025, 12:30 PM</p>
                          <p className="mt-1">Michael – driver</p>
                          <p className="mt-1">1 student picked up</p>
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
                          <h4 className="text-lg font-bold underline" style={{ color: 'var(--heading)' }}>Ride Completed by Michael</h4>
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
                          <p>April 16, 2025, 1:15 PM</p>
                          <p className="mt-1">Michael – driver</p>
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
    </div>
  );
}
