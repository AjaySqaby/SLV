"use client"

export default function ServiceAreas({ areas }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-[var(--gray-100)] p-6 mb-6">
      <h3 className="text-lg font-semibold mb-4">Service Areas</h3>
      <div className="flex flex-wrap gap-2">
        {areas.map((area, index) => (
          <span key={index} className="px-3 py-1 bg-[var(--blue-100)] text-[var(--blue-800)] rounded-full text-sm font-medium">
            {area}
          </span>
        ))}
      </div>
    </div>
  )
} 