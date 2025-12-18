"use client";

import StatusBadge from "@/components/ui/StatusBadge";
import CampusActionsDropdown from "@/components/campus/CampusActionsDropdown";

export default function CampusesTable({
  campuses = [],
  onView = () => {},
  onEdit = () => {},
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">
              Campus ID
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">
              Type
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">
              District
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">
              Address
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">
              Students
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">
              Status
            </th>
            <th className="px-6 py-3 text-center text-sm font-semibold text-[var(--gray-700)]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {campuses.map((c, index) => (
            <tr
              key={c.id}
              className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)] transition-all duration-200 cursor-pointer"
              onClick={() => onView(c)}
            >
              <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--purple)] text-white flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="font-medium">{c.id}</span>
                </div>
              </td>
              <td className="px-6 py-4 font-medium hover:bg-[var(--gray-100)] transition-all duration-200">
                {c.name}
              </td>
              <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-[var(--gray-100)]">
                  {c.type}
                </span>
              </td>
              <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200 text-[var(--blue-600)]">
                {c.district || "-"}
              </td>
              <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                {c.address}
              </td>
              <td className="px-6 py-4 font-medium hover:bg-[var(--gray-100)] transition-all duration-200">
                {c.students}
              </td>
              <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                <StatusBadge status={c.status} />
              </td>
              <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                <div className="flex justify-center">
                  <CampusActionsDropdown
                    campus={c}
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


