"use client";

import { useState } from 'react'
import { Plus, Calendar, Clock, X, Edit3, Trash2 } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import { useRouter } from 'next/navigation'

export default function HolidayExceptionsTab({ holidays = [], onAddHoliday, onEditHoliday, onDeleteHoliday }) {
  const router = useRouter()
  const [showAddModal, setShowAddModal] = useState(false)
  const [editingHoliday, setEditingHoliday] = useState(null)
  const [newHoliday, setNewHoliday] = useState({
    title: '',
    type: 'no_school',
    startDate: '',
    endDate: '',
    description: '',
    affectsTransportation: true
  })

  const handleAddHoliday = () => {
    if (newHoliday.title && newHoliday.startDate) {
      onAddHoliday(newHoliday)
      setNewHoliday({
        title: '',
        type: 'no_school',
        startDate: '',
        endDate: '',
        description: '',
        affectsTransportation: true
      })
      setShowAddModal(false)
    }
  }

  const handleEditHoliday = (holiday) => {
    setEditingHoliday(holiday)
    setNewHoliday(holiday)
    setShowAddModal(true)
  }

  const handleUpdateHoliday = () => {
    if (newHoliday.title && newHoliday.startDate) {
      onEditHoliday(editingHoliday.id, newHoliday)
      setEditingHoliday(null)
      setNewHoliday({
        title: '',
        type: 'no_school',
        startDate: '',
        endDate: '',
        description: '',
        affectsTransportation: true
      })
      setShowAddModal(false)
    }
  }

  const handleDeleteHoliday = (id) => {
    if (confirm('Are you sure you want to delete this holiday/exception?')) {
      onDeleteHoliday(id)
    }
  }

  const getTypeIcon = (type) => {
    return type === 'no_school' ? <X className="w-4 h-4" /> : <Clock className="w-4 h-4" />
  }

  const getTypeColor = (type) => {
    return type === 'no_school' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
  }

  const getTypeLabel = (type) => {
    return type === 'no_school' ? 'No School' : 'Schedule Change'
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Holidays & Exceptions</h3>
          {/* <p className="text-sm text-gray-600">Manage school holidays and schedule changes</p> */}
        </div>
        <Button
          size="sm"
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          onClick={() => setShowAddModal(true)}
        >
          Add Holiday/Exception
        </Button>
      </div>

      {/* Holidays Table */}
      {holidays.length === 0 ? (
        <div className="text-center py-8">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">No Holidays/Exceptions</h4>
          <p className="text-gray-600 mb-4">Add holidays and schedule changes to manage transportation</p>
          <Button
            size="sm"
            variant="outline"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setShowAddModal(true)}
          >
            Add First Holiday
          </Button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Title</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Date Range</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Transportation</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Description</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {holidays.map((holiday) => (
                <tr 
                  key={holiday.id} 
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-4 text-sm text-gray-900">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${getTypeColor(holiday.type)}`}>
                        {getTypeIcon(holiday.type)}
                      </div>
                      <span>{holiday.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(holiday.type)}`}>
                      {getTypeLabel(holiday.type)}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {holiday.startDate} 
                        {holiday.endDate && holiday.endDate !== holiday.startDate && ` - ${holiday.endDate}`}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    {holiday.affectsTransportation ? (
                      <span className="flex items-center gap-1 text-blue-600">
                        <Clock className="w-4 h-4" />
                        <span>Affects</span>
                      </span>
                    ) : (
                      <span className="text-gray-400">No Impact</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-sm text-gray-900">
                    {holiday.description || '-'}
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Edit3 className="w-4 h-4" />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditHoliday(holiday);
                        }}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={<Trash2 className="w-4 h-4" />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteHoliday(holiday.id);
                        }}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] backdrop-blur-sm">
          <div 
            className="bg-white rounded-2xl w-[95vw] h-[90vh] max-w-4xl mx-4 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-[var(--gray-200)]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--blue-600)] rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[var(--heading)]">
                    {editingHoliday ? 'Edit Holiday/Exception' : 'Add Holiday/Exception'}
                  </h1>
                  <p className="text-sm text-[var(--muted-text)]">
                    {editingHoliday ? 'Update holiday or exception details' : 'Add a new holiday or schedule change'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setShowAddModal(false)
                  setEditingHoliday(null)
                  setNewHoliday({
                    title: '',
                    type: 'no_school',
                    startDate: '',
                    endDate: '',
                    description: '',
                    affectsTransportation: true
                  })
                }}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Input
                    label="Title"
                    value={newHoliday.title}
                    onChange={(e) => setNewHoliday({...newHoliday, title: e.target.value})}
                    placeholder="e.g., Winter Break, Teacher In-Service Day"
                    required
                  />
                  
                  <Select
                    label="Type"
                    value={newHoliday.type}
                    onChange={(e) => setNewHoliday({...newHoliday, type: e.target.value})}
                    options={[
                      { value: 'no_school', label: 'No School' },
                      { value: 'schedule_change', label: 'Schedule Change' }
                    ]}
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={newHoliday.startDate}
                      onChange={(e) => setNewHoliday({...newHoliday, startDate: e.target.value})}
                      className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--blue-500)] focus:border-[var(--blue-500)]"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                      End Date (Optional)
                    </label>
                    <input
                      type="date"
                      value={newHoliday.endDate}
                      onChange={(e) => setNewHoliday({...newHoliday, endDate: e.target.value})}
                      className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--blue-500)] focus:border-[var(--blue-500)]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">
                    Description (Optional)
                  </label>
                  <textarea
                    value={newHoliday.description}
                    onChange={(e) => setNewHoliday({...newHoliday, description: e.target.value})}
                    placeholder="Additional details about this holiday or exception..."
                    rows={3}
                    className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--blue-500)] focus:border-[var(--blue-500)]"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="affectsTransportation"
                    checked={newHoliday.affectsTransportation}
                    onChange={(e) => setNewHoliday({...newHoliday, affectsTransportation: e.target.checked})}
                    className="w-4 h-4 text-[var(--blue-600)] border-gray-300 rounded focus:ring-[var(--blue-500)]"
                  />
                  <label htmlFor="affectsTransportation" className="text-sm text-[var(--gray-700)]">
                    This affects transportation services
                  </label>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-white border-t border-[var(--gray-200)] p-6">
              <div className="flex justify-end gap-3">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setShowAddModal(false)
                    setEditingHoliday(null)
                    setNewHoliday({
                      title: '',
                      type: 'no_school',
                      startDate: '',
                      endDate: '',
                      description: '',
                      affectsTransportation: true
                    })
                  }}
                  className="px-6 py-2"
                >
                  Cancel
                </Button>
                <Button
                  onClick={editingHoliday ? handleUpdateHoliday : handleAddHoliday}
                  className="px-6 py-2"
                  style={{
                    backgroundColor: 'var(--blue-600)',
                    color: 'var(--on-primary)'
                  }}
                >
                  {editingHoliday ? 'Update Holiday' : 'Add Holiday'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
