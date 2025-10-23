"use client";

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import {
  ArrowLeft,
  Building2,
  Phone,
  Mail,
  MapPin,
  Users,
  Route,
  Car,
  Hash,
  GraduationCap,
  Building,
  CheckCircle,
  Edit3,
  Save,
  X,
  Calendar
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import StatusBadge from '@/components/ui/StatusBadge'
import Tabs from '@/components/ui/Tabs'
import Table from '@/components/ui/Table'
import StudentsTab from '@/components/campus/details/StudentsTab'
import RoutesTab from '@/components/campus/details/RoutesTab'
import RidesTab from '@/components/campus/details/RidesTab'
import HolidayExceptionsTab from '@/components/campus/details/HolidayExceptionsTab'

export default function CampusDetailContent({ campusId, isModal = false, isEditMode = false }) {
  const [activeTab, setActiveTab] = useState(0)
  const [isEditing, setIsEditing] = useState(isEditMode)
  const [editedCampusData, setEditedCampusData] = useState(null)
  const [holidays, setHolidays] = useState([])
  const router = useRouter()
  const searchParams = useSearchParams()

  // Mock data - replace with actual API call based on campusId
  const [campusData, setCampusData] = useState({
    id: campusId,
    name: "Riverside High School",
    type: "High School",
    district: "Northside School District (86022-Z)",
    address: "2000 School Rd, Riverdale, GA",
    students: 1250,
    status: "Active",
    principal: {
      name: "Dr. Sarah Mitchell",
      phone: "(404) 555-9876",
      email: "s.mitchell@riverdale.edu"
    },
    transportation: {
      assignedRoutes: 5,
      scheduledRides: 8,
      status: "Active"
    }
  })

  // Initialize editedData when in edit mode or when isEditing becomes true
  useEffect(() => {
    if ((isEditMode || isEditing) && campusData) {
      setEditedCampusData({ ...campusData })
    }
  }, [isEditMode, isEditing, campusData])

  // Initialize editedCampusData if in edit mode and campusData is available
  useEffect(() => {
    if (isEditMode && campusData && !editedCampusData) {
      setEditedCampusData({ ...campusData })
    }
  }, [isEditMode, campusData, editedCampusData])

  const students = [
    {
      id: "S-001",
      name: "Emma Johnson",
      grade: 9,
      homeroom: "9A",
      address: "123 Lake St, Riverdale, GA",
      transportation: "Route R-002",
      status: "Active",
    },
    {
      id: "S-002",
      name: "Jacob Martinez",
      grade: 11,
      homeroom: "11C",
      address: "789 Pine Ave, Sandy Springs, GA",
      transportation: "Route R-001",
      status: "Active",
    },
  ]

  const routes = [
    {
      id: "RT-30842",
      name: "North District Route",
      stops: 5,
      distance: "12.4 mi",
      students: 7,
      status: "Active",
    },
    {
      id: "RT-30843",
      name: "South Campus Route",
      stops: 4,
      distance: "10.2 mi",
      students: 5,
      status: "Active",
    },
  ]

  const rides = [
    {
      id: 1,
      route: "RT-30842",
      date: "04/02/2025",
      driver: "Yonathan Mekonnen",
      status: "In progress",
    },
    {
      id: 2,
      route: "RT-30843",
      date: "04/03/2025",
      driver: "Michael Johnson",
      status: "Assigned",
    },
  ]

  // Mock holidays data
  const mockHolidays = [
    {
      id: 1,
      title: "Winter Break",
      type: "no_school",
      startDate: "2024-12-23",
      endDate: "2024-12-31",
      description: "Winter holiday break - no school",
      affectsTransportation: true
    },
    {
      id: 2,
      title: "Teacher In-Service Day",
      type: "no_school",
      startDate: "2024-11-15",
      endDate: "2024-11-15",
      description: "Professional development day for teachers",
      affectsTransportation: true
    },
    {
      id: 3,
      title: "Early Dismissal - Parent Conferences",
      type: "schedule_change",
      startDate: "2024-10-25",
      endDate: "2024-10-25",
      description: "Students dismissed 2 hours early for parent-teacher conferences",
      affectsTransportation: true
    }
  ]

  // Initialize holidays data
  useEffect(() => {
    setHolidays(mockHolidays)
  }, [])

  const tabs = [
    { id: 0, label: "Students", icon: Users },
    { id: 1, label: "Routes", icon: Route },
    { id: 2, label: "Rides", icon: Car },
    { id: 3, label: "Holidays & Exceptions", icon: Calendar }
  ]

  const handleEditToggle = () => {
    if (isEditing) {
      // Save changes
      console.log('Saving changes:', editedCampusData)
      // Update the main campus data with edited data
      setCampusData(editedCampusData)
      // Here you would make API call to save data
      setIsEditing(false)
      setEditedCampusData(null)
    } else {
      // Start editing
      setEditedCampusData({ ...campusData })
      setIsEditing(true)
    }
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
    setEditedCampusData(null)
  }

  const handleFieldChange = (field, value) => {
    setEditedCampusData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePrincipalFieldChange = (field, value) => {
    setEditedCampusData(prev => ({
      ...prev,
      principal: {
        ...prev.principal,
        [field]: value
      }
    }))
  }

  // Holiday management functions
  const handleAddHoliday = (newHoliday) => {
    const holiday = {
      ...newHoliday,
      id: Date.now(), // Simple ID generation
    }
    setHolidays(prev => [...prev, holiday])
  }

  const handleEditHoliday = (id, updatedHoliday) => {
    setHolidays(prev => prev.map(holiday => 
      holiday.id === id ? { ...updatedHoliday, id } : holiday
    ))
  }

  const handleDeleteHoliday = (id) => {
    setHolidays(prev => prev.filter(holiday => holiday.id !== id))
  }

  const currentData = isEditing ? editedCampusData : campusData
  // Ensure currentData is never null
  const safeCurrentData = currentData || campusData

  // Check for edit parameter in URL
  useEffect(() => {
    const editParam = searchParams.get('edit')
    if (editParam === 'true' && !isEditing) {
      setEditedCampusData({ ...campusData })
      setIsEditing(true)
      // Remove edit parameter from URL
      const newUrl = new URL(window.location)
      newUrl.searchParams.delete('edit')
      window.history.replaceState({}, '', newUrl.pathname)
    }
  }, [searchParams, campusData, isEditing])

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <StudentsTab students={students} />

      case 1:
        return <RoutesTab routes={routes} />

      case 2:
        return <RidesTab rides={rides} />

      case 3:
        return (
          <HolidayExceptionsTab 
            holidays={holidays}
            onAddHoliday={handleAddHoliday}
            onEditHoliday={handleEditHoliday}
            onDeleteHoliday={handleDeleteHoliday}
          />
        )

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      <div className="w-full px-6 pb-6">
        {/* Back Navigation - Only show if not in modal */}
        {!isModal && (
          <div className="mb-6">
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center gap-2 text-[var(--blue-600)] hover:text-[var(--blue-700)] hover:bg-[var(--blue-50)] px-3 py-2 rounded-lg transition-all duration-200"
              onClick={() => window.history.back()}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-medium">Back to Campus</span>
            </Button>
          </div>
        )}

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[var(--primary)] rounded-xl flex items-center justify-center shadow-lg">
                <Building2 className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[var(--gray-900)]">{safeCurrentData.name}</h1>
                <p className="text-[var(--gray-600)] flex items-center gap-2 mt-1">
                  <Building className="w-4 h-4" />
                  {safeCurrentData.type} • {safeCurrentData.district}
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<X className="w-4 h-4" />}
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<Save className="w-4 h-4" />}
                    onClick={handleEditToggle}
                  >
                    Save Changes
                  </Button>
                </>
              ) : (
                <Button
                  variant="outline"
                  size="sm"
                  icon={<Edit3 className="w-4 h-4" />}
                  onClick={handleEditToggle}
                >
                  Edit Campus
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Campus Information Card */}
          <Card className="p-6 bg-white shadow-sm border border-[var(--gray-100)] hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[var(--orange-600)] rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--gray-900)]">Campus Information</h3>
            </div>

            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 bg-[var(--gray-200)] rounded-full flex items-center justify-center mb-4 shadow-inner">
                <span className="text-2xl font-bold text-[var(--gray-700)]">
                  {safeCurrentData.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              {isEditing ? (
                <input
                  type="text"
                  value={safeCurrentData.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  className="text-xl font-semibold text-[var(--gray-900)] mb-1 border border-[var(--gray-300)] rounded px-2 py-1 text-center"
                />
              ) : (
                <h4 className="text-xl font-semibold text-[var(--gray-900)] mb-1">{safeCurrentData.name}</h4>
              )}
              <p className="text-[var(--gray-600)] flex items-center gap-1">
                <Building className="w-4 h-4" />
                {isEditing ? (
                  <select
                    value={safeCurrentData.type}
                    onChange={(e) => handleFieldChange('type', e.target.value)}
                    className="border border-[var(--gray-300)] rounded px-2 py-1 text-sm"
                  >
                    <option value="Elementary School">Elementary School</option>
                    <option value="Middle School">Middle School</option>
                    <option value="High School">High School</option>
                  </select>
                ) : (
                  safeCurrentData.type
                )}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-lg">
                <Hash className="w-4 h-4 text-[var(--gray-500)]" />
                <div className="flex-1">
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Campus ID</span>
                    <p className="text-sm font-medium text-[var(--gray-900)]">{safeCurrentData.id}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-lg">
                <Building className="w-4 h-4 text-[var(--gray-500)]" />
                <div className="flex-1">
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">District</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={safeCurrentData.district}
                      onChange={(e) => handleFieldChange('district', e.target.value)}
                      className="text-sm font-medium text-[var(--gray-900)] border border-[var(--gray-300)] rounded px-2 py-1 w-full mt-1"
                    />
                  ) : (
                    <p className="text-sm text-[var(--blue-600)] hover:underline cursor-pointer font-medium transition-colors hover:text-[var(--blue-700)]">
                      {safeCurrentData.district}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-lg">
                <MapPin className="w-4 h-4 text-[var(--gray-500)]" />
                <div className="flex-1">
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Address</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={safeCurrentData.address}
                      onChange={(e) => handleFieldChange('address', e.target.value)}
                      className="text-sm text-[var(--gray-900)] border border-[var(--gray-300)] rounded px-2 py-1 w-full mt-1"
                    />
                  ) : (
                    <p className="text-sm text-[var(--gray-900)]">{safeCurrentData.address}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-lg">
                <Users className="w-4 h-4 text-[var(--gray-500)]" />
                <div className="flex-1">
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Total Students</span>
                  {isEditing ? (
                    <input
                      type="number"
                      value={safeCurrentData.students}
                      onChange={(e) => handleFieldChange('students', parseInt(e.target.value))}
                      className="text-sm font-medium text-[var(--gray-900)] border border-[var(--gray-300)] rounded px-2 py-1 w-full mt-1"
                    />
                  ) : (
                    <p className="text-sm font-medium text-[var(--gray-900)]">{safeCurrentData.students}</p>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Principal Information Card */}
          <Card className="p-6 bg-white shadow-sm border border-[var(--gray-100)] hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[var(--orange-600)] rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--gray-900)]">Principal Information</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-lg">
                <GraduationCap className="w-4 h-4 text-[var(--gray-500)]" />
                <div className="flex-1">
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Name</span>
                  {isEditing ? (
                    <input
                      type="text"
                      value={safeCurrentData.principal.name}
                      onChange={(e) => handlePrincipalFieldChange('name', e.target.value)}
                      className="text-sm font-medium text-[var(--gray-900)] border border-[var(--gray-300)] rounded px-2 py-1 w-full mt-1"
                    />
                  ) : (
                    <p className="text-sm font-medium text-[var(--gray-900)]">{safeCurrentData.principal.name}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-lg">
                <Phone className="w-4 h-4 text-[var(--gray-500)]" />
                <div className="flex-1">
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Phone</span>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={safeCurrentData.principal.phone}
                      onChange={(e) => handlePrincipalFieldChange('phone', e.target.value)}
                      className="text-sm text-[var(--gray-900)] border border-[var(--gray-300)] rounded px-2 py-1 w-full mt-1"
                    />
                  ) : (
                    <p className="text-sm text-[var(--gray-900)]">{safeCurrentData.principal.phone}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-lg">
                <Mail className="w-4 h-4 text-[var(--gray-500)]" />
                <div className="flex-1">
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Email</span>
                  {isEditing ? (
                    <input
                      type="email"
                      value={safeCurrentData.principal.email}
                      onChange={(e) => handlePrincipalFieldChange('email', e.target.value)}
                      className="text-sm text-[var(--gray-900)] border border-[var(--gray-300)] rounded px-2 py-1 w-full mt-1"
                    />
                  ) : (
                    <p className="text-sm text-[var(--gray-900)]">{safeCurrentData.principal.email}</p>
                  )}
                </div>
              </div>
            </div>
          </Card>

          {/* Transportation Details Card */}
          <Card className="p-6 bg-white shadow-sm border border-[var(--gray-100)] hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[var(--orange-600)] rounded-lg flex items-center justify-center">
                <Car className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--gray-900)]">Transportation Details</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-lg">
                <Route className="w-4 h-4 text-[var(--gray-500)]" />
                <div>
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Assigned Routes</span>
                  <p className="text-sm font-medium text-[var(--gray-900)]">{campusData.transportation.assignedRoutes}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-lg">
                <Car className="w-4 h-4 text-[var(--gray-500)]" />
                <div>
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Scheduled Rides</span>
                  <p className="text-sm font-medium text-[var(--gray-900)]">{campusData.transportation.scheduledRides}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-lg">
                <CheckCircle className="w-4 h-4 text-[var(--gray-500)]" />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Status</span>
                  <StatusBadge status={safeCurrentData.transportation.status} />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
      

        {/* Tab Content */}
        <div className="bg-white rounded-lg shadow-sm border border-[var(--gray-100)] p-6">
        <div className="flex items-center space-x-2 mb-6">
            <button 
              onClick={() => setActiveTab(0)}
              className={`px-6 py-3 text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:opacity-90 rounded-lg ${
                activeTab === 0 
                  ? 'text-white' 
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}
              style={activeTab === 0 ? { backgroundColor: 'var(--primary)' } : {}}
            >
              <Users className="w-4 h-4" />
              Students
            </button>
            <button 
              onClick={() => setActiveTab(1)}
              className={`px-6 py-3 text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:opacity-90 rounded-lg ${
                activeTab === 1 
                  ? 'text-white' 
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}
              style={activeTab === 1 ? { backgroundColor: 'var(--primary)' } : {}}
            >
              <Route className="w-4 h-4" />
              Routes
            </button>
            <button 
              onClick={() => setActiveTab(2)}
              className={`px-6 py-3 text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:opacity-90 rounded-lg ${
                activeTab === 2 
                  ? 'text-white' 
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}
              style={activeTab === 2 ? { backgroundColor: 'var(--primary)' } : {}}
            >
              <Car className="w-4 h-4" />
              Rides
            </button>
            <button 
              onClick={() => setActiveTab(3)}
              className={`px-6 py-3 text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:opacity-90 rounded-lg ${
                activeTab === 3 
                  ? 'text-white' 
                  : 'bg-gray-100 text-gray-600 border border-gray-200'
              }`}
              style={activeTab === 3 ? { backgroundColor: 'var(--primary)' } : {}}
            >
              <Calendar className="w-4 h-4" />
              Holidays & Exceptions
            </button>
          </div>
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}
