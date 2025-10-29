import { MapPin, Phone, Clock } from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import Button from "@/components/ui/Button";
import DualTimeDisplay from "@/components/ui/DualTimeDisplay";

export default function RideCard({ ride, onViewRide, onSmartSuggest }) {
  return (
    <div
      className="p-3 bg-[var(--primary-bg)] rounded-lg shadow-sm mb-2 border border-[var(--blue-100)] hover:shadow-md transition-shadow cursor-pointer"
      onClick={() => onViewRide(ride.id)}
    >
      {/* Header - Ride ID and Status */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-[var(--blue-100)] text-[var(--blue-600)]">
            #{ride.id}
          </span>
          {/* Status Circle Indicator */}
          <div 
            className="w-3 h-3 rounded-full border border-white shadow-sm"
            style={{
              backgroundColor: ride.statusColor === 'green' ? '#10b981' :
                              ride.statusColor === 'red' ? '#ef4444' :
                              ride.statusColor === 'orange' ? '#f97316' :
                              ride.statusColor === 'black' ? '#000000' :
                              '#6b7280'
            }}
          ></div>
        </div>
        <StatusBadge
          status={ride.status}
          type={
            ride.status === "On Time"
              ? "active"
              : ride.status === "Delayed"
              ? "warning"
              : ride.status === "Rejected"
              ? "inactive"
              : "default"
          }
        />
      </div>

      {/* Driver Info - Compact Layout */}
      <div className="flex items-start gap-3 mb-2">
        <div className="w-8 h-8 rounded-full flex-shrink-0 bg-[var(--gray-100)] flex items-center justify-center overflow-hidden">
          <img
            src={ride.driver.avatar || "/picture.jpg"}
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
          <div className="font-medium text-sm text-[var(--heading)] truncate">
            {ride.driver.name}
          </div>
          <div className="flex items-center gap-1 text-xs text-[var(--muted-text)]">
            <MapPin size={10} />
            <span className="truncate">{ride.driver.location}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-[var(--muted-text)]">
            <Phone size={10} />
            <span>{ride.driver.phone}</span>
          </div>
        </div>
      </div>

      {/* ETA and Actions */}
      {ride.status === 'Rejected' ? (
        <div className="space-y-2">
          <div className="text-[10px] text-[var(--muted-text)]">Recovery Options</div>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary" className="px-2 py-1 text-xs" onClick={(e)=>{e.stopPropagation(); onViewRide(ride.id);}}>Manual Check</Button>
            <Button className="px-2 py-1 text-xs" onClick={(e)=>{e.stopPropagation(); onSmartSuggest?.(ride);}}>Smart Suggestion</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1 text-xs">
              <Clock size={12} className="text-[var(--muted-text)]" />
              <span className="text-[var(--blue-600)]">ETA: </span>
              <DualTimeDisplay 
                rideTime={ride.eta}
                rideTimezone="America/Los_Angeles"
                showLabels={false}
                className="text-xs text-[var(--blue-600)]"
                compact={true}
              />
            </div>
            <Button
              variant="secondary"
              className="px-3 py-1 text-xs text-[var(--purple-700)] border border-[var(--purple)]/30 bg-[var(--surface-bg)] rounded hover:bg-[var(--primary-bg)] font-semibold"
              onClick={(e) => {
                e.stopPropagation();
                onViewRide(ride.id);
              }}
            >
              Details
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
