"use client"

import { ArrowLeft } from "lucide-react"

export default function PartnerHeader({ partner, onBack }) {
  return (
    <div className="mb-6">
      <button
        onClick={onBack}
        className="flex items-center text-[var(--gray-600)] hover:text-[var(--gray-900)] mb-4"
      >
        <ArrowLeft size={18} className="mr-2" />
        Back to Partners
      </button>
      <h1 className="text-3xl font-bold text-[var(--blue-600)]">{partner.name}</h1>
      <p className="text-[var(--gray-600)]">Partner Details</p>
    </div>
  )
} 