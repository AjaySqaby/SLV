import { MapPin, Phone, Clock } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import Button from "@/components/ui/Button";

export default function RideCard({ ride, onViewRide }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-sm mb-4 border-b border-[var(--gray-200)]">
      <div className="flex items-center justify-between mb-2">
        <div className="text-[var(--blue-600)] font-medium">
          Ride #{ride.id}
        </div>
        <StatusBadge
          status={ride.status}
          type={
            ride.status === "On Time"
              ? "active"
              : ride.status === "Delayed"
              ? "error"
              : "default"
          }
        />
      </div>
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 rounded-full mr-3">
          <img
            src={ride.driver.avatar || "/placeholder.svg"}
            alt={ride.driver.name}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <div className="font-medium">{ride.driver.name}</div>
          <div className="text-xs text-gray-500 flex items-center">
            <MapPin size={12} className="mr-1" />
            {ride.driver.location}
          </div>
          <div className="text-xs text-gray-500 flex items-center">
            <Phone size={12} className="mr-1" />
            {ride.driver.phone}
          </div>
        </div>
      </div>
      <div className="flex items-center mb-3">
        <Clock size={16} className="text-gray-400 mr-2" />
        <div className="text-sm text-gray-700">ETA: {ride.eta}</div>
      </div>
      <Button
        variant="secondary"
        className="w-full py-2 text-center text-[var(--purple)]  border border-[var(--purple)] rounded-md hover:bg-[var(--purple-50)] font-semibold"
        onClick={() => onViewRide(ride.id)}
      >
        View Details
      </Button>
    </div>
  );
}
