"use client";
import {
  Building2,
  Search,
  Plus,
  MapPin,
  GraduationCap,
  Users,
  Route,
  X,
  Edit,
  Clock,
} from "lucide-react";
import { useState } from "react";
import SearchInput from "../ui/SearchInput";
import Select from "../ui/Select";
import Button from "../ui/Button";
import Input from "../ui/Input";
import Collapse from "../ui/Collapse";
import AddDistrictModal from "./AddDistrictModal";
import DistrictActionsDropdown from "./DistrictActionsDropdown";
import DistrictDetailModal from "../students/DistrictDetailModal";

export default function DistrictsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("");
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState(null);
  const [openCollapse, setOpenCollapse] = useState(null);

  const handleCollapseToggle = (collapseId) => {
    setOpenCollapse(openCollapse === collapseId ? null : collapseId);
  };

  const handleViewDistrict = (district) => {
    setSelectedDistrict(district);
    setIsViewModalOpen(true);
  };

  const handleEditDistrict = (district) => {
    setSelectedDistrict(district);
    setIsEditModalOpen(true);
  };

  const handleViewModalClose = () => {
    setIsViewModalOpen(false);
    setSelectedDistrict(null);
  };

  const handleEditModalClose = () => {
    setIsEditModalOpen(false);
    setSelectedDistrict(null);
  };
  
  // Mock data - replace with actual data from your API
  const districts = [
    {
      id: "D-001",
      name: "Atlanta Public Schools",
      location: "Atlanta, GA",
      schools: 87,
      students: 52000,
      routes: 156,
      status: "Active",
    },
    {
      id: "D-002", 
      name: "Fulton County Schools",
      location: "Fulton County, GA",
      schools: 105,
      students: 95000,
      routes: 203,
      status: "Active",
    },
    {
      id: "D-003",
      name: "Cobb County Schools", 
      location: "Cobb County, GA",
      schools: 112,
      students: 110000,
      routes: 245,
      status: "Active",
    },
    {
      id: "D-004",
      name: "Northside School District",
      location: "North Georgia, GA",
      schools: 45,
      students: 28500,
      routes: 98,
      status: "Active",
    },
    {
      id: "D-005",
      name: "DeKalb County Schools",
      location: "DeKalb County, GA",
      schools: 96,
      students: 102000,
      routes: 218,
      status: "Active",
    },
    {
      id: "D-006",
      name: "Gwinnett County Schools",
      location: "Gwinnett County, GA",
      schools: 142,
      students: 180000,
      routes: 312,
      status: "Active",
    },
  ];

  const filteredDistricts = districts.filter((district) => {
    const matchesSearch = district.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           district.location.toLowerCase().includes(searchQuery.toLowerCase());
    const status = district.status || "Active";
    const matchesStatus = !statusFilter || status === (statusFilter === "Not Active" ? "Inactive" : "Active");
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      {/* Header Section */}
      <div className="flex items-center">
       
        <div>
          <h1 className="text-3xl font-bold mb-2">Districts Management </h1>
         
        </div>
      </div>

      {/* Search Section - Full Width */}
      <div className="flex justify-between items-center mb-6 gap-2">
        <div className="relative w-full">
          <SearchInput
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search districts..."
            width="w-full"
          />
        </div>
        <div className="w-48">
          <Select
            placeholder="Status"
            options={[{value:"",label:"All"},{value:"Active",label:"Active"},{value:"Not Active",label:"Not Active"}]}
            value={statusFilter}
            onChange={(e)=>setStatusFilter(e.target.value)}
          />
        </div>
        <Button
          variant="primary"
          icon={<Plus className="h-4 w-4" />}
          className="whitespace-nowrap"
          onClick={() => setIsAddModalOpen(true)}
        >
          Add District
        </Button>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-lg shadow-sm border border-[var(--gray-100)] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">District Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Location</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Schools</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Students</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Routes</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-[var(--gray-700)]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredDistricts.length > 0 ? (
              filteredDistricts.map((district) => (
                <tr
                  key={district.id}
                  className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)] transition-all duration-200 cursor-pointer"
                  onClick={() => handleViewDistrict(district)}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--purple)] text-white flex items-center justify-center text-sm font-bold">
                        {filteredDistricts.indexOf(district) + 1}
                      </div>
                      <span className="font-medium">{district.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-[var(--muted-text)]">
                      <MapPin className="h-4 w-4" />
                      {district.location}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-[var(--muted-text)]">
                      <Building2 className="h-4 w-4" />
                      {district.schools}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-[var(--muted-text)]">
                      <Users className="h-4 w-4" />
                      {district.students}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-[var(--muted-text)]">
                      <Route className="h-4 w-4" />
                      {district.routes}
                    </div>
                  </td>
                  <td 
                    className="px-6 py-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-center">
                      <DistrictActionsDropdown
                        district={district}
                        onView={handleViewDistrict}
                        onEdit={handleEditDistrict}
                      />
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-[var(--gray-100)] rounded-full flex items-center justify-center mb-4">
                      <Building2 className="h-8 w-8 text-[var(--muted-text)]" />
                    </div>
                    <p className="text-[var(--muted-text)] text-center">
                      No districts found. Add your first district!
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add District Modal */}
      <AddDistrictModal
        open={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      {/* View District Modal - with Students/Routes/Rides tabs */}
      <DistrictDetailModal
        open={isViewModalOpen && !!selectedDistrict}
        onClose={handleViewModalClose}
        districtData={selectedDistrict}
      />

      {/* Edit District Modal */}
      {isEditModalOpen && selectedDistrict && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] backdrop-blur-sm"
          onClick={handleEditModalClose}
        >
          <div 
            className="bg-white rounded-2xl w-[95vw] h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] max-w-7xl mx-4 overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-[var(--gray-200)] flex-shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--primary-bg)] rounded-full flex items-center justify-center">
                  <Edit className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[var(--primary-black)]">Edit District</h2>
                  <p className="text-[var(--muted-text)]">{selectedDistrict.name} - {selectedDistrict.id}</p>
                </div>
              </div>
              <button
                onClick={handleEditModalClose}
                className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--hover-bg)] transition-colors"
              >
                <X className="w-6 h-6 text-[var(--gray-500)]" />
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <form className="space-y-6">
                {/* Basic Information Section */}
                <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[var(--blue-100)] rounded-full flex items-center justify-center">
                      <Building2 className="w-6 h-6 text-[var(--blue-600)]" />
                    </div>
                    <div className="font-semibold text-[var(--primary-black)]">Basic Information</div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <Input
                      label="District Name"
                      name="districtName"
                      defaultValue={selectedDistrict.name}
                      icon={<Building2 className="h-4 w-4 text-[var(--muted-text)]" />}
                    />
                    <Input
                      label="Location"
                      name="location"
                      defaultValue={selectedDistrict.location}
                      icon={<MapPin className="h-4 w-4 text-[var(--muted-text)]" />}
                    />
                  </div>
                </div>

                {/* Statistics Section */}
                <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[var(--green-100)] rounded-full flex items-center justify-center">
                      <GraduationCap className="w-6 h-6 text-[var(--green-600)]" />
                    </div>
                    <div className="font-semibold text-[var(--primary-black)]">Statistics</div>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">Schools</label>
                      <input 
                        type="number" 
                        defaultValue={selectedDistrict.schools}
                        className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">Students</label>
                      <input 
                        type="number" 
                        defaultValue={selectedDistrict.students}
                        className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[var(--gray-700)] mb-2">Routes</label>
                      <input 
                        type="number" 
                        defaultValue={selectedDistrict.routes}
                        className="w-full px-3 py-2 border border-[var(--gray-300)] rounded-lg focus:ring-2 focus:ring-[var(--primary)] focus:border-[var(--primary)]"
                      />
                    </div>
                  </div>
                </div>

                {/* Status Section */}
                <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-[var(--orange-100)] rounded-full flex items-center justify-center">
                      <Clock className="w-6 h-6 text-[var(--orange-600)]" />
                    </div>
                    <div className="font-semibold text-[var(--primary-black)]">Status</div>
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <Select
                      label="Status"
                      name="status"
                      defaultValue={selectedDistrict.status}
                      options={[
                        { value: "Active", label: "Active" },
                        { value: "Inactive", label: "Inactive" }
                      ]}
                    />
                  </div>
                </div>
              </form>
            </div>

            {/* Footer Buttons */}
            <div className="border-t border-[var(--gray-200)] p-6 flex-shrink-0">
              <div className="flex justify-end gap-3">
                <Button 
                  variant="secondary" 
                  onClick={handleEditModalClose}
                  className="flex items-center gap-2"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </Button>
                <Button 
                  className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white flex items-center gap-2"
                  onClick={() => {
                    // TODO: Handle save functionality
                    handleEditModalClose();
                  }}
                >
                  <Edit className="w-4 h-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
