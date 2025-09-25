"use client";

import { useState } from 'react'
import { 
  ArrowLeft, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Calendar, 
  Clock, 
  Car, 
  Star, 
  AlertTriangle,
  Info,
  FileText,
  Building,
  GraduationCap,
  Users,
  Settings,
  Copy,
  UserX,
  Check,
  X
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import StatusBadge from '@/components/ui/StatusBadge'
import Select from '@/components/ui/Select'
import Input from '@/components/ui/Input'

export default function StudentProfilePage({ studentId }) {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [showForceNoShowModal, setShowForceNoShowModal] = useState(false)
  const [showDuplicateTripModal, setShowDuplicateTripModal] = useState(false)
  const [showManageTripModal, setShowManageTripModal] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState('')
  const [selectedAddress, setSelectedAddress] = useState('')
  const [noShowTime, setNoShowTime] = useState('')
  const [noShowReason, setNoShowReason] = useState('')
  const [duplicateDate, setDuplicateDate] = useState('')
  const [duplicateTime, setDuplicateTime] = useState('')
  const [selectedDriver, setSelectedDriver] = useState('')

  // Mock student data
  const studentData = {
    id: studentId,
    name: "Lily Tsegaye",
    status: "Active",
    age: "--",
    address: "2030 25th Ave N Apt 156, Nashville, TN 37208, USA",
    serviceType: "Direct Service",
    district: "Metro Nashville Public Schools",
    studentId: "STU001234",
    guardian: {
      name: "SARAH JOHNSON (primary)",
      phone: "(217) 555-0156",
      email: "sarah.johnson@email.com"
    },
    schedule: {
      bellTimes: "8:50 AM - 3:15 PM",
      earlyRelease: "Every Wednesday 2:00 PM"
    },
    notes: [
      "Please ensure wheelchair is properly secured",
      "Student prefers window seat on both sides"
    ],
    transportation: {
      partner: "Safe Ride Transport Co.",
      logo: "SAFE RIDE TRANSPORT CO."
    },
    programs: {
      year: "SY 2025-26",
      school: "Lincoln Elementary School",
      grade: "Grade 12",
      serviceAddress: "2030 25th Ave N Apt 156, Nashville, TN 37208, USA",
      pickup: "Mon-Fri",
      dropoff: "Mon-Fri"
    },
    upcomingRides: [
      {
        id: 1,
        date: "Tue Sep 16, 2025",
        time: "7:00-7:30 AM",
        status: "Scheduled",
        route: "Brookhaven → MNPS",
        driver: "Jamal R.",
        vehicle: "Ford Transit 250"
      },
      {
        id: 2,
        date: "Tue Sep 16, 2025",
        time: "2:30-3:00 PM",
        status: "Scheduled",
        route: "MNPS → Brookhaven",
        driver: "Jamal R.",
        vehicle: "Ford Transit 250"
      },
      {
        id: 3,
        date: "Wed Sep 17, 2025",
        time: "7:00-7:30 AM",
        status: "Scheduled",
        route: "Brookhaven → MNPS",
        driver: "Ana S.",
        vehicle: "Sprinter 12p"
      }
    ],
    pastRides: [
      {
        id: 4,
        date: "Mon, Sep 15, 2025",
        time: "2:30-3:05 PM",
        status: "Completed",
        route: "MNPS → Brookhaven",
        driver: "Ana S.",
        vehicle: "Sprinter 12p"
      },
      {
        id: 5,
        date: "Mon, Sep 15, 2025",
        time: "7:00-7:32 AM",
        status: "Completed",
        route: "Brookhaven → MNPS",
        driver: "Ana S.",
        vehicle: "Sprinter 12p"
      },
      {
        id: 6,
        date: "Fri, Sep 12, 2025",
        time: "2:30-3:10 PM",
        status: "Completed",
        route: "MNPS → Brookhaven",
        driver: "Marcus T.",
        vehicle: "SUV"
      }
    ],
    specialNeeds: {
      accessibility: ["Wheelchair Accessible", "Safety Harness Required"],
      healthNotes: ["Requires assistance boarding", "Inhaler on bus"],
      behaviorNotes: ["Prefers window seat", "Needs verbal reminders"],
      indicationNotes: ["Service animal present", "Needs verbal cues"]
    }
  }

  const handleForceNoShow = () => {
    setShowForceNoShowModal(true)
  }

  const handleDuplicateTrip = () => {
    setShowDuplicateTripModal(true)
  }

  const handleManageTrip = () => {
    setShowManageTripModal(true)
  }

  return (
    <div className="bg-transparent min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--gray-200)' }}>
        <div className="flex items-center gap-4">
         
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold" style={{ color: 'var(--heading)' }}>{studentData.name}</h1>
            <StatusBadge status={studentData.status} />
          </div>
        </div>
        
       
      </div>

      {/* Info Banner */}
      <div 
        className="p-4 mx-6 mt-4 rounded-lg flex items-center gap-3"
        style={{ backgroundColor: 'var(--blue-100)' }}
      >
        <Info className="w-5 h-5" style={{ color: 'var(--blue-600)' }} />
        <span className="text-sm" style={{ color: 'var(--blue-600)' }}>
          Showing data from Sep 11, 2025. Updated profile exists.
        </span>
        <Button 
          variant="secondary" 
          size="sm"
          className="ml-auto"
          style={{ backgroundColor: 'var(--blue-200)', color: 'var(--blue-600)' }}
        >
          View latest profile
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-12 gap-6 p-6">
        {/* Left Column */}
        <div className="col-span-5 space-y-6">
          {/* Profile Header */}
          <Card className="p-6">
            <div className="flex items-start gap-6">
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <img 
                  src="/picture.jpg" 
                  alt={studentData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--heading)' }}>
                  {studentData.name}
                </h2>
                <div className="flex items-center gap-4">
                  <button 
                    className={`text-sm font-medium pb-2 ${activeTab === 'general' ? 'border-b-2' : ''}`}
                    style={{ 
                      color: activeTab === 'general' ? 'var(--blue-600)' : 'var(--muted-text)',
                      borderColor: activeTab === 'general' ? 'var(--blue-600)' : 'transparent'
                    }}
                    onClick={() => setActiveTab('general')}
                  >
                    General
                  </button>
                  <button 
                    className={`text-sm font-medium pb-2 ${activeTab === 'rides' ? 'border-b-2' : ''}`}
                    style={{ 
                      color: activeTab === 'rides' ? 'var(--blue-600)' : 'var(--muted-text)',
                      borderColor: activeTab === 'rides' ? 'var(--blue-600)' : 'transparent'
                    }}
                    onClick={() => setActiveTab('rides')}
                  >
                    Rides
                  </button>
                </div>
              </div>
            </div>
          </Card>

          {/* Profile Details */}
          <Card className="p-6">
            <h3 className="font-bold mb-4" style={{ color: 'var(--heading)' }}>Profile</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-sm font-medium w-20" style={{ color: 'var(--muted-text)' }}>Age:</span>
                <span className="text-sm" style={{ color: 'var(--heading)' }}>{studentData.age}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5" style={{ color: 'var(--muted-text)' }} />
                <div>
                  <span className="text-sm font-medium" style={{ color: 'var(--heading)' }}>Home Address:</span>
                  <p className="text-sm" style={{ color: 'var(--muted-text)' }}>{studentData.address}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Info className="w-4 h-4" style={{ color: 'var(--blue-600)' }} />
                <span className="text-sm" style={{ color: 'var(--heading)' }}>{studentData.serviceType}</span>
              </div>
            </div>
          </Card>

          {/* District */}
          <Card className="p-6">
            <h3 className="font-bold mb-4" style={{ color: 'var(--heading)' }}>District</h3>
            <div className="space-y-2">
              <p className="text-sm font-medium" style={{ color: 'var(--blue-600)' }}>
                {studentData.district}
              </p>
              <p className="text-sm" style={{ color: 'var(--muted-text)' }}>
                Student ID: {studentData.studentId}
              </p>
            </div>
          </Card>

          {/* Guardian Info */}
          <Card className="p-6">
            <h3 className="font-bold mb-4" style={{ color: 'var(--heading)' }}>Guardian Info</h3>
            <div className="space-y-3">
              <p className="text-sm font-medium" style={{ color: 'var(--heading)' }}>
                {studentData.guardian.name}
              </p>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4" style={{ color: 'var(--muted-text)' }} />
                <span className="text-sm" style={{ color: 'var(--muted-text)' }}>
                  {studentData.guardian.phone}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4" style={{ color: 'var(--muted-text)' }} />
                <span className="text-sm" style={{ color: 'var(--muted-text)' }}>
                  {studentData.guardian.email}
                </span>
              </div>
            </div>
          </Card>

          {/* Schedule Info */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Calendar className="w-5 h-5" style={{ color: 'var(--blue-600)' }} />
              <h3 className="font-bold" style={{ color: 'var(--heading)' }}>Schedule Info</h3>
            </div>
            <div className="space-y-2">
              <p className="text-sm" style={{ color: 'var(--heading)' }}>
                Bell Times: {studentData.schedule.bellTimes}
              </p>
              <p className="text-sm" style={{ color: 'var(--heading)' }}>
                Early Release: {studentData.schedule.earlyRelease}
              </p>
            </div>
          </Card>

          {/* Notes */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5" style={{ color: 'var(--blue-600)' }} />
              <h3 className="font-bold" style={{ color: 'var(--heading)' }}>Notes</h3>
            </div>
            <div className="space-y-3">
              {studentData.notes.map((note, index) => (
                <div 
                  key={index}
                  className="p-3 rounded-lg text-sm"
                  style={{ 
                    backgroundColor: index === 0 ? 'var(--blue-100)' : 'var(--amber-100)',
                    color: 'var(--heading)'
                  }}
                >
                  {note}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column */}
        <div className="col-span-7 space-y-6">
          {/* Transportation */}
          <Card className="p-6">
            <h3 className="font-bold mb-4" style={{ color: 'var(--heading)' }}>Transportation</h3>
            <div className="flex items-center gap-4">
              <div 
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ backgroundColor: 'var(--blue-100)' }}
              >
                <Car className="w-6 h-6" style={{ color: 'var(--blue-600)' }} />
              </div>
              <div>
                <p className="font-bold" style={{ color: 'var(--heading)' }}>
                  {studentData.transportation.partner}
                </p>
                <p className="text-sm" style={{ color: 'var(--muted-text)' }}>
                  Transportation Partner
                </p>
              </div>
            </div>
          </Card>

          {/* Programs */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold" style={{ color: 'var(--heading)' }}>Programs</h3>
              <Button variant="ghost" size="sm" style={{ color: 'var(--blue-600)' }}>
                View past programs
              </Button>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-medium" style={{ color: 'var(--heading)' }}>
                {studentData.programs.year}: {studentData.programs.school} • {studentData.programs.grade}
              </p>
              <p className="text-sm" style={{ color: 'var(--muted-text)' }}>
                Service Address: {studentData.programs.serviceAddress}
              </p>
              <div className="flex items-center gap-4 mt-3">
                <span className="text-sm" style={{ color: 'var(--heading)' }}>
                  Pickup: {studentData.programs.pickup}
                </span>
                <span className="text-sm" style={{ color: 'var(--heading)' }}>
                  Dropoff: {studentData.programs.dropoff}
                </span>
              </div>
            </div>
          </Card>

          {/* Rides */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-5 h-5" style={{ color: 'var(--blue-600)' }} />
              <h3 className="font-bold" style={{ color: 'var(--heading)' }}>Rides</h3>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <button 
                className={`text-sm font-medium pb-2 ${activeTab === 'upcoming' ? 'border-b-2' : ''}`}
                style={{ 
                  color: activeTab === 'upcoming' ? 'var(--blue-600)' : 'var(--muted-text)',
                  borderColor: activeTab === 'upcoming' ? 'var(--blue-600)' : 'transparent'
                }}
                onClick={() => setActiveTab('upcoming')}
              >
                Upcoming
              </button>
              <button 
                className={`text-sm font-medium pb-2 ${activeTab === 'past' ? 'border-b-2' : ''}`}
                style={{ 
                  color: activeTab === 'past' ? 'var(--blue-600)' : 'var(--muted-text)',
                  borderColor: activeTab === 'past' ? 'var(--blue-600)' : 'transparent'
                }}
                onClick={() => setActiveTab('past')}
              >
                Past
              </button>
            </div>
            <div className="space-y-3">
              {(activeTab === 'upcoming' ? studentData.upcomingRides : studentData.pastRides).map((ride) => (
                <div key={ride.id} className="p-4 rounded-lg border" style={{ borderColor: 'var(--gray-200)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="text-sm font-medium" style={{ color: 'var(--heading)' }}>
                          {ride.date}
                        </p>
                        <p className="text-sm" style={{ color: 'var(--muted-text)' }}>
                          {ride.time}
                        </p>
                      </div>
                    </div>
                    <StatusBadge status={ride.status} />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm" style={{ color: 'var(--muted-text)' }}>
                      Route: {ride.route}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--muted-text)' }}>
                      Driver: {ride.driver}
                    </p>
                    <p className="text-sm" style={{ color: 'var(--muted-text)' }}>
                      Vehicle: {ride.vehicle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Equipment & Special Needs */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <AlertTriangle className="w-5 h-5" style={{ color: 'var(--blue-600)' }} />
              <h3 className="font-bold" style={{ color: 'var(--heading)' }}>Equipment & Special Needs</h3>
            </div>
            
            {/* Accessibility */}
            <div className="mb-4">
              <h4 className="font-medium mb-2" style={{ color: 'var(--heading)' }}>Accessibility</h4>
              <div className="flex gap-2">
                {studentData.specialNeeds.accessibility.map((item, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 text-xs rounded-full text-white"
                    style={{ 
                      backgroundColor: index === 0 ? 'var(--blue-500)' : 'var(--green-500)'
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Health Notes */}
            <div className="mb-4">
              <h4 className="font-medium mb-2" style={{ color: 'var(--heading)' }}>Health Notes</h4>
              <div className="space-y-2">
                {studentData.specialNeeds.healthNotes.map((note, index) => (
                  <div 
                    key={index}
                    className="p-2 rounded text-sm"
                    style={{ 
                      backgroundColor: 'var(--amber-100)',
                      color: 'var(--heading)'
                    }}
                  >
                    {note}
                  </div>
                ))}
              </div>
            </div>

            {/* Behavior Notes */}
            <div className="mb-4">
              <h4 className="font-medium mb-2" style={{ color: 'var(--heading)' }}>Behavior Notes</h4>
              <div className="space-y-2">
                {studentData.specialNeeds.behaviorNotes.map((note, index) => (
                  <div 
                    key={index}
                    className="p-2 rounded text-sm"
                    style={{ 
                      backgroundColor: 'var(--orange-100)',
                      color: 'var(--heading)'
                    }}
                  >
                    {note}
                  </div>
                ))}
              </div>
            </div>

            {/* Indication Notes */}
            <div>
              <h4 className="font-medium mb-2" style={{ color: 'var(--heading)' }}>Indication Notes</h4>
              <div className="space-y-2">
                {studentData.specialNeeds.indicationNotes.map((note, index) => (
                  <div 
                    key={index}
                    className="p-2 rounded text-sm"
                    style={{ 
                      backgroundColor: 'var(--yellow-100)',
                      color: 'var(--heading)'
                    }}
                  >
                    {note}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Modals */}
      {/* Force No Show Modal */}
      {showForceNoShowModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] backdrop-blur-sm"
          onClick={() => setShowForceNoShowModal(false)}
        >
          <div 
            className="bg-white rounded-2xl p-6 w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--red-600)' }}
                >
                  <UserX className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold" style={{ color: 'var(--heading)' }}>Force No Show</h2>
              </div>
              <button
                onClick={() => setShowForceNoShowModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--heading)' }}>
                  Select Student
                </label>
                <Select
                  options={[
                    { value: 'lily-tsegaye', label: 'Lily Tsegaye - STU001234' },
                    { value: 'marcus-johnson', label: 'Marcus Johnson - STU001235' },
                    { value: 'sarah-wilson', label: 'Sarah Wilson - STU001236' }
                  ]}
                  value={selectedStudent}
                  onChange={(e) => setSelectedStudent(e.target.value)}
                  placeholder="Choose a student..."
                  className="text-sm"
                  width="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--heading)' }}>
                  Select Address
                </label>
                <Select
                  options={[
                    { value: 'home', label: '2030 25th Ave N Apt 156, Nashville, TN 37208' },
                    { value: 'school', label: 'Lincoln Elementary School, 123 School St, Nashville, TN' },
                    { value: 'pickup', label: '1425 Oak Street Apt 204, Springfield, MA 01103' }
                  ]}
                  value={selectedAddress}
                  onChange={(e) => setSelectedAddress(e.target.value)}
                  placeholder="Choose pickup/dropoff address..."
                  className="text-sm"
                  width="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--heading)' }}>
                  Time of No Show
                </label>
                <Input
                  type="time"
                  value={noShowTime}
                  onChange={(e) => setNoShowTime(e.target.value)}
                  placeholder="--:--"
                  icon={<Clock className="w-4 h-4" />}
                  className="text-sm"
                  width="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--heading)' }}>
                  Reason (Optional)
                </label>
                <textarea
                  value={noShowReason}
                  onChange={(e) => setNoShowReason(e.target.value)}
                  placeholder="Additional details about the no show..."
                  className="w-full p-3 border rounded-lg text-sm resize-none"
                  style={{ 
                    borderColor: 'var(--gray-200)',
                    color: 'var(--heading)'
                  }}
                  rows={3}
                />
              </div>
            </div>

            {/* Warning Section */}
            <div 
              className="p-4 rounded-lg border mb-6"
              style={{ 
                backgroundColor: 'var(--red-100)',
                borderColor: 'var(--red-200)'
              }}
            >
              <div className="flex items-start gap-2">
                <AlertTriangle className="w-5 h-5 mt-0.5" style={{ color: 'var(--red-600)' }} />
                <div>
                  <p className="font-bold text-sm mb-1" style={{ color: 'var(--red-600)' }}>
                    Warning
                  </p>
                  <p className="text-sm" style={{ color: 'var(--red-600)' }}>
                    This action will mark the ride as a no-show and notify guardians automatically.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => setShowForceNoShowModal(false)}
                className="px-6 py-2"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log('No show confirmed:', { selectedStudent, selectedAddress, noShowTime, noShowReason })
                  setShowForceNoShowModal(false)
                  setSelectedStudent('')
                  setSelectedAddress('')
                  setNoShowTime('')
                  setNoShowReason('')
                }}
                className="px-6 py-2"
                style={{ 
                  backgroundColor: 'var(--red-600)', 
                  color: 'var(--on-danger)' 
                }}
              >
                Confirm No Show
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Duplicate Trip Modal */}
      {showDuplicateTripModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] backdrop-blur-sm"
          onClick={() => setShowDuplicateTripModal(false)}
        >
          <div 
            className="bg-white rounded-2xl p-6 w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ backgroundColor: 'var(--blue-100)' }}
                >
                  <Copy className="w-5 h-5" style={{ color: 'var(--blue-600)' }} />
                </div>
                <div>
                  <h2 className="text-xl font-bold" style={{ color: 'var(--heading)' }}>Duplicate Trip</h2>
                  <p className="text-sm" style={{ color: 'var(--muted-text)' }}>
                    Create a copy of this trip with the same route, stops, and students but different timing and driver.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowDuplicateTripModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Form Fields */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--heading)' }}>
                  New Date
                </label>
                <Input
                  type="date"
                  value={duplicateDate}
                  onChange={(e) => setDuplicateDate(e.target.value)}
                  placeholder="dd-mm-yyyy"
                  icon={<Calendar className="w-4 h-4" />}
                  className="text-sm"
                  width="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--heading)' }}>
                  New Time
                </label>
                <Input
                  type="time"
                  value={duplicateTime}
                  onChange={(e) => setDuplicateTime(e.target.value)}
                  placeholder="--:--"
                  icon={<Clock className="w-4 h-4" />}
                  className="text-sm"
                  width="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--heading)' }}>
                  Assign Driver
                </label>
                <Select
                  options={[
                    { value: 'jamal-r', label: 'Jamal R. - Ford Transit 250' },
                    { value: 'ana-s', label: 'Ana S. - Sprinter 12p' },
                    { value: 'marcus-t', label: 'Marcus T. - SUV' },
                    { value: 'lily-tsegaye', label: 'Lily Tsegaye - Tesla Model Y' }
                  ]}
                  value={selectedDriver}
                  onChange={(e) => setSelectedDriver(e.target.value)}
                  placeholder="Choose a driver..."
                  className="text-sm"
                  width="w-full"
                />
              </div>
            </div>

            {/* Trip Details Info Box */}
            <div 
              className="p-4 rounded-lg mb-6"
              style={{ backgroundColor: 'var(--blue-100)' }}
            >
              <h3 className="font-bold text-sm mb-2" style={{ color: 'var(--blue-600)' }}>
                Trip Details
              </h3>
              <p className="text-sm" style={{ color: 'var(--blue-600)' }}>
                Same route, stops, and student assignments will be copied to the new trip.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => setShowDuplicateTripModal(false)}
                className="px-6 py-2"
              >
                Cancel
              </Button>
              <Button
                onClick={() => {
                  console.log('Trip duplicated:', { duplicateDate, duplicateTime, selectedDriver })
                  setShowDuplicateTripModal(false)
                  setDuplicateDate('')
                  setDuplicateTime('')
                  setSelectedDriver('')
                }}
                className="px-6 py-2"
                style={{ 
                  backgroundColor: 'var(--blue-600)', 
                  color: 'var(--on-primary)' 
                }}
              >
                Create Duplicate
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Manage Trip Modal */}
      {showManageTripModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] backdrop-blur-sm"
          onClick={() => setShowManageTripModal(false)}
        >
          <div 
            className="bg-white rounded-2xl p-6 w-full max-w-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: 'var(--blue-600)' }}
                >
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <h2 className="text-xl font-bold" style={{ color: 'var(--heading)' }}>Manage Trip</h2>
              </div>
              <button
                onClick={() => setShowManageTripModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <div className="mb-6">
              <p className="text-sm" style={{ color: 'var(--muted-text)' }}>
                Manage trip details for {studentData.name}.
              </p>
            </div>
            <div className="flex items-center justify-end gap-3">
              <Button
                variant="secondary"
                onClick={() => setShowManageTripModal(false)}
                className="px-6 py-2"
              >
                Cancel
              </Button>
              <Button
                onClick={() => setShowManageTripModal(false)}
                className="px-6 py-2"
                style={{ 
                  backgroundColor: 'var(--blue-600)', 
                  color: 'var(--on-primary)' 
                }}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
