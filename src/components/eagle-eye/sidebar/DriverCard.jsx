import { FaCar, FaMapMarkerAlt, FaPhone, FaBell, FaInfoCircle, FaUserPlus } from "react-icons/fa";
import Button from "@/components/ui/Button";

export default function DriverCard({ driver }) {
  const getStatusStyle = () => {
    switch (driver.status) {
      case "Ready Now":
        return "bg-green-50 border-green-200";
      case "On Active Ride":
        return "bg-blue-50 border-blue-200";
      case "Offline":
        return "bg-gray-50 border-gray-200 opacity-75";
      default:
        return "bg-white border-gray-200";
    }
  };

  const getStatusBadge = () => {
    switch (driver.status) {
      case "Ready Now":
        return (
          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-medium">
            Ready
          </span>
        );
      case "On Active Ride":
        return (
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded text-xs font-medium">
            Active
          </span>
        );
      case "Offline":
        return (
          <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-xs font-medium">
            Offline
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`p-3 mb-2 rounded-lg shadow-sm border hover:shadow-md transition-all ${getStatusStyle()}`}>
      {/* Header - Driver Info and Status */}
      <div className="flex items-start gap-3 mb-2">
        <div className="w-9 h-9 rounded-full flex-shrink-0 border-2 border-white shadow-sm bg-gray-200 flex items-center justify-center">
          <img
            src={driver.avatar || "/placeholder.svg"}
            alt={driver.name}
            className="w-full h-full object-cover rounded-full"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextElementSibling.style.display = 'flex';
            }}
          />
          <div className="hidden w-full h-full rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
            {driver.name.split(' ').map(n => n[0]).join('')}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <div className="font-semibold text-sm text-gray-900 truncate">
              {driver.name}
            </div>
            {getStatusBadge()}
          </div>
          <div className="grid grid-cols-1 gap-0.5 text-xs text-gray-600">
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
            <span className="bg-yellow-100 text-yellow-800 px-1.5 py-0.5 rounded text-xs font-medium">
              {driver.distance}
            </span>
          )}
          {driver.lastActive && (
            <span className="bg-gray-100 text-gray-700 px-1.5 py-0.5 rounded text-xs">
              {driver.lastActive}
            </span>
          )}
        </div>
        
        {/* Nearby Info */}
          <div className="grid grid-cols-2 gap-1 text-xs">
          {driver.rejectedNearby > 0 && (
            <div className="text-red-600 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              {driver.rejectedNearby} rejected
            </div>
          )}
          {driver.unassignedNearby > 0 && (
            <div className="text-blue-600 font-medium flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
              {driver.unassignedNearby} unassigned
            </div>
          )}
            {driver.onRide && (
              <div className="text-purple-700 font-medium flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-purple-500"></span>
                Ends in {driver.endsInMinutes ?? 15} min
              </div>
            )}
        </div>
      </div>

      {/* Rides Nearby Alert */}
      {driver.ridesNearby > 0 && (
        <div className="bg-orange-50 border border-orange-200 rounded p-2 mb-2">
          <div className="text-xs text-orange-800 font-medium mb-1">
            {driver.ridesNearby} ride(s) nearby
          </div>
          <div className="flex gap-1">
            <Button className="flex-1 py-1 text-xs bg-orange-500 text-white hover:bg-orange-600 rounded font-medium flex items-center justify-center gap-1">
              <FaBell size={10} />
              Alert
            </Button>
            <Button className="flex-1 py-1 text-xs bg-orange-500 text-white hover:bg-orange-600 rounded font-medium flex items-center justify-center gap-1">
              <FaPhone size={10} />
              Call
            </Button>
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button className="flex-1 py-1 text-xs bg-orange-500 text-white hover:bg-orange-600 rounded font-medium flex items-center justify-center gap-1">
          <FaInfoCircle size={10} />
          Details
        </Button>
        <Button className="flex-1 py-1.5 text-xs text-white bg-purple-600 hover:bg-purple-700 rounded font-semibold flex items-center justify-center gap-1">
          <FaUserPlus size={10} />
          Assign
        </Button>
      </div>
    </div>
  );
}
