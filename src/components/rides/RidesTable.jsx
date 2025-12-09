"use client";
import { useRouter } from "next/navigation";
import React, { useState, useRef, useEffect } from "react";
import DualTimeDisplay from "@/components/ui/DualTimeDisplay";
import Button from "@/components/ui/Button";
import { MoreVertical } from "lucide-react";
import { Edit, CheckCircle, XCircle } from "lucide-react";
import CompleteRideModal from "./CompleteRideModal";
import CancelRideModal from "./CancelRideModal";
import RideDetailContent from "./RideDetailContent";
import DriverDetailModal from "@/components/drivers/DriverDetailModal";
import StatusBadge from "@/components/ui/StatusBadge";
import HoverTooltip from "@/components/ui/HoverTooltip";
import InProgressTooltipContent from "@/components/ui/InProgressTooltipContent";
import EditTripModal from "@/components/common/modals/EditTripModal";

export default function RidesTable({ rides, currentPage = 1, itemsPerPage = 10 }) {
  const router = useRouter();

  const handleRideClick = (rideId) => {
    setSelectedRideId(rideId);
    setShowRideDetailModal(true);
  };

  const [showActionMenu, setShowActionMenu] = useState(false);
  const [activeRideIndex, setActiveRideIndex] = useState(null);
  const [showCompleteModal, setShowCompleteModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [selectedRide, setSelectedRide] = useState(null);
  const [showRideDetailModal, setShowRideDetailModal] = useState(false);
  const [selectedRideId, setSelectedRideId] = useState(null);
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const [showEditTripModal, setShowEditTripModal] = useState(false);
  const actionMenuRef = useRef();

  const computeLateMinutes = (ride) => {
    const status = String(ride?.status || '').toLowerCase();
    if (!(status === 'late' || status === 'delayed')) return undefined;
    const scheduled = ride?.dropoff?.scheduled;
    // Prefer completed time if present, otherwise arrived
    const actual = ride?.dropoff?.completed || ride?.dropoff?.arrived;
    if (!scheduled || !actual) return 40;
    const parse = (t) => {
      const m = String(t).match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
      if (!m) return null;
      let h = parseInt(m[1], 10);
      const min = parseInt(m[2], 10);
      const ampm = m[3].toUpperCase();
      if (ampm === 'PM' && h !== 12) h += 12;
      if (ampm === 'AM' && h === 12) h = 0;
      return h * 60 + min;
    };
    const sMin = parse(scheduled);
    const aMin = parse(actual);
    if (sMin == null || aMin == null) return 40;
    const diff = aMin - sMin;
    return diff > 0 ? diff : undefined;
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (actionMenuRef.current && !actionMenuRef.current.contains(e.target)) {
        setShowActionMenu(false);
        setActiveRideIndex(null);
      }
    }
    
    // Check if we're in a browser environment
    if (typeof document === 'undefined') {
      return;
    }
    
    if (showActionMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showActionMenu]);

  return (
    <div className="overflow-hidden">
      {rides.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <svg
            width="48"
            height="48"
            fill="none"
            viewBox="0 0 24 24"
            className="mb-4 text-muted"
          >
            <path
              d="M7 17V17.01M17 17V17.01M7 17C5.34315 17 4 15.6569 4 14V10C4 8.34315 5.34315 7 7 7H17C18.6569 7 20 8.34315 20 10V14C20 15.6569 18.6569 17 17 17H7ZM7 17V17.01M17 17V17.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="text-lg font-semibold text-[var(--gray-500)] mb-2">
            No rides found
          </div>
          <div className="text-[var(--gray-400)]">
            No rides matching your current filters.
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Ride Info</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Pick-up</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Drop-off</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Driver & Vehicle</th>
                <th className="px-4 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Status</th>
              </tr>
            </thead>
            <tbody>
              {rides.map((ride, index) => (
                <tr
                  key={ride.id}
                  className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)] cursor-pointer transition-all duration-200"
                  onClick={() => handleRideClick(ride.id)}
                >
                  <td className="px-4 py-2 hover:bg-[var(--gray-100)] transition-all duration-200">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-[var(--purple)] text-white flex items-center justify-center text-sm font-bold">
                        {(currentPage - 1) * itemsPerPage + index + 1}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[var(--primary-black)]">
                          {ride.id}
                        </div>
                        <div className="text-xs text-[var(--gray-600)] font-medium">
                          {ride.district}
                        </div>
                        <div className="text-xs text-[var(--gray-500)]">
                          {ride.date}
                        </div>
                        <div className="text-xs text-[var(--blue-dark)] font-semibold mt-1">
                          Scheduled: <DualTimeDisplay
                            rideTime={ride.scheduledTime}
                            rideTimezone={ride.timezone}
                            showLabels={false}
                            className="text-[var(--blue-dark)]"
                            compact={true}
                          />
                        </div>
                        {ride.equipmentSummary && (
                          <div className="text-xs text-[var(--gray-700)] mt-1">
                            Equipment: {ride.equipmentSummary}
                          </div>
                        )}
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-2 hover:bg-[var(--gray-100)] transition-all duration-200">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-[var(--green)] mt-1 flex-shrink-0"></div>
                      <div className="min-w-0">
                        <div className="text-xs text-[var(--blue-600)]">
                          Scheduled: <DualTimeDisplay
                            rideTime={ride.pickup.scheduled}
                            rideTimezone={ride.timezone}
                            showLabels={false}
                            className="text-[var(--blue-600)]"
                            compact={true}
                          />
                        </div>
                        <div className="text-xs text-[var(--success-dark)]">
                          Arrived: <DualTimeDisplay
                            rideTime={ride.pickup.arrived}
                            rideTimezone={ride.timezone}
                            showLabels={false}
                            className="text-[var(--success-dark)]"
                            compact={true}
                          />
                        </div>
                        {ride.pickup.confirmed && (
                          <div className="text-xs text-[var(--warning-dark)]">
                            Confirmed: <DualTimeDisplay
                              rideTime={ride.pickup.confirmed}
                              rideTimezone={ride.timezone}
                              showLabels={false}
                              className="text-[var(--warning-dark)]"
                              compact={true}
                            />
                          </div>
                        )}
                        <div className="text-xs text-[var(--gray-700)] mt-1 truncate max-w-[200px]" title={ride.pickup.location}>
                          {ride.pickup.location}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-2 hover:bg-[var(--gray-100)] transition-all duration-200">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 rounded-full bg-[var(--orange)] mt-1 flex-shrink-0"></div>
                      <div className="min-w-0">
                        <div className="text-xs text-[var(--blue-600)]">
                          Scheduled: <DualTimeDisplay
                            rideTime={ride.dropoff.scheduled}
                            rideTimezone={ride.timezone}
                            showLabels={false}
                            className="text-[var(--blue-600)]"
                            compact={true}
                          />
                        </div>
                        <div className="text-xs text-[var(--success-dark)]">
                          Arrived: <DualTimeDisplay
                            rideTime={ride.dropoff.arrived}
                            rideTimezone={ride.timezone}
                            showLabels={false}
                            className="text-[var(--success-dark)]"
                            compact={true}
                          />
                        </div>
                        {ride.dropoff.completed && (
                          <div className="text-xs text-[var(--warning-dark)]">
                            Completed: <DualTimeDisplay
                              rideTime={ride.dropoff.completed}
                              rideTimezone={ride.timezone}
                              showLabels={false}
                              className="text-[var(--warning-dark)]"
                              compact={true}
                            />
                          </div>
                        )}
                        <div className="text-xs text-[var(--gray-700)] mt-1 truncate max-w-[200px]" title={ride.dropoff.location}>
                          {ride.dropoff.location}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-2 hover:bg-[var(--gray-100)] transition-all duration-200">
                    <div>
                      <div className="font-semibold text-sm text-[var(--primary-black)]">
                        {ride.driver.name}
                      </div>
                      <div className="text-xs text-[var(--gray-600)]">
                        {ride.driver.vehicle}
                      </div>
                      <div className="text-xs text-[var(--gray-500)] mt-1">
                        {ride.details.distance} • {ride.details.duration}
                      </div>
                      <div className="text-xs text-[var(--gray-500)]">
                        {ride.details.stops} stops • {ride.details.students} students
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-2 hover:bg-[var(--gray-100)] transition-all duration-200">
                    <div className="flex items-center justify-between">
                      {String(ride.status).toLowerCase() === "in progress" ? (
                        <HoverTooltip
                          content={
                            <InProgressTooltipContent
                              nextStop={ride.nextStop?.address}
                              scheduledTime={ride.dropoff?.scheduled}
                              estimatedTime={ride.dropoff?.estimated}
                              rideTimezone={ride.timezone}
                              stops={ride.stops}
                              stopsCount={ride.details?.stops}
                            />
                          }
                        >
                          <span>
                            <StatusBadge status={ride.status} lateMinutes={computeLateMinutes(ride)} />
                          </span>
                        </HoverTooltip>
                      ) : (
                        <StatusBadge status={ride.status} lateMinutes={computeLateMinutes(ride)} />
                      )}
                      <div className="relative">
                        <Button
                          className="p-2 text-[var(--gray-400)] hover:text-[var(--gray-600)] hover:bg-[var(--purple)]"
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowActionMenu(
                              index === activeRideIndex ? !showActionMenu : true
                            );
                            setActiveRideIndex(index);
                            if (onActionMenu) onActionMenu(ride, index);
                          }}
                          variant="ghost"
                        >
                          <MoreVertical size={18} />
                        </Button>
                        {showActionMenu && activeRideIndex === index && (
                          <div
                            ref={actionMenuRef}
                            className="absolute right-0 mt-2 w-48 bg-[var(--background)] rounded-lg shadow-lg z-50 py-2 border border-card-border"
                          >
                            <Button
                              className="flex !justify-start w-full px-4 py-2 text-sm text-foreground hover:bg-[var(--purple)] gap-2"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowActionMenu(false);
                                setSelectedRide(ride);
                                setShowEditTripModal(true);
                              }}
                            >
                              <Edit size={16} /> Edit
                            </Button>
                            <Button
                              className="flex !justify-start w-full px-4 py-2 text-sm text-foreground hover:bg-[var(--purple)] gap-2"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowActionMenu(false);
                                setSelectedRide(ride);
                                setShowCompleteModal(true);
                              }}
                            >
                              <CheckCircle size={16} /> Complete
                            </Button>
                            <Button
                              className="flex !justify-start w-full px-4 py-2 text-sm text-[var(--red)] hover:bg-[var(--purple)] gap-2"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowActionMenu(false);
                                setSelectedRide(ride);
                                setShowCancelModal(true);
                              }}
                            >
                              <XCircle size={16} /> Cancel
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Complete Ride Modal */}
      <CompleteRideModal
        open={showCompleteModal}
        onClose={() => {
          setShowCompleteModal(false);
          setSelectedRide(null);
        }}
        rideId={selectedRide?.id}
        onComplete={() => {
         }}
      />

      {/* Cancel Ride Modal */}
      <CancelRideModal
        open={showCancelModal}
        onClose={() => {
          setShowCancelModal(false);
          setSelectedRide(null);
        }}
        rideId={selectedRide?.id}
        onCancel={() => {
        }}
      />

      {/* Ride Detail Modal */}
      {showRideDetailModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-40 flex items-start justify-center z-[9000] pt-6"
          onClick={() => setShowRideDetailModal(false)}
        >
          <div 
            className="bg-white rounded-2xl !max-w-[82rem] mx-4 w-full max-h-[calc(100vh-3rem)] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <RideDetailContent 
              rideId={selectedRideId} 
              onClose={() => setShowRideDetailModal(false)}
              onViewDriver={(driverId) => {
                // close ride modal and open driver modal
                setShowRideDetailModal(false);
                setSelectedDriverId(driverId);
                setTimeout(() => setShowDriverModal(true), 0);
              }}
            />
          </div>
        </div>
      )}

      {/* Driver Profile Modal - opens alone, with back to Ride Details */}
      <DriverDetailModal
        isOpen={showDriverModal}
        onClose={() => {
          setShowDriverModal(false);
          // reopen ride detail after close
          if (selectedRideId) {
            setTimeout(() => setShowRideDetailModal(true), 0);
          }
        }}
        driverId={selectedDriverId}
      />

      {/* Edit Trip Modal */}
      <EditTripModal
        isOpen={showEditTripModal}
        onClose={() => {
          setShowEditTripModal(false);
          // don't clear selectedRide here in case we want to reuse it after closing
        }}
        rideId={selectedRide?.id}
        initialData={{
          pickupAddress: selectedRide?.pickup?.location || "",
          dropoffAddress: selectedRide?.dropoff?.location || "",
        }}
        onConfirm={(data) => {
          // Placeholder: integrate with update API when available
          console.log("Edit Trip confirmed:", data);
          setShowEditTripModal(false);
        }}
      />
    </div>
  );
}
