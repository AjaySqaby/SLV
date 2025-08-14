"use client"

export default function ContactInfo({ contact }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-[var(--gray-100)] p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-[var(--gray-500)] mb-1">Contact Name</p>
          <p className="font-medium">{contact.name}</p>
        </div>
        <div>
          <p className="text-sm text-[var(--gray-500)] mb-1">Email</p>
          <p className="font-medium">{contact.email}</p>
        </div>
      </div>
    </div>
  )
} 