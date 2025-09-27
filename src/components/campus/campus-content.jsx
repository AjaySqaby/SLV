"use client";
import { Search, Plus, Building } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import SearchInput from "@/components/ui/SearchInput";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import StatusBadge from "@/components/ui/StatusBadge";
import CampusActionsDropdown from "./CampusActionsDropdown";
import CampusViewModal from "./CampusViewModal";
import CampusEditModal from "./CampusEditModal";
import AddCampusModal from "./AddCampusModal";

function TimeInput({ label, value, onChange, name }) {
  return (
    <Input
      type="time"
      label={label}
      value={value}
      onChange={onChange}
      name={name}
      className="w-full"
    />
  );
}

export default function CampusContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRef = useRef(null);
  const router = useRouter();
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedCampusId, setSelectedCampusId] = useState(null);

  const campuses = [
    {
      id: "C-001",
      name: "Riverdale High",
      type: "High School",
      district: "86022-Z",
      address: "2000 School Rd, Riverdale, GA",
      students: 1250,
      status: "Active",
    },
    {
      id: "C-002",
      name: "Westview Elementary",
      type: "Elementary School",
      district: "86022-Z",
      address: "100 Education Ln, Atlanta, GA",
      students: 750,
      status: "Active",
    },
    {
      id: "C-003",
      name: "Lincoln Middle School",
      type: "Middle School",
      district: "75044-A",
      address: "500 Learning Ave, Marietta, GA",
      students: 950,
      status: "Active",
    },
    {
      id: "C-004",
      name: "Washington High",
      type: "High School",
      district: "75044-A",
      address: "800 Knowledge Dr, Sandy Springs, GA",
      students: 1500,
      status: "Active",
    },
  ];

  const filteredCampuses = campuses.filter((campus) => {
    const query = searchQuery.toLowerCase();
    return (
      campus.id.toLowerCase().includes(query) ||
      campus.name.toLowerCase().includes(query) ||
      campus.type.toLowerCase().includes(query) ||
      campus.district.toLowerCase().includes(query) ||
      campus.address.toLowerCase().includes(query)
    );
  });

  const handleViewCampus = (campus) => {
    setSelectedCampusId(campus.id);
    setIsViewModalOpen(true);
  };

  const handleEditCampus = (campus) => {
    setSelectedCampusId(campus.id);
    setIsEditModalOpen(true);
  };



  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpenMenuId(null);
      }
    }
    if (openMenuId) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuId]);

  return (
    <div className="p-6">
      <div className="flex items-center ">
       
        <div>
          <h1 className="text-3xl font-bold mb-8">Campus Management</h1>
         
        </div>
      </div>

      {/* Search Section - Full Width */}
      <div className="flex justify-between items-center mb-6 gap-2">
        <div className="relative w-full">
          <SearchInput
            placeholder="Search campus by name, ID or type"
            width="w-full"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          variant="primary"
          icon={<Plus size={18} />}
          onClick={() => setIsAddModalOpen(true)}
          className="whitespace-nowrap"
        >
          Add New Campus
        </Button>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-[var(--gray-100)] overflow-hidden">
        <table className="w-full">
          <thead className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Campus ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Name</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Type</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">District</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Address</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Students</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Status</th>
              <th className="px-6 py-3 text-center text-sm font-semibold text-[var(--gray-700)]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCampuses.map((campus) => (
              <tr
                key={campus.id}
                className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)] transition-all duration-200"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--purple)] text-white flex items-center justify-center text-sm font-bold">
                      {filteredCampuses.indexOf(campus) + 1}
                    </div>
                    <span className="font-medium">{campus.id}</span>
                  </div>
                </td>
                <td className="px-6 py-4 font-medium">{campus.name}</td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      campus.type === "High School"
                        ? "bg-[var(--blue-100)] text-[var(--blue-800)]"
                        : campus.type === "Middle School"
                        ? "bg-[var(--purple-100)] text-[var(--purple-800)]"
                        : "bg-[var(--orange-100)] text-[var(--orange-800)]"
                    }`}
                  >
                    {campus.type}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-[var(--blue-600)]">
                    {campus.district}
                  </span>
                </td>
                <td className="px-6 py-4">{campus.address}</td>
                <td className="px-6 py-4 font-medium">{campus.students}</td>
                <td className="px-6 py-4">
                  <StatusBadge
                    status={campus.status}
                    type={campus.status === "Active" ? "active" : "inactive"}
                  />
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <CampusActionsDropdown
                      campus={campus}
                      onView={handleViewCampus}
                      onEdit={handleEditCampus}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Campus View Modal */}
      <CampusViewModal
        open={isViewModalOpen}
        onClose={() => {
          setIsViewModalOpen(false);
          setSelectedCampusId(null);
        }}
        campusId={selectedCampusId}
        isEditModal={false}
      />

      {/* Campus Edit Modal */}
      <CampusEditModal
        open={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setSelectedCampusId(null);
        }}
        campusId={selectedCampusId}
      />

      {/* Campus Add Modal */}
      <AddCampusModal
        open={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false);
        }}
      />

    </div>
  );
}
