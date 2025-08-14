"use client"

import { Eye, Trash } from "lucide-react"
import StatusBadge from "@/components/ui/StatusBadge"

export default function DriversTable({ drivers }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-[var(--gray-500)] border-b border-[var(--gray-100)]">
            <th className="px-6 py-3 font-medium">Name</th>
            <th className="px-6 py-3 font-medium">Contact</th>
            <th className="px-6 py-3 font-medium">Status</th>
            <th className="px-6 py-3 font-medium">Completed Rides</th>
            <th className="px-6 py-3 font-medium">Rating</th>
            <th className="px-6 py-3 font-medium">Actions</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.id} className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)]">
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <img
                    src={driver.avatar || "/placeholder.svg"}
                    alt={driver.name}
                    className="w-8 h-8 rounded-full mr-3 object-cover"
                  />
                  <span className="font-medium">{driver.name}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div>
                  <div className="text-sm">{driver.email}</div>
                  <div className="text-sm text-[var(--gray-500)]">{driver.phone}</div>
                </div>
              </td>
              <td className="px-6 py-4">
                <StatusBadge status={driver.status} type={driver.status === "Active" ? "active" : "inactive"} />
              </td>
              <td className="px-6 py-4">
                <span className="text-[var(--purple-600)] font-medium">{driver.completedRides}</span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="text-yellow-400 mr-1"
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span className="font-medium">{driver.rating}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <button className="p-1 text-[var(--gray-400)] hover:text-[var(--gray-600)]">
                    <Eye size={18} />
                  </button>
                  <button className="p-1 text-[var(--gray-400)] hover:text-[var(--gray-600)]">
                    <Trash size={18} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
} 