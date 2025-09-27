"use client";
import {
  Building2,
  Search,
  Plus,
  MapPin,
  GraduationCap,
  Users,
  Route,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye
} from "lucide-react";
import { useState } from "react";
import SearchInput from "../ui/SearchInput";
import Button from "../ui/Button";
import AddDistrictModal from "./AddDistrictModal";

export default function DistrictsContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  
  // Mock data - replace with actual data from your API
  const districts = [
    // Uncomment the below data to see how it looks with actual districts
    /*
    {
      id: "D-001",
      name: "Atlanta Public Schools",
      location: "Atlanta, GA",
      schools: 87,
      students: 52000,
      routes: 156,
    },
    {
      id: "D-002", 
      name: "Fulton County Schools",
      location: "Fulton County, GA",
      schools: 105,
      students: 95000,
      routes: 203,
    },
    {
      id: "D-003",
      name: "Cobb County Schools", 
      location: "Cobb County, GA",
      schools: 112,
      students: 110000,
      routes: 245,
    },
    */
  ];

  const filteredDistricts = districts.filter((district) => {
    return district.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           district.location.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center">
       
        <div>
          <h1 className="text-3xl font-bold mb-8">School Districts</h1>
         
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
                  className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)] transition-all duration-200"
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
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-2">
                      <button className="px-3 py-1 text-sm text-[var(--gray-600)] hover:text-[var(--gray-700)] border border-[var(--gray-300)] rounded hover:bg-[var(--gray-50)] transition-colors">
                        View
                      </button>
                      <button className="px-3 py-1 text-sm text-[var(--gray-600)] hover:text-[var(--gray-700)] border border-[var(--gray-300)] rounded hover:bg-[var(--gray-50)] transition-colors">
                        Edit
                      </button>
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
    </div>
  );
}
