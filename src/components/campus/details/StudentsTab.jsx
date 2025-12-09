import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge"
import { AiOutlineUser } from "react-icons/ai";
import { Plus } from "lucide-react";

export default function StudentsTab({ students }) {
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-end items-center mb-4">
        <Button size="sm" variant="primary" icon={<Plus className="w-4 h-4" />}>Add Student</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Student ID</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Grade</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Homeroom</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Address</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Transportation</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr 
                key={s.id} 
                className="border-b border-gray-100 hover:bg-gray-50"
                onClick={() => router.push('/students')}
              >
                <td className="py-4 px-4 text-sm text-gray-900">{s.id}</td>
                <td className="py-4 px-4 text-sm text-gray-900">
                  <span className="flex items-center gap-2">
                   
                    <span>{s.name}</span>
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-gray-900">{s.grade}</td>
                <td className="py-4 px-4 text-sm text-gray-900">{s.homeroom}</td>
                <td className="py-4 px-4 text-sm text-gray-900">{s.address}</td>
                <td className="py-4 px-4 text-sm text-gray-900">{s.transportation}</td>
                <td className="py-4 px-4">
                  <StatusBadge status={s.status} />
                </td>
                <td className="py-4 px-4">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="text-[var(--blue-600)] border-[var(--blue-200)] hover:bg-[var(--blue-50)] hover:border-[var(--blue-300)]"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push('/students');
                    }}
                  >
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 