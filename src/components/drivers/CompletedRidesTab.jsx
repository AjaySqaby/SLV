"use client";
import { useState } from "react";
import { RiEyeLine, RiRouteLine, RiCalendarLine, RiGroupLine, RiCheckLine } from "react-icons/ri";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge";
import RideDetailContent from "@/components/rides/RideDetailContent";

export default function CompletedRidesTab({ driverId }) {
  const [showRideDetailModal, setShowRideDetailModal] = useState(false);
  const [selectedRideId, setSelectedRideId] = useState(null);
  // Real data from user
  const completedRides = [
    {
      rideId: 1,
      route: "RT-30842",
      completedDate: "04/02/2025",
      students: 7,
      status: "Completed",
      actions: ["View"]
    }
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Completed Rides ({completedRides.length})
      </h3>
      
      {completedRides.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
          <RiCheckLine className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-lg font-medium">No completed rides found</p>
          <p className="text-sm">There are no completed rides for this driver.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Ride ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Route</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Completed Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Students</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {completedRides.map((ride) => (
                <tr key={ride.rideId} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm text-gray-900">#{ride.rideId}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{ride.route}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{ride.completedDate}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{ride.students}</td>
                  <td className="py-4 px-4">
                    <StatusBadge 
                      status={ride.status} 
                    />
                  </td>
                  <td className="py-4 px-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-[var(--blue-600)] border-[var(--blue-200)] hover:bg-[var(--blue-50)] hover:border-[var(--blue-300)]"
                      onClick={() => {
                        setSelectedRideId(ride.rideId);
                        setShowRideDetailModal(true);
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
      )}
      {showRideDetailModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-40 flex items-start justify-center z-[9000] pt-6"
          onClick={() => setShowRideDetailModal(false)}
        >
          <div 
            className="bg-white rounded-2xl !max-w-[82rem] mx-4 w-full max-h-[calc(100vh-3rem)] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <RideDetailContent 
              rideId={selectedRideId} 
              onClose={() => setShowRideDetailModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
