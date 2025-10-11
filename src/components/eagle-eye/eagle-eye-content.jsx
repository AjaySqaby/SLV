"use client";

import { useState } from "react";
import EagleEyeHeader from "./EagleEyeHeader";
import SearchFilters from "./SearchFilters";
import MapView from "./MapView";
import Sidebar from "./Sidebar";
import RideDetailModal from "./ride-detail-modal";

export default function EagleEyeContent() {
  // Removed All/District/School/Partner tabs in favor of a single search bar
  const [activeStatusFilter, setActiveStatusFilter] = useState("All");
  const [showRideModal, setShowRideModal] = useState(false);
  const [selectedRideId, setSelectedRideId] = useState(null);
  const [sidebarTab, setSidebarTab] = useState("rides");

  const rides = [
    {
      id: "RT1001",
      driver: {
        name: "Michael Davis",
        avatar: "/placeholder.svg?height=40&width=40",
        location: "1221 Broadway",
        phone: "(510) 555-1234",
      },
      eta: "08:30 AM",
      status: "On Time",
    },
    {
      id: "RT1002",
      driver: {
        name: "Sophia Martinez",
        avatar: "/placeholder.svg?height=40&width=40",
        location: "365 14th St",
        phone: "(510) 555-5678",
      },
      eta: "09:15 AM",
      status: "Delayed",
    },
  ];

  // Legacy filter lists removed per requirement

  const openRideModal = (rideId) => {
    setSelectedRideId(rideId);
    setShowRideModal(true);
  };

  return (
    <div className="h-screen w-full flex flex-col bg-gray-50 overflow-hidden">
      <EagleEyeHeader />
      <div className="flex-1 flex min-h-0">
        <div className="flex-1 flex flex-col min-w-0">
          <SearchFilters />
          <MapView onViewRide={openRideModal} />
        </div>

        <Sidebar
          rides={rides}
          activeStatusFilter={activeStatusFilter}
          setActiveStatusFilter={setActiveStatusFilter}
          onViewRide={openRideModal}
          sidebarTab={sidebarTab}
          setSidebarTab={setSidebarTab}
        />
      </div>

      <RideDetailModal
        isOpen={showRideModal}
        onClose={() => setShowRideModal(false)}
        rideId={selectedRideId}
      />
    </div>
  );
}
