"use client";

import { useRouter } from "next/navigation";
import StatusBadge from "@/components/ui/StatusBadge";
import StudentActionsDropdown from "@/components/students/StudentActionsDropdown";

export default function StudentsTable({
  students = [],
  onView = null,
  onEdit = null,
}) {
  const router = useRouter();
  const handleView = (id) => {
    if (onView) return onView(id);
    router.push("/students");
  };
  const handleEdit = (id) => {
    if (onEdit) return onEdit(id);
    router.push("/students");
  };
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">
              Student ID
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">
              Name
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">
              Grade
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">
              Campus
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">
              District
            </th>
            <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">
              Address
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
          {students.map((s, index) => (
            <tr
              key={s.id}
              className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)] transition-all duration-200 cursor-pointer"
              onClick={() => handleView(s.id)}
            >
              <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--purple)] text-white flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <span className="font-medium">{s.id}</span>
                </div>
              </td>
              <td className="px-6 py-4 font-medium hover:bg-[var(--gray-100)] transition-all duration-200">
                {s.name}
              </td>
              <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                {s.grade}
              </td>
              <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                {s.campus || s.homeroom || "-"}
              </td>
              <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                {s.district || "-"}
              </td>
              <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                {s.address}
              </td>
              <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                <StatusBadge status={s.status} />
              </td>
              <td className="px-6 py-4 hover:bg-[var(--gray-100)] transition-all duration-200">
                <div className="flex justify-center">
                  <StudentActionsDropdown
                    student={s}
                    onView={() => handleView(s.id)}
                    onEdit={() => handleEdit(s.id)}
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


