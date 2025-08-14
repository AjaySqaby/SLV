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
          {/* <h1 className="text-3xl font-bold text-[var(--blue-600)]">
            Partners Dashboard
          </h1>
          <p className="text-[var(--gray-600)]">
            Manage your transportation partners and their details
          </p> */}
        </div>
        <div className="flex gap-3">
          
          <button
            onClick={() => setIsAddPartnerModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[var(--blue-600)] text-[var(--button-text)] rounded-md hover:bg-[var(--blue-dark)]"
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
        <div className="flex items-center justify-between">
          <div className="mb-4 border-b border-[var(--gray-100) p-4">
            <h2 className="text-2xl font-semibold">Partner Management</h2>
            <p className="text-sm text-[var(--gray-500)]">
              View and manage all partner organizations
            </p>
            <br />
            <div className="flex">
              <SearchInput
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search partners..."
                width="w-[300px]"
              />
            </div>
          </div>

          
        </div>
        {/* <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} /> */}

        <div className="overflow-x-auto mt-5">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-[var(--gray-500)] border-b border-[var(--gray-100)]">
                <th className="px-6 py-3 font-medium">Company Name</th>
                <th className="px-6 py-3 font-medium">Contact</th>
                <th className="px-6 py-3 font-medium">Location</th>
                <th className="px-6 py-3 font-medium">Drivers</th>
                <th className="px-6 py-3 font-medium">Routes</th>
                <th className="px-6 py-3 font-medium">Rides</th>
                <th className="px-6 py-3 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {filteredPartners.map((partner) => (
                <tr
                  key={partner.id}
                  className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)]"
                >
                  <td className="px-6 py-4">
                    <span className="font-medium">{partner.name}</span>
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
                    <button
                      onClick={() => openDeleteModal(partner)}
                      className="text-[var(--gray-400)] hover:text-red-500"
                    >
                      <Trash2 size={16} />
                    </button>
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
