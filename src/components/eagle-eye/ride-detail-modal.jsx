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
} from "lucide-react";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge";
import DualTimeDisplay from "@/components/ui/DualTimeDisplay";

export default function RideDetailModal({
  isOpen,
  onClose,
  rideId = "SLV1001-75185",
}) {
  const [activeTab, setActiveTab] = useState(0);
  const RideMap = dynamic(() => import("@/components/rides/RideMap"), { ssr: false });
  const tabList = [
    { id: 0, label: "Overview" },
    { id: 1, label: "Live Tracking" },
    { id: 2, label: "Stops" },
    { id: 3, label: "Students" },
    { id: 4, label: "Timeline" },
  ];
  const tabPanelClass = "pt-6 min-h-[28rem]";

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
        event: "Ride Created",
        time: "April 16, 2025, 8:00 AM",
        icon: "calendar",
      },
      {
        event: "Driver Assigned",
        time: "April 16, 2025, 8:15 AM",
        details: "Driver Michael Davis was assigned to this ride",
        icon: "user",
      },
      {
        event: "Ride Started",
        time: "April 16, 2025, 12:00 PM",
        icon: "car",
      },
      {
        event: "First Stop Completed",
        time: "April 16, 2025, 12:15 PM",
        details: "2 students picked up",
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
        className="bg-white rounded-2xl !max-w-[82rem] mx-4 w-full max-h-[calc(100vh-3rem)] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xl font-semibold">#{rideData.id}</h2>
            <button onClick={onClose} className="text-[var(--muted-text)] hover:opacity-80">
              <X size={18} />
            </button>
          </div>
          <div className="text-sm text-[var(--muted-text)] mb-2">
            {rideData.date} • Route: {rideData.route?.pickup?.address} → {rideData.route?.dropoff?.address}
          </div>
          <div className="flex items-center gap-4 mb-4">
            <StatusBadge status={rideData.status} type="active" />
          </div>

          <Tabs tabs={tabList} activeTab={activeTab} onChange={setActiveTab} />

          <div className={tabPanelClass}>
            {activeTab === 0 && (
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-[var(--surface-bg)] p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Driver Information</h3>
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 rounded-full mr-4 border border-[var(--gray-200)] overflow-hidden bg-[var(--gray-100)] flex items-center justify-center">
                      <img
                        src={rideData.driver.avatar || "/picture.jpg"}
                        alt={rideData.driver.name}
                        className="w-full h-full object-cover"
                        onError={(e)=>{ e.currentTarget.style.display='none'; e.currentTarget.parentElement.querySelector('[data-fallback]')?.classList.remove('hidden'); }}
                      />
                      <div data-fallback className="hidden w-full h-full flex items-center justify-center text-2xl font-bold text-[var(--primary)]">
                        {rideData.driver.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                      </div>
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

                <div className="bg-[var(--surface-bg)] p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Vehicle Information</h3>
                  <div>
                    <div className="grid grid-cols-2 gap-2">
                      <p className="text-sm text-[var(--muted-text)]">Vehicle:</p>
                      <p className="text-sm font-medium">{rideData.vehicle.name}</p>
                      <p className="text-sm text-[var(--muted-text)]">License Plate:</p>
                      <p className="text-sm font-medium">{rideData.vehicle.licensePlate}</p>
                      <p className="text-sm text-[var(--muted-text)]">Capacity:</p>
                      <p className="text-sm font-medium">{rideData.vehicle.capacity}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-[var(--surface-bg)] p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Ride Information</h3>
                  <div className="grid grid-cols-2 gap-2">
                    <p className="text-sm text-[var(--muted-text)]">Status:</p>
                    <p className="text-sm font-medium text-[var(--success)]">{rideData.ride.status}</p>
                    <p className="text-sm text-[var(--muted-text)]">Pickup Time:</p>
                    <div className="text-sm font-medium">
                      <DualTimeDisplay rideTime={rideData.ride.pickupTime} rideTimezone="America/Los_Angeles" showLabels={false} />
                    </div>
                    <p className="text-sm text-[var(--muted-text)]">Estimated Arrival:</p>
                    <div className="text-sm font-medium">
                      <DualTimeDisplay rideTime={rideData.ride.estimatedArrival} rideTimezone="America/Los_Angeles" showLabels={false} />
                    </div>
                    <p className="text-sm text-[var(--muted-text)]">Distance:</p>
                    <p className="text-sm font-medium">{rideData.ride.distance}</p>
                    <p className="text-sm text-[var(--muted-text)]">Duration:</p>
                    <p className="text-sm font-medium">{rideData.ride.duration}</p>
                  </div>
                </div>

                <div className="bg-[var(--surface-bg)] p-6 rounded-lg">
                  <h3 className="text-lg font-semibold mb-4">Route Information</h3>
                  <div>
                    <div className="mb-4">
                      <div className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-[var(--success)] flex items-center justify-center text-[var(--on-success)] mr-2 mt-1">
                          <MapPin size={14} />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Pickup</p>
                          <p className="text-sm text-[var(--muted-text)]">{rideData.route.pickup.address}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-start">
                        <div className="w-6 h-6 rounded-full bg-[var(--danger)] flex items-center justify-center text-[var(--on-danger)] mr-2 mt-1">
                          <MapPin size={14} />
                        </div>
                        <div>
                          <p className="text-sm font-medium">Dropoff</p>
                          <p className="text-sm text-[var(--muted-text)]">{rideData.route.dropoff.address}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[var(--surface-bg)] p-6 rounded-lg col-span-2">
                  <h3 className="text-lg font-semibold mb-4">Students</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {rideData.students.map((student, index) => (
                      <div key={index} className="flex items-center">
                        <User size={20} className="text-[var(--muted-text)] mr-2" />
                        <div>
                          <p className="text-sm font-medium">{student.name}</p>
                          <p className="text-xs text-[var(--muted-text)]">(Grade {student.grade}) • {student.id}</p>
                        </div>
                      </div>
                    ))}
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
                      <div className="w-12 h-12 rounded-full mr-4 overflow-hidden bg-[var(--gray-100)] flex items-center justify-center">
                        <img src={student.avatar || "/picture.jpg"} alt={student.name} className="w-full h-full object-cover" onError={(e)=>{ e.currentTarget.style.display='none'; e.currentTarget.parentElement.querySelector('[data-fallback]')?.classList.remove('hidden'); }} />
                        <div data-fallback className="hidden w-full h-full flex items-center justify-center text-sm font-semibold text-[var(--heading)]">
                          {student.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
                        </div>
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
              <div className={"space-y-6 "+tabPanelClass}>
                {rideData.history.map((item, index) => (
                  <div key={index} className="flex">
                    <div className="mr-4">
                      {item.icon === "calendar" && <Calendar size={24} className="text-[var(--primary)]" />}
                      {item.icon === "user" && <User size={24} className="text-[var(--primary)]" />}
                      {item.icon === "car" && <Car size={24} className="text-[var(--primary)]" />}
                      {item.icon === "map-pin" && <MapPin size={24} className="text-[var(--success)]" />}
                    </div>
                    <div className="flex-1 pb-6 border-l border-[var(--border)] pl-4">
                      <h3 className="font-medium">{item.event}</h3>
                      <p className="text-sm text-[var(--muted-text)]">{item.time}</p>
                      {item.details && <p className="text-sm text-[var(--muted-text)] mt-1">{item.details}</p>}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="p-4 border-t border-[var(--border)] flex justify-center space-x-4 mt-6">
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
    </div>
  );
}
