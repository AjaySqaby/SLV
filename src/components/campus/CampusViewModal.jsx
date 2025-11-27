"use client";

import { X, Building2 } from 'lucide-react'
import CampusDetailContent from '@/components/campus/CampusDetailContent'

export default function CampusViewModal({ open, onClose, campusId, isEditModal = false }) {

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl !max-w-[82rem] mx-4 w-full h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: '#e5e7eb' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: '#8b5cf6' }}>
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: '#111827' }}>
                {isEditModal ? 'Edit Campus' : 'Campus Details'}
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Close"
            title="Close"
          >
            <X className="w-6 h-6" style={{ color: '#6b7280' }} />
          </button>
        </div>

        {/* Modal Content - Use existing CampusDetailContent */}
        <div className="p-0 overflow-y-auto flex-1">
          <CampusDetailContent 
            campusId={campusId} 
            isModal={true}
            isEditMode={isEditModal}
          />
        </div>
      </div>
    </div>
  )
}
