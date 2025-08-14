"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import PartnerHeader from "@/components/partners/details/PartnerHeader";
import PartnerInfoCard from "@/components/partners/details/PartnerInfoCard";
import ContactInfo from "@/components/partners/details/ContactInfo";
import ServiceAreas from "@/components/partners/details/ServiceAreas";
import PartnerManagement from "@/components/partners/details/PartnerManagement";
import AddDriverModal from "@/components/drivers/AddDriverModal";

export default function PartnerDetailsPage({ params }) {
  const router = useRouter();
  const [showAddDriverModal, setShowAddDriverModal] = useState(false);
  const partner = {
    id: params.id,
    name: "City Transit Solutions",
    location: "Atlanta, GA",
    status: "Active",
    stats: {
      drivers: 12,
      routes: 8,
      rides: 156,
    },
    contact: {
      name: "John Smith",
      email: "john@citytransit.com",
    },
    serviceAreas: ["Atlanta", "Marietta", "Decatur", "Sandy Springs"],
    drivers: [
      {
        id: 1,
        name: "John Doe",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "john@example.com",
        phone: "(404) 555-1234",
        status: "Active",
        completedRides: 45,
        rating: 4.8,
      },
      {
        id: 2,
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "jane@example.com",
        phone: "(404) 555-5678",
        status: "Active",
        completedRides: 32,
        rating: 4.5,
      },
      {
        id: 3,
        name: "Robert Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        email: "robert@example.com",
        phone: "(404) 555-9012",
        status: "Inactive",
        completedRides: 28,
        rating: 4.2,
      },
    ],
  };

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <PartnerHeader
        partner={partner}
        onBack={() => router.push("/partners")}
      />
      <PartnerInfoCard partner={partner} />
      <ContactInfo contact={partner.contact} />
      <ServiceAreas areas={partner.serviceAreas} />
      <PartnerManagement
        partner={partner}
        onAddDriver={() => setShowAddDriverModal(true)}
      />
      <AddDriverModal
        isOpen={showAddDriverModal}
        onClose={() => setShowAddDriverModal(false)}
      />
    </div>
  );
}
