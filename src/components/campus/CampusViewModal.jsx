"use client";

import { X } from 'lucide-react'
import CampusDetailContent from '@/components/campus/CampusDetailContent'

export default function CampusViewModal({ open, onClose, campusId, isEditModal = false }) {

  if (!open) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl !max-w-[82rem] mx-4 w-full h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            {isEditModal ? 'Edit Campus' : 'Campus Details'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={24} />
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
