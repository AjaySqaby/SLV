"use client";

import { useState } from 'react'
import { 
  X,
  Wrench,
  Calendar,
  DollarSign,
  Hash,
  User,
  FileText
} from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import SingleDatePicker from '@/components/routes/SingleDatePicker'

export default function AddMaintenanceModal({ isOpen, onClose, maintenanceData = null }) {
  const [formData, setFormData] = useState({
    type: maintenanceData?.type || '',
    mileage: maintenanceData?.mileage || '',
    cost: maintenanceData?.cost || '',
    serviceDate: maintenanceData?.serviceDate || '',
    serviceProvider: maintenanceData?.serviceProvider || '',
    nextDueDate: maintenanceData?.nextDueDate || '',
    notes: maintenanceData?.notes || ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form data:', formData)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--gray-100)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--blue-600)] rounded-lg flex items-center justify-center">
              <Wrench className="w-5 h-5 text-white" />
            </div>
            <h2 className="text-xl font-bold text-[var(--gray-900)]">
              {maintenanceData ? 'Edit Maintenance Record' : 'Add Maintenance Record'}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-[var(--gray-500)] hover:text-[var(--gray-700)] hover:bg-[var(--gray-50)]"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[var(--gray-900)] mb-4">Maintenance Details</h3>
            
            {/* Two Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Left Column */}
              <div className="space-y-4">
                {/* Maintenance Type */}
                <div>
                  <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                    Maintenance Type
                  </label>
                  <input
                    type="text"
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    placeholder="E.g., Oil Change, Tire Rotation"
                    className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)] focus:border-transparent"
                  />
                </div>

                {/* Mileage */}
                <div>
                  <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                    Mileage
                  </label>
                  <input
                    type="text"
                    name="mileage"
                    value={formData.mileage}
                    onChange={handleInputChange}
                    placeholder="Current vehicle mileage"
                    className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)] focus:border-transparent"
                  />
                </div>

                {/* Cost */}
                <div>
                  <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                    Cost
                  </label>
                  <input
                    type="text"
                    name="cost"
                    value={formData.cost}
                    onChange={handleInputChange}
                    placeholder="Service cost in dollars"
                    className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                                 {/* Service Date */}
                 <div>
                   <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                     Service Date
                   </label>
                                       <SingleDatePicker
                      selected={formData.serviceDate ? new Date(formData.serviceDate) : null}
                      onSelect={(date) => setFormData(prev => ({ ...prev, serviceDate: date ? date.toISOString().split('T')[0] : '' }))}
                      hideLabel={true}
                    />
                 </div>

                {/* Service Provider */}
                <div>
                  <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                    Service Provider
                  </label>
                  <input
                    type="text"
                    name="serviceProvider"
                    value={formData.serviceProvider}
                    onChange={handleInputChange}
                    placeholder="Name of mechanic or service center"
                    className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)] focus:border-transparent"
                  />
                </div>

                                 {/* Next Due Date */}
                 <div>
                   <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                     Next Due Date (Optional)
                   </label>
                                       <SingleDatePicker
                      selected={formData.nextDueDate ? new Date(formData.nextDueDate) : null}
                      onSelect={(date) => setFormData(prev => ({ ...prev, nextDueDate: date ? date.toISOString().split('T')[0] : '' }))}
                      hideLabel={true}
                    />
                 </div>
              </div>
            </div>

            {/* Notes Section - Full Width */}
            <div>
              <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="Any additional details about the maintenance"
                rows={4}
                className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--blue-500)] focus:border-transparent resize-none"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-[var(--gray-100)]">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="text-[var(--gray-600)] border-[var(--gray-300)] hover:bg-[var(--gray-50)]"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="bg-[var(--blue-600)] text-white hover:bg-[var(--blue-700)]"
            >
              {maintenanceData ? 'Update Record' : 'Save Record'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
