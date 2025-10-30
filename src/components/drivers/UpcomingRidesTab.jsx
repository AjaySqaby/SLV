"use client";
import { useState } from "react";
import { RiEyeLine, RiRouteLine, RiCalendarLine, RiGroupLine } from "react-icons/ri";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge";
import RideDetailContent from "@/components/rides/RideDetailContent";

export default function UpcomingRidesTab({ driverId }) {
  const [selectedRide, setSelectedRide] = useState(null);
  const [showRideModal, setShowRideModal] = useState(false);
  
  // Real data from user
  const upcomingRides = [
    {
      rideId: 2,
      route: "RT-30843",
      scheduledDate: "04/03/2025",
      students: 5,
      status: "Assigned",
      actions: ["View"]
    }
  ];

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Upcoming Rides ({upcomingRides.length})
      </h3>
      
      {upcomingRides.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
          <RiRouteLine className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-lg font-medium">No upcoming rides found</p>
          <p className="text-sm">There are no scheduled rides for this driver.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Ride ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Route</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Scheduled Date</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Students</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {upcomingRides.map((ride) => (
                <tr key={ride.rideId} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 text-sm text-gray-900">#{ride.rideId}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{ride.route}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{ride.scheduledDate}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{ride.students}</td>
                  <td className="py-4 px-4">
                    <StatusBadge 
                      status={ride.status} 
                      type={ride.status === "Assigned" ? "warning" : "default"}
                    />
                  </td>
                  <td className="py-4 px-4">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-[var(--blue-600)] border-[var(--blue-200)] hover:bg-[var(--blue-50)] hover:border-[var(--blue-300)]"
                      onClick={() => {
                        setSelectedRide(ride);
                        setShowRideModal(true);
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

      {/* Ride Detail Modal - Simple version without map */}
      {showRideModal && selectedRide && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[9000] p-6">
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Ride Details #{selectedRide.rideId}</h2>
                <button
                  onClick={() => setShowRideModal(false)}
                  className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
                >
                  <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Route Information</h3>
                    <p className="text-sm text-gray-600">Route: {selectedRide.route}</p>
                    <p className="text-sm text-gray-600">Scheduled: {selectedRide.scheduledDate}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Passenger Information</h3>
                    <p className="text-sm text-gray-600">Students: {selectedRide.students}</p>
                    <p className="text-sm text-gray-600">Status: {selectedRide.status}</p>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Driver Information</h3>
                    <p className="text-sm text-gray-600">Driver ID: D-001</p>
                    <p className="text-sm text-gray-600">Vehicle: Honda Odyssey</p>
                  </div>
                  
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">Schedule</h3>
                    <p className="text-sm text-gray-600">Pickup: 7:00 AM</p>
                    <p className="text-sm text-gray-600">Dropoff: 7:40 AM</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => setShowRideModal(false)}
                >
                  Close
                </Button>
                <Button
                  onClick={() => {
                    // Navigate to full ride details if needed
                    setShowRideModal(false);
                  }}
                >
                  View Full Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
