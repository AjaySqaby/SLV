"use client";

import { useState } from 'react'
import { ArrowLeft, Route, MapPin, Users, Car, ChevronDown, Hash, Building2, Clock, Navigation, UserCheck, Activity, Plus } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import StatusBadge from '@/components/ui/StatusBadge'
import Tabs from '@/components/ui/Tabs'
import Table from '@/components/ui/Table'

export default function RouteDetailContent({ routeId }) {
  const [activeTab, setActiveTab] = useState(0)

  // Mock data - replace with actual API call
  const routeData = {
    id: routeId,
    name: "North District Route",
    district: "Northside School District",
    duration: "45 min",
    stops: 5,
    students: 7,
    distance: "12.4 mi",
    status: "Active",
    routeStops: [
      {
        order: 1,
        stopId: "S-1",
        name: "Stop 1",
        address: "5325 Buford Hwy NE, Doraville, GA",
        time: "7:00 AM",
        students: 2,
        type: "Pickup"
      },
      {
        order: 2,
        stopId: "S-2",
        name: "Stop 2",
        address: "4820 Chamblee Dunwoody Rd, Dunwoody, GA",
        time: "7:15 AM",
        students: 3,
        type: "Pickup"
      },
      {
        order: 3,
        stopId: "S-3",
        name: "Stop 3",
        address: "3630 Peachtree Rd NE, Atlanta, GA",
        time: "7:25 AM",
        students: 2,
        type: "Pickup"
      },
      {
        order: 4,
        stopId: "S-4",
        name: "Cross Keys High School",
        address: "1626 N Druid Hills Rd NE, Atlanta, GA",
        time: "7:40 AM",
        students: 7,
        type: "Dropoff"
      }
    ],
    students: [
      {
        id: "S-001",
        name: "Emma Johnson",
        grade: "Grade 9",
        campus: "Cross Keys High School",
        pickupStop: "Stop 1",
        status: "Active"
      },
      {
        id: "S-002",
        name: "Michael Brown",
        grade: "Grade 10",
        campus: "Cross Keys High School",
        pickupStop: "Stop 2",
        status: "Active"
      },
      {
        id: "S-003",
        name: "Sophia Davis",
        grade: "Grade 9",
        campus: "Cross Keys High School",
        pickupStop: "Stop 2",
        status: "Active"
      },
      {
        id: "S-004",
        name: "Jacob Martinez",
        grade: "Grade 11",
        campus: "Cross Keys High School",
        pickupStop: "Stop 3",
        status: "Active"
      }
    ],
    scheduledRides: [
      {
        id: 1,
        scheduledDate: "04/02/2025",
        driver: "Yonathan Mekonnen",
        status: "In progress"
      },
      {
        id: 2,
        scheduledDate: "04/03/2025",
        driver: "Michael Johnson",
        status: "Assigned"
      }
    ]
  }

  const tabs = [
    { id: 0, label: "Stops", icon: MapPin, count: routeData.routeStops.length },
    { id: 1, label: "Students", icon: Users, count: routeData.students.length },
    { id: 2, label: "Scheduled Rides", icon: Car, count: routeData.scheduledRides.length }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <Card className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="w-5 h-5 text-[var(--blue-600)]" />
              <h2 className="text-lg font-semibold text-[var(--gray-900)]">Route Stops ({routeData.routeStops.length})</h2>
            </div>
            <p className="text-sm text-[var(--gray-600)] mb-6">Stops are listed in the order they will be visited</p>
            
            <div className="overflow-x-auto">
              <Table
                columns={["Order", "Stop ID", "Name", "Address", "Time", "Students", "Type"]}
                data={routeData.routeStops}
                renderRow={(stop, index) => (
                  <tr key={stop.stopId} className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)] transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-[var(--blue-600)] text-white rounded-full flex items-center justify-center text-sm font-medium shadow-sm">
                          {stop.order}
                        </div>
                        {index < routeData.routeStops.length - 1 && (
                          <div className="ml-4 w-px h-8 bg-[var(--gray-300)]"></div>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-[var(--gray-900)] font-medium">{stop.stopId}</td>
                    <td className="py-4 px-4 text-sm text-[var(--gray-900)]">{stop.name}</td>
                    <td className="py-4 px-4 text-sm text-[var(--gray-700)]">{stop.address}</td>
                    <td className="py-4 px-4 text-sm text-[var(--gray-900)] font-medium">{stop.time}</td>
                    <td className="py-4 px-4 text-sm text-[var(--gray-900)]">{stop.students}</td>
                    <td className="py-4 px-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        stop.type === 'Pickup' 
                          ? 'bg-[var(--blue-100)] text-[var(--blue-700)]' 
                          : 'bg-[var(--green-100)] text-[var(--green-700)]'
                      }`}>
                        {stop.type}
                      </span>
                    </td>
                  </tr>
                )}
              />
            </div>
          </Card>
        );
      
      case 1:
        return (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-[var(--gray-900)]">Students on Route ({routeData.students.length})</h2>
            </div>
            
            <div className="relative">
              {/* Thick red vertical timeline */}
              <div className="absolute left-6 top-0 bottom-0 w-1 bg-red-500"></div>
              
              <div className="space-y-8">
                {[1, 2, 3].map((stopNumber, index) => {
                  const studentsInStop = routeData.students.filter(student => student.pickupStop === `Stop ${stopNumber}`);
                  if (studentsInStop.length === 0) return null;
                  
                  return (
                    <div key={stopNumber} className="relative">
                      {/* Stop header with blue circular icon on red line */}
                      <div className="flex items-center gap-4 mb-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-[var(--blue-600)] rounded-full flex items-center justify-center shadow-lg border-4 border-white relative z-10">
                            <MapPin className="w-6 h-6 text-white" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-[var(--gray-900)]">Stop {stopNumber}</h3>
                          <p className="text-sm text-[var(--gray-500)]">{studentsInStop.length} student{studentsInStop.length !== 1 ? 's' : ''}</p>
                        </div>
                      </div>
                      
                      <div className="ml-16">
                        <div className="overflow-x-auto">
                          <Table
                            columns={["Student ID", "Name", "Grade", "Campus", "Pickup", "Status", "Actions"]}
                            data={studentsInStop}
                            renderRow={(student) => (
                              <tr key={student.id} className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)] transition-colors">
                                <td className="py-4 px-4 text-sm text-[var(--gray-900)] font-medium">{student.id}</td>
                                <td className="py-4 px-4 text-sm text-[var(--gray-900)]">{student.name}</td>
                                <td className="py-4 px-4 text-sm text-[var(--gray-900)]">{student.grade}</td>
                                <td className="py-4 px-4 text-sm text-[var(--gray-900)]">{student.campus}</td>
                                <td className="py-4 px-4 text-sm text-[var(--gray-900)]">
                                  <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-[var(--blue-600)] rounded-full"></div>
                                    {student.pickupStop}
                                  </div>
                                </td>
                                <td className="py-4 px-4">
                                  <StatusBadge status={student.status} type="active" />
                                </td>
                                <td className="py-4 px-4">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    className="text-[var(--blue-600)] border-[var(--blue-200)] hover:bg-[var(--blue-50)] hover:border-[var(--blue-300)]"
                                  >
                                    View
                                  </Button>
                                </td>
                              </tr>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </Card>
        );
      
      case 2:
        return (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold text-[var(--gray-900)]">Scheduled Rides ({routeData.scheduledRides.length})</h2>
              <Button
                variant="primary"
                size="sm"
                className="flex items-center gap-2 bg-[var(--blue-600)] hover:bg-[var(--blue-700)] text-white"
              >
                <Plus className="w-4 h-4" />
                Add New Ride
              </Button>
            </div>
            
            <div className="overflow-x-auto">
              <Table
                columns={["Ride ID", "Scheduled Date", "Driver", "Status", "Actions"]}
                data={routeData.scheduledRides}
                renderRow={(ride) => (
                  <tr key={ride.id} className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)] transition-colors">
                    <td className="py-4 px-4 text-sm text-[var(--gray-900)] font-medium">#{ride.id}</td>
                    <td className="py-4 px-4 text-sm text-[var(--gray-900)]">{ride.scheduledDate}</td>
                    <td className="py-4 px-4 text-sm text-[var(--gray-900)]">{ride.driver}</td>
                    <td className="py-4 px-4">
                      <StatusBadge 
                        status={ride.status} 
                        type={ride.status === "In progress" ? "active" : "warning"}
                      />
                    </td>
                    <td className="py-4 px-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-[var(--blue-600)] border-[var(--blue-200)] hover:bg-[var(--blue-50)] hover:border-[var(--blue-300)]"
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                )}
              />
            </div>
          </Card>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6 bg-[var(--gray-50)] min-h-screen p-6">
      {/* Back Navigation */}
      <div className="mb-4">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-2 text-[var(--blue-600)] hover:text-[var(--blue-700)]"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Button>
      </div>

      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Route className="w-6 h-6 text-[var(--blue-600)]" />
          <h1 className="text-2xl font-bold text-[var(--blue-600)]">{routeData.name}</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-2 bg-white border border-[var(--gray-300)] hover:bg-[var(--gray-50)] text-[var(--gray-700)]"
          >
            <span>Review Route</span>
          </Button>
          <Button
            variant="primary"
            size="sm"
            className="flex items-center space-x-2 bg-[var(--blue-600)] hover:bg-[var(--blue-700)] text-white"
          >
            <span>Schedule Ride</span>
          </Button>
        </div>
      </div>

      {/* Route Details Summary */}
      <Card className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-[var(--gray-900)] flex items-center gap-2">
              <Route className="w-5 h-5 text-[var(--blue-600)]" />
              Route Details
            </h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[var(--blue-100)] rounded-full flex items-center justify-center">
                  <Hash className="w-4 h-4 text-[var(--blue-600)]" />
                </div>
                <div>
                  <span className="text-sm text-[var(--gray-500)]">ID</span>
                  <p className="font-semibold text-[var(--gray-900)]">{routeData.id}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[var(--purple-100)] rounded-full flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-[var(--purple-600)]" />
                </div>
                <div>
                  <span className="text-sm text-[var(--gray-500)]">District</span>
                  <p className="font-semibold text-[var(--blue-600)] underline cursor-pointer hover:text-[var(--blue-700)] transition-colors">{routeData.district}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[var(--amber-100)] rounded-full flex items-center justify-center">
                  <Clock className="w-4 h-4 text-[var(--amber-600)]" />
                </div>
                <div>
                  <span className="text-sm text-[var(--gray-500)]">Duration</span>
                  <p className="font-semibold text-[var(--gray-900)]">{routeData.duration}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-[var(--gray-900)] flex items-center gap-2">
              <Activity className="w-5 h-5 text-[var(--green-600)]" />
              Summary
            </h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[var(--blue-100)] rounded-full flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-[var(--blue-600)]" />
                  </div>
                  <span className="text-sm text-[var(--gray-500)]">Stops</span>
                </div>
                <span className="font-semibold text-[var(--gray-900)]">{routeData.stops}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[var(--green-100)] rounded-full flex items-center justify-center">
                    <Users className="w-4 h-4 text-[var(--green-600)]" />
                  </div>
                  <span className="text-sm text-[var(--gray-500)]">Students</span>
                </div>
                <span className="font-semibold text-[var(--gray-900)]">{routeData.students.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[var(--orange-100)] rounded-full flex items-center justify-center">
                    <Navigation className="w-4 h-4 text-[var(--orange-600)]" />
                  </div>
                  <span className="text-sm text-[var(--gray-500)]">Distance</span>
                </div>
                <span className="font-semibold text-[var(--gray-900)]">{routeData.distance}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[var(--purple-100)] rounded-full flex items-center justify-center">
                    <UserCheck className="w-4 h-4 text-[var(--purple-600)]" />
                  </div>
                  <span className="text-sm text-[var(--gray-500)]">Status</span>
                </div>
                <StatusBadge status={routeData.status} />
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 bg-white rounded-lg p-1 shadow-sm border border-[var(--gray-200)]">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-[var(--blue-600)] text-white shadow-sm'
                : 'text-[var(--gray-600)] hover:text-[var(--gray-900)] hover:bg-[var(--gray-100)]'
            }`}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
            {tab.count > 0 && (
              <span className="ml-1 text-xs bg-white/20 px-1.5 py-0.5 rounded-full">
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {renderTabContent()}
    </div>
  )
}
