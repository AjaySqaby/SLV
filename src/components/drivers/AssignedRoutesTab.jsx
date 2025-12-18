"use client";
import { useState } from "react";
import { RiEyeLine, RiEditLine, RiRouteLine, RiTimeLine, RiGroupLine, RiMapPinLine } from "react-icons/ri";
import Button from "@/components/ui/Button";
import dynamic from 'next/dynamic';

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
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Route ID</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Name</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Stops</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Distance</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Students</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Status</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {assignedRoutes.map((route) => (
                <tr key={route.routeId} className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)]">
                  <td className="px-4 py-4 text-sm text-[var(--primary-black)]">{route.routeId}</td>
                  <td className="px-4 py-4 text-sm text-[var(--primary-black)]">{route.name}</td>
                  <td className="px-4 py-4 text-sm text-[var(--primary-black)]">{route.stops}</td>
                  <td className="px-4 py-4 text-sm text-[var(--primary-black)]">{route.distance}</td>
                  <td className="px-4 py-4 text-sm text-[var(--primary-black)]">{route.students}</td>
                  <td className="px-4 py-4">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${route.status === 'Active' ? 'bg-[var(--purple)] text-white' : 'bg-[var(--gray-200)] text-[var(--muted-text)]'}`}>
                      {route.status}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-[var(--blue-600)] border-[var(--blue-200)] hover:bg-[var(--blue-50)] hover:border-[var(--blue-300)]"
                        onClick={() => {
                          setSelectedRoute(route);
                          setShowRouteModal(true);
                        }}
                      >
                        View
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Route Detail Modal - Using dynamic import with SSR disabled */}
      <RouteViewModal
        isOpen={showRouteModal}
        onClose={() => setShowRouteModal(false)}
        routeId={selectedRoute?.routeId}
      />
    </div>
  );
}
