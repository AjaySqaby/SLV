import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge"
import { FaBus } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function RoutesTab({ routes }) {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="font-semibold text-base">Bus Routes</div>
        <Button variant="primary">Add Route</Button>
      </div>
      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-2 text-left">Route ID</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Stops</th>
            <th className="p-2 text-left">Distance</th>
            <th className="p-2 text-left">Students</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {routes.map((r) => (
            <tr 
              key={r.id} 
              className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => router.push('/routes')}
            >
              <td className="p-2 font-medium">{r.id}</td>
              <td className="p-2">
                <span className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center">
                    <FaBus className="text-blue-500 w-4 h-4" />
                  </span>
                  <span className="font-semibold">{r.name}</span>
                </span>
              </td>
              <td className="p-2">{r.stops}</td>
              <td className="p-2">{r.distance}</td>
              <td className="p-2">{r.students}</td>
              <td className="p-2">
                <StatusBadge status={r.status} type={r.status === "Active" ? "active" : "inactive"} />
              </td>
              <td className="p-2">
                <Button 
                  size="sm" 
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push('/routes');
                  }}
                  className="bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 