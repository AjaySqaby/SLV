"use client";

import { useState } from "react";
import EagleEyeHeader from "./EagleEyeHeader";
import SearchFilters from "./SearchFilters";
import MapView from "./MapView";
import Sidebar from "./Sidebar";
import RideDetailModal from "./ride-detail-modal";

export default function EagleEyeContent() {
  const [activeTab, setActiveTab] = useState(0);
  const [activeStatusFilter, setActiveStatusFilter] = useState("All");
  const [showDistrictsDropdown, setShowDistrictsDropdown] = useState(false);
  const [showSchoolsDropdown, setShowSchoolsDropdown] = useState(false);
  const [showPartnersDropdown, setShowPartnersDropdown] = useState(false);
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

  const districts = [
    "All Districts",
    "Atlanta Public Schools",
    "Fulton County Schools",
    "DeKalb County Schools",
  ];

  const schools = [
    "All Schools",
    "Midtown High School",
    "Buckhead Elementary",
    "Downtown High School",
  ];

  const partners = ["All Partners", "Partner 1", "Partner 2", "Partner 3"];

  const openRideModal = (rideId) => {
    setSelectedRideId(rideId);
    setShowRideModal(true);
  };

  return (
    <div className="h-screen flex flex-col">
      <EagleEyeHeader />
      <div className="flex-1 flex">
        <div className="flex-1 flex flex-col">
          <SearchFilters
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            showDistrictsDropdown={showDistrictsDropdown}
            setShowDistrictsDropdown={setShowDistrictsDropdown}
            showSchoolsDropdown={showSchoolsDropdown}
            setShowSchoolsDropdown={setShowSchoolsDropdown}
            showPartnersDropdown={showPartnersDropdown}
            setShowPartnersDropdown={setShowPartnersDropdown}
            districts={districts}
            schools={schools}
            partners={partners}
          />
          <MapView />
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
