import React from "react";
import DualTimeDisplay from "@/components/ui/DualTimeDisplay";

export default function RidesTable({ rides }) {

  return (
    <div className="bg-background rounded-lg shadow-sm border border-[var(--gray-200)] overflow-hidden">
      {rides.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <svg
            width="48"
            height="48"
            fill="none"
            viewBox="0 0 24 24"
            className="mb-4 text-muted"
          >
            <path
              d="M7 17V17.01M17 17V17.01M7 17C5.34315 17 4 15.6569 4 14V10C4 8.34315 5.34315 7 7 7H17C18.6569 7 20 8.34315 20 10V14C20 15.6569 18.6569 17 17 17H7ZM7 17V17.01M17 17V17.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="text-lg font-semibold text-[var(--gray-500)] mb-2">
            No rides found
          </div>
          <div className="text-[var(--gray-400)]">
            No rides matching your current filters.
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Ride Info</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Pick-up</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Drop-off</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Driver & Vehicle</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Status</th>
              </tr>
            </thead>
            <tbody>
              {rides.map((ride, index) => (
                <tr
                  key={ride.id}
                  className="border-b border-[var(--gray-100)]"
                >
                  <td className="px-4 py-4 hover:bg-[var(--gray-100)] transition-all duration-200 cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--purple)] text-white flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[var(--primary-black)]">
                          {ride.id}
                        </div>
                        <div className="text-xs text-[var(--gray-600)] font-medium">
                          {ride.district}
                        </div>
                        <div className="text-xs text-[var(--gray-500)]">
                          {ride.date}
                        </div>
                        <div className="text-xs text-[var(--blue-dark)] font-semibold mt-1">
                          Scheduled: <DualTimeDisplay 
                            rideTime={ride.scheduledTime}
                            rideTimezone={ride.timezone}
                            showLabels={false}
                            className="text-[var(--blue-dark)]"
                            compact={true}
                          />
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-4 py-4 hover:bg-[var(--gray-100)] transition-all duration-200 cursor-pointer">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-[var(--green)] mt-1 flex-shrink-0"></div>
                      <div className="min-w-0">
                        <div className="text-xs text-[var(--blue-600)]">
                          Scheduled: <DualTimeDisplay 
                            rideTime={ride.pickup.scheduled}
                            rideTimezone={ride.timezone}
                            showLabels={false}
                            className="text-[var(--blue-600)]"
                            compact={true}
                          />
                        </div>
                        <div className="text-xs text-[var(--success-dark)]">
                          Arrived: <DualTimeDisplay 
                            rideTime={ride.pickup.arrived}
                            rideTimezone={ride.timezone}
                            showLabels={false}
                            className="text-[var(--success-dark)]"
                            compact={true}
                          />
                        </div>
                        {ride.pickup.confirmed && (
                          <div className="text-xs text-[var(--warning-dark)]">
                            Confirmed: <DualTimeDisplay 
                              rideTime={ride.pickup.confirmed}
                              rideTimezone={ride.timezone}
                              showLabels={false}
                              className="text-[var(--warning-dark)]"
                              compact={true}
                            />
                          </div>
                        )}
                        <div className="text-xs text-[var(--gray-700)] mt-1 truncate max-w-[200px]" title={ride.pickup.location}>
                          {ride.pickup.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-4 py-4 hover:bg-[var(--gray-100)] transition-all duration-200 cursor-pointer">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-[var(--orange)] mt-1 flex-shrink-0"></div>
                      <div className="min-w-0">
                        <div className="text-xs text-[var(--blue-600)]">
                          Scheduled: <DualTimeDisplay 
                            rideTime={ride.dropoff.scheduled}
                            rideTimezone={ride.timezone}
                            showLabels={false}
                            className="text-[var(--blue-600)]"
                            compact={true}
                          />
                        </div>
                        <div className="text-xs text-[var(--success-dark)]">
                          Arrived: <DualTimeDisplay 
                            rideTime={ride.dropoff.arrived}
                            rideTimezone={ride.timezone}
                            showLabels={false}
                            className="text-[var(--success-dark)]"
                            compact={true}
                          />
                        </div>
                        {ride.dropoff.completed && (
                          <div className="text-xs text-[var(--warning-dark)]">
                            Completed: <DualTimeDisplay 
                              rideTime={ride.dropoff.completed}
                              rideTimezone={ride.timezone}
                              showLabels={false}
                              className="text-[var(--warning-dark)]"
                              compact={true}
                            />
                          </div>
                        )}
                        <div className="text-xs text-[var(--gray-700)] mt-1 truncate max-w-[200px]" title={ride.dropoff.location}>
                          {ride.dropoff.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-4 py-4 hover:bg-[var(--gray-100)] transition-all duration-200 cursor-pointer">
                    <div>
                      <div className="font-semibold text-sm text-[var(--primary-black)]">
                        {ride.driver.name}
                      </div>
                      <div className="text-xs text-[var(--gray-600)]">
                        {ride.driver.vehicle}
                      </div>
                      <div className="text-xs text-[var(--gray-500)] mt-1">
                        {ride.details.distance} • {ride.details.duration}
                      </div>
                      <div className="text-xs text-[var(--gray-500)]">
                        {ride.details.stops} stops • {ride.details.students} students
                      </div>
                    </div>
                  </td>
                  
                  <td className="px-4 py-4 hover:bg-[var(--gray-100)] transition-all duration-200 cursor-pointer">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          ride.statusColor === "blue"
                            ? "bg-[var(--green)]"
                            : ride.statusColor === "[var(--warning)]"
                            ? "bg-[var(--orange)]"
                            : ride.statusColor === "[var(--red)]"
                            ? "bg-[var(--red)]"
                            : "bg-[var(--gray-500)]"
                        }`}
                      ></div>
                      <span
                        className={`text-xs font-medium ${
                          ride.statusColor === "blue"
                            ? "text-[var(--green)]"
                            : ride.statusColor === "[var(--warning)]"
                            ? "text-[var(--orange)]"
                            : ride.statusColor === "[var(--red)]"
                            ? "text-[var(--red)]"
                            : "text-[var(--gray-500)]"
                        }`}
                      >
                        {ride.status}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div
                        className={`h-1 rounded-full ${
                          ride.statusColor === "blue"
                            ? "bg-[var(--green)]"
                            : ride.statusColor === "[var(--warning)]"
                            ? "bg-[var(--orange)]"
                            : ride.statusColor === "[var(--red)]"
                            ? "bg-[var(--red)]"
                            : "bg-[var(--gray-500)]"
                        }`}
                        style={{ width: "60%" }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
