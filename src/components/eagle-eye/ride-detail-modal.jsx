"use client";

import { useState } from "react";
import RideDetailContent from "@/components/rides/RideDetailContent";
import ManageTripModal from '@/components/common/modals/ManageTripModal'
import EditTripModal from '@/components/common/modals/EditTripModal'
import DriverDetailModal from '@/components/drivers/DriverDetailModal'
import { Map, MapPin } from 'lucide-react'
import { FaPlay, FaUsers, FaHistory } from "react-icons/fa";

export default function RideDetailModal({
  isOpen,
  onClose,
  rideId = "SLV1001-75185",
  rideStatus = "In Progress",
}) {
  // Modal states
  const [showManageTripModal, setShowManageTripModal] = useState(false)
  const [showEditTripModal, setShowEditTripModal] = useState(false)
  const [showDriverDetailModal, setShowDriverDetailModal] = useState(false)

  if (!isOpen) return null;

  // Custom tabs for Eagle Eye - All tabs in specific sequence
  const customTabs = [
    {
      value: 'stops',
      label: 'TRIP STOPS',
      icon: FaPlay
    },
    {
      value: 'students',
      label: 'STUDENTS',
      icon: FaUsers
    },
    {
      value: 'ridelog',
      label: 'TIMELINE',
      icon: FaHistory
    },
    {
      value: 'livetracking',
      label: 'LIVE TRACKING',
      icon: Map
    },
    {
      value: 'stops-list',
      label: 'STOPS',
      icon: MapPin
    }
  ]

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-start justify-center z-[9000] pt-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl !max-w-[82rem] mx-4 w-full h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 overflow-hidden flex flex-col">
          <RideDetailContent
            rideId={rideId}
            onClose={onClose}
            rideStatus={rideStatus}
            showMapViewButtons={true}
            customTabs={customTabs}
            onManageTrip={() => setShowManageTripModal(true)}
            onEditTrip={() => setShowEditTripModal(true)}
            onViewDriver={(driverId) => {
              setShowDriverDetailModal(true);
            }}
          />
        </div>
      </div>
      
      {/* Modal Components */}
      <ManageTripModal
        isOpen={showManageTripModal}
        onClose={() => setShowManageTripModal(false)}
        rideId={rideId}
        onConfirm={(data) => {
          console.log('Manage Trip confirmed:', data);
          setShowManageTripModal(false);
          // Handle manage trip logic here
        }}
      />
      
      <EditTripModal
        isOpen={showEditTripModal}
        onClose={() => setShowEditTripModal(false)}
        rideId={rideId}
        onConfirm={(data) => {
          console.log('Edit Trip confirmed:', data);
          setShowEditTripModal(false);
          // Handle edit trip logic here
        }}
      />
      
      <DriverDetailModal
        isOpen={showDriverDetailModal}
        onClose={() => setShowDriverDetailModal(false)}
        driverId={rideId}
        onBack={() => setShowDriverDetailModal(false)}
      />
    </div>
  );
}