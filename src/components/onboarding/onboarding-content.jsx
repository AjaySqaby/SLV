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
import OnboardingManageModal from "./OnboardingManageModal";
import OnboardingActionsDropdown from "./OnboardingActionsDropdown";

export default function OnboardingContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showAddDriverModal, setShowAddDriverModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);

  const handleManageDriver = (driver) => {
    setSelectedDriver(driver);
    setShowManageModal(true);
  };

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
      <div className="flex items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-8">Onboarding</h1>
        </div>
      </div>

      {/* Search Section - Full Width */}
      <div className="flex justify-between items-center mb-6 gap-2">
        <div className="relative w-full">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by driver name or ID"
            width="w-full"
          />
        </div>
        <Button variant="secondary" icon={<Filter size={18} />} className="whitespace-nowrap">
          Filter
        </Button>
        <Button
          variant="primary"
          onClick={() => setShowAddDriverModal(true)}
          className="whitespace-nowrap"
        >
          + Add New Driver
        </Button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Driver ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Start Date</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Onboarding Progress</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Status</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-[var(--gray-700)]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((driver) => (
              <tr key={driver.id} className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)] transition-all duration-200">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--purple)] text-white flex items-center justify-center text-sm font-bold">
                      {filteredData.indexOf(driver) + 1}
                    </div>
                    <span className="font-medium">{driver.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {driver.name}
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">
                  {driver.startDate}
                </td>
                <td className="px-6 py-4">
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
                <td className="px-6 py-4">
                  {getStatusBadge(driver.status)}
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <OnboardingActionsDropdown
                      driver={driver}
                      onManage={handleManageDriver}
                    />
                  </div>
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

       <OnboardingManageModal
         open={showManageModal}
         onClose={() => {
           setShowManageModal(false);
           setSelectedDriver(null);
         }}
         driver={selectedDriver}
       />
     </div>
   );
 }
