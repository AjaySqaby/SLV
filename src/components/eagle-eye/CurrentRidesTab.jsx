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
    <>
      <div className="bg-[var(--blue-50)] p-4 flex items-center justify-between">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-[var(--blue-600)] mr-2"
          >
            <path d="M16 6l3 4-3 4"></path>
            <path d="M8 18l-3-4 3-4"></path>
            <path d="M19 10h-6"></path>
            <path d="M5 14h6"></path>
          </svg>
          <span className="font-medium text-[var(--blue-800)]">
            Current Rides
          </span>
        </div>
        <div className="bg-[var(--blue-100)] text-[var(--blue-700)] px-2 py-1 rounded-full text-xs font-medium">
          {rides.length} Total
        </div>
      </div>

      <div className="p-4 border-b border-gray-200">
        <h3 className="font-medium text-gray-800 mb-3">
          Active Transportation
        </h3>
        <div className="relative mb-3">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search rides..."
            className="pl-9 pr-4 py-2 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="flex whitespace-nowrap overflow-x-auto space-x-2 mb-4 pb-2">
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
            colorVar="bg-[var(--green)]"
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

      <div className="flex-1 overflow-auto">
        {filteredRides.length === 0 ? (
          <div className="text-center text-[var(--muted-text)] py-8">
            No rides found.
          </div>
        ) : (
          filteredRides.map((ride) => (
            <RideCard key={ride.id} ride={ride} onViewRide={onViewRide} />
          ))
        )}
      </div>
    </>
  );
}
