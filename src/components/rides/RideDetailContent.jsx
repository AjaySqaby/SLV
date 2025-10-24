"use client";

import { useState, useEffect } from 'react'
import { ArrowLeft, Car, X, Copy, Check, UserX, Settings, Route, Clock, Users, FileText, Star, Eye, Play, MapPin, ChevronDown, User, Shield, Search, Calendar, Edit } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import StatusBadge from '@/components/ui/StatusBadge'
import ProgressBar from '@/components/ui/ProgressBar'
import Select from '@/components/ui/Select'
import SearchInput from '@/components/ui/SearchInput'
import Input from '@/components/ui/Input'
import RideMap from './RideMap'
import { useRouter } from 'next/navigation'
import RouteViewModal from '@/components/routes/RouteViewModal'
import ForceStartModal from '@/components/common/modals/ForceStartModal'
import ForceCompleteModal from '@/components/common/modals/ForceCompleteModal'
import ForceNoShowModal from '@/components/common/modals/ForceNoShowModal'
import DuplicateModal from '@/components/common/modals/DuplicateModal'
import ManageTripModal from '@/components/common/modals/ManageTripModal'
import EditTripModal from '@/components/common/modals/EditTripModal'

export default function RideDetailContent({ rideId, onClose, onViewDriver }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const [showRouteModal, setShowRouteModal] = useState(false)
  // Function to highlight local time
  const formatTimeWithHighlight = (time, timezone = 'PDT') => {
    if (!time || time === '--') return time

    // Get user's local timezone abbreviation
    const now = new Date()
    const userTimezoneAbbr = now.toLocaleTimeString('en-US', {
      timeZoneName: 'short'
    }).split(' ')[1]

    // For demo purposes, let's highlight EST as local time (you can change this)
    // In real app, you would compare with actual user timezone
    const isLocalTime = timezone === 'EST' || timezone === 'EDT'

    if (isLocalTime) {
      return (
        <span>
          <span className="font-semibold" style={{ color: 'var(--blue-600)' }}>
            {time}
          </span>
          <span className="ml-1 text-sm" style={{ color: 'var(--muted-text)' }}>
            {timezone}
          </span>
        </span>
      )
    }

    return (
      <span>
        {time} <span className="text-gray-500">{timezone}</span>
      </span>
    )
  }
  const [activeTab, setActiveTab] = useState('stops')
  const [selectedDriver, setSelectedDriver] = useState(null)
  const [mapView, setMapView] = useState('route') // route, photos, streetview
  const [showAllDrivers, setShowAllDrivers] = useState(false)
  const [midTab, setMidTab] = useState('stops') // stops | students | timeline
  const [showForceStartModal, setShowForceStartModal] = useState(false)
  const [forceStartTime, setForceStartTime] = useState('')
  const [forceStartReason, setForceStartReason] = useState('')
  const [showForceCompleteModal, setShowForceCompleteModal] = useState(false)
  const [showForceNoShowModal, setShowForceNoShowModal] = useState(false)
  const [showDuplicateTripModal, setShowDuplicateTripModal] = useState(false)
  const [duplicateTripDate, setDuplicateTripDate] = useState('')
  const [duplicateTripTime, setDuplicateTripTime] = useState('')
  const [showManageTripModal, setShowManageTripModal] = useState(false)
  const [selectedNewDriver, setSelectedNewDriver] = useState('')
  const [driverAssignment, setDriverAssignment] = useState('keep-current')
  const [vehicleAssignment, setVehicleAssignment] = useState('keep-current')
  const [searchPartner, setSearchPartner] = useState('')
  const [selectedState, setSelectedState] = useState('all')
  const [selectedCity, setSelectedCity] = useState('all')
  const [availableFilter, setAvailableFilter] = useState('available')
  const [showEditTripModal, setShowEditTripModal] = useState(false)
  const [editPickupAddress, setEditPickupAddress] = useState('')
  const [editDropoffAddress, setEditDropoffAddress] = useState('')
  const [editPickupTime, setEditPickupTime] = useState('')
  const [editDropoffTime, setEditDropoffTime] = useState('')
  const [rideDataState, setRideDataState] = useState(null)

  // Load ride data on component mount
  useEffect(() => {
    const data = getRideData(rideId)
    setRideDataState(data)
  }, [rideId])

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

  const rideData = rideDataState || getRideData(rideId)


  // Calculate how many minutes late based on dropoff actual vs scheduled where applicable
  const computeLateMinutes = () => {
    const status = String(rideData?.status || '').toLowerCase()
    if (!(status === 'late' || status === 'delayed')) return undefined
    const scheduled = rideData?.dropoff?.scheduledTime
    const actual = rideData?.dropoff?.actualTime
    // If mock data has 'Running late', fall back to a sample number
    if (!scheduled || !actual || /running late/i.test(String(actual))) {
      return 40
    }
    try {
      const parse = (t) => {
        const m = String(t).match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i)
        if (!m) return null
        let h = parseInt(m[1], 10)
        const min = parseInt(m[2], 10)
        const ampm = m[3].toUpperCase()
        if (ampm === 'PM' && h !== 12) h += 12
        if (ampm === 'AM' && h === 12) h = 0
        return h * 60 + min
      }
      const sMin = parse(scheduled)
      const aMin = parse(actual)
      if (sMin == null || aMin == null) return 40
      const diff = aMin - sMin
      return diff > 0 ? diff : undefined
    } catch (_) {
      return 40
    }
  }

  const lateMinutes = computeLateMinutes()

  const availableDrivers = [
    {
      id: 1,
      name: "Mike Johnson",
      vehicle: "2023 Honda Odyssey",
      rating: 4.9,
      status: "Available",
      location: "CA San Francisco",
      image: "/picture.jpg"
    },
    {
      id: 2,
      name: "Sarah Williams",
      vehicle: "2022 Toyota Sienna",
      rating: 4.8,
      status: "Available",
      location: "CA Los Angeles",
      image: "/picture.jpg"
    },
    {
      id: 3,
      name: "David Chen",
      vehicle: "2023 Ford Transit",
      rating: 4.7,
      status: "Available",
      location: "CA San Diego",
      image: "/picture.jpg"
    },
    {
      id: 4,
      name: "Maria Garcia",
      vehicle: "2022 Chevrolet Express",
      rating: 4.9,
      status: "Available",
      location: "CA Oakland",
      image: "/picture.jpg"
    }
  ]

  const handleDuplicateRide = () => {
    setShowDuplicateTripModal(true)
  }

  const handleDuplicateTripSubmit = () => {
    // Handle duplicate trip submission
    console.log('Duplicate trip submitted:', { date: duplicateTripDate, time: duplicateTripTime })
    setShowDuplicateTripModal(false)
    setDuplicateTripDate('')
    setDuplicateTripTime('')
  }

  const handleForceStart = () => {
    setShowForceStartModal(true)
  }

  const handleForceStartSubmit = () => {
    // Handle force start submission
    console.log('Force start submitted:', { time: forceStartTime, reason: forceStartReason })
    setShowForceStartModal(false)
    setForceStartTime('')
    setForceStartReason('')
  }

  const handleForceComplete = () => {
    setShowForceCompleteModal(true)
  }

  const handleForceCompleteSubmit = () => {
    // Handle force complete submission
    console.log('Force complete submitted for ride:', rideId)
    setShowForceCompleteModal(false)
  }

  const handleForceNoShow = () => {
    setShowForceNoShowModal(true)
  }

  const handleForceNoShowSubmit = () => {
    // Handle force no show submission
    console.log('Force no show submitted for ride:', rideId)
    setShowForceNoShowModal(false)
  }

  const handleManageTrip = () => {
    setShowManageTripModal(true)
  }

  const handleManageTripSubmit = () => {
    // Handle manage trip submission
    console.log('Driver reassigned:', selectedNewDriver)
    setShowManageTripModal(false)
    setSelectedNewDriver('')
  }

  if (isLoading || !rideDataState) {
    return <div className="p-6 text-center">Loading...</div>
  }

  return (
    <div className="bg-white h-screen flex flex-col">
      {/* Header Section */}
      <div className="mb-6 px-6 pt-6">
        {/* Top Row - Title and Status */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Car className="w-6 h-6 text-[var(--blue-600)]" />
            <Route className="w-5 h-5 text-[var(--blue-600)]" />
            <Clock className="w-5 h-5 text-[var(--blue-600)]" />
            <h1 className="text-2xl font-bold text-[var(--blue-600)]">Ride Details #{rideData.id}</h1>
            <StatusBadge status={rideData.status} fontSize="text-lg" lateMinutes={lateMinutes} />
            <span className="text-sm font-medium text-gray-700">
              ETA: {formatTimeWithHighlight(rideData.eta, 'EST')}
            </span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-500" />
            </button>
          )}
        </div>

        {/* Bottom Row - Tabs and Action Buttons - Centered */}
        <div className="flex items-center justify-center">
          <div className="flex items-center space-x-2">
            {/* Tabs */}
            <button
              onClick={() => setActiveTab('stops')}
              className="px-6 py-3 text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:opacity-90"
              style={{
                backgroundColor: activeTab === 'stops' ? 'var(--primary)' : 'var(--gray-100)',
                color: activeTab === 'stops' ? 'var(--on-primary)' : 'var(--muted-text)',
                border: activeTab === 'stops' ? 'none' : '1px solid var(--gray-200)',
                borderRadius: '12px'
              }}
            >
              <div className="w-4 h-4 border-2 border-white rounded-sm flex items-center justify-center">
                <div className="w-0 h-0 border-l-[6px] border-l-white border-y-[4px] border-y-transparent ml-0.5"></div>
              </div>
              TRIP STOPS
            </button>
            <button
              onClick={() => setActiveTab('students')}
              className="px-6 py-3 text-sm font-medium cursor-pointer transition-all duration-200 hover:opacity-90"
              style={{
                backgroundColor: activeTab === 'students' ? 'var(--primary)' : 'var(--gray-100)',
                color: activeTab === 'students' ? 'var(--on-primary)' : 'var(--muted-text)',
                border: activeTab === 'students' ? 'none' : '1px solid var(--gray-200)',
                borderRadius: '12px'
              }}
            >
              STUDENTS
            </button>
            <button
              onClick={() => setActiveTab('ridelog')}
              className="px-6 py-3 text-sm font-medium cursor-pointer transition-all duration-200 hover:opacity-90"
              style={{
                backgroundColor: activeTab === 'ridelog' ? 'var(--primary)' : 'var(--gray-100)',
                color: activeTab === 'ridelog' ? 'var(--on-primary)' : 'var(--muted-text)',
                border: activeTab === 'ridelog' ? 'none' : '1px solid var(--gray-200)',
                borderRadius: '12px'
              }}
            >
              TIMELINE
            </button>

            {/* Action Buttons */}
            <Button
              variant="primary"
              onClick={handleForceStart}
              className="flex items-center justify-center px-4 py-2 !rounded-full text-sm font-semibold cursor-pointer border transition-all duration-150 gap-2 text-white border-transparent"
              style={{ backgroundColor: 'var(--green-600)' }}
            >
              <div className="w-4 h-4 border-2 border-white rounded-full flex items-center justify-center">
                <Play className="w-2.5 h-2.5" />
              </div>
              <span>Force Start</span>
            </Button>
            <Button
              variant="secondary"
              onClick={handleForceComplete}
              className="flex items-center justify-center px-4 py-2 !rounded-full text-sm font-semibold cursor-pointer border transition-all duration-150 gap-2 text-white border-transparent"
              style={{ backgroundColor: 'var(--secondary)' }}
            >
              <div className="w-4 h-4 border-2 border-white rounded-full flex items-center justify-center">
                <Check className="w-2.5 h-2.5" />
              </div>
              <span>Mark Complete</span>
            </Button>
            <Button
              variant="secondary"
              onClick={handleForceNoShow}
              className="flex items-center justify-center px-4 py-2 !rounded-full text-sm font-semibold cursor-pointer border transition-all duration-150 gap-2 text-white border-transparent"
              style={{ backgroundColor: 'var(--red-600)' }}
            >
              <div className="w-4 h-4 border-2 border-white rounded-full flex items-center justify-center">
                <UserX className="w-2.5 h-2.5" />
              </div>
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
            <Button
              variant="secondary"
              onClick={() => {
                setEditPickupAddress(rideData.pickup?.address || '')
                setEditDropoffAddress(rideData.dropoff?.address || '')
                setEditPickupTime(rideData.pickup?.scheduledTime || '')
                setEditDropoffTime(rideData.dropoff?.scheduledTime || '')
                setShowEditTripModal(true)
              }}
              className="flex items-center justify-center px-4 py-2 !rounded-full text-sm font-semibold cursor-pointer border transition-all duration-150 gap-2 bg-white text-black border-card-border"
            >
              <Edit className="w-4 h-4" />
              <span>Edit Trip</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content - Three-column grid */}
      <div className="grid grid-cols-12 gap-6 items-start flex-1 px-6">
        {/* Left Sidebar - Clean Detail Stack */}
        <div className="col-span-3 min-w-0 space-y-4">
          {/* Driver */}
          <Card className="p-4 cursor-pointer"
            onClick={() => {
              if (onViewDriver) {
                onViewDriver('D-001')
              }
            }}
          >
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
              <StatusBadge status={rideData.status} lateMinutes={lateMinutes} />
            </div>
          </Card>

          {/* Vehicle */}
          <Card className="p-4 cursor-pointer"
            onClick={() => {
              if (onViewDriver) {
                onViewDriver('D-001')
              }
            }}
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
                  <p className="font-medium text-gray-900">{rideData.driver.vehicle}</p>
                  <p className="text-xs text-gray-600">ID: {rideData.route.id}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Trip Details */}
          <Card className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <Route className="w-5 h-5 text-[var(--blue-600)] mr-2" />
                <h2 className="text-lg font-semibold text-gray-900">Trip Details</h2>
              </div>
              <Button
                variant="secondary"
                onClick={() => setShowRouteModal(true)}
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
                <div className="font-medium text-gray-900">
                  {formatTimeWithHighlight(rideData.pickup?.scheduledTime, 'EST')}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-red-600"><span className="w-2 h-2 rounded-full bg-red-600 mr-2"></span>End</div>
                <div className="font-medium text-gray-900">
                  {formatTimeWithHighlight(rideData.dropoff?.scheduledTime, 'EST')}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center text-gray-600"><span className="w-2 h-2 rounded-full bg-gray-400 mr-2"></span>Completed</div>
                <div className="font-medium text-gray-900">
                  {rideData.status === 'Completed' ? formatTimeWithHighlight(rideData.dropoff?.actualTime, 'EST') : '--'}
                </div>
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

        {/* Middle Column - Content */}
        <div className="col-span-4 min-w-0">
          <div className="space-y-4">
            {/* Content Cards */}
            <div>
              {activeTab === 'stops' && (
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
                          <p className="text-sm" style={{ color: 'var(--muted-text)' }}>2 stops • 1 student • 6.2 miles total</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm" style={{ color: 'var(--muted-text)' }}>Est. Duration</p>
                        <p className="text-xl font-bold" style={{ color: 'var(--heading)' }}>25 min</p>
                      </div>
                    </div>
                  </div>

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
                                  onClick={() => router.push('/students/STU001234')}
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

              {activeTab === 'students' && (
                <div className="space-y-6">
                  {/* Search and Filter Section */}
                  <div className="space-y-4">
                    {/* Search Bar */}
                    <SearchInput
                      placeholder="Search students"
                      width="w-full"
                      className="text-sm"
                    />

                    {/* Student Filter Dropdown */}
                    <Select
                      options={[
                        { value: 'all', label: 'All Students' },
                        { value: 'pickup', label: 'Pickup Only' },
                        { value: 'dropoff', label: 'Drop-off Only' }
                      ]}
                      value="all"
                      onChange={(e) => console.log('Filter changed:', e.target.value)}
                      placeholder="Select filter"
                      className="text-sm"
                      width="w-full"
                    />
                  </div>

                  {/* Student Detail Card */}
                  <div className="bg-white rounded-lg shadow-sm border overflow-hidden" style={{ borderColor: 'var(--gray-200)' }}>
                    {/* Student Header */}
                    <div className="p-6 border-b" style={{ borderColor: 'var(--gray-200)' }}>
                      <div className="flex items-center justify-between">
                        <div>
                          <button
                            className="text-xl font-bold hover:underline cursor-pointer"
                            style={{ color: 'var(--blue-600)' }}
                            onClick={() => router.push('/students/STU001234')}
                          >
                            Marcus Johnson
                          </button>
                          <p className="text-sm mt-1" style={{ color: 'var(--muted-text)' }}>Grade 10</p>
                        </div>
                        <span
                          className="px-3 py-1 text-xs rounded-full"
                          style={{
                            backgroundColor: 'var(--gray-100)',
                            color: 'var(--muted-text)'
                          }}
                        >
                          Scheduled
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
                              1425 Oak Street Apt 204, Springfield, MA 01103
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

              {activeTab === 'ridelog' && (
                <div className="space-y-6">
                  {/* Timeline Header */}
                  <div className="text-center">
                    <h3 className="text-2xl font-bold" style={{ color: 'var(--heading)' }}>Timeline</h3>
                    <p className="text-sm mt-2" style={{ color: 'var(--muted-text)' }}>Ride activity and status updates</p>
                  </div>

                  {/* Timeline Events */}
                  <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-6 top-0 bottom-0 w-0.5" style={{ backgroundColor: 'var(--gray-200)' }}></div>

                    <div className="space-y-6">
                      {/* Event 1 - Accepted */}
                      <div className="relative flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                          style={{ backgroundColor: 'var(--green-600)' }}
                        >
                          <Check className="w-6 h-6 text-white" />
                        </div>

                        <div className="flex-1 pt-2">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-bold underline" style={{ color: 'var(--heading)' }}>Sarah Mitchell</h4>
                            <span
                              className="px-3 py-1 text-sm rounded-full font-medium"
                              style={{
                                backgroundColor: 'var(--green-100)',
                                color: 'var(--green-600)'
                              }}
                            >
                              Accepted
                            </span>
                          </div>
                          <div className="text-sm" style={{ color: 'var(--muted-text)' }}>
                            <p>Mon Sep 15, 2025 at 4:30 PM EST (2:30 PM MST)</p>
                            <p className="mt-1">Sarah Mitchell – driver</p>
                          </div>
                        </div>
                      </div>

                      {/* Event 2 - Assigned */}
                      <div className="relative flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                          style={{ backgroundColor: 'var(--blue-600)' }}
                        >
                          <User className="w-6 h-6 text-white" />
                        </div>

                        <div className="flex-1 pt-2">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-bold underline" style={{ color: 'var(--heading)' }}>Sarah Mitchell</h4>
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
                          <div className="text-sm" style={{ color: 'var(--muted-text)' }}>
                            <p>Mon Sep 15, 2025 at 4:25 PM EST (2:25 PM MST)</p>
                            <p className="mt-1">David Johnson – admin</p>
                          </div>
                        </div>
                      </div>

                      {/* Event 3 - Vehicle Assigned */}
                      <div className="relative flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                          style={{ backgroundColor: 'var(--blue-600)' }}
                        >
                          <Settings className="w-6 h-6 text-white" />
                        </div>

                        <div className="flex-1 pt-2">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-bold underline" style={{ color: 'var(--heading)' }}>MA448891 Ford Transit</h4>
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
                          <div className="text-sm" style={{ color: 'var(--muted-text)' }}>
                            <p>Mon Sep 15, 2025</p>
                            <p className="mt-1">System</p>
                          </div>
                        </div>
                      </div>

                      {/* Event 4 - Rejected */}
                      <div className="relative flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                          style={{ backgroundColor: 'var(--red-600)' }}
                        >
                          <X className="w-6 h-6 text-white" />
                        </div>

                        <div className="flex-1 pt-2">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-bold underline" style={{ color: 'var(--heading)' }}>Robert Chen</h4>
                            <span
                              className="px-3 py-1 text-sm rounded-full font-medium"
                              style={{
                                backgroundColor: 'var(--red-100)',
                                color: 'var(--red-600)'
                              }}
                            >
                              Rejected
                            </span>
                          </div>
                          <div className="text-sm" style={{ color: 'var(--muted-text)' }}>
                            <p>Sun Sep 14, 2025 at 7:00 PM EST (5:00 PM MST)</p>
                            <p className="mt-1">Robert Chen – driver</p>
                          </div>
                        </div>
                      </div>

                      {/* Event 5 - Vehicle Assigned */}
                      <div className="relative flex items-start gap-4">
                        <div
                          className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                          style={{ backgroundColor: 'var(--blue-600)' }}
                        >
                          <Car className="w-6 h-6 text-white" />
                        </div>

                        <div className="flex-1 pt-2">
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="text-lg font-bold underline" style={{ color: 'var(--heading)' }}>MA92XY45 Honda Pilot</h4>
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
                          <div className="text-sm" style={{ color: 'var(--muted-text)' }}>
                            <p>Sun Sep 14, 2025</p>
                            <p className="mt-1">System</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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
        <div className="col-span-5 min-w-0 h-full">
          <div className="h-full">

            {/* Map Container */}
            <div className="h-full bg-gray-200 overflow-hidden">
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
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setShowAllDrivers(false)}
        >
          <div
            className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
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


      {/* Driver modal is managed by parent; nothing to render here */}

      {/* Route View Modal */}
      <RouteViewModal
        isOpen={showRouteModal}
        onClose={() => setShowRouteModal(false)}
        routeId={rideData?.route?.id}
      />

      {/* Modal Components */}
      <ForceStartModal
        isOpen={showForceStartModal}
        onClose={() => setShowForceStartModal(false)}
        rideId={rideId}
        onConfirm={(data) => {
          console.log('Force Start confirmed:', data);
          // Handle force start logic here
        }}
      />

      <ForceCompleteModal
        isOpen={showForceCompleteModal}
        onClose={() => setShowForceCompleteModal(false)}
        rideId={rideId}
        onConfirm={(data) => {
          console.log('Force Complete confirmed:', data);
          // Handle force complete logic here
        }}
      />

      <ForceNoShowModal
        isOpen={showForceNoShowModal}
        onClose={() => setShowForceNoShowModal(false)}
        rideId={rideId}
        onConfirm={(data) => {
          console.log('Force No-Show confirmed:', data);
          // Handle force no-show logic here
        }}
      />

      <DuplicateModal
        isOpen={showDuplicateTripModal}
        onClose={() => setShowDuplicateTripModal(false)}
        rideId={rideId}
        onConfirm={(data) => {
          console.log('Duplicate confirmed:', data);
          // Handle duplicate logic here
        }}
      />

      <ManageTripModal
        isOpen={showManageTripModal}
        onClose={() => setShowManageTripModal(false)}
        rideId={rideId}
        onConfirm={(data) => {
          console.log('Manage Trip confirmed:', data);
          // Handle manage trip logic here
        }}
      />

      <EditTripModal
        isOpen={showEditTripModal}
        onClose={() => setShowEditTripModal(false)}
        rideId={rideId}
        onConfirm={(data) => {
          console.log('Edit Trip confirmed:', data);
          // Handle edit trip logic here
        }}
      />
    </div>
  )
}
