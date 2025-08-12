import { MapPin, Phone, Clock } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import Button from "@/components/ui/Button";
import DualTimeDisplay from "@/components/ui/DualTimeDisplay";

export default function RideCard({ ride, onViewRide }) {
  return (
    <div className="p-3 bg-white rounded-lg shadow-sm mb-2 border border-[var(--gray-200)] hover:shadow-md transition-shadow">
      {/* Header - Ride ID and Status */}
      <div className="flex items-center justify-between mb-2">
        <div className="text-[var(--blue-600)] font-semibold text-sm">
          #{ride.id}
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

      {/* Driver Info - Compact Layout */}
      <div className="flex items-start gap-3 mb-2">
        <div className="w-8 h-8 rounded-full flex-shrink-0 bg-gray-200 flex items-center justify-center">
          <img
            src={ride.driver.avatar || "/placeholder.svg"}
            alt={ride.driver.name}
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          <div className="hidden w-full h-full rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-semibold text-xs">
            {ride.driver.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm text-gray-900 truncate">
            {ride.driver.name}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <MapPin size={10} />
            <span className="truncate">{ride.driver.location}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Phone size={10} />
            <span>{ride.driver.phone}</span>
          </div>
        </div>
      </div>

      {/* ETA and Action */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs font-medium text-gray-700">
          <Clock size={12} className="text-gray-400" />
          <span>ETA: </span>
          <DualTimeDisplay 
            rideTime={ride.eta}
            rideTimezone="America/Los_Angeles"
            showLabels={false}
            className="text-xs font-medium text-gray-700"
          />
        </div>
        <Button
          variant="secondary"
          className="px-3 py-1 text-xs text-purple-700 border border-purple-300 bg-white rounded hover:bg-purple-50 font-semibold"
          onClick={() => onViewRide(ride.id)}
        >
          Details
        </Button>
      </div>
    </div>
  );
}
