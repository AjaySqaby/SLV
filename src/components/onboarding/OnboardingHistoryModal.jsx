"use client";

import { useState } from 'react'
import { 
  X,
  Clock,
  ChevronDown,
  ChevronRight,
  User,
  Download
} from 'lucide-react'
import Button from '@/components/ui/Button'
import StatusBadge from '@/components/ui/StatusBadge'

export default function OnboardingHistoryModal({ isOpen, onClose, driverData = null }) {
  const [expandedCycles, setExpandedCycles] = useState(['initial'])

  const toggleCycle = (cycleId) => {
    setExpandedCycles(prev => 
      prev.includes(cycleId) 
        ? prev.filter(id => id !== cycleId)
        : [...prev, cycleId]
    )
  }

  // Mock data - replace with actual API call
  const onboardingHistory = [
    {
      id: 'initial',
      type: 'Initial',
      startDate: 'Jan 15, 2024',
      endDate: 'Feb 20, 2024',
      status: 'Completed',
      statusColor: 'green',
      stages: [
        {
          name: 'Background Check',
          completedDate: 'Jan 20, 2024',
          notes: 'Clean record verified'
        },
        {
          name: 'Fingerprinting',
          completedDate: 'Jan 25, 2024',
          notes: '-'
        },
        {
          name: 'Document Collection',
          completedDate: 'Feb 5, 2024',
          notes: 'All documents received and verified'
        },
        {
          name: 'Medical Exam',
          completedDate: 'Feb 10, 2024',
          notes: '-'
        },
        {
          name: 'Drug & Alcohol Test',
          completedDate: 'Feb 15, 2024',
          notes: '-'
        }
      ]
    },
    {
      id: 'recertification',
      type: 'Recertification',
      startDate: 'Jan 15, 2025',
      endDate: null,
      status: 'In Progress',
      statusColor: 'yellow',
      stages: [
        {
          name: 'Medical Exam',
          completedDate: 'Jan 25, 2025',
          notes: '-'
        },
        {
          name: 'Drug & Alcohol Test',
          completedDate: 'Feb 5, 2025',
          notes: '-'
        }
      ]
    }
  ]

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--gray-100)]">
          <div>
            <p className="text-sm text-[var(--gray-600)] mb-1">
              Complete history for {driverData?.name || 'Sam Kebede'} (ID: {driverData?.id || 'D-001'})
            </p>
            <h2 className="text-xl font-bold text-[var(--gray-900)]">
              Onboarding History
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

        {/* Content */}
        <div className="p-6">
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-[var(--gray-900)] mb-2">
              Onboarding History
            </h3>
            <p className="text-sm text-[var(--gray-600)]">
              Complete history of driver's onboarding cycles
            </p>
          </div>

          {/* Onboarding Cycles */}
          <div className="space-y-4">
            {onboardingHistory.map((cycle) => (
              <div key={cycle.id} className="border border-[var(--gray-200)] rounded-lg overflow-hidden">
                {/* Cycle Header */}
                <div 
                  className="flex items-center justify-between p-4 bg-[var(--gray-50)] cursor-pointer hover:bg-[var(--gray-100)] transition-colors"
                  onClick={() => toggleCycle(cycle.id)}
                >
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      cycle.type === 'Initial' 
                        ? 'bg-[var(--blue-600)] text-white' 
                        : 'bg-[var(--gray-200)] text-[var(--gray-700)]'
                    }`}>
                      {cycle.type}
                    </span>
                    <span className="text-sm text-[var(--gray-600)]">
                      Started: {cycle.startDate}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <StatusBadge 
                      status={cycle.status} 
                      className={`${
                        cycle.statusColor === 'green' 
                          ? 'bg-[var(--green-600)] text-white' 
                          : 'bg-[var(--yellow-500)] text-[var(--gray-900)]'
                      }`}
                    />
                    {expandedCycles.includes(cycle.id) ? (
                      <ChevronDown className="w-4 h-4 text-[var(--gray-500)]" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-[var(--gray-500)]" />
                    )}
                  </div>
                </div>

                {/* Collapsible Content */}
                <div className={`transition-all duration-300 ease-in-out ${
                  expandedCycles.includes(cycle.id) ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden`}>
                  <div className="p-4">
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-[var(--gray-200)]">
                            <th className="text-left py-3 px-4 font-medium text-[var(--gray-700)]">Stage</th>
                            <th className="text-left py-3 px-4 font-medium text-[var(--gray-700)]">Completed</th>
                            <th className="text-left py-3 px-4 font-medium text-[var(--gray-700)]">Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {cycle.stages.map((stage, index) => (
                            <tr key={index} className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)]">
                              <td className="py-3 px-4 text-sm text-[var(--gray-900)]">
                                {stage.name}
                              </td>
                              <td className="py-3 px-4 text-sm text-[var(--gray-900)]">
                                <div className="flex items-center gap-2">
                                  <Clock className="w-4 h-4 text-[var(--gray-500)]" />
                                  {stage.completedDate}
                                </div>
                              </td>
                              <td className="py-3 px-4 text-sm text-[var(--gray-900)]">
                                {stage.notes}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
