import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import RoutesTable from "@/components/routes/RoutesTable";

export default function RoutesTab({ routes }) {
  const router = useRouter();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Bus Routes</h3>
        <Button size="sm" variant="primary" icon={<Plus className="w-4 h-4" />}>Add Route</Button>
      </div>
      {(() => {
        const tableRoutes = (routes || []).map((r) => ({
          id: r.id,
          name: r.name,
          district: "—",
          stops: r.stops,
          distance: r.distance,
          students: r.students,
          status: r.status || "Active",
          driver: null,
        }));
        return (
          <RoutesTable
            routes={tableRoutes}
            onView={(id) => router.push("/routes")}
            onEdit={() => router.push("/routes")}
            onSchedule={() => router.push("/routes")}
            onAssignDriver={() => router.push("/routes")}
          />
        );
      })()}
    </div>
  );
} 