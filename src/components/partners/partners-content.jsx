"use client";
import {
  Search,
  LogIn,
  Plus,
  FileText,
  Users,
  MapPin,
  Car,
  Trash2,
} from "lucide-react";
import { useState } from "react";
import Tabs from "../ui/Tabs";
import SearchInput from "../ui/SearchInput";
import AddPartnerModal from "./AddPartnerModal";
import PartnerRowActions from "./PartnerRowActions";
import { useRouter } from "next/navigation";
import PartnerLoginModal from "./PartnerLoginModal";
import DeleteModal from "../common/DeleteModal";

export default function PartnersContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddPartnerModalOpen, setIsAddPartnerModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [partnerToDelete, setPartnerToDelete] = useState(null);
  const [partners, setPartners] = useState([
    {
      id: "CT",
      name: "City Transit Solutions",
      contact: {
        name: "John Smith",
        email: "john@citytransit.com",
      },
      location: "Atlanta, GA",
      drivers: 12,
      routes: 8,
      rides: 156,
      status: "Active",
    },
    {
      id: "SR",
      name: "School Ride Services",
      contact: {
        name: "Jane Doe",
        email: "jane@schoolride.com",
      },
      location: "Marietta, GA",
      drivers: 8,
      routes: 5,
      rides: 102,
      status: "Active",
    },
    {
      id: "MT",
      name: "Metro Transport Co.",
      contact: {
        name: "Robert Johnson",
        email: "robert@metrotransport.com",
      },
      location: "Decatur, GA",
      drivers: 15,
      routes: 10,
      rides: 247,
      status: "Inactive",
    },
    {
      id: "GR",
      name: "Green Routes LLC",
      contact: {
        name: "Maria Garcia",
        email: "maria@greenroutes.com",
      },
      location: "Atlanta, GA",
      drivers: 6,
      routes: 4,
      rides: 83,
      status: "Inactive",
    },
    
    
  ]);
  const router = useRouter();
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [loginPartner, setLoginPartner] = useState(null);

  // const tabs = [
  //   { id: "all", label: "All Partners" },
  //   { id: "active", label: "Active" },
  //   { id: "inactive", label: "Inactive" },
  // ];

  const partnerStats = [
    {
      title: "Total Partners",
      value: partners.length.toString(),
      details: `${
        partners.filter((p) => p.status === "Active").length
      } Active • ${
        partners.filter((p) => p.status === "Inactive").length
      } Inactive`,
      icon: <FileText className="text-[var(--blue)]" />,
      iconBg: "bg-[var(--blue-100)]",
    },
    {
      title: "Total Drivers",
      value: partners.reduce((sum, p) => sum + p.drivers, 0).toString(),
      details: "",
      icon: <Users className="text-[var(--purple)]" />,
      iconBg: "bg-[var(--purple-100)]",
    },
    {
      title: "Active Routes",
      value: partners.reduce((sum, p) => sum + p.routes, 0).toString(),
      details: "",
      icon: <MapPin className="text-[var(--green)]" />,
      iconBg: "bg-[var(--green-100)]",
    },
    {
      title: "Total Rides",
      value: partners.reduce((sum, p) => sum + p.rides, 0).toString(),
      details: "",
      icon: <Car className="text-[var(--orange)]" />,
      iconBg: "bg-[var(--orange-100)]",
    },
  ];

  const filteredPartners = partners.filter((partner) => {
    const matchesSearch =
      partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      partner.location.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 0) return matchesSearch; // All Partners
    if (activeTab === 1) return matchesSearch && partner.status === "Active";
    if (activeTab === 2) return matchesSearch && partner.status === "Inactive";
    return matchesSearch;
  });

  const handleDeletePartner = (id) => {
    setPartners((prev) => prev.filter((p) => p.id !== id));
  };

  const handleToggleStatus = (id) => {
    setPartners((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, status: p.status === "Active" ? "Inactive" : "Active" }
          : p
      )
    );
  };

  const openDeleteModal = (partner) => {
    setPartnerToDelete(partner);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (partnerToDelete) {
      handleDeletePartner(partnerToDelete.id);
      setDeleteModalOpen(false);
      setPartnerToDelete(null);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div>
       <h1 className="text-3xl font-bold mb-8">
            Partners
          </h1>
        
        </div>
        <div className="flex gap-3">
          
          <button
            onClick={() => setIsAddPartnerModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--blue-600)] text-white rounded-md"
          >
            <Plus size={18} />
            Add Partner
          </button>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-6 mb-8">
        {partnerStats.map((stat, index) => (
          <div
            key={index}
            className="bg-[var(--background)] p-6 rounded-lg shadow-sm border border-[var(--gray-100)]"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-[var(--gray-500)] text-sm mb-1">
                  {stat.title}
                </p>
                <h3 className="text-3xl font-bold">{stat.value}</h3>
                {stat.details && (
                  <p className="text-xs text-[var(--gray-500)] mt-1">
                    {stat.details}
                  </p>
                )}
              </div>
              <div className={`${stat.iconBg} p-3 rounded-full`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[var(--background)] rounded-lg border--[var(--red)] shadow-sm border border-[var(--gray-100)]">
        <div className="p-4 border-b border-[var(--gray-100)]">
          <h2 className="text-2xl font-semibold mb-2">Partner Management</h2>
          <p className="text-sm text-[var(--gray-500)] mb-4">
            View and manage all partner organizations
          </p>
          
          {/* Search and Filter Section - Full Width */}
          <div className="flex justify-between items-center gap-2">
            <div className="relative w-full">
              <SearchInput
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search partners..."
                width="w-full"
              />
            </div>
          </div>
        </div>
        {/* <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} /> */}

        <div className="overflow-x-auto mt-5">
          <table className="w-full">
            <thead className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Company Name</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Contact</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Location</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Drivers</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Routes</th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Rides</th>
                <th className="px-6 py-3 text-center text-sm font-semibold text-[var(--gray-700)]">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPartners.map((partner) => (
                <tr
                  key={partner.id}
                  className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)] transition-all duration-200"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--purple)] text-white flex items-center justify-center text-sm font-bold">
                        {filteredPartners.indexOf(partner) + 1}
                      </div>
                      <span className="font-medium">{partner.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium">{partner.contact.name}</div>
                      <div className="text-sm text-[var(--gray-500)]">
                        {partner.contact.email}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span>{partner.location}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[var(--gray-500)]">-</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[var(--gray-500)]">-</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-[var(--gray-500)]">-</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center">
                      <button
                        onClick={() => openDeleteModal(partner)}
                        className="text-[var(--gray-400)] hover:text-red-500 p-2 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddPartnerModal
        isOpen={isAddPartnerModalOpen}
        onClose={() => setIsAddPartnerModalOpen(false)}
      />
      <PartnerLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        partner={loginPartner}
      />
      <DeleteModal
        open={deleteModalOpen}
        onClose={() => {
          setDeleteModalOpen(false);
          setPartnerToDelete(null);
        }}
        onDelete={confirmDelete}
        itemName={partnerToDelete?.name || ""}
      />
    </div>
  );
}
