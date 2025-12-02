import { MapPin, Phone, Clock } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import Button from "@/components/ui/Button";
import DualTimeDisplay from "@/components/ui/DualTimeDisplay";

export default function RideCard({ ride, onViewRide, onSmartSuggest, index = 0 }) {
  // Get ETA from ride data - use eta if available, otherwise use scheduled time
  const etaTime = ride.eta || ride.scheduled || ride.scheduledTime || "--";
  
  return (
    <div
      className="px-4 py-2 border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)] cursor-pointer transition-all duration-200"
      onClick={() => onViewRide(ride.id)}
    >
      {/* Header - Ride ID and Status - Matching Rides Page Design */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-[var(--blue-100)] text-[var(--blue-600)]">
            #{ride.id}
          </span>
          {/* Status Circle Indicator - Matching Map Colors */}
          <div 
            className="w-3 h-3 rounded-full border border-white shadow-sm"
            style={{
              backgroundColor: 
                ride.status === 'On Time' || ride.status === 'On Ride' || ride.status === 'Ready Now' ? '#10b981' :
                ride.status === 'Late' || ride.status === 'Delayed' ? '#ef4444' :
                ride.status === 'Unknown' || ride.status === 'Unassigned' ? '#000000' :
                '#6b7280'
            }}
          ></div>
        </div>
        <StatusBadge
          status={ride.status}
          type={
            ride.status === "On Time"
              ? "active"
              : ride.status === "Delayed" || ride.status === "Late"
              ? "warning"
              : ride.status === "Rejected"
              ? "inactive"
              : "default"
          }
        />
      </div>

      {/* Driver Info - Compact Layout with Avatar - Old Content */}
      <div className="flex items-start gap-3 mb-2">
        <div className="w-8 h-8 rounded-full flex-shrink-0 bg-[var(--gray-100)] flex items-center justify-center overflow-hidden">
          <img
            src={ride.driver?.avatar || "/picture.jpg"}
            alt={ride.driver?.name || "Driver"}
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          <div className="hidden w-full h-full rounded-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center text-white font-semibold text-xs">
            {ride.driver?.name ? ride.driver.name.split(' ').map(n => n[0]).join('') : 'U'}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-medium text-sm text-[var(--heading)] truncate">
            {ride.driver?.name || "Unassigned"}
          </div>
          {ride.driver?.location && (
            <div className="flex items-center gap-1 text-xs text-[var(--muted-text)] mt-0.5">
              <MapPin size={10} />
              <span className="truncate">{ride.driver.location}</span>
            </div>
          )}
          {ride.driver?.phone && (
            <div className="flex items-center gap-1 text-xs text-[var(--muted-text)] mt-0.5">
              <Phone size={10} />
              <span>{ride.driver.phone}</span>
            </div>
          )}
        </div>
      </div>

      {/* ETA Section - Old Content */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1 text-xs">
          <Clock size={12} className="text-[var(--muted-text)]" />
          <span className="text-[var(--blue-600)]">ETA: </span>
          {etaTime !== "--" ? (
            <DualTimeDisplay 
              rideTime={etaTime}
              rideTimezone={ride.timezone || "America/Los_Angeles"}
              showLabels={false}
              className="text-xs text-[var(--blue-600)]"
              compact={true}
            />
          ) : (
            <span className="text-xs text-[var(--blue-600)]">--</span>
          )}
        </div>
        <Button
          variant="outline"
          size="sm"
          className="text-xs font-medium text-[var(--blue-600)] border-[var(--blue-200)] hover:bg-[var(--blue-50)] hover:border-[var(--blue-300)]"
          onClick={(e) => {
            e.stopPropagation();
            onViewRide(ride.id);
          }}
        >
          Details
        </Button>
      </div>
    </div>
  );
}
