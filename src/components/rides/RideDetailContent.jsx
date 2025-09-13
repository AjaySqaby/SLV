"use client";

import { useState } from 'react'
import { ArrowLeft, Car, X, Copy, Check, UserX, Settings, Route, Clock, Users, FileText, Star, Eye, Play, MapPin, ChevronDown, User, Shield } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import StatusBadge from '@/components/ui/StatusBadge'
import ProgressBar from '@/components/ui/ProgressBar'
import RideMap from './RideMap'

export default function RideDetailContent({ rideId }) {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('stops')
  const [selectedDriver, setSelectedDriver] = useState(null)
  const [mapView, setMapView] = useState('route') // route, photos, streetview
  const [showAllDrivers, setShowAllDrivers] = useState(false)
  const [midTab, setMidTab] = useState('stops') // stops | students | timeline

  // Mock data - replace with actual API call
  const getRideData = (id) => {
    if (id === "1" || id === "1001") {
      // Completed ride
      return {
        id: id,
        status: "Completed",
        eta: "7:35 AM",
        driver: {
          name: "Yonathan Mekonnen",
          vehicle: "Chrysler Pacifica"
        },
        route: {
          id: "RT-30842",
          district: "86022-Z",
          duration: "45 minutes",
          distance: "11.2 mi"
        },
        passengers: {
          students: 3,
          stops: 4
        },
        pickup: {
          address: "5325 Buford Hwy NE, Doraville, GA",
          scheduledTime: "7:00 AM",
          actualTime: "6:45 AM",
          status: "Complete"
        },
        dropoff: {
          address: "Cross Keys High School",
          scheduledTime: "7:40 AM",
          actualTime: "7:35 AM",
          status: "Complete"
        },
        payment: {
          driverPayment: "$75.00",
          districtCharge: "$120.00"
        },
        stops: [
          { id: 1, address: "5325 Buford Hwy NE, Doraville, GA", time: "7:00 AM", status: "completed", students: 1 },
          { id: 2, address: "Northside Charter High School", time: "7:15 AM", status: "completed", students: 1 },
          { id: 3, address: "Westminster Schools", time: "7:30 AM", status: "completed", students: 1 },
          { id: 4, address: "Cross Keys High School", time: "7:35 AM", status: "completed", students: 0 }
        ],
        nearbyDrivers: [
          { id: 1, name: "John Smith", distance: "0.5 mi", eta: "5 min", rating: 4.8, vehicle: "Honda Pilot" },
          { id: 2, name: "Sarah Johnson", distance: "0.8 mi", eta: "7 min", rating: 4.9, vehicle: "Toyota Sienna" },
          { id: 3, name: "Mike Wilson", distance: "1.2 mi", eta: "10 min", rating: 4.7, vehicle: "Chrysler Pacifica" }
        ]
      }
    } else if (id === "2" || id === "1002") {
      // In Progress ride
      return {
        id: id,
        status: "In Progress",
        eta: "8:15 AM",
        driver: {
          name: "Yonathan Mekonnen",
          vehicle: "Chrysler Pacifica"
        },
        route: {
          id: "RT-30843",
          district: "86022-Z",
          duration: "35 minutes",
          distance: "8.5 mi"
        },
        passengers: {
          students: 5,
          stops: 3
        },
        pickup: {
          address: "1234 Peachtree St, Atlanta, GA",
          scheduledTime: "7:45 AM",
          actualTime: "Not started",
          status: "Pending"
        },
        dropoff: {
          address: "North Atlanta High School",
          scheduledTime: "8:20 AM",
          actualTime: "Not started",
          status: "Pending"
        },
        payment: {
          driverPayment: "$65.00",
          districtCharge: "$110.00"
        }
      }
    } else if (id === "D-1001") {
      // Upcoming ride
      return {
        id: id,
        status: "Upcoming",
        eta: "8:30 AM",
        driver: {
          name: "William Rodriguez",
          vehicle: "Toyota Sienna"
        },
        route: {
          id: "RT-30845",
          district: "86022-Z",
          duration: "30 minutes",
          distance: "2.8 mi"
        },
        passengers: {
          students: 1,
          stops: 2
        },
        pickup: {
          address: "Midtown High School",
          scheduledTime: "8:30 AM",
          actualTime: "Not started",
          status: "Pending"
        },
        dropoff: {
          address: "1500 Broadway, Oakland, CA 94612",
          scheduledTime: "9:00 AM",
          actualTime: "Not started",
          status: "Pending"
        },
        payment: {
          driverPayment: "$65.00",
          districtCharge: "$100.00"
        }
      }
    } else if (id === "D-1002") {
      // Delayed ride
      return {
        id: id,
        status: "Delayed",
        eta: "9:35 AM",
        driver: {
          name: "Maria Sanchez",
          vehicle: "Honda Odyssey"
        },
        route: {
          id: "RT-30846",
          district: "86022-Z",
          duration: "30 minutes",
          distance: "3.2 mi"
        },
        passengers: {
          students: 1,
          stops: 2
        },
        pickup: {
          address: "Buckhead Elementary",
          scheduledTime: "9:05 AM",
          actualTime: "9:05 AM",
          status: "Complete"
        },
        dropoff: {
          address: "145 Ralph McGill Blvd NE, Atlanta, GA 30308",
          scheduledTime: "9:35 AM",
          actualTime: "Running late",
          status: "Delayed"
        },
        payment: {
          driverPayment: "$65.00",
          districtCharge: "$110.00"
        }
      }
    } else {
      // Default ride data - make it dynamic based on common statuses
      const statuses = ["In Progress", "Upcoming", "Assigned", "Accepted"];
      const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
      
      return {
        id: id,
        status: randomStatus,
        eta: "7:35 AM",
        driver: {
          name: "Yonathan Mekonnen",
          vehicle: "Chrysler Pacifica"
        },
        route: {
          id: "RT-30842",
          district: "86022-Z",
          duration: "45 minutes",
          distance: "11.2 mi"
        },
        passengers: {
          students: 3,
          stops: 4
        },
        pickup: {
          address: "5325 Buford Hwy NE, Doraville, GA",
          scheduledTime: "7:00 AM",
          actualTime: "6:45 AM",
          status: "Complete"
        },
        dropoff: {
          address: "Cross Keys High School",
          scheduledTime: "7:40 AM",
          actualTime: "Not arrived yet",
          status: "Pending"
        },
        payment: {
          driverPayment: "$75.00",
          districtCharge: "$120.00"
        }
      }
    }
  }

  const rideData = getRideData(rideId)

  const handleDuplicateRide = () => {
    // Handle duplicate ride logic
    console.log('Duplicate ride')
  }

  const handleForceStart = () => {
    // Handle force start logic
    console.log('Force start')
  }

  const handleForceComplete = () => {
    // Handle force complete logic
    console.log('Force complete')
  }

  const handleForceNoShow = () => {
    // Handle force no show logic
    console.log('Force no show')
  }

  const handleManageTrip = () => {
    // Handle manage trip logic
    console.log('Manage trip')
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Back Navigation */}
      <div className="mb-4">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Button>
      </div>

      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Car className="w-6 h-6 text-[var(--blue-600)]" />
          <h1 className="text-2xl font-bold text-[var(--blue-600)]">Ride Details #{rideData.id}</h1>
          <StatusBadge status={rideData.status} fontSize="text-lg" />
          <span className="text-sm font-medium text-gray-700">ETA: {rideData.eta}</span>
        </div>

        {/* Action Buttons - Requested actions */}
        <div className="flex items-center space-x-3">
          <Button
            variant="primary"
            onClick={handleForceStart}
            className="flex items-center justify-center px-4 py-2 !rounded-full text-sm font-semibold cursor-pointer border transition-all duration-150 gap-2 bg-[var(--purple)] text-white border-transparent"
          >
            <Play className="w-4 h-4" />
            <span>Force Start</span>
          </Button>
          <Button
            variant="secondary"
            onClick={handleForceComplete}
            className="flex items-center justify-center px-4 py-2 !rounded-full text-sm font-semibold cursor-pointer border transition-all duration-150 gap-2 bg-white text-black border-card-border"
          >
            <Check className="w-4 h-4" />
            <span>Force Complete</span>
          </Button>
          <Button
            variant="secondary"
            onClick={handleForceNoShow}
            className="flex items-center justify-center px-4 py-2 !rounded-full text-sm font-semibold cursor-pointer border transition-all duration-150 gap-2 bg-white text-black border-card-border"
          >
            <UserX className="w-4 h-4" />
            <span>Force No Show</span>
          </Button>
          <Button
            variant="secondary"
            onClick={handleDuplicateRide}
            className="flex items-center justify-center px-4 py-2 !rounded-full text-sm font-semibold cursor-pointer border transition-all duration-150 gap-2 bg-white text-black border-card-border"
          >
            <Copy className="w-4 h-4" />
            <span>Duplicate</span>
          </Button>
          <Button
            variant="secondary"
            onClick={handleManageTrip}
            className="flex items-center justify-center px-4 py-2 !rounded-full text-sm font-semibold cursor-pointer border transition-all duration-150 gap-2 bg-white text-black border-card-border"
          >
            <Settings className="w-4 h-4" />
            <span>Manage Trip</span>
          </Button>
        </div>
      </div>

      {/* Main Content - Three-column grid */}
      <div className="grid grid-cols-12 gap-6 items-start">
        {/* Left Sidebar - Clean Detail Stack */}
        <div className="col-span-3 min-w-0 space-y-4">
          {/* Driver */}
          <Card className="p-4">
            <div className="flex items-center mb-3">
              <Users className="w-5 h-5 text-[var(--blue-600)] mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Driver</h2>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img src="/picture.jpg" alt="Driver" className="w-10 h-10 rounded-full object-cover" />
                <div>
                  <p className="font-medium text-gray-900">{rideData.driver.name}</p>
                  <div className="flex items-center text-xs text-gray-600">
                    <Star className="w-3.5 h-3.5 text-yellow-500 mr-1" />
                    <span>4.9 rating</span>
                  </div>
                </div>
              </div>
              <StatusBadge status={rideData.status} />
            </div>
          </Card>

          {/* Vehicle */}
          <Card className="p-4">
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
                  <p className="font-medium text-gray-900">{rideData.driver.vehicle}</p>
                  <p className="text-xs text-gray-600">ID: {rideData.route.id}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Trip Details */}
          <Card className="p-4">
            <div className="flex items-center mb-3">
              <Route className="w-5 h-5 text-[var(--blue-600)] mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Trip Details</h2>
            </div>
            <div className="grid grid-cols-2 gap-y-3">
              <div className="text-sm text-gray-500">Route</div>
              <div className="text-sm font-medium text-gray-900">{rideData.route.id}</div>
              <div className="text-sm text-gray-500">Duration</div>
              <div className="text-sm font-medium text-gray-900">{rideData.route.duration}</div>
              <div className="text-sm text-gray-500">Distance</div>
              <div className="text-sm font-medium text-gray-900">{rideData.route.distance}</div>
              <div className="text-sm text-gray-500">Stops</div>
              <div className="text-sm font-medium text-gray-900">{rideData.passengers.stops}</div>
              <div className="text-sm text-gray-500">Students</div>
              <div className="text-sm font-medium text-gray-900">{rideData.passengers.students}</div>
              <div className="text-sm text-gray-500">Available Seats</div>
              <div className="text-sm font-medium text-gray-900">{Math.max(0, 6 - (rideData.passengers?.students || 0))}</div>
            </div>
          </Card>

          {/* Schedule */}
          <Card className="p-4">
            <div className="flex items-center mb-3">
              <Clock className="w-5 h-5 text-[var(--blue-600)] mr-2" />
              <h2 className="text-lg font-semibold text-gray-900">Schedule</h2>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center text-green-600"><span className="w-2 h-2 rounded-full bg-green-600 mr-2"></span>Start</div>
                <div className="font-medium text-gray-900">{rideData.pickup?.scheduledTime || '--'} <span className="text-gray-500">PDT</span></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-red-600"><span className="w-2 h-2 rounded-full bg-red-600 mr-2"></span>End</div>
                <div className="font-medium text-gray-900">{rideData.dropoff?.scheduledTime || '--'} <span className="text-gray-500">PDT</span></div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600"><span className="w-2 h-2 rounded-full bg-gray-400 mr-2"></span>Completed</div>
                <div className="font-medium text-gray-900">{rideData.status === 'Completed' ? (rideData.dropoff?.actualTime || '--') : '--'}</div>
              </div>
            </div>
          </Card>

          {/* Additional */}
          <Card className="p-4">
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
          </Card>
        </div>

        {/* Middle Column - Content with tabs header */}
        <div className="col-span-4 min-w-0">
          <div className="space-y-4">
            {/* Mid tabs (non-interactive visual as requested) */}
            <div className="flex items-center justify-center">
              <div></div>
              <div className="flex space-x-2">
                <button disabled className={`px-4 py-2 text-sm font-medium rounded-lg bg-white text-gray-700 border border-gray-300 cursor-default`}>
                  TRIP STOPS
                </button>
                <button disabled className={`px-4 py-2 text-sm font-medium rounded-lg bg-white text-gray-700 border border-gray-300 cursor-default`}>
                  STUDENTS
                </button>
                <button disabled className={`px-4 py-2 text-sm font-medium rounded-lg bg-white text-gray-700 border border-gray-300 cursor-default`}>
                  TIMELINE
                </button>
              </div>
            </div>

        {/* Content Cards */}
        <div>
          {activeTab === 'stops' && (
            <Card className="p-6 shadow-sm border border-gray-100">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">Trip Journey</h3>
                <p className="text-sm text-gray-600">Follow the route from pickup to destination</p>
              </div>

              {/* Stops timeline */}
              <div className="space-y-6">
                {[
                  { id: 1, type: 'Pick Up', time: '7:45 AM', address: '4512 W Othello St', student: { name: 'Maya Patel', grade: 'Grade 10' } },
                  { id: 2, type: 'Pick Up', time: '7:52 AM', address: '4237 33rd Ave SW', student: { name: 'Jackson Reed', grade: 'Grade 9' } },
                  { id: 3, type: 'Pick Up', time: '8:01 AM', address: '156 NW 85th St', student: { name: 'Zoe Anderson', grade: 'Grade 11' } },
                  { id: 4, type: 'Pick Up', time: '8:08 AM', address: '789 Pine Boulevard', student: { name: 'Noah Kim', grade: 'Grade 7' } },
                ].map((stop, idx) => (
                  <div key={stop.id} className="rounded-xl border border-green-200 bg-green-50/60 p-4 shadow-[0_1px_0_rgba(16,185,129,0.2)]">
                    <div className="flex items-start gap-4">
                      {/* Circle number marker */}
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 rounded-full bg-green-500 text-white font-semibold flex items-center justify-center shadow">
                          {idx + 1}
                        </div>
                      </div>

                      <div className="flex-1 space-y-3">
                        {/* Badge row */}
                        <div className="flex items-center gap-3 text-sm">
                          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-300">
                            <MapPin className="w-3.5 h-3.5" /> {stop.type.toUpperCase()}
                          </span>
                          <span className="text-gray-500">{stop.time}</span>
                        </div>

                        {/* Address */}
                        <div className="text-[15px] font-medium text-gray-800">{stop.address}</div>

                        {/* Passenger card */}
                        <div className="rounded-lg border border-green-200 bg-white p-3 flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gray-100 overflow-hidden flex items-center justify-center text-gray-400">
                              <User className="w-4 h-4" />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{stop.student.name}</div>
                              <div className="text-xs text-gray-500">{stop.student.grade}</div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 text-green-600">
                            <Shield className="w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Separator arrow */}
                    {idx < 3 && (
                      <div className="flex justify-center mt-3">
                        <div className="w-7 h-7 rounded-full bg-green-100 border border-green-200 flex items-center justify-center text-green-600">
                          <ChevronDown className="w-4 h-4" />
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-center gap-3 mt-6">
                <Button className="flex items-center gap-2 !rounded-full">
                  <Car className="w-4 h-4" />
                  Start Journey
                </Button>
                <Button variant="outline" className="flex items-center gap-2 !rounded-full">
                  <Eye className="w-4 h-4" />
                  View Details
                </Button>
              </div>
            </Card>
          )}

          {activeTab === 'ridelog' && (
            <Card className="p-6 shadow-sm border border-gray-100">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ride Timeline</h3>
                <p className="text-sm text-gray-600">Real-time activity log for this ride</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="w-3 h-3 bg-[var(--green-600)] rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-900">Ride Started</p>
                      <span className="text-sm font-medium text-gray-700">7:00 AM</span>
                    </div>
                    <p className="text-sm text-gray-600">Driver began pickup route from first location</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="w-3 h-3 bg-[var(--blue-600)] rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-900">Student Picked Up</p>
                      <span className="text-sm font-medium text-gray-700">7:15 AM</span>
                    </div>
                    <p className="text-sm text-gray-600">First stop completed - 1 student boarded</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 bg-yellow-50 rounded-lg border border-yellow-100">
                  <div className="w-3 h-3 bg-[var(--yellow-600)] rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-900">En Route</p>
                      <span className="text-sm font-medium text-gray-700">7:25 AM</span>
                    </div>
                    <p className="text-sm text-gray-600">Traveling to next pickup location</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4 p-4 bg-green-50 rounded-lg border border-green-100">
                  <div className="w-3 h-3 bg-[var(--green-600)] rounded-full mt-2"></div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-medium text-gray-900">Route Completed</p>
                      <span className="text-sm font-medium text-gray-700">7:35 AM</span>
                    </div>
                    <p className="text-sm text-gray-600">All students safely dropped off at destination</p>
                  </div>
                </div>
              </div>
            </Card>
          )}

          {activeTab === 'documents' && (
            <Card className="p-6 shadow-sm border border-gray-100">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Ride Documents</h3>
                <p className="text-sm text-gray-600">Important documents and forms related to this ride</p>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                  <div className="w-10 h-10 bg-[var(--blue-600)] rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Ride Manifest</p>
                    <p className="text-sm text-gray-500">Student pickup/dropoff list</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Download
                  </Button>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                  <div className="w-10 h-10 bg-[var(--green-600)] rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Safety Checklist</p>
                    <p className="text-sm text-gray-500">Pre-ride vehicle inspection</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Download
                  </Button>
                </div>
                
                <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
                  <div className="w-10 h-10 bg-[var(--purple-600)] rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">Route Map</p>
                    <p className="text-sm text-gray-500">Printable route directions</p>
                  </div>
                  <Button size="sm" variant="outline">
                    Download
                  </Button>
                </div>
              </div>
            </Card>
          )}
        </div>
        </div>
        </div>

        {/* Right Side - Map and Controls */}
        <div className="col-span-5 min-w-0">
          <div className="space-y-4">
          
            {/* Map Container */}
            <div className="h-[70vh] bg-gray-200 rounded-lg overflow-hidden">
              {mapView === 'route' && (
                <RideMap
                  pickup={rideData.pickup}
                  dropoff={rideData.dropoff}
                  status={rideData.status}
                  className="w-full h-full"
                  mapView={mapView}
                />
              )}
              
              {mapView === 'photos' && (
                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="grid grid-cols-2 gap-4 p-4">
                      <div className="bg-white p-2 rounded shadow-sm">
                        <div className="w-24 h-20 bg-blue-100 rounded mb-2 flex items-center justify-center">
                          <span className="text-xs text-blue-600">Stop 1</span>
                        </div>
                        <p className="text-xs text-gray-600">7:00 AM</p>
                      </div>
                      <div className="bg-white p-2 rounded shadow-sm">
                        <div className="w-24 h-20 bg-green-100 rounded mb-2 flex items-center justify-center">
                          <span className="text-xs text-green-600">Stop 2</span>
                        </div>
                        <p className="text-xs text-gray-600">7:15 AM</p>
                      </div>
                      <div className="bg-white p-2 rounded shadow-sm">
                        <div className="w-24 h-20 bg-yellow-100 rounded mb-2 flex items-center justify-center">
                          <span className="text-xs text-yellow-600">Stop 3</span>
                        </div>
                        <p className="text-xs text-gray-600">7:30 AM</p>
                      </div>
                      <div className="bg-white p-2 rounded shadow-sm">
                        <div className="w-24 h-20 bg-red-100 rounded mb-2 flex items-center justify-center">
                          <span className="text-xs text-red-600">Stop 4</span>
                        </div>
                        <p className="text-xs text-gray-600">7:35 AM</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">Photos taken at each stop</p>
                  </div>
                </div>
              )}
              
              {mapView === 'streetview' && (
                <div className="w-full h-full bg-gradient-to-b from-blue-200 to-green-200 flex items-center justify-center relative overflow-hidden">
                  {/* Street View Simulation */}
                  <div className="absolute inset-0">
                    {/* Sky */}
                    <div className="absolute top-0 left-0 right-0 h-1/3 bg-gradient-to-b from-blue-300 to-blue-100"></div>
                    
                    {/* Ground */}
                    <div className="absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-green-300 to-green-100"></div>
                    
                    {/* Buildings */}
                    <div className="absolute bottom-1/3 left-1/4 w-16 h-20 bg-gray-400 rounded-t-lg shadow-lg"></div>
                    <div className="absolute bottom-1/3 right-1/4 w-20 h-24 bg-gray-500 rounded-t-lg shadow-lg"></div>
                    
                    {/* Road */}
                    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gray-600">
                      <div className="absolute top-1/2 left-0 right-0 h-1 bg-yellow-300"></div>
                    </div>
                    
                    {/* Trees */}
                    <div className="absolute bottom-16 left-1/6 w-6 h-12 bg-green-600 rounded-t-full"></div>
                    <div className="absolute bottom-16 right-1/6 w-8 h-14 bg-green-700 rounded-t-full"></div>
                  </div>
                  
                  <div className="relative z-10 text-center">
                    <div className="bg-white/90 px-4 py-2 rounded-lg shadow-lg">
                      <p className="text-sm font-medium text-gray-700">Street View</p>
                      <p className="text-xs text-gray-500">Cross Keys High School Area</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    
   

      {/* View All Drivers Modal */}
      {showAllDrivers && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">All Near By Drivers</h2>
              <button
                onClick={() => setShowAllDrivers(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-3">
              {/* Generate more drivers for the modal */}
              {[
                ...rideData.nearbyDrivers,
                { id: 4, name: "David Chen", distance: "1.5 mi", eta: "12 min", rating: 4.6, vehicle: "Ford Transit" },
                { id: 5, name: "Lisa Anderson", distance: "1.8 mi", eta: "15 min", rating: 4.9, vehicle: "Honda Pilot" },
                { id: 6, name: "Robert Martinez", distance: "2.1 mi", eta: "17 min", rating: 4.5, vehicle: "Chevrolet Tahoe" },
                { id: 7, name: "Emily Davis", distance: "2.3 mi", eta: "18 min", rating: 4.8, vehicle: "Toyota Sienna" },
                { id: 8, name: "James Wilson", distance: "2.5 mi", eta: "20 min", rating: 4.7, vehicle: "Nissan NV200" },
                { id: 9, name: "Anna Johnson", distance: "2.8 mi", eta: "22 min", rating: 4.6, vehicle: "Honda Odyssey" },
                { id: 10, name: "Michael Brown", distance: "3.0 mi", eta: "24 min", rating: 4.8, vehicle: "Chrysler Pacifica" },
                { id: 11, name: "Jessica Garcia", distance: "3.2 mi", eta: "25 min", rating: 4.5, vehicle: "Ford Explorer" },
                { id: 12, name: "Kevin Lee", distance: "3.5 mi", eta: "27 min", rating: 4.7, vehicle: "Toyota Highlander" },
                { id: 13, name: "Rachel White", distance: "3.8 mi", eta: "30 min", rating: 4.9, vehicle: "Subaru Ascent" },
                { id: 14, name: "Daniel Kim", distance: "4.0 mi", eta: "32 min", rating: 4.4, vehicle: "Mazda CX-9" },
                { id: 15, name: "Amanda Clark", distance: "4.2 mi", eta: "35 min", rating: 4.6, vehicle: "Acura MDX" }
              ].map((driver, index) => (
                <div key={driver.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-medium text-sm">
                      {driver.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{driver.name}</p>
                      <p className="text-sm text-gray-500">{driver.vehicle}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <span className="text-yellow-400">★</span>
                        <span className="text-xs text-gray-600">{driver.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{driver.distance}</p>
                    <p className="text-xs text-gray-500">ETA: {driver.eta}</p>
                    <Button
                      size="sm"
                      className="mt-2 text-xs"
                      onClick={() => {
                        setSelectedDriver(driver)
                        // Handle driver assignment logic here
                        console.log('Assign driver:', driver.name)
                      }}
                    >
                      Assign
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end mt-6 pt-6 border-t">
              <Button
                variant="outline"
                onClick={() => setShowAllDrivers(false)}
                className="mr-3"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  // Handle bulk actions or refresh
                  setShowAllDrivers(false)
                  console.log('Refresh nearby drivers')
                }}
              >
                Refresh List
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
