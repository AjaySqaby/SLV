"use client";

import StatusBadge from "@/components/ui/StatusBadge";
import DriverActionsDropdown from "@/components/drivers/DriverActionsDropdown";

export default function DriversTable({
  drivers = [],
  driverStatuses = {},
  onView = () => {},
  onEdit = () => {},
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">
              Driver ID
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">
              Contact
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">
              Vehicle
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">
              Status
            </th>
            <th className="px-6 py-3 text-center text-sm font-semibold text-[var(--gray-700)]">
              Total Rides
            </th>
            <th className="px-6 py-3 text-center text-sm font-semibold text-[var(--gray-700)]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver, index) => (
            <tr
              key={driver.id}
              className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)] transition-all duration-200 cursor-pointer"
              onClick={() => onView(driver.id)}
            >
              <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--purple)] text-white flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="font-medium">{driver.id}</span>
                </div>
              </td>
              <td className="px-6 py-4 font-medium hover:bg-[var(--gray-100)] transition-all duration-200">
                {driver.name}
              </td>
              <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                <div>
                  <div>{driver.phone}</div>
                  <div>{driver.email}</div>
                </div>
              </td>
              <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                {driver.vehicle}
              </td>
              <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                <StatusBadge status={driverStatuses[driver.id] || driver.status || "Active"} />
              </td>
              <td className="px-6 py-4 text-center hover:bg-[var(--gray-100)] transition-all duration-200">
                {driver.totalRides}
              </td>
              <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                <div className="flex justify-center">
                  <DriverActionsDropdown
                    driver={driver}
                    onView={onView}
                    onEdit={onEdit}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


