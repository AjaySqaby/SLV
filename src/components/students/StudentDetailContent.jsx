"use client";

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  User,
  Phone,
  Mail,
  MapPin,
  Building2,
  Route,
  Car,
  Users,
  ShieldX,
  Hash,
  Navigation,
  Calendar,
  Clock,
  GraduationCap,
  Home,
  Contact,
  Truck,
  CheckCircle,
  AlertCircle,
  Plus
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import StatusBadge from '@/components/ui/StatusBadge'
import Tabs from '@/components/ui/Tabs'
import Table from '@/components/ui/Table'
import RidesTable from '@/components/rides/RidesTable'
import DateRangePicker from '@/components/rides/DateRangePicker'
import RoutesTable from '@/components/routes/RoutesTable'
import dynamic from 'next/dynamic'

const RouteViewModal = dynamic(() => import('@/components/routes/RouteViewModal'), { ssr: false })

export default function StudentDetailContent({ studentId }) {
  const [activeTab, setActiveTab] = useState(0)
  const router = useRouter()
  const [rideStart, setRideStart] = useState(null)
  const [rideEnd, setRideEnd] = useState(null)
  const [showRouteModal, setShowRouteModal] = useState(false)
  const [selectedRouteId, setSelectedRouteId] = useState(null)

  // Mock data - replace with actual API call
  const studentData = {
    id: studentId,
    name: "Emma Johnson",
    grade: "Grade 9",
    campus: "Riverdale High",
    district: "Northside School District",
    address: "123 Lake St, Riverdale, GA",
    guardian: {
      name: "Robert Johnson",
      phone: "(404) 555-1234",
      email: "rjohnson@example.com"
    },
    transportation: {
      assignedRoutes: 1,
      scheduledRides: 2,
      status: "Active"
    },
    assignedRoutes: [
      {
        id: "RT-30842",
        name: "North District Route",
        stops: 5,
        distance: "12.4 mi",
        students: 7
      }
    ],
    rides: [
      {
        id: 1,
        route: "RT-30842",
        date: "04/02/2025",
        driver: "Yonathan Mekonnen",
        status: "In progress"
      },
      {
        id: 2,
        route: "RT-30842",
        date: "04/03/2025",
        driver: "Michael Johnson",
        status: "Assigned"
      }
    ],
    blockedDrivers: []
  }

  const tabs = [
    { id: 0, label: "Routes", icon: Route },
    { id: 1, label: "Rides", icon: Car },
    { id: 2, label: "Drivers", icon: Users },
    { id: 3, label: "Blocked Drivers", icon: ShieldX }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <Card className="p-6 bg-white shadow-sm border border-[var(--gray-100)]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[var(--gray-900)] flex items-center gap-2">
                <Route className="w-5 h-5 text-[var(--blue-600)]" />
                Assigned Routes ({studentData.assignedRoutes.length})
              </h2>
            </div>
            {(() => {
              const routesForTable = (studentData.assignedRoutes || []).map((r) => ({
                id: r.id,
                name: r.name,
                district: "86022-Z",
                stops: r.stops,
                distance: r.distance,
                students: r.students,
                status: "Active",
                driver: null
              }))
              return (
                <RoutesTable
                  routes={routesForTable}
                  onView={(id) => { setSelectedRouteId(id); setShowRouteModal(true); }}
                  onEdit={() => {}}
                  onSchedule={() => {}}
                  onAssignDriver={() => {}}
                />
              )
            })()}
          </Card>
        );

      case 1:
        return (
          <Card className="p-6 bg-white shadow-sm border border-[var(--gray-100)]">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-[var(--gray-900)] flex items-center gap-2">
                <Car className="w-5 h-5 text-[var(--blue-600)]" />
                Scheduled Rides ({studentData.rides.length})
              </h2>
              <div className="w-full md:w-80">
                <DateRangePicker
                  startDate={rideStart}
                  endDate={rideEnd}
                  onDateRangeChange={(s, e) => {
                    setRideStart(s)
                    setRideEnd(e)
                  }}
                />
              </div>
            </div>
            <div className="bg-background rounded-lg border border-[var(--gray-200)] overflow-hidden">
              {(() => {
                const parseUsDate = (mmddyyyy) => {
                  if (!mmddyyyy) return null
                  const parts = String(mmddyyyy).split("/")
                  if (parts.length !== 3) return new Date(mmddyyyy)
                  const [mm, dd, yyyy] = parts.map((v) => parseInt(v, 10))
                  return new Date(yyyy, mm - 1, dd)
                }
                const filtered = (studentData.rides || []).filter((r) => {
                  const d = parseUsDate(r.date)
                  if (!d || isNaN(d.getTime())) return false
                  if (rideStart && d < new Date(rideStart.getFullYear(), rideStart.getMonth(), rideStart.getDate())) return false
                  if (rideEnd && d > new Date(rideEnd.getFullYear(), rideEnd.getMonth(), rideEnd.getDate())) return false
                  return true
                })
                const ridesForTable = filtered.map((r) => ({
                  id: r.id,
                  district: r.route,
                  date: r.date,
                  scheduledTime: '08:30 AM',
                  timezone: 'America/Los_Angeles',
                  pickup: {
                    scheduled: '08:30 AM',
                    arrived: r.status === 'Completed' ? '08:35 AM' : '',
                    confirmed: '08:20 AM',
                    location: '1221 Broadway, Oakland, CA 94612',
                  },
                  dropoff: {
                    scheduled: '09:30 AM',
                    arrived: r.status === 'In progress' ? '09:10 AM' : '',
                    completed: r.status === 'Completed' ? '09:25 AM' : '',
                    location: '388 9th St, Oakland, CA 94607',
                  },
                  driver: { name: r.driver || 'Assigned Driver', vehicle: 'Ford Transit' },
                  details: { distance: '3.5 mi', duration: '30 min', stops: 2, students: 1 },
                  status: r.status,
                  nextStop: { address: 'Oakland High School' },
                  stops: [],
                }))
                return <RidesTable rides={ridesForTable} currentPage={1} itemsPerPage={ridesForTable.length || 10} />
              })()}
            </div>
          </Card>
        );

      case 2:
        return (
          <Card className="p-6 bg-white shadow-sm border border-[var(--gray-100)]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[var(--gray-900)] flex items-center gap-2">
                <Users className="w-5 h-5 text-[var(--blue-600)]" />
                Assigned Drivers (0)
              </h2>
            </div>
            <div className="text-center py-12">
              <Users className="w-16 h-16 text-[var(--gray-300)] mx-auto mb-4" />
              <p className="text-[var(--gray-500)] text-lg">No drivers assigned to this student.</p>
              <p className="text-[var(--gray-400)] text-sm mt-2">Drivers will appear here when assigned to rides.</p>
            </div>
          </Card>
        );

      case 3:
        return (
          <Card className="p-6 bg-white shadow-sm border border-[var(--gray-100)]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[var(--gray-900)] flex items-center gap-2">
                <ShieldX className="w-5 h-5 text-[var(--blue-600)]" />
                Blocked Drivers ({studentData.blockedDrivers.length})
              </h2>
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 text-[var(--gray-600)] border-[var(--gray-300)] hover:bg-[var(--gray-50)]"
              >
                <Plus className="w-4 h-4" />
                Block Driver
              </Button>
            </div>
            <div className="text-center py-12">
              <ShieldX className="w-16 h-16 text-[var(--gray-300)] mx-auto mb-4" />
              <h3 className="text-lg font-medium text-[var(--gray-900)] mb-2">Blocked Drivers</h3>
              <p className="text-[var(--gray-500)] text-sm">Drivers who are not allowed to transport this student.</p>
              <div className="mt-4">
                <p className="text-[var(--gray-400)] text-sm">Loading...</p>
              </div>
            </div>
          </Card>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      <div className="w-full px-6 pb-6">
        {/* Back Navigation */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-[var(--blue-600)] hover:text-[var(--blue-700)] hover:bg-[var(--blue-50)] px-3 py-2 rounded-lg transition-all duration-200"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="font-medium">Back to Students</span>
          </Button>
        </div>

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[var(--blue-600)] rounded-xl flex items-center justify-center shadow-lg">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--gray-900)]">{studentData.name}</h1>
              <p className="text-[var(--gray-600)] flex items-center gap-2 mt-1">
                <GraduationCap className="w-4 h-4" />
                {studentData.grade} • {studentData.campus}
              </p>
            </div>
          </div>
        </div>

        {/* Information Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Student Information Card */}
          <Card className="p-6 bg-white shadow-sm border border-[var(--gray-100)] hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[var(--blue-600)] rounded-lg flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--gray-900)]">Student Information</h3>
            </div>

            <div className="flex flex-col items-center mb-6">
              <div className="w-20 h-20 bg-[var(--gray-200)] rounded-full flex items-center justify-center mb-4 shadow-inner">
                <span className="text-2xl font-bold text-[var(--gray-700)]">
                  {studentData.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h4 className="text-xl font-semibold text-[var(--gray-900)] mb-1">{studentData.name}</h4>
              <p className="text-[var(--gray-600)] flex items-center gap-1">
                <GraduationCap className="w-4 h-4" />
                {studentData.grade}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-lg">
                <Hash className="w-4 h-4 text-[var(--gray-500)]" />
                <div>
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Student ID</span>
                  <p className="text-sm font-medium text-[var(--gray-900)]">{studentData.id}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-lg">
                <Building2 className="w-4 h-4 text-[var(--gray-500)]" />
                <div>
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Campus</span>
                  <p 
                    className="text-sm text-[var(--blue-600)] hover:underline cursor-pointer font-medium transition-colors hover:text-[var(--blue-700)]"
                    onClick={() => {
                      // You can add campus modal functionality here if needed
                      console.log('Campus clicked:', studentData.campus)
                    }}
                  >
                    {studentData.campus}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-lg">
                <Building2 className="w-4 h-4 text-[var(--gray-500)]" />
                <div>
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">District</span>
                  <p 
                    className="text-sm text-[var(--blue-600)] hover:underline cursor-pointer font-medium transition-colors hover:text-[var(--blue-700)]"
                    onClick={() => {
                      // You can add district modal functionality here if needed
                      console.log('District clicked:', studentData.district)
                    }}
                  >
                    {studentData.district}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-lg">
                <Home className="w-4 h-4 text-[var(--gray-500)]" />
                <div>
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Address</span>
                  <p className="text-sm text-[var(--gray-900)]">{studentData.address}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Guardian Information Card */}
          <Card className="p-6 bg-white shadow-sm border border-[var(--gray-100)] hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[var(--blue-600)] rounded-lg flex items-center justify-center">
                <Contact className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--gray-900)]">Guardian Information</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-lg">
                <User className="w-4 h-4 text-[var(--gray-500)]" />
                <div>
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Name</span>
                  <p className="text-sm font-medium text-[var(--gray-900)]">{studentData.guardian.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-lg">
                <Phone className="w-4 h-4 text-[var(--gray-500)]" />
                <div>
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Phone</span>
                  <p className="text-sm text-[var(--gray-900)]">{studentData.guardian.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-lg">
                <Mail className="w-4 h-4 text-[var(--gray-500)]" />
                <div>
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Email</span>
                  <p className="text-sm text-[var(--gray-900)]">{studentData.guardian.email}</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Transportation Details Card */}
          <Card className="p-6 bg-white shadow-sm border border-[var(--gray-100)] hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-[var(--blue-600)] rounded-lg flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-[var(--gray-900)]">Transportation Details</h3>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-lg">
                <Route className="w-4 h-4 text-[var(--gray-500)]" />
                <div>
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Assigned Routes</span>
                  <p className="text-sm font-medium text-[var(--gray-900)]">{studentData.transportation.assignedRoutes}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-lg">
                <Car className="w-4 h-4 text-[var(--gray-500)]" />
                <div>
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Scheduled Rides</span>
                  <p className="text-sm font-medium text-[var(--gray-900)]">{studentData.transportation.scheduledRides}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-lg">
                <CheckCircle className="w-4 h-4 text-[var(--gray-500)]" />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Status</span>
                  <StatusBadge status={studentData.transportation.status} />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <Tabs
            tabs={tabs}
            activeTab={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Tab Content */}
        {renderTabContent()}
      </div>

      {/* Route Details modal */}
      <RouteViewModal
        isOpen={showRouteModal}
        onClose={() => { setShowRouteModal(false); setSelectedRouteId(null); }}
        routeId={selectedRouteId}
      />
    </div>
  )
}
