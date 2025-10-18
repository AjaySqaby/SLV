"use client";
import { RiPhoneLine, RiMailLine, RiMapPinLine, RiIdCardLine, RiCalendarLine } from "react-icons/ri";

export default function DriverInformation({ driverData }) {
  return (
    <div className="bg-gray-50 rounded-lg p-4">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <span className="w-1 h-5 bg-[var(--blue-500)] rounded-full"></span>
        Driver Information
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Contact */}
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
            <RiPhoneLine className="w-4 h-4 text-[var(--blue-500)]" />
            Contact
          </h3>
          <div className="space-y-1">
            <p className="text-sm text-gray-900 flex items-center gap-2">
              <RiPhoneLine className="w-3 h-3 text-[var(--gray-400)]" />
              {driverData.phone}
            </p>
            <p className="text-sm text-gray-900 flex items-center gap-2">
              <RiMailLine className="w-3 h-3 text-[var(--gray-400)]" />
              {driverData.email}
            </p>
          </div>
        </div>

        {/* Address */}
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
            <RiMapPinLine className="w-4 h-4 text-[var(--green-600)]" />
            Address
          </h3>
          <p className="text-sm text-gray-900 flex items-center gap-2">
            <RiMapPinLine className="w-3 h-3 text-[var(--gray-400)]" />
            {driverData.address}
          </p>
        </div>

        {/* License Number */}
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100">
          <h3 className="text-sm font-medium text-gray-500 mb-2 flex items-center gap-2">
            <RiIdCardLine className="w-4 h-4 text-[var(--purple-600)]" />
            License Number
          </h3>
          <div className="space-y-1">
            <p className="text-sm text-gray-900 flex items-center gap-2">
              <RiIdCardLine className="w-3 h-3 text-[var(--gray-400)]" />
              {driverData.licenseNumber}
            </p>
            <p className="text-sm text-gray-900 flex items-center gap-2">
              <RiCalendarLine className="w-3 h-3 text-[var(--gray-400)]" />
              Expires: {driverData.licenseExpires}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
