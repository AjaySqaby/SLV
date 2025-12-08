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
import Collapse from '@/components/ui/Collapse'
import StudentsTab from '@/components/campus/details/StudentsTab'
import RoutesTab from '@/components/campus/details/RoutesTab'
import RidesTab from '@/components/campus/details/RidesTab'
import HolidayExceptionsTab from '@/components/campus/details/HolidayExceptionsTab'

export default function CampusDetailContent({ campusId, isModal = false, isEditMode = false }) {
  const [activeTab, setActiveTab] = useState(null)
  const [isEditing, setIsEditing] = useState(isEditMode)
  const [editedCampusData, setEditedCampusData] = useState(null)
  const [holidays, setHolidays] = useState([])
  const [openCollapse, setOpenCollapse] = useState('campus-info')

  // Accordion state - only one collapse can be open at a time
  const handleCollapseToggle = (collapseId) => {
    setOpenCollapse(openCollapse === collapseId ? null : collapseId);
  };
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
    if (activeTab === null) return null;
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

  const renderContent = () => {
    return renderTabContent();
  };

  return (
    <div className={isModal ? '' : 'min-h-screen bg-[var(--gray-50)]'}>
      <div className={isModal ? '' : 'w-full px-6 pb-6'}>
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

        {/* Collapse - Campus Information */}
        <div className={isModal ? "px-6 pt-4" : "mb-8"}>
          <Collapse 
            title="Campus Information" 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-purple-600">
                <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            }
            isOpen={openCollapse === 'campus-info'}
            onToggle={() => handleCollapseToggle('campus-info')}
          >
            <div className="space-y-6">
              {/* Campus Profile Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full border border-[var(--gray-200)] overflow-hidden bg-[var(--gray-100)] flex items-center justify-center">
                    <Building2 className="w-8 h-8 text-[var(--purple-600)]" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-2xl text-[var(--primary-black)]">{safeCurrentData.name}</div>
                    <div className="text-sm text-[var(--muted-text)]">Campus ID: {safeCurrentData.id}</div>
                    <div className="text-sm text-[var(--muted-text)]">District: {safeCurrentData.district}</div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="bg-[var(--green)] text-white px-3 py-1 rounded-full text-sm font-medium" style={{ minWidth: '87px', minHeight: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    {safeCurrentData.status}
                  </div>
                </div>
              </div>

              {/* Campus Information Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--blue-100)] flex items-center justify-center">
                    <Hash className="w-4 h-4 text-[var(--blue-600)]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-[var(--muted-text)]">ID</div>
                    <div className="text-sm font-medium text-[var(--primary-black)]">{safeCurrentData.id}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--green-100)] flex items-center justify-center">
                    <GraduationCap className="w-4 h-4 text-[var(--green-600)]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-[var(--muted-text)]">TYPE</div>
                    <div className="text-sm font-medium text-[var(--primary-black)]">{safeCurrentData.type}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--orange-100)] flex items-center justify-center">
                    <Users className="w-4 h-4 text-[var(--orange-600)]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-[var(--muted-text)]">STUDENTS</div>
                    <div className="text-sm font-medium text-[var(--primary-black)]">{safeCurrentData.students}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--blue-100)] flex items-center justify-center">
                    <Building className="w-4 h-4 text-[var(--blue-600)]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-[var(--muted-text)]">DISTRICT</div>
                    <div className="text-sm font-medium text-[var(--primary-black)]">{safeCurrentData.district}</div>
                  </div>
                </div>
              </div>

              {/* Address Section */}
              <div className="pt-4 border-t border-[var(--gray-200)]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--orange-100)] flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-[var(--orange-600)]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-[var(--muted-text)]">ADDRESS</div>
                    <div className="text-sm font-medium text-[var(--primary-black)]">{safeCurrentData.address}</div>
                  </div>
                </div>
              </div>

              {/* Principal Information Section */}
              <div className="pt-4 border-t border-[var(--gray-200)]">
                <h4 className="text-md font-semibold text-[var(--primary-black)] mb-4">Principal Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--green-100)] flex items-center justify-center">
                      <GraduationCap className="w-4 h-4 text-[var(--green-600)]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-[var(--muted-text)]">PRINCIPAL</div>
                      <div className="text-sm font-medium text-[var(--primary-black)]">{safeCurrentData.principal.name}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--blue-100)] flex items-center justify-center">
                      <Phone className="w-4 h-4 text-[var(--blue-600)]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-[var(--muted-text)]">PHONE</div>
                      <div className="text-sm font-medium text-[var(--primary-black)]">{safeCurrentData.principal.phone}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--purple-100)] flex items-center justify-center">
                      <Mail className="w-4 h-4 text-[var(--purple-600)]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-[var(--muted-text)]">EMAIL</div>
                      <div className="text-sm font-medium text-[var(--primary-black)]">{safeCurrentData.principal.email}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Transportation Information Section */}
              <div className="pt-4 border-t border-[var(--gray-200)]">
                <h4 className="text-md font-semibold text-[var(--primary-black)] mb-4">Transportation Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--orange-100)] flex items-center justify-center">
                      <Route className="w-4 h-4 text-[var(--orange-600)]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-[var(--muted-text)]">ROUTES</div>
                      <div className="text-sm font-medium text-[var(--primary-black)]">{campusData.transportation.assignedRoutes}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--blue-100)] flex items-center justify-center">
                      <Car className="w-4 h-4 text-[var(--blue-600)]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-[var(--muted-text)]">RIDES</div>
                      <div className="text-sm font-medium text-[var(--primary-black)]">{campusData.transportation.scheduledRides}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--green-100)] flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-[var(--green-600)]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-[var(--muted-text)]">STATUS</div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="bg-[var(--green)] text-white px-3 py-1 rounded-full text-sm font-medium" style={{ minWidth: '87px', minHeight: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                          {safeCurrentData.transportation.status}
                        </div>
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
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-6 py-3 font-medium cursor-pointer transition-all duration-200 hover:opacity-90 rounded-lg"
                  style={{
                    backgroundColor: activeTab === tab.id ? 'var(--primary)' : 'var(--gray-100)',
                    color: activeTab === tab.id ? 'var(--on-primary)' : 'var(--muted-text)',
                    borderBottom: activeTab === tab.id ? '2px solid var(--primary)' : 'none',
                    marginRight: '4px',
                    fontSize: '14px'
                  }}
                >
                  <div className="flex items-center gap-2">
                    <tab.icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-4">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
