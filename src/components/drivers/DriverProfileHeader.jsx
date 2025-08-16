"use client";
import { RiUserLine, RiPhoneLine, RiMailLine, RiMapPinLine, RiIdCardLine, RiCalendarLine } from "react-icons/ri";
import StatusBadge from "@/components/ui/StatusBadge";

export default function DriverProfileHeader({ driverData }) {
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const getStatusType = (status) => {
    switch (status) {
      case "Active":
        return "active";
      case "Inactive":
        return "inactive";
      case "On Leave":
        return "warning";
      case "Pending":
        return "pending";
      default:
        return "default";
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* Driver Avatar */}
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center mr-4 shadow-md">
            <RiUserLine className="w-8 h-8 text-white" />
          </div>
          
          {/* Driver Info */}
          <div>
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
              {driverData.name}
            </h1>
            <p className="text-gray-600 flex items-center gap-2">
              <span className="font-medium">Driver ID:</span> {driverData.id}
            </p>
          </div>
        </div>

        {/* Status Only */}
        <div className="flex items-center">
          <StatusBadge 
            status={driverData.status} 
            type={getStatusType(driverData.status)}
          />
        </div>
      </div>
    </div>
  );
}
