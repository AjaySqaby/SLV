import { Search } from "lucide-react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import RideCard from "./sidebar/RideCard";
import { useState } from "react";

export default function CurrentRidesTab({
  rides,
  activeStatusFilter,
  setActiveStatusFilter,
  onViewRide,
  onSmartSuggest,
}) {
  const [search, setSearch] = useState("");
  const filteredRides = rides.filter((ride) => {
    let statusMatch = true;
    if (activeStatusFilter === "On Time") statusMatch = ride.status === "On Time";
    else if (activeStatusFilter === "Delayed") statusMatch = ride.status === "Delayed";
    else if (activeStatusFilter === "Rejected") statusMatch = ride.status === "Rejected";
    else if (activeStatusFilter === "Unassigned") statusMatch = ride.status === "Unassigned";

    const searchLower = search.toLowerCase();
    const searchMatch =
      ride.id.toLowerCase().includes(searchLower) ||
      ride.driver.name.toLowerCase().includes(searchLower) ||
      (ride.driver.location &&
        ride.driver.location.toLowerCase().includes(searchLower));
    return statusMatch && (search === "" || searchMatch);
  });

  return (
    <div className="flex flex-col h-full px-4">
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

            <div className="bg-gradient-to-b from-gray-50 to-white py-3 border-b border-gray-200 flex-shrink-0 shadow-sm">
        {/* <div className="flex items-center mb-2">
          <div className="bg-[var(--blue-100)] rounded-full p-1 mr-2">
            <Search className="h-3 w-3 text-[var(--blue-600)]" />
          </div>
          <h3 className="font-medium text-[var(--heading)] text-xs">
            Filter & Search Rides
          </h3>
        </div> */}
        
        <div className="relative mb-3">
          <div className="absolute left-2.5 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
            <Search className="h-3.5 w-3.5 text-[var(--gray-400)]" />
          </div>
          <Input
            type="text"
            placeholder="Search rides..."
            className="pl-8 pr-3 py-2 text-xs border-[var(--gray-300)] rounded-md shadow-sm focus:ring-1 focus:ring-[var(--blue-500)]/20 focus:border-[var(--blue-500)] transition-all duration-200 bg-[var(--surface-bg)] w-full"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="space-y-1.5">
          <p className="text-xs font-medium text-[var(--muted-text)] uppercase tracking-wide">Status</p>
          <Select
            options={[
              { value: "All", label: "All" },
              { value: "On Time", label: "On Time" },
              { value: "Delayed", label: "Delayed" },
              { value: "Rejected", label: "Rejected" },
              { value: "Unassigned", label: "Unassigned" },
            ]}
            value={activeStatusFilter}
            onChange={(e) => setActiveStatusFilter(e.target.value)}
            width="w-full"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto min-h-0 bg-[var(--background)]">
        {filteredRides.length === 0 ? (
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
            <div className="space-y-0">
              {filteredRides.map((ride, index) => (
                <RideCard key={ride.id} ride={ride} onViewRide={onViewRide} onSmartSuggest={onSmartSuggest} index={index} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
