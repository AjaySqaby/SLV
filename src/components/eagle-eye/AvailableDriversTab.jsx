import { Search } from "lucide-react";
import Input from "@/components/ui/Input";
import StatusFilterButton from "./sidebar/StatusFilterButton";
import DriverCard from "./sidebar/DriverCard";
import { User } from "lucide-react";

export default function AvailableDriversTab({ mockDrivers, driverFilter, setDriverFilter }) {
  const filteredDrivers = mockDrivers.filter((driver) => {
    if (driverFilter === "All") return true;
    if (driverFilter === "Ready") return driver.status === "Ready Now";
    if (driverFilter === "Ending Soon") return driver.onRide; // show on-ride drivers
    return true;
  });

  const sortedDrivers = driverFilter === "Ending Soon"
    ? [...filteredDrivers].sort((a,b) => (a.endsInMinutes ?? 999) - (b.endsInMinutes ?? 999))
    : filteredDrivers;

  return (
    <div className="flex flex-col h-full">
      <div className="bg-purple-50 p-3 flex items-center justify-between border-b flex-shrink-0">
        <div className="flex items-center">
          <User className="text-purple-600 mr-2" size={18} />
          <span className="font-semibold text-purple-800 text-sm">Available Drivers</span>
        </div>
        <div className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-semibold">
          {mockDrivers.length}
        </div>
      </div>
      <div className="p-3 border-b border-gray-200 flex-shrink-0">
        <div className="relative mb-2">
          <Search className="absolute left-3 top-2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search drivers..."
            className="pl-9 pr-4 py-1.5 text-sm border-gray-300 rounded-md"
          />
        </div>
        <div className="flex whitespace-nowrap overflow-x-auto space-x-1.5 mb-3 pb-1">
          <StatusFilterButton
            label="All"
            isActive={driverFilter === "All"}
            onClick={() => setDriverFilter("All")}
            colorVar="bg-[var(--secondary)]"
          />
          <StatusFilterButton
            label="Ready"
            isActive={driverFilter === "Ready"}
            onClick={() => setDriverFilter("Ready")}
            colorVar="bg-[var(--green-600)]"
          />
          <StatusFilterButton
            label="Ending Soon"
            isActive={driverFilter === "Ending Soon"}
            onClick={() => setDriverFilter("Ending Soon")}
            colorVar="bg-[var(--blue)]"
          />
        </div>
      </div>
      <div className="flex-1 overflow-auto p-3 min-h-0">
        {sortedDrivers.length === 0 ? (
          <div className="text-center text-gray-500 py-6 text-sm">
            No drivers found.
          </div>
        ) : (
          sortedDrivers.map((driver) => (
            <DriverCard key={driver.id} driver={driver} />
          ))
        )}
      </div>
    </div>
  );
} 