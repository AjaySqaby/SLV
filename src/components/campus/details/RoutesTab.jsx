import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge"
import { FaBus } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

export default function RoutesTab({ routes }) {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Bus Routes</h3>
        <Button size="sm" variant="primary" icon={<Plus className="w-4 h-4" />}>Add Route</Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Route ID</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Stops</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Distance</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Students</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {routes.map((r) => (
              <tr 
                key={r.id} 
                className="border-b border-gray-100 hover:bg-gray-50"
                onClick={() => router.push('/routes')}
              >
                <td className="py-4 px-4 text-sm text-gray-900">{r.id}</td>
                <td className="py-4 px-4 text-sm text-gray-900">
                  <span className="flex items-center gap-2">
                    
                    <span>{r.name}</span>
                  </span>
                </td>
                <td className="py-4 px-4 text-sm text-gray-900">{r.stops}</td>
                <td className="py-4 px-4 text-sm text-gray-900">{r.distance}</td>
                <td className="py-4 px-4 text-sm text-gray-900">{r.students}</td>
                <td className="py-4 px-4">
                  <Button 
                    variant="outline"
                    size="sm"
                    className="text-[var(--blue-600)] border-[var(--blue-200)] hover:bg-[var(--blue-50)] hover:border-[var(--blue-300)]"
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push('/routes');
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