"use client";

import Button from "@/components/ui/Button";

export default function BlockedDriversTable({
  drivers = [],
  onRemove = () => {},
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
              Reason
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((d) => (
            <tr
              key={d.id}
              className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)] transition-colors"
            >
              <td className="px-6 py-4 text-sm text-[var(--primary-black)]">
                {d.id}
              </td>
              <td className="px-6 py-4 text-sm text-[var(--primary-black)]">
                {d.name}
              </td>
              <td className="px-6 py-4 text-sm text-[var(--primary-black)]">
                {d.reason || "-"}
              </td>
              <td className="px-6 py-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="bg-red-50 border-red-200 text-red-700 hover:bg-red-100"
                  onClick={() => onRemove(d.id)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


