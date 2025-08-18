"use client";
import { RiUserLine, RiPhoneLine, RiMailLine, RiMapPinLine, RiIdCardLine, RiCalendarLine } from "react-icons/ri";
import StatusBadge from "@/components/ui/StatusBadge";

export default function DriverProfileHeader({ driverData }) {
  const getInitials = (name) => {
    if (!name) return "DR";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* Driver Avatar */}
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center mr-4 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #3B82F6 0%, #1D4ED8 50%, #7C3AED 100%)'
            }}
          >
            <span 
              className="text-white font-bold"
              style={{ fontSize: '20px', lineHeight: '1' }}
            >
              {getInitials(driverData?.name || "Driver")}
            </span>
          </div>
          
          {/* Driver Info */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              {driverData?.name || "Driver Name"}
            </h1>
            <p className="text-gray-600 flex items-center gap-2">
              <span className="font-medium">Driver ID:</span> {driverData?.id || "N/A"}
            </p>
          </div>
        </div>

        {/* Status Only */}
        <div className="flex items-center">
          <StatusBadge 
            status={driverData?.status || "Unknown"}
          />
        </div>
      </div>
    </div>
  );
}
