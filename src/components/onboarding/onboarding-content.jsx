"use client";
import {
  Filter,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useState } from "react";
import SearchInput from "@/components/ui/SearchInput";
import Button from "@/components/ui/Button";
import ProgressBar from "@/components/ui/ProgressBar";
import AddDriverModal from "@/components/drivers/AddDriverModal";
import Link from "next/link";

export default function OnboardingContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showAddDriverModal, setShowAddDriverModal] = useState(false);

  const onboardingData = [
    {
      id: "D-001",
      name: "Sam Kebede",
      startDate: "3/15/2023",
      progress: 20,
      status: "Just Started",
    },
    {
      id: "D-005",
      name: "Maya Johnson",
      startDate: "3/20/2023",
      progress: 60,
      status: "In Progress",
    },
    {
      id: "D-008",
      name: "Jacob Lee",
      startDate: "3/25/2023",
      progress: 40,
      status: "In Progress",
    },
   
    {
      id: "D-015",
      name: "Michael Brown",
      startDate: "4/01/2023",
      progress: 100,
      status: "Completed",
    },
  ];

  const statusOptions = [
    { value: "", label: "All Statuses" },
    { value: "Just Started", label: "Just Started" },
    { value: "In Progress", label: "In Progress" },
    { value: "Almost Complete", label: "Almost Complete" },
    { value: "Completed", label: "Completed" },
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case "Just Started":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
      case "In Progress":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            {status}
          </span>
        );
      case "Almost Complete":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {status}
          </span>
        );
      case "Completed":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            {status}
          </span>
        );
    }
  };

  const getProgressColor = (progress) => {
    if (progress >= 80) return "green";
    if (progress >= 60) return "blue";
    if (progress >= 40) return "yellow";
    return "gray";
  };

  const filteredData = onboardingData.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || driver.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <CheckCircle className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Driver Onboarding</h1>
            <p className="text-gray-600 text-sm">
              Track and manage the onboarding process for new drivers
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            variant="primary"
            onClick={() => setShowAddDriverModal(true)}
          >
            + Add New Driver
          </Button>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex gap-4">
          <div className="relative">
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by driver name or ID"
              width="w-[400px]"
            />
          </div>

          <Button variant="secondary" icon={<Filter size={18} />}>
            Filter
          </Button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Driver ID</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Start Date</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Onboarding Progress</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
              <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((driver) => (
              <tr key={driver.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-4 px-4 text-sm font-medium text-gray-900">
                  {driver.id}
                </td>
                <td className="py-4 px-4 text-sm text-gray-900">
                  {driver.name}
                </td>
                <td className="py-4 px-4 text-sm text-gray-600">
                  {driver.startDate}
                </td>
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="flex-1">
                      <ProgressBar
                        progress={driver.progress}
                        className="h-2"
                        color={getProgressColor(driver.progress)}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-700 min-w-[40px]">
                      {driver.progress}%
                    </span>
                  </div>
                </td>
                <td className="py-4 px-4">
                  {getStatusBadge(driver.status)}
                </td>
                <td className="py-4 px-4">
                  <Link href={`/drivers/${driver.id}/onboarding`}>
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                    >
                      Manage
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredData.length === 0 && (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No drivers found</h3>
          <p className="text-gray-600 mb-4">
            {searchQuery || statusFilter 
              ? "Try adjusting your search or filter criteria"
              : "Get started by adding your first driver to the onboarding process"
            }
          </p>
                     {!searchQuery && !statusFilter && (
             <Button
               variant="primary"
               onClick={() => setShowAddDriverModal(true)}
             >
               Add New Driver
             </Button>
           )}
                 </div>
       )}

       <AddDriverModal
         isOpen={showAddDriverModal}
         onClose={() => setShowAddDriverModal(false)}
       />
     </div>
   );
 }
