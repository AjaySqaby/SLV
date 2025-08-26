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

export default function StudentDetailContent({ studentId }) {
  const [activeTab, setActiveTab] = useState(0)
  const router = useRouter()

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
        status: "Active"
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

            <div className="overflow-x-auto">
              <Table
                columns={["Route ID", "Name", "Stops", "Distance", "Status", "Actions"]}
                data={studentData.assignedRoutes}
                renderRow={(route) => (
                  <tr key={route.id} className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)] transition-colors">
                    <td className="py-4 px-4 text-sm text-[var(--gray-900)] font-medium">{route.id}</td>
                    <td className="py-4 px-4 text-sm text-[var(--gray-900)]">{route.name}</td>
                    <td className="py-4 px-4 text-sm text-[var(--gray-900)]">{route.stops}</td>
                    <td className="py-4 px-4 text-sm text-[var(--gray-900)]">{route.distance}</td>
                    <td className="py-4 px-4">
                      <StatusBadge status={route.status} />
                    </td>
                    <td className="py-4 px-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-[var(--blue-600)] border-[var(--blue-200)] hover:bg-[var(--blue-50)] hover:border-[var(--blue-300)]"
                        onClick={() => window.location.href = `/routes/${route.id}`}
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                )}
              />
            </div>
          </Card>
        );

      case 1:
        return (
          <Card className="p-6 bg-white shadow-sm border border-[var(--gray-100)]">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-[var(--gray-900)] flex items-center gap-2">
                <Car className="w-5 h-5 text-[var(--blue-600)]" />
                Scheduled Rides ({studentData.rides.length})
              </h2>
            </div>

            <div className="overflow-x-auto">
              <Table
                columns={["Ride ID", "Route", "Scheduled Date", "Driver", "Status", "Actions"]}
                data={studentData.rides}
                renderRow={(ride) => (
                  <tr key={ride.id} className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)] transition-colors">
                    <td className="py-4 px-4 text-sm text-[var(--gray-900)] font-medium">{ride.id}</td>
                    <td className="py-4 px-4 text-sm text-[var(--gray-900)]">{ride.route}</td>
                    <td className="py-4 px-4 text-sm text-[var(--gray-900)]">{ride.date}</td>
                    <td className="py-4 px-4 text-sm text-[var(--gray-900)]">{ride.driver}</td>
                    <td className="py-4 px-4">
                      <StatusBadge
                        status={ride.status}
                        type={ride.status === "In progress" ? "active" : "warning"}
                      />
                    </td>
                    <td className="py-4 px-4">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-[var(--blue-600)] border-[var(--blue-200)] hover:bg-[var(--blue-50)] hover:border-[var(--blue-300)]"
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                )}
              />
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
    </div>
  )
}
