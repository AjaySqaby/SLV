"use client";

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
  CheckCircle
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import StatusBadge from '@/components/ui/StatusBadge'
import Tabs from '@/components/ui/Tabs'
import Table from '@/components/ui/Table'
import StudentsTab from '@/components/campus/details/StudentsTab'
import RoutesTab from '@/components/campus/details/RoutesTab'
import RidesTab from '@/components/campus/details/RidesTab'

export default function CampusDetailContent({ campusId }) {
  const [activeTab, setActiveTab] = useState(0)
  const router = useRouter()

  // Mock data - replace with actual API call based on campusId
  const campusData = {
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
  }

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

  const tabs = [
    { id: 0, label: "Students", icon: Users },
    { id: 1, label: "Routes", icon: Route },
    { id: 2, label: "Rides", icon: Car }
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return <StudentsTab students={students} />

      case 1:
        return <RoutesTab routes={routes} />

      case 2:
        return <RidesTab rides={rides} />

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
            <span className="font-medium">Back to Campus</span>
          </Button>
        </div>

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[var(--orange-600)] rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--gray-900)]">{campusData.name}</h1>
              <p className="text-[var(--gray-600)] flex items-center gap-2 mt-1">
                <Building className="w-4 h-4" />
                {campusData.type} • {campusData.district}
              </p>
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
                  {campusData.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <h4 className="text-xl font-semibold text-[var(--gray-900)] mb-1">{campusData.name}</h4>
              <p className="text-[var(--gray-600)] flex items-center gap-1">
                <Building className="w-4 h-4" />
                {campusData.type}
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-lg">
                <Hash className="w-4 h-4 text-[var(--gray-500)]" />
                <div>
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Campus ID</span>
                  <p className="text-sm font-medium text-[var(--gray-900)]">{campusData.id}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-lg">
                <Building className="w-4 h-4 text-[var(--gray-500)]" />
                <div>
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">District</span>
                  <p className="text-sm text-[var(--blue-600)] hover:underline cursor-pointer font-medium transition-colors hover:text-[var(--blue-700)]">
                    {campusData.district}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-lg">
                <MapPin className="w-4 h-4 text-[var(--gray-500)]" />
                <div>
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Address</span>
                  <p className="text-sm text-[var(--gray-900)]">{campusData.address}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-lg">
                <Users className="w-4 h-4 text-[var(--gray-500)]" />
                <div>
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Total Students</span>
                  <p className="text-sm font-medium text-[var(--gray-900)]">{campusData.students}</p>
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
                <div>
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Name</span>
                  <p className="text-sm font-medium text-[var(--gray-900)]">{campusData.principal.name}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-lg">
                <Phone className="w-4 h-4 text-[var(--gray-500)]" />
                <div>
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Phone</span>
                  <p className="text-sm text-[var(--gray-900)]">{campusData.principal.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-lg">
                <Mail className="w-4 h-4 text-[var(--gray-500)]" />
                <div>
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Email</span>
                  <p className="text-sm text-[var(--gray-900)]">{campusData.principal.email}</p>
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
                  <StatusBadge status={campusData.transportation.status} />
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
        <div className="bg-white rounded-lg shadow-sm border border-[var(--gray-100)] p-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  )
}
