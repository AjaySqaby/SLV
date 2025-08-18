"use client";
import { RiRouteLine, RiTimeLine, RiFileTextLine, RiSettings3Line, RiFolderLine } from "react-icons/ri";
import Button from "@/components/ui/Button";

export default function TransportationSummary({ driverData }) {
  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
        <span className="w-1 h-6 bg-[var(--purple-600)] rounded-full"></span>
        Transportation Summary
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Rides */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center">
          <div className="w-12 h-12 bg-[var(--blue-100)] rounded-full flex items-center justify-center mx-auto mb-3">
            <RiRouteLine className="w-6 h-6 text-[var(--blue-600)]" />
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Total Rides</h3>
          <p className="text-3xl font-bold text-gray-900">{driverData.totalRides}</p>
        </div>

        {/* Upcoming Rides */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center">
          <div className="w-12 h-12 bg-[var(--green-100)] rounded-full flex items-center justify-center mx-auto mb-3">
            <RiTimeLine className="w-6 h-6 text-[var(--green-600)]" />
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Upcoming Rides</h3>
          <p className="text-3xl font-bold text-[var(--blue-600)]">{driverData.upcomingRides}</p>
        </div>

        {/* Assigned Routes */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 text-center">
          <div className="w-12 h-12 bg-[var(--purple-100)] rounded-full flex items-center justify-center mx-auto mb-3">
            <RiRouteLine className="w-6 h-6 text-[var(--purple-600)]" />
          </div>
          <h3 className="text-sm font-medium text-gray-500 mb-2">Assigned Routes</h3>
          <p className="text-3xl font-bold text-[var(--purple-600)]">{driverData.assignedRoutes}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
          <RiSettings3Line className="w-4 h-4" />
          Manage Vehicle Information
        </Button>
        <Button variant="secondary" className="w-full flex items-center justify-center gap-2">
          <RiFolderLine className="w-4 h-4" />
          Manage Documents
        </Button>
      </div>
    </div>
  );
}
