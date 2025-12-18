"use client";

import StatusBadge from "@/components/ui/StatusBadge";
import RouteActionsDropdown from "@/components/routes/RouteActionsDropdown";

export default function RoutesTable({
  routes = [],
  onView = () => {},
  onEdit = () => {},
  onSchedule = () => {},
  onAssignDriver = () => {},
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">
              Route ID
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">
              District
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">
              Stops
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">
              Distance
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">
              Students
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">
              Status
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">
              Driver
            </th>
            <th className="px-6 py-3 text-center text-sm font-semibold text-[var(--gray-700)]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {routes.map((route, index) => (
            <tr
              key={route.id}
              className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)] transition-all duration-200 cursor-pointer"
              onClick={() => onView(route.id)}
            >
              <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--purple)] text-white flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="font-medium">{route.id}</span>
                </div>
              </td>
              <td className="px-6 py-4 font-medium hover:bg-[var(--gray-100)] transition-all duration-200">
                {route.name}
              </td>
              <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                <span className="text-[var(--blue-600)] hover:underline cursor-pointer transition-colors hover:text-[var(--blue-700)]">
                  {route.district}
                </span>
              </td>
              <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                {route.stops}
              </td>
              <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                {route.distance}
              </td>
              <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                {route.students}
              </td>
              <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                <StatusBadge
                  status={route.status}
                  type={route.status === "Active" ? "active" : "inactive"}
                />
              </td>
              <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                {route.driver ? (
                  <span
                    className="text-[var(--blue-600)] hover:underline cursor-pointer transition-colors hover:text-[var(--blue-700)]"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAssignDriver(route);
                    }}
                  >
                    {route.driver} (change)
                  </span>
                ) : (
                  <span
                    className="text-[var(--blue-600)] hover:underline cursor-pointer transition-colors hover:text-[var(--blue-700)]"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAssignDriver(route);
                    }}
                  >
                    Assign Driver
                  </span>
                )}
              </td>
              <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                <div className="flex justify-center">
                  <RouteActionsDropdown
                    route={route}
                    onView={onView}
                    onEdit={onEdit}
                    onSchedule={onSchedule}
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


