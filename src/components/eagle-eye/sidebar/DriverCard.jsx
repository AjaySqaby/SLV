import { Car, MapPin, Phone } from "lucide-react";
import Button from "@/components/ui/Button";

export default function DriverCard({ driver }) {
  return (
    <div
      className={`p-4 border-b border-[var(--gray-200)] bg-[var(--yellow-50)] mb-2 rounded-lg shadow-sm ${
        driver.status === "Offline" ? "opacity-70" : ""
      }`}
    >
      <div className="flex items-center mb-2">
        <div className="w-10 h-10 rounded-full mr-3 border-2 border-[var(--yellow-300)]">
          <img
            src={driver.avatar || "/placeholder.svg"}
            alt={driver.name}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div className="flex-1">
          <div className="font-semibold text-[var(--primary-black)]">
            {driver.name}
          </div>
          <div className="text-xs text-[var(--muted-text)] flex items-center">
            <Car size={12} className="mr-1" />
            {driver.vehicle}
          </div>
          <div className="text-xs text-[var(--muted-text)] flex items-center">
            <MapPin size={12} className="mr-1" />
            {driver.location}
          </div>
          <div className="text-xs text-[var(--muted-text)] flex items-center">
            <Phone size={12} className="mr-1" />
            {driver.phone}
          </div>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2 mb-2">
        {driver.status === "Ready Now" && (
          <span className="bg-[var(--green-100)] text-[var(--green)] px-2 py-0.5 rounded-full text-xs font-semibold">
            Ready Now
          </span>
        )}
        {driver.status === "On Active Ride" && (
          <span className="bg-[var(--blue-100)] text-[var(--blue)] px-2 py-0.5 rounded-full text-xs font-semibold">
            On Active Ride
          </span>
        )}
        {driver.status === "Offline" && (
          <span className="bg-[var(--red-100)] text-[var(--red)] px-2 py-0.5 rounded-full text-xs font-semibold">
            Offline
          </span>
        )}
        {driver.lastActive && (
          <span className="bg-[var(--gray-100)] text-[var(--gray-700)] px-2 py-0.5 rounded-full text-xs font-semibold">
            {driver.lastActive}
          </span>
        )}
        {driver.distance && (
          <span className="bg-[var(--yellow-100)] text-[var(--yellow-800)] px-2 py-0.5 rounded-full text-xs font-semibold">
            {driver.distance}
          </span>
        )}
      </div>
      <div className="mb-2">
        {driver.rejectedNearby > 0 && (
          <div className="text-xs text-[var(--red)] font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[var(--red)] inline-block"></span>
            {driver.rejectedNearby} rejected nearby
          </div>
        )}
        {driver.unassignedNearby > 0 && (
          <div className="text-xs text-[var(--blue)] font-semibold flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-[var(--blue)] inline-block"></span>
            {driver.unassignedNearby} unassigned nearby
          </div>
        )}
      </div>
      {driver.ridesNearby > 0 && (
        <div className="bg-[var(--yellow-100)] border border-[var(--yellow-300)] rounded-md p-2 mb-2 flex items-center gap-2">
          <span className="text-[var(--yellow-800)] text-xs font-semibold">
            {driver.ridesNearby} ride(s) available nearby!
          </span>
          <Button
            className="bg-[var(--yellow)] text-white text-xs font-semibold px-2 py-1 rounded hover:bg-[var(--yellow-600)]"
            variant="primary"
          >
            Send Alert
          </Button>
          <Button
            className="bg-[var(--yellow-50)] text-[var(--yellow-800)] text-xs font-semibold px-2 py-1 rounded border border-[var(--yellow-300)] hover:bg-[var(--yellow-200)]"
            variant="secondary"
          >
            Contact
          </Button>
        </div>
      )}
      <div className="flex gap-2 mt-2">
        <Button
          className="flex-1 py-1.5 rounded-lg text-sm font-medium text-[var(--purple)] border border-[var(--purple)] bg-white hover:bg-[var(--purple-50)]"
          variant="secondary"
        >
          Details
        </Button>
        <Button
          className="flex-1 py-1.5 rounded-lg text-sm font-medium text-white bg-[var(--purple)] hover:bg-[var(--purple-600)]"
          variant="primary"
        >
          Assign
        </Button>
      </div>
    </div>
  );
}
