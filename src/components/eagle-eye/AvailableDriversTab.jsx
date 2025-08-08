import { Search } from "lucide-react";
import Input from "@/components/ui/Input";
import StatusFilterButton from "./sidebar/StatusFilterButton";
import DriverCard from "./sidebar/DriverCard";
import { User } from "lucide-react";

export default function AvailableDriversTab({ mockDrivers, driverFilter, setDriverFilter }) {
  const filteredDrivers = mockDrivers.filter((driver) => {
    if (driverFilter === "All") return true;
    if (driverFilter === "Ready") return driver.status === "Ready Now";
    if (driverFilter === "On Ride") return driver.onRide;
    if (driverFilter === "Offline") return driver.status === "Offline";
    return true;
  });

  return (
    <>
      <div className="bg-[var(--purple-50)] p-4 flex items-center justify-between">
        <div className="flex items-center">
          <User className="text-[var(--purple)] mr-2" />
          <span className="font-medium text-[var(--purple)]">Available Drivers</span>
        </div>
        <div className="bg-[var(--purple-100)] text-[var(--purple)] px-2 py-1 rounded-full text-xs font-medium">
          {mockDrivers.length} Total
        </div>
      </div>
      <div className="p-4 border-b border-gray-200">
        <div className="relative mb-3">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search drivers..."
            className="pl-9 pr-4 py-2 text-sm"
          />
        </div>
        <div className="flex whitespace-nowrap overflow-x-auto space-x-2 mb-4 pb-2">
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
            colorVar="bg-[var(--green)]"
          />
          <StatusFilterButton
            label="On Ride"
            isActive={driverFilter === "On Ride"}
            onClick={() => setDriverFilter("On Ride")}
            colorVar="bg-[var(--blue)]"
          />
          <StatusFilterButton
            label="Offline"
            isActive={driverFilter === "Offline"}
            onClick={() => setDriverFilter("Offline")}
            colorVar="bg-[var(--red)]"
          />
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {filteredDrivers.map((driver) => (
          <DriverCard key={driver.id} driver={driver} />
        ))}
      </div>
    </>
  );
} 