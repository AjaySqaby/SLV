"use client";
import { RiRouteLine } from "react-icons/ri";
import RidesTable from "@/components/rides/RidesTable";

export default function UpcomingRidesTab({ driverId }) {
  const upcomingRides = [
    { rideId: 2, route: "RT-30843", scheduledDate: "04/03/2025", students: 5, status: "Assigned" },
  ];

  const ridesForTable = upcomingRides.map((r) => ({
    id: r.rideId,
    district: r.route,
    date: r.scheduledDate,
    scheduledTime: "08:30 AM",
    timezone: "America/Los_Angeles",
    pickup: {
      scheduled: "08:30 AM",
      arrived: r.status === "Completed" ? "08:35 AM" : "",
      confirmed: "08:20 AM",
      location: "1221 Broadway, Oakland, CA 94612",
    },
    dropoff: {
      scheduled: "09:30 AM",
      arrived: r.status === "In progress" ? "09:10 AM" : "",
      completed: r.status === "Completed" ? "09:25 AM" : "",
      location: "388 9th St, Oakland, CA 94607",
    },
    driver: { name: "Assigned Driver", vehicle: "Toyota Sienna" },
    details: { distance: "3.5 mi", duration: "30 min", stops: 2, students: r.students || 1 },
    status: r.status,
    nextStop: { address: "Oakland High School" },
    stops: [],
  }));

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Upcoming Rides ({upcomingRides.length})
      </h3>
      {ridesForTable.length === 0 ? (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
          <RiRouteLine className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-lg font-medium">No upcoming rides found</p>
          <p className="text-sm">There are no scheduled rides for this driver.</p>
        </div>
      ) : (
        <div className="bg-background rounded-lg shadow-sm border border-[var(--gray-200)] overflow-hidden">
          <RidesTable rides={ridesForTable} currentPage={1} itemsPerPage={ridesForTable.length || 10} />
        </div>
      )}
    </div>
  );
}
