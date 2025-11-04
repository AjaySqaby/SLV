import { FaCar, FaMapMarkerAlt, FaPhone, FaBell, FaInfoCircle, FaUserPlus } from "react-icons/fa";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge";

export default function DriverCard({ driver }) {
  const getStatusStyle = () => {
    switch (driver.status) {
      case "Ready Now":
        return "bg-[var(--green-100)] border-[var(--green-600)]/20";
      case "On Active Ride":
        return "bg-[var(--blue-100)] border-[var(--blue-600)]/20";
      case "Offline":
        return "bg-[var(--gray-100)] border-[var(--gray-300)] opacity-75";
      default:
        return "bg-[var(--surface-bg)] border-[var(--gray-200)]";
    }
  };

  // Use shared StatusBadge for uniform styling across the app

  return (
    <div className={`p-3 mb-2 rounded-lg shadow-sm border hover:shadow-md transition-all ${getStatusStyle()}`}>
      {/* Header - Driver Info and Status */}
      <div className="flex items-start gap-3 mb-2">
        <div className="w-9 h-9 rounded-full flex-shrink-0 border-2 border-white shadow-sm bg-[var(--gray-100)] flex items-center justify-center">
          <img
            src={driver.avatar || "/placeholder.svg"}
            alt={driver.name}
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          <div className="hidden w-full h-full rounded-full bg-gradient-to-br from-[var(--blue)] to-[var(--purple)] flex items-center justify-center text-white font-semibold text-sm">
            {driver.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="font-semibold text-sm text-[var(--heading)] truncate">
              {driver.name}
            </div>
            <StatusBadge status={driver.status} showIcon={false} />
          </div>
          <div className="grid grid-cols-1 gap-0.5 text-xs text-[var(--muted-text)]">
            <div className="flex items-center gap-1">
              <FaCar size={10} />
              <span className="truncate">{driver.vehicle}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaMapMarkerAlt size={10} />
              <span className="truncate">{driver.location}</span>
            </div>
            <div className="flex items-center gap-1">
              <FaPhone size={10} />
              <span>{driver.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mb-2">
        <div className="flex flex-wrap gap-1 mb-1">
          {driver.distance && (
            <span className="bg-[var(--amber-100)] text-[var(--warning-dark)] px-1.5 py-0.5 rounded text-xs font-medium">
              {driver.distance}
            </span>
          )}
          {driver.lastActive && (
            <span className="bg-[var(--gray-100)] text-[var(--gray-700)] px-1.5 py-0.5 rounded text-xs">
              {driver.lastActive}
            </span>
          )}
        </div>
        
        {/* Nearby Info */}
          <div className="grid grid-cols-2 gap-1 text-xs">
          {driver.rejectedNearby > 0 && (
            <div className="text-[var(--red-600)] font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--red)]"></span>
              {driver.rejectedNearby} rejected
            </div>
          )}
          {driver.unassignedNearby > 0 && (
            <div className="text-[var(--blue-600)] font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--blue-500)]"></span>
              {driver.unassignedNearby} unassigned
            </div>
          )}
            {driver.onRide && (
              <div className="text-[var(--purple-700)] font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--purple)]"></span>
                Ends in {driver.endsInMinutes ?? 15} min
              </div>
            )}
        </div>
      </div>

      {/* Rides Nearby Alert */}
      {driver.ridesNearby > 0 && (
        <div className="bg-[var(--amber-100)] border border-[var(--warning-dark)]/20 rounded p-2 mb-2">
          <div className="text-xs text-[var(--warning-dark)] font-medium mb-1">
            {driver.ridesNearby} ride(s) nearby
          </div>
          <div className="flex gap-1">
            <Button className="flex-1 py-1 text-xs bg-[var(--warning)] text-white hover:bg-[var(--warning-dark)] rounded font-medium flex items-center justify-center gap-1">
              <FaBell size={10} />
              Alert
            </Button>
            <Button className="flex-1 py-1 text-xs bg-[var(--warning)] text-white hover:bg-[var(--warning-dark)] rounded font-medium flex items-center justify-center gap-1">
              <FaPhone size={10} />
              Call
            </Button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button className="flex-1 py-1 text-xs bg-[var(--warning)] text-white hover:bg-[var(--warning-dark)] rounded font-medium flex items-center justify-center gap-1">
          <FaInfoCircle size={10} />
          Details
        </Button>
        <Button className="flex-1 py-1.5 text-xs text-white bg-[var(--purple)] hover:bg-[var(--purple-600)] rounded font-semibold flex items-center justify-center gap-1">
          <FaUserPlus size={10} />
          Assign
        </Button>
      </div>
    </div>
  );
}
