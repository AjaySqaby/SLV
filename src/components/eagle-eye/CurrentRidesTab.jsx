import { Search } from "lucide-react";
import Input from "@/components/ui/Input";
import StatusFilterButton from "./sidebar/StatusFilterButton";
import RideCard from "./sidebar/RideCard";
import { useState } from "react";

export default function CurrentRidesTab({
  rides,
  activeStatusFilter,
  setActiveStatusFilter,
  onViewRide,
}) {
  const [search, setSearch] = useState("");
  const filteredRides = rides.filter((ride) => {
    let statusMatch = true;
    if (activeStatusFilter === "On Time")
      statusMatch = ride.status === "On Time";
    else if (activeStatusFilter === "Delayed")
      statusMatch = ride.status === "Delayed";
    else if (activeStatusFilter === "Unassigned")
      statusMatch = ride.status === "Unassigned";

    const searchLower = search.toLowerCase();
    const searchMatch =
      ride.id.toLowerCase().includes(searchLower) ||
      ride.driver.name.toLowerCase().includes(searchLower) ||
      (ride.driver.location &&
        ride.driver.location.toLowerCase().includes(searchLower));
    return statusMatch && (search === "" || searchMatch);
  });

  return (
    <div className="flex flex-col h-full">
      <div className="cursor-pointer p-4 flex items-center justify-between border-b shadow-lg flex-shrink-0" style={{ backgroundColor: '#2563eb' }}>
        <div className="flex items-center">
          <div className="rounded-full p-2 mr-3 shadow-md" style={{ backgroundColor: '#3b82f6' }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ color: '#ffffff' }}
            >
              <path d="M16 6l3 4-3 4"></path>
              <path d="M8 18l-3-4 3-4"></path>
              <path d="M19 10h-6"></path>
              <path d="M5 14h6"></path>
            </svg>
          </div>
          <div>
            <span className="font-bold text-lg tracking-wide drop-shadow-sm" style={{ color: '#ffffff' }}>
              Current Rides
            </span>
            <p className="text-xs mt-0.5" style={{ color: '#dbeafe' }}>Live tracking active</p>
          </div>
        </div>
        <div className="px-3 py-1.5 rounded-full text-sm font-bold shadow-md" style={{ backgroundColor: '#ffffff', color: '#2563eb' }}>
          {rides.length} active
        </div>
      </div>

      <div className="bg-gradient-to-b from-gray-50 to-white p-4 border-b border-gray-200 flex-shrink-0 shadow-sm">
        <div className="flex items-center mb-3">
          <div className="bg-blue-100 rounded-full p-1.5 mr-2">
            <Search className="h-4 w-4 text-blue-600" />
          </div>
          <h3 className="font-semibold text-gray-800 text-sm">
            Filter & Search Rides
          </h3>
        </div>

        <div className="relative mb-4">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search by ride ID, driver, or location..."
            className="pl-10 pr-4 py-2.5 text-sm border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all duration-200 bg-white w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="space-y-2 mb-2">
          <p className="text-xs font-medium text-gray-600 uppercase tracking-wide">Status Filters</p>
          <div className="flex whitespace-nowrap overflow-x-auto space-x-2 pb-1">
            <StatusFilterButton
              label="All"
              isActive={activeStatusFilter === "All"}
              onClick={() => setActiveStatusFilter("All")}
              colorVar="bg-[var(--secondary)]"
            />
            <StatusFilterButton
              label="On Time"
              isActive={activeStatusFilter === "On Time"}
              onClick={() => setActiveStatusFilter("On Time")}
              colorVar="bg-[var(--green-600)]"
            />
            <StatusFilterButton
              label="Delayed"
              isActive={activeStatusFilter === "Delayed"}
              onClick={() => setActiveStatusFilter("Delayed")}
              colorVar="bg-[var(--red)]"
            />
            <StatusFilterButton
              label="Unassigned"
              isActive={activeStatusFilter === "Unassigned"}
              onClick={() => setActiveStatusFilter("Unassigned")}
              colorVar="bg-[var(--blue)]"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto px-4 py-2 min-h-0 bg-gray-50/30">
        {filteredRides.length === 0 ? (
          <div className="text-center py-12">
            <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-gray-400"
              >
                <path d="M16 6l3 4-3 4"></path>
                <path d="M8 18l-3-4 3-4"></path>
                <path d="M19 10h-6"></path>
                <path d="M5 14h6"></path>
              </svg>
            </div>
            <p className="text-gray-500 font-medium text-sm mb-1">No rides found</p>
            <p className="text-gray-400 text-xs">Try adjusting your filters or search terms</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredRides.map((ride) => (
              <RideCard key={ride.id} ride={ride} onViewRide={onViewRide} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
