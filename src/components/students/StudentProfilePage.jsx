"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Car, 
  Calendar, 
  Map, 
  Eye, 
  Route, 
  Users, 
  GraduationCap, 
  FileText, 
  AlertTriangle, 
  Info, 
  Save, 
  Plus, 
  Trash2, 
  Navigation, 
  Star, 
  CheckCircle, 
  ArrowLeft, 
  Hash, 
  Timer, 
  Users2, 
  UserCheck, 
  Building2, 
  Shield,
  X
} from 'lucide-react'
import { 
  RiUserLine, 
  RiPhoneLine, 
  RiMailLine, 
  RiMapPinLine, 
  RiCalendarLine, 
  RiTimeLine, 
  RiCarLine, 
  RiStarLine, 
  RiAlertLine,
  RiInformationLine,
  RiFileTextLine,
  RiBuildingLine,
  RiGraduationCapLine,
  RiGroupLine,
  RiSettingsLine,
  RiCheckLine,
  RiCloseLine
} from 'react-icons/ri'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import StatusBadge from '@/components/ui/StatusBadge'
import Select from '@/components/ui/Select'
import Input from '@/components/ui/Input'
import Collapse from '@/components/ui/Collapse'

export default function StudentProfilePage({ studentId }) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState(null)
  const [showManageTripModal, setShowManageTripModal] = useState(false)
  const [showAddGuardianModal, setShowAddGuardianModal] = useState(false)
  const [showBlockDriverModal, setShowBlockDriverModal] = useState(false)
  const [openCollapse, setOpenCollapse] = useState(null)

  // Accordion state - only one collapse can be open at a time
  const handleCollapseToggle = (collapseId) => {
    setOpenCollapse(openCollapse === collapseId ? null : collapseId);
  };
  const [newGuardian, setNewGuardian] = useState({
    name: '',
    phone: '',
    email: '',
    relationship: ''
  })
  const [newBlockedDriver, setNewBlockedDriver] = useState({
    name: '',
    reason: ''
  })

  // Mock student data - exact from screenshot
  const studentData = {
    id: studentId,
    name: "Emma Johnson",
    status: "Active",
    grade: "Grade 9",
    campus: "Riverdale High",
    district: "Northside School District",
    address: "123 Lake St, Riverdale, GA",
    studentId: "S-001",
    guardian: {
      name: "Robert Johnson",
      phone: "(404) 555-1234",
      email: "rjohnson@example.com"
    },
    equipment: ["Booster Seat", "Wheelchair"],
    transportation: {
      assignedRoutes: 1,
      scheduledRides: 2,
      status: "Active"
    },
    // Routes data
    assignedRoutes: [
      {
        id: "RT-30842",
        name: "North District Route",
        stops: 5,
        distance: "12.4 mi",
        status: "Active"
      }
    ],
    
    // Rides data
    upcomingRides: [
      {
        id: "RD-12345",
        date: "May 20, 2025",
        driver: "John Smith",
        route: "North District Route",
        status: "Scheduled"
      },
      {
        id: "RD-12346", 
        date: "May 21, 2025",
        driver: "Jane Doe",
        route: "North District Route",
        status: "Scheduled"
      }
    ],
    
    // Drivers data
    approvedDrivers: [
      {
        id: "DRV-5432",
        name: "John Smith",
        rating: "4.8",
        ridesCompleted: 24,
        status: "Active"
      },
      {
        id: "DRV-7654",
        name: "Jane Doe", 
        rating: "4.9",
        ridesCompleted: 36,
        status: "Active"
      }
    ],
    
    // Blocked Drivers data
    blockedDrivers: [
      {
        id: "DRV-1234",
        name: "Robert Wilson",
        reason: "Inappropriate behavior"
      }
    ]
  }

  const handleManageTrip = () => {
    setShowManageTripModal(true)
  }

  const handleAddGuardian = () => {
    setShowAddGuardianModal(true)
  }

  // Modal handlers
  const handleViewRoute = (routeId) => {
    // Show route details in modal or navigate to routes page
    router.push('/routes')
  }

  const handleViewRide = (rideId) => {
    // Show ride details in modal or navigate to rides page  
    router.push('/rides')
  }

  const handleViewDriver = (driverId) => {
    // Show driver details in modal or navigate to drivers page
    router.push('/drivers')
  }

  // Block/Unblock driver handlers
  const handleBlockDriver = (driverId) => {
    // Add to blocked drivers list
    const driver = studentData.approvedDrivers.find(d => d.id === driverId)
    if (driver) {
      studentData.blockedDrivers.push({
        id: driverId,
        name: driver.name,
        reason: 'Blocked by admin'
      })
      // Remove from approved drivers
      studentData.approvedDrivers = studentData.approvedDrivers.filter(d => d.id !== driverId)
    }
  }

  const handleUnblockDriver = (driverId) => {
    // Remove from blocked drivers
    const driver = studentData.blockedDrivers.find(d => d.id === driverId)
    if (driver) {
      studentData.approvedDrivers.push({
        id: driverId,
        name: driver.name,
        rating: '4.5',
        ridesCompleted: 0,
        status: 'Active'
      })
      studentData.blockedDrivers = studentData.blockedDrivers.filter(d => d.id !== driverId)
    }
  }

  const handleAddBlockedDriver = () => {
    if (newBlockedDriver.name && newBlockedDriver.reason) {
      studentData.blockedDrivers.push({
        id: `DRV-${Date.now()}`,
        name: newBlockedDriver.name,
        reason: newBlockedDriver.reason
      })
      setNewBlockedDriver({ name: '', reason: '' })
      setShowBlockDriverModal(false)
    }
  }

  return (
    <div className="bg-transparent min-h-screen">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
           
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#3b82f6' }}>
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{studentData.name}</h1>
                {/* <p className="text-sm text-gray-600">Student Profile</p> */}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <StatusBadge status={studentData.status} />
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Text
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2"
              >
                <RiPhoneLine className="w-4 h-4" />
                Call
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6">
        {/* Single Collapse with All Information */}
        <Collapse 
          title="Student Information" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-green-600">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
          isOpen={openCollapse === 'student-info'}
          onToggle={() => handleCollapseToggle('student-info')}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Student Details Section */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--blue-100)] flex items-center justify-center">
                <Hash className="w-4 h-4 text-[var(--blue-600)]" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-[var(--muted-text)]">ID</div>
                <div className="text-sm font-medium text-[var(--primary-black)]">#{studentData.studentId}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--green-100)] flex items-center justify-center">
                <GraduationCap className="w-4 h-4 text-[var(--green-600)]" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-[var(--muted-text)]">CAMPUS</div>
                <div className="text-sm font-medium text-[var(--primary-black)]">{studentData.campus}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--purple-100)] flex items-center justify-center">
                <Building2 className="w-4 h-4 text-[var(--purple-600)]" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-[var(--muted-text)]">DISTRICT</div>
                <div className="text-sm font-medium text-[var(--primary-black)]">{studentData.district}</div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--orange-100)] flex items-center justify-center">
                <MapPin className="w-4 h-4 text-[var(--orange-600)]" />
              </div>
              <div className="flex-1">
                <div className="text-sm text-[var(--muted-text)]">ADDRESS</div>
                <div className="text-sm font-medium text-[var(--primary-black)]">{studentData.address}</div>
              </div>
            </div>

            {/* Equipment */}
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[var(--cyan-100)] flex items-center justify-center">
                <span className="text-sm">🧰</span>
              </div>
              <div className="flex-1">
                <div className="text-sm text-[var(--muted-text)]">SPECIAL EQUIPMENT</div>
                <div className="flex gap-2 mt-1 overflow-x-auto whitespace-nowrap">
                  {(studentData.equipment || []).length === 0 ? (
                    <span className="text-sm text-[var(--gray-500)]">None</span>
                  ) : (
                    studentData.equipment.map((eq) => (
                      <span key={eq} className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-[var(--gray-100)] text-[var(--gray-700)]">{eq}</span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Guardian Information Section */}
          <div className="mt-6 pt-6 border-t border-[var(--gray-200)]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--green-100)] flex items-center justify-center">
                  <User className="w-4 h-4 text-[var(--green-600)]" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-[var(--muted-text)]">GUARDIAN</div>
                  <div className="text-sm font-medium text-[var(--primary-black)]">{studentData.guardian.name}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--blue-100)] flex items-center justify-center">
                  <Phone className="w-4 h-4 text-[var(--blue-600)]" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-[var(--muted-text)]">PHONE</div>
                  <div className="text-sm font-medium text-[var(--primary-black)]">{studentData.guardian.phone}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--purple-100)] flex items-center justify-center">
                  <Mail className="w-4 h-4 text-[var(--purple-600)]" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-[var(--muted-text)]">EMAIL</div>
                  <div className="text-sm font-medium text-[var(--primary-black)]">{studentData.guardian.email}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Transportation Information Section */}
          <div className="mt-6 pt-6 border-t border-[var(--gray-200)]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--orange-100)] flex items-center justify-center">
                  <Route className="w-4 h-4 text-[var(--orange-600)]" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-[var(--muted-text)]">ROUTES</div>
                  <div className="text-sm font-medium text-[var(--primary-black)]">{studentData.transportation.assignedRoutes}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--blue-100)] flex items-center justify-center">
                  <Clock className="w-4 h-4 text-[var(--blue-600)]" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-[var(--muted-text)]">RIDES</div>
                  <div className="text-sm font-medium text-[var(--primary-black)]">{studentData.transportation.scheduledRides}</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--green-100)] flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-[var(--green-600)]" />
                </div>
                <div className="flex-1">
                  <div className="text-sm text-[var(--muted-text)]">STATUS</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-700">
                      {studentData.transportation.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </Collapse>

        {/* Tabs Section - always visible outside general info */}
        <div className="mt-6 pt-6 border-t border-[var(--gray-200)]">
          <div className="flex items-center space-x-2 mb-6">
            <button 
              onClick={() => setActiveTab('routes')}
              className={`px-6 py-3 text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:opacity-90 rounded-lg ${
                activeTab === 'routes' 
                  ? 'text-white' 
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}
              style={activeTab === 'routes' ? { backgroundColor: 'var(--primary)' } : {}}
            >
              <Route className="w-4 h-4" />
              Routes
            </button>
            <button 
              onClick={() => setActiveTab('rides')}
              className={`px-6 py-3 text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:opacity-90 rounded-lg ${
                activeTab === 'rides' 
                  ? 'text-white' 
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}
              style={activeTab === 'rides' ? { backgroundColor: 'var(--primary)' } : {}}
            >
              <Clock className="w-4 h-4" />
              Rides
              <span className="ml-1 px-2 py-1 text-xs font-medium rounded-full bg-white text-purple-600">2</span>
            </button>
            <button 
              onClick={() => setActiveTab('drivers')}
              className={`px-6 py-3 text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:opacity-90 rounded-lg ${
                activeTab === 'drivers' 
                  ? 'text-white' 
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}
              style={activeTab === 'drivers' ? { backgroundColor: 'var(--primary)' } : {}}
            >
              <Users className="w-4 h-4" />
              Drivers
            </button>
            <button 
              onClick={() => setActiveTab('blocked')}
              className={`px-6 py-3 text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:opacity-90 rounded-lg ${
                activeTab === 'blocked' 
                  ? 'text-white' 
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}
              style={activeTab === 'blocked' ? { backgroundColor: 'var(--primary)' } : {}}
            >
              <Shield className="w-4 h-4" />
              Blocked Drivers
            </button>
          </div>

          {/* Dynamic Content based on active tab */}
          <div>
            {activeTab === 'routes' && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Route className="w-5 h-5 text-purple-600" />
                    Assigned Routes ({studentData.assignedRoutes.length})
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Route ID</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Stops</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Distance</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentData.assignedRoutes.map((route, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handleViewRoute(route.id)}>
                          <td className="py-4 px-6 text-sm text-gray-900 font-medium">{route.id}</td>
                          <td className="py-4 px-6 text-sm text-gray-900 font-semibold">{route.name}</td>
                          <td className="py-4 px-6 text-sm text-gray-900">{route.stops}</td>
                          <td className="py-4 px-6 text-sm text-gray-900">{route.distance}</td>
                          <td className="py-4 px-6">
                            <div className="flex flex-col items-start">
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                                {route.status}
                              </span>
                              <div className="w-full h-px bg-gray-200 mt-1"></div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleViewRoute(route.id)
                              }}
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {activeTab === 'rides' && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Clock className="w-5 h-5 text-purple-600" />
                    Upcoming Rides ({studentData.upcomingRides.length})
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Ride ID</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Date</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Driver</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Route</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentData.upcomingRides.map((ride, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handleViewRide(ride.id)}>
                          <td className="py-4 px-6 text-sm text-gray-900 font-medium">{ride.id}</td>
                          <td className="py-4 px-6 text-sm text-gray-900 font-semibold">{ride.date}</td>
                          <td className="py-4 px-6 text-sm text-gray-900">{ride.driver}</td>
                          <td className="py-4 px-6 text-sm text-gray-900">{ride.route}</td>
                          <td className="py-4 px-6">
                            <div className="flex flex-col items-start">
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                                {ride.status}
                              </span>
                              <div className="w-full h-px bg-gray-200 mt-1"></div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleViewRide(ride.id)
                              }}
                            >
                              View
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {activeTab === 'drivers' && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Users className="w-5 h-5 text-purple-600" />
                    Approved Drivers ({studentData.approvedDrivers.length})
                  </h2>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Driver ID</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Rating</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Rides Completed</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentData.approvedDrivers.map((driver, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => handleViewDriver(driver.id)}>
                          <td className="py-4 px-6 text-sm text-gray-900 font-medium">{driver.id}</td>
                          <td className="py-4 px-6 text-sm text-gray-900 font-semibold">{driver.name}</td>
                          <td className="py-4 px-6 text-sm text-gray-900 flex items-center gap-1">
                            {driver.rating} <Star className="w-4 h-4 text-yellow-500" />
                          </td>
                          <td className="py-4 px-6 text-sm text-gray-900">{driver.ridesCompleted}</td>
                          <td className="py-4 px-6">
                            <div className="flex flex-col items-start">
                              <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-700">
                                {driver.status}
                              </span>
                              <div className="w-full h-px bg-gray-200 mt-1"></div>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                              onClick={(e) => {
                                e.stopPropagation()
                                handleBlockDriver(driver.id)
                              }}
                            >
                              Block
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}

            {activeTab === 'blocked' && (
              <>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-red-600" />
                    Blocked Drivers
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2 text-red-600 border-red-200 hover:bg-red-50"
                    onClick={() => setShowBlockDriverModal(true)}
                  >
                    <Plus className="w-4 h-4" />
                    Block Driver
                  </Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b border-gray-200">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Driver ID</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Reason</th>
                        <th className="px-6 py-3 text-center text-sm font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentData.blockedDrivers.map((driver, index) => (
                        <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                          <td className="py-4 px-6 text-sm text-gray-900 font-medium">{driver.id}</td>
                          <td className="py-4 px-6 text-sm text-gray-900 font-semibold">{driver.name}</td>
                          <td className="py-4 px-6 text-sm text-gray-900">{driver.reason}</td>
                          <td className="py-4 px-6 text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                              onClick={() => handleUnblockDriver(driver.id)}
                            >
                              <Trash2 className="w-4 h-4 mr-1" />
                              Remove
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Block Driver Modal */}
      {showBlockDriverModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Block Driver</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowBlockDriverModal(false)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Driver Name</label>
                <Input
                  value={newBlockedDriver.name}
                  onChange={(e) => setNewBlockedDriver({...newBlockedDriver, name: e.target.value})}
                  placeholder="Enter driver name"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Reason</label>
                <Input
                  value={newBlockedDriver.reason}
                  onChange={(e) => setNewBlockedDriver({...newBlockedDriver, reason: e.target.value})}
                  placeholder="Enter reason for blocking"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-3 mt-6">
              <Button
                variant="outline"
                onClick={() => setShowBlockDriverModal(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddBlockedDriver}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                Block Driver
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}