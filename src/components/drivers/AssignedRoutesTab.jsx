"use client";
import { useState } from "react";
import { RiRouteLine } from "react-icons/ri";
import Button from "@/components/ui/Button";
import dynamic from 'next/dynamic';
import RoutesTable from "@/components/routes/RoutesTable";

const RouteViewModal = dynamic(() => import("@/components/routes/RouteViewModal"), {
  ssr: false
});

export default function AssignedRoutesTab({ driverId }) {
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [showRouteModal, setShowRouteModal] = useState(false);
  
  // Real data from user
  const assignedRoutes = [
    {
      routeId: "RT-30842",
      name: "North District Route",
      stops: 5,
      distance: "12.4 mi",
      students: 7,
      status: "Active"
    },
    {
      routeId: "RT-30843",
      name: "South Campus Route",
      stops: 4,
      distance: "10.2 mi",
      students: 5,
      status: "Active"
    }
  ];

  const routesForTable = assignedRoutes.map((r) => ({
    id: r.routeId,
    name: r.name,
    district: "86022-Z",
    stops: r.stops,
    distance: r.distance,
    students: r.students,
    status: r.status,
    driver: null,
  }));

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Assigned Routes ({assignedRoutes.length})
      </h3>

      {assignedRoutes.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
          <RiRouteLine className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-lg font-medium">No assigned routes found</p>
          <p className="text-sm">There are no routes assigned to this driver.</p>
        </div>
      ) : (
        <RoutesTable
          routes={routesForTable}
          onView={(id) => {
            const r = assignedRoutes.find((x) => x.routeId === id);
            setSelectedRoute(r || null);
            setShowRouteModal(true);
          }}
          onEdit={() => {}}
          onSchedule={() => {}}
          onAssignDriver={() => {}}
        />
      )}

      <RouteViewModal
        isOpen={showRouteModal}
        onClose={() => setShowRouteModal(false)}
        routeId={selectedRoute?.routeId}
      />
    </div>
  );
}
