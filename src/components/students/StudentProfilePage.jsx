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
    <div className="bg-transparent">
      {/* Main Content */}
      <div className="pt-4">
        {/* Single Collapse with All Information */}
        <Collapse 
          title="Student Information" 
          icon={
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-purple-600">
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          }
          isOpen={openCollapse === 'student-info'}
          onToggle={() => handleCollapseToggle('student-info')}
        >
          <div className="space-y-6">
            {/* Student Profile Header with Actions */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full border border-[var(--gray-200)] overflow-hidden bg-[var(--gray-100)] flex items-center justify-center">
                  <Users className="w-8 h-8" style={{ color: '#6b7280' }} />
                </div>
                <div className="flex-1">
                  <div className="font-semibold text-2xl text-[var(--primary-black)]">{studentData.name}</div>
                  <div className="text-sm text-[var(--muted-text)]">Student ID: {studentData.studentId}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-[var(--green)] text-white px-3 py-1 rounded-full text-sm font-medium" style={{ minWidth: '87px', minHeight: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  {studentData.status}
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    className="flex items-center gap-2 bg-[var(--gray-100)] text-[var(--primary-black)] px-3 py-1 rounded font-medium text-sm border border-[var(--gray-200)]"
                  >
                    <FileText className="w-4 h-4" />
                    Text
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex items-center gap-2 bg-[var(--blue)] text-white px-3 py-1 rounded font-medium text-sm"
                  >
                    <RiPhoneLine className="w-4 h-4" />
                    Call
                  </Button>
                </div>
              </div>
            </div>

            {/* Student Details Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
            </div>

            {/* Special Equipment Section */}
            <div className="pt-4 border-t border-[var(--gray-200)]">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--cyan-100)] flex items-center justify-center">
                  <span className="text-sm">🧰</span>
                </div>
                <div className="flex-1">
                  <div className="text-sm text-[var(--muted-text)]">SPECIAL EQUIPMENT</div>
                  <div className="flex gap-2 mt-1 overflow-x-auto whitespace-nowrap">
                    {(studentData.equipment || []).length === 0 ? (
                      <span className="text-sm text-[var(--muted-text)]">None</span>
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
          <div className="pt-4 border-t border-[var(--gray-200)]">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
          <div className="pt-4 border-t border-[var(--gray-200)]">
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
                    <span className="bg-[var(--green)] text-white px-3 py-1 rounded-full text-sm font-medium" style={{ minWidth: '87px', minHeight: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                      {studentData.transportation.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>

        </Collapse>

        {/* Tabs Section - always visible outside general info */}
        <div className="pt-4 border-t border-[var(--gray-200)]">
          <div className="flex mt-2">
            <button 
              onClick={() => setActiveTab('routes')}
              className="px-6 py-3 font-medium cursor-pointer transition-all duration-200 hover:opacity-90 rounded-lg"
              style={{
                backgroundColor: activeTab === 'routes' ? 'var(--primary)' : 'var(--gray-100)',
                color: activeTab === 'routes' ? 'var(--on-primary)' : 'var(--muted-text)',
                borderBottom: activeTab === 'routes' ? '2px solid var(--primary)' : 'none',
                marginRight: '4px',
                fontSize: '14px'
              }}
            >
              <div className="flex items-center gap-2">
                <Route className="w-4 h-4" />
                <span>Routes</span>
              </div>
            </button>
            <button 
              onClick={() => setActiveTab('rides')}
              className="px-6 py-3 font-medium cursor-pointer transition-all duration-200 hover:opacity-90 rounded-lg"
              style={{
                backgroundColor: activeTab === 'rides' ? 'var(--primary)' : 'var(--gray-100)',
                color: activeTab === 'rides' ? 'var(--on-primary)' : 'var(--muted-text)',
                borderBottom: activeTab === 'rides' ? '2px solid var(--primary)' : 'none',
                marginRight: '4px',
                fontSize: '14px'
              }}
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Rides</span>
                <span className="ml-1 px-2 py-1 text-xs font-medium rounded-full bg-white text-purple-600">2</span>
              </div>
            </button>
            <button 
              onClick={() => setActiveTab('drivers')}
              className="px-6 py-3 font-medium cursor-pointer transition-all duration-200 hover:opacity-90 rounded-lg"
              style={{
                backgroundColor: activeTab === 'drivers' ? 'var(--primary)' : 'var(--gray-100)',
                color: activeTab === 'drivers' ? 'var(--on-primary)' : 'var(--muted-text)',
                borderBottom: activeTab === 'drivers' ? '2px solid var(--primary)' : 'none',
                marginRight: '4px',
                fontSize: '14px'
              }}
            >
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>Drivers</span>
              </div>
            </button>
            <button 
              onClick={() => setActiveTab('blocked')}
              className="px-6 py-3 font-medium cursor-pointer transition-all duration-200 hover:opacity-90 rounded-lg"
              style={{
                backgroundColor: activeTab === 'blocked' ? 'var(--primary)' : 'var(--gray-100)',
                color: activeTab === 'blocked' ? 'var(--on-primary)' : 'var(--muted-text)',
                borderBottom: activeTab === 'blocked' ? '2px solid var(--primary)' : 'none',
                marginRight: '4px',
                fontSize: '14px'
              }}
            >
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Blocked Drivers</span>
              </div>
            </button>
          </div>

          {/* Dynamic Content based on active tab */}
          <div>
            {activeTab === 'routes' && (
              <>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Assigned Routes ({studentData.assignedRoutes.length})</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Route ID</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Stops</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Distance</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentData.assignedRoutes.map((route, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4 text-sm text-gray-900">{route.id}</td>
                            <td className="py-4 px-4 text-sm text-gray-900">{route.name}</td>
                            <td className="py-4 px-4 text-sm text-gray-900">{route.stops}</td>
                            <td className="py-4 px-4 text-sm text-gray-900">{route.distance}</td>
                            <td className="py-4 px-4">
                              <StatusBadge status={route.status} />
                            </td>
                            <td className="py-4 px-4">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-[var(--blue-600)] border-[var(--blue-200)] hover:bg-[var(--blue-50)] hover:border-[var(--blue-300)]"
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
                </div>
              </>
            )}

            {activeTab === 'rides' && (
              <>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Rides ({studentData.upcomingRides.length})</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Ride ID</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Driver</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Route</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentData.upcomingRides.map((ride, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4 text-sm text-gray-900">#{ride.id}</td>
                            <td className="py-4 px-4 text-sm text-gray-900">{ride.date}</td>
                            <td className="py-4 px-4 text-sm text-gray-900">{ride.driver}</td>
                            <td className="py-4 px-4 text-sm text-gray-900">{ride.route}</td>
                            <td className="py-4 px-4">
                              <StatusBadge status={ride.status} />
                            </td>
                            <td className="py-4 px-4">
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-[var(--blue-600)] border-[var(--blue-200)] hover:bg-[var(--blue-50)] hover:border-[var(--blue-300)]"
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
                </div>
              </>
            )}

            {activeTab === 'drivers' && (
              <>
                <div className="mt-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Approved Drivers ({studentData.approvedDrivers.length})</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Driver ID</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Rating</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Rides Completed</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentData.approvedDrivers.map((driver, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4 text-sm text-gray-900">{driver.id}</td>
                            <td className="py-4 px-4 text-sm text-gray-900">{driver.name}</td>
                            <td className="py-4 px-4 text-sm text-gray-900 flex items-center gap-1">
                              {driver.rating} <Star className="w-4 h-4 text-yellow-500" />
                            </td>
                            <td className="py-4 px-4 text-sm text-gray-900">{driver.ridesCompleted}</td>
                            <td className="py-4 px-4">
                              <StatusBadge status={driver.status} />
                            </td>
                            <td className="py-4 px-4">
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
                </div>
              </>
            )}

            {activeTab === 'blocked' && (
              <>
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Blocked Drivers</h3>
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
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Driver ID</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Reason</th>
                          <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {studentData.blockedDrivers.map((driver, index) => (
                          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4 text-sm text-gray-900">{driver.id}</td>
                            <td className="py-4 px-4 text-sm text-gray-900">{driver.name}</td>
                            <td className="py-4 px-4 text-sm text-gray-900">{driver.reason}</td>
                            <td className="py-4 px-4">
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