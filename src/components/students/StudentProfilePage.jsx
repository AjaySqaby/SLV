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

export default function StudentProfilePage({ studentId }) {
  const [activeTab, setActiveTab] = useState('upcoming')
  const [showManageTripModal, setShowManageTripModal] = useState(false)
  const [showAddGuardianModal, setShowAddGuardianModal] = useState(false)
  const [newGuardian, setNewGuardian] = useState({
    name: '',
    phone: '',
    email: '',
    relationship: ''
  })

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
    secondaryGuardian: {
      name: "MICHAEL JOHNSON (secondary)",
      phone: "(217) 555-0157",
      email: "michael.johnson@email.com"
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
        time: "2:30-3:05 PM",
        status: "Scheduled",
        route: "MNPS → Brookhaven",
        driver: "Jamal R.",
        vehicle: "Ford Transit 250"
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

  const handleManageTrip = () => {
    setShowManageTripModal(true)
  }

  return (
    <div className="bg-transparent min-h-screen">
      {/* Student Profile Header - Redesigned to match Driver Profile */}
      <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border border-[var(--gray-200)] overflow-hidden bg-[var(--gray-100)] flex items-center justify-center">
              <img
                src={studentData.avatar || "/picture.jpg"}
                alt={studentData.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.querySelector('[data-fallback]')?.classList.remove('hidden');
                }}
              />
              <div data-fallback className="hidden w-full h-full flex items-center justify-center text-2xl font-bold text-[var(--primary)]">
                {studentData.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </div>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-2xl text-[var(--primary-black)]">{studentData.name}</div>
              <div className="text-sm text-[var(--muted-text)]">Student ID: {studentData.id}</div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <RiStarLine 
                      key={i} 
                      className={`w-4 h-4 ${i < 4 ? 'text-[var(--amber-500)]' : 'text-[var(--gray-300)]'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-[var(--muted-text)]">4.0</span>
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
                <RiPhoneLine className="w-4 h-4" />
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
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
                  <p className="text-sm" style={{ color: 'var(--muted-text)' }}>
                    Student ID: {studentData.studentId}
                  </p>
                </div>
              </div>
            </Card>

            {/* Guardian Info */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold" style={{ color: 'var(--heading)' }}>Guardian Info</h3>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2"
                  onClick={() => setShowAddGuardianModal(true)}
                >
                  <RiUserLine className="w-4 h-4" />
                  Add Guardian
                </Button>
              </div>
              <div className="space-y-4">
                {/* Primary Guardian */}
                <div className="p-3 rounded-lg border" style={{ borderColor: 'var(--gray-200)' }}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium px-2 py-1 rounded-full text-white" style={{ backgroundColor: 'var(--blue-500)' }}>
                      Primary
                    </span>
                    <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                      <RiCloseLine className="w-4 h-4" />
                    </Button>
                  </div>
                  <p className="text-sm font-medium" style={{ color: 'var(--heading)' }}>
                    {studentData.guardian.name}
                  </p>
                  <div className="flex items-center gap-3 mt-2">
                    <RiPhoneLine className="w-4 h-4" style={{ color: 'var(--muted-text)' }} />
                    <span className="text-sm" style={{ color: 'var(--muted-text)' }}>
                      {studentData.guardian.phone}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <RiMailLine className="w-4 h-4" style={{ color: 'var(--muted-text)' }} />
                    <span className="text-sm" style={{ color: 'var(--muted-text)' }}>
                      {studentData.guardian.email}
                    </span>
                  </div>
                </div>

                {/* Secondary Guardian (if exists) */}
                {studentData.secondaryGuardian && (
                  <div className="p-3 rounded-lg border" style={{ borderColor: 'var(--gray-200)' }}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-medium px-2 py-1 rounded-full text-white" style={{ backgroundColor: 'var(--green-500)' }}>
                        Secondary
                      </span>
                      <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700">
                        <RiCloseLine className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm font-medium" style={{ color: 'var(--heading)' }}>
                      {studentData.secondaryGuardian.name}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <RiPhoneLine className="w-4 h-4" style={{ color: 'var(--muted-text)' }} />
                      <span className="text-sm" style={{ color: 'var(--muted-text)' }}>
                        {studentData.secondaryGuardian.phone}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-1">
                      <RiMailLine className="w-4 h-4" style={{ color: 'var(--muted-text)' }} />
                      <span className="text-sm" style={{ color: 'var(--muted-text)' }}>
                        {studentData.secondaryGuardian.email}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            </Card>

            {/* Schedule Info */}
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <RiCalendarLine className="w-5 h-5" style={{ color: 'var(--blue-600)' }} />
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

            {/* Schedules (renamed from Programs) */}
            <Card className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold" style={{ color: 'var(--heading)' }}>Schedules</h3>
                <Button variant="ghost" size="sm" style={{ color: 'var(--blue-600)' }}>
                  View past schedules
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
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <RiGroupLine className="w-5 h-5" style={{ color: 'var(--blue-600)' }} />
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
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <RiAlertLine className="w-5 h-5" style={{ color: 'var(--blue-600)' }} />
                <h3 className="font-bold" style={{ color: 'var(--heading)' }}>Equipment & Special Needs</h3>
              </div>
              
              {/* Accessibility */}
              <div className="mb-3">
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
              <div className="mb-3">
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
              <div className="mb-3">
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

          {/* Right Column */}
          <div className="lg:col-span-1 space-y-6">
            {/* Transportation */}
            <Card className="p-4">
              <h3 className="font-bold mb-4" style={{ color: 'var(--heading)' }}>Transportation</h3>
              <div className="flex items-center gap-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold"
                  style={{ backgroundColor: 'var(--blue-600)' }}
                >
                  {studentData.transportation.partner.charAt(0)}
                </div>
                <div>
                  <p className="font-medium" style={{ color: 'var(--heading)' }}>
                    {studentData.transportation.partner}
                  </p>
                  <p className="text-sm" style={{ color: 'var(--muted-text)' }}>
                    Transportation Partner
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Modals */}
      {/* Add Guardian Modal */}
      {showAddGuardianModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] backdrop-blur-sm"
          onClick={() => setShowAddGuardianModal(false)}
        >
          <div 
            className="bg-white rounded-2xl w-[95vw] h-[90vh] max-w-7xl mx-4 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: 'var(--gray-200)' }}>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-3">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: 'var(--blue-600)' }}
                  >
                    <RiUserLine className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold" style={{ color: 'var(--heading)' }}>Add Secondary Guardian</h1>
                    <p className="text-sm" style={{ color: 'var(--muted-text)' }}>Add a secondary parent/guardian for this student</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowAddGuardianModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <RiCloseLine className="w-6 h-6" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 overflow-y-auto flex-1">
              {/* Form Fields */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--heading)' }}>
                    Full Name
                  </label>
                  <Input
                    type="text"
                    value={newGuardian.name}
                    onChange={(e) => setNewGuardian({...newGuardian, name: e.target.value})}
                    placeholder="Enter guardian's full name"
                    className="text-sm"
                    width="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--heading)' }}>
                    Phone Number
                  </label>
                  <Input
                    type="tel"
                    value={newGuardian.phone}
                    onChange={(e) => setNewGuardian({...newGuardian, phone: e.target.value})}
                    placeholder="(555) 123-4567"
                    icon={<RiPhoneLine className="w-4 h-4" />}
                    className="text-sm"
                    width="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--heading)' }}>
                    Email Address
                  </label>
                  <Input
                    type="email"
                    value={newGuardian.email}
                    onChange={(e) => setNewGuardian({...newGuardian, email: e.target.value})}
                    placeholder="guardian@example.com"
                    icon={<RiMailLine className="w-4 h-4" />}
                    className="text-sm"
                    width="w-full"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2" style={{ color: 'var(--heading)' }}>
                    Relationship
                  </label>
                  <Select
                    value={newGuardian.relationship}
                    onChange={(e) => setNewGuardian({...newGuardian, relationship: e.target.value})}
                    options={[
                      { value: '', label: 'Select relationship' },
                      { value: 'parent', label: 'Parent' },
                      { value: 'grandparent', label: 'Grandparent' },
                      { value: 'aunt', label: 'Aunt' },
                      { value: 'uncle', label: 'Uncle' },
                      { value: 'sibling', label: 'Sibling' },
                      { value: 'other', label: 'Other' }
                    ]}
                    className="text-sm"
                    width="w-full"
                  />
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-white border-t border-[var(--gray-200)] p-6">
              <div className="flex justify-end gap-3">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowAddGuardianModal(false)
                    setNewGuardian({ name: '', phone: '', email: '', relationship: '' })
                  }}
                  className="px-6 py-2"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    console.log('Guardian added:', newGuardian)
                    setShowAddGuardianModal(false)
                    setNewGuardian({ name: '', phone: '', email: '', relationship: '' })
                  }}
                  className="px-6 py-2"
                  style={{ 
                    backgroundColor: 'var(--blue-600)', 
                    color: 'var(--on-primary)' 
                  }}
                >
                  Add Guardian
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}