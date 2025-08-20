"use client";

import { useState } from 'react'
import { 
  ArrowLeft, 
  Wrench, 
  Calendar,
  DollarSign,
  MapPin,
  Clock,
  CheckCircle,
  AlertCircle,
  Edit,
  Trash2,
  Hash,
  User,
  Car
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import StatusBadge from '@/components/ui/StatusBadge'
import AddMaintenanceModal from './AddMaintenanceModal'

export default function MaintenanceDetailContent({ maintenanceId }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  // Mock data - replace with actual API call
  const maintenanceData = {
    id: maintenanceId,
    type: "Oil Change",
    serviceDate: "03/15/2025",
    serviceProvider: "QuickLube Service",
    mileage: "45,000",
    cost: "$89.99",
    status: "Completed",
    notes: "Used synthetic oil, replaced filter",
    nextDue: "06/15/2025",
    vehicle: "2020 Ford Transit",
    driver: "Yonathan Mekonnen"
  }

  return (
    <div className="min-h-screen bg-[var(--gray-50)]">
      <div className="w-full px-6 py-6">
        {/* Back Navigation */}
        <div className="mb-6">
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center gap-2 text-[var(--blue-600)] hover:text-[var(--blue-700)] hover:bg-[var(--blue-50)] px-3 py-2 rounded-lg transition-all duration-200"
            onClick={() => window.history.back()}
          >
            <ArrowLeft className="w-4 h-4 text-[var(--blue-600)]" />
            <span className="font-medium">Back to Maintenance</span>
          </Button>
        </div>

        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[var(--blue-600)] rounded-xl flex items-center justify-center shadow-lg">
              <Wrench className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--gray-900)]">{maintenanceData.type}</h1>
              <p className="text-[var(--gray-600)] flex items-center gap-2 mt-1">
                <Hash className="w-4 h-4 text-[var(--gray-600)]" />
                Maintenance ID: {maintenanceData.id}
              </p>
            </div>
          </div>
        </div>

        {/* Main Content Card */}
        <Card className="p-8 bg-white shadow-sm border border-[var(--gray-100)]">
          {/* Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 p-4 bg-[var(--gray-50)] rounded-lg">
                <Calendar className="w-5 h-5 text-[var(--gray-500)]" />
                <div>
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Service Date</span>
                  <p className="text-sm font-medium text-[var(--gray-900)]">{maintenanceData.serviceDate}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[var(--gray-50)] rounded-lg">
                <User className="w-5 h-5 text-[var(--gray-500)]" />
                <div>
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Service Provider</span>
                  <p className="text-sm font-medium text-[var(--gray-900)]">{maintenanceData.serviceProvider}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[var(--gray-50)] rounded-lg">
                <Car className="w-5 h-5 text-[var(--gray-500)]" />
                <div>
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Vehicle</span>
                  <p className="text-sm font-medium text-[var(--gray-900)]">{maintenanceData.vehicle}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[var(--gray-50)] rounded-lg">
                <User className="w-5 h-5 text-[var(--gray-500)]" />
                <div>
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Driver</span>
                  <p className="text-sm font-medium text-[var(--gray-900)]">{maintenanceData.driver}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-4 bg-[var(--gray-50)] rounded-lg">
                <AlertCircle className="w-5 h-5 text-[var(--gray-500)] mt-0.5" />
                <div>
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Notes</span>
                  <p className="text-sm text-[var(--gray-900)]">{maintenanceData.notes}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[var(--gray-50)] rounded-lg">
                <Clock className="w-5 h-5 text-[var(--gray-500)]" />
                <div>
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Next Due</span>
                  <p className="text-sm font-medium text-[var(--gray-900)]">{maintenanceData.nextDue}</p>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 p-4 bg-[var(--gray-50)] rounded-lg">
                <Hash className="w-5 h-5 text-[var(--gray-500)]" />
                <div>
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Mileage</span>
                  <p className="text-sm font-medium text-[var(--gray-900)]">{maintenanceData.mileage}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[var(--gray-50)] rounded-lg">
                <DollarSign className="w-5 h-5 text-[var(--gray-500)]" />
                <div>
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Cost</span>
                  <p className="text-sm font-medium text-[var(--gray-900)]">{maintenanceData.cost}</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-[var(--gray-50)] rounded-lg">
                <CheckCircle className="w-5 h-5 text-[var(--gray-500)]" />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">Status</span>
                  <StatusBadge status={maintenanceData.status} />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-[var(--gray-100)]">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 text-[var(--gray-600)] border-[var(--gray-300)] hover:bg-[var(--gray-50)]"
              onClick={() => setIsModalOpen(true)}
            >
              <Edit className="w-4 h-4 text-[var(--gray-600)]" />
              Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-2 text-[var(--red-600)] border-[var(--red-300)] hover:bg-[var(--red-50)]"
            >
              <Trash2 className="w-4 h-4 text-[var(--red-600)]" />
              Delete
            </Button>
          </div>
        </Card>
      </div>
      
      {/* Add/Edit Maintenance Modal */}
      <AddMaintenanceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        maintenanceData={maintenanceData}
      />
    </div>
  )
}
