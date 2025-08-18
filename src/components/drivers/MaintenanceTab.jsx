"use client";
import { RiToolsLine, RiCalendarLine, RiMoneyDollarCircleLine, RiBuildingLine, RiEyeLine } from "react-icons/ri";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge";

export default function MaintenanceTab({ driverId }) {
  // Real data from user
  const upcomingMaintenance = [
    {
      type: "Oil Change",
      dueDate: "06/15/2025",
      status: "Scheduled"
    }
  ];

  const maintenanceHistory = [
    {
      type: "Oil Change",
      date: "03/15/2025",
      mileage: "45,000",
      serviceProvider: "QuickLube Service",
      cost: "$89.99"
    },
    {
      type: "Tire Rotation",
      date: "03/15/2025",
      mileage: "45,000",
      serviceProvider: "QuickLube Service",
      cost: "$45.00"
    },
    {
      type: "Brake Inspection",
      date: "02/01/2025",
      mileage: "42,500",
      serviceProvider: "Transit Auto Care",
      cost: "$75.50"
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">
          Vehicle Maintenance
        </h3>
        <Button variant="primary" size="sm">
          Add Maintenance Record
        </Button>
      </div>
      
      <p className="text-sm text-gray-600 mb-6">Track and manage vehicle maintenance records</p>

      {/* Upcoming Maintenance */}
      <div className="mb-8">
        <h4 className="text-md font-semibold text-gray-800 mb-4">Upcoming Maintenance</h4>
        {upcomingMaintenance.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
            <RiToolsLine className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm">No upcoming maintenance scheduled</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Due Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {upcomingMaintenance.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{item.type}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{item.dueDate}</td>
                    <td className="py-3 px-4">
                      <StatusBadge status={item.status} type="warning" />
                    </td>
                    <td className="py-3 px-4">
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="text-[var(--blue-600)] border-[var(--blue-200)] hover:bg-[var(--blue-50)] hover:border-[var(--blue-300)]"
                      >
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Maintenance History */}
      <div>
        <h4 className="text-md font-semibold text-gray-800 mb-4">Maintenance History</h4>
        {maintenanceHistory.length === 0 ? (
          <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
            <RiToolsLine className="w-8 h-8 text-gray-300 mx-auto mb-2" />
            <p className="text-sm">No maintenance history found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Mileage</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Service Provider</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Cost</th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceHistory.map((item, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">{item.type}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{item.date}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{item.mileage}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{item.serviceProvider}</td>
                    <td className="py-3 px-4 text-sm text-gray-900">{item.cost}</td>
                    <td className="py-3 px-4">
                      <Button variant="secondary" size="sm">
                        View Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
