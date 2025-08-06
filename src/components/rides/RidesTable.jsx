import React, { useState, useRef, useEffect } from "react";
import {
  MoreVertical,
  Globe,
  Edit,
  UserPlus,
  CheckCircle,
  XCircle,
} from "lucide-react";
import TimezoneModal from "./TimezoneModal";
import Button from "@/components/ui/Button";

export default function RidesTable({
  rides,
  onActionMenu,
  onView,
  onTrack,
  onAssignDriver,
  onCompleteRide,
  onCancelRide,
}) {
  const [showActionMenu, setShowActionMenu] = useState(false);
  const [activeRideIndex, setActiveRideIndex] = useState(null);
  const [timezoneModal, setTimezoneModal] = useState({
    open: false,
    rideIndex: null,
    field: null,
  });
  const globeRefs = useRef({});
  const actionMenuRef = useRef();

  const handleGlobeClick = (rideIndex, field) => {
    setTimezoneModal({ open: true, rideIndex, field });
  };

  const handleTimezoneClose = () => {
    setTimezoneModal({ open: false, rideIndex: null, field: null });
  };

  const handleTimezoneSelect = (tz) => {
    handleTimezoneClose();
  };

  useEffect(() => {
    function handleClickOutside(e) {
      if (actionMenuRef.current && !actionMenuRef.current.contains(e.target)) {
        setShowActionMenu(false);
        setActiveRideIndex(null);
      }
    }
    if (showActionMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showActionMenu]);

  return (
    <div className="bg-transparent">
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
        rides.map((ride, index) => (
          <div
            key={ride.id}
            className="bg-[var(--on-primary)] rounded-xl shadow-sm border border-[var(--gray-200)] mb-4 px-4 py-4 relative"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
              <div className="md:col-span-2 flex items-center">
                <div className="flex-1">
                  <div className="bg-[var(--gray-50)] border border-[var(--gray-200)] rounded-lg p-4 relative">
                    <div className="absolute top-2 right-2">
                      <span className="w-8 h-8 rounded-full bg-[var(--on-primary)] border border-[--gray-300] flex items-center justify-center text-base font-semibold text-[var(--gray-500)] shadow-sm">
                        {index + 1}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-[var(--primary-black)] mb-1">
                      {ride.id}
                    </div>
                    <div className="text-sm text-[var(--gray-500)] font-medium mb-1">
                      {ride.district}
                    </div>
                    <div className="text-xs text-[var(--gray-500)] mb-1">
                      {ride.date}
                    </div>
                    <div className="text-sm text-[var(--blue-dark)] font-semibold">
                      Scheduled: {ride.scheduledTime}
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-3">
                <div className="flex items-start">
                  <div className="w-3 h-3 rounded-full bg-[var(--green)] flex items-center justify-center mt-1 mr-1"></div>
                  <div>
                    <div className="text-xs font-medium">Pick-up</div>
                    <div className="text-xs text-[var(--blue-600)] flex items-center">
                      Scheduled: {ride.pickup.scheduled}
                      <button
                        type="button"
                        ref={(el) => {
                          if (!globeRefs.current[`${index}-pickup`])
                            globeRefs.current[`${index}-pickup`] = el;
                        }}
                        className="ml-1 p-1 text-[var(--blue-400)] hover:text-[var(--blue-800)]"
                        onClick={() => handleGlobeClick(index, "pickup")}
                        aria-label="Convert pick-up time"
                      >
                        <Globe size={16} />
                      </button>
                      {timezoneModal.open &&
                        timezoneModal.rideIndex === index &&
                        timezoneModal.field === "pickup" && (
                          <TimezoneModal
                            open={true}
                            onClose={handleTimezoneClose}
                            anchorRef={{
                              current: globeRefs.current[`${index}-pickup`],
                            }}
                            onSelect={handleTimezoneSelect}
                          />
                        )}
                    </div>
                    <div className="text-xs text-[var(--success-dark)]">
                      Arrived: {ride.pickup.arrived}
                    </div>
                    {ride.pickup.confirmed && (
                      <div className="text-xs text-[var(--warning-dark)]">
                        Confirmed: {ride.pickup.confirmed}
                      </div>
                    )}
                    <div className="text-xs text-[var(--gray-700)] mt-1">
                      {ride.pickup.location}
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-3">
                <div className="flex items-start">
                  <div className="w-3 h-3 rounded-full bg-[var(--orange)] flex items-center justify-center mt-1 mr-1"></div>
                  <div>
                    <div className="text-xs font-medium">Drop-off</div>
                    <div className="text-xs text-[var(--blue-600)] flex items-center">
                      Scheduled: {ride.dropoff.scheduled}
                      <button
                        type="button"
                        ref={(el) => {
                          if (!globeRefs.current[`${index}-dropoff`])
                            globeRefs.current[`${index}-dropoff`] = el;
                        }}
                        className="ml-1 p-1 text-[var(--blue-400)] hover:text-[var(--blue-800)]"
                        onClick={() => handleGlobeClick(index, "dropoff")}
                        aria-label="Convert drop-off time"
                      >
                        <Globe size={16} />
                      </button>
                      {timezoneModal.open &&
                        timezoneModal.rideIndex === index &&
                        timezoneModal.field === "dropoff" && (
                          <TimezoneModal
                            open={true}
                            onClose={handleTimezoneClose}
                            anchorRef={{
                              current: globeRefs.current[`${index}-dropoff`],
                            }}
                            onSelect={handleTimezoneSelect}
                          />
                        )}
                    </div>
                    <div className="text-xs text-[var(--success-dark)]">
                      Arrived: {ride.dropoff.arrived}
                    </div>
                    {ride.dropoff.completed && (
                      <div className="text-xs text-[var(--warning-dark)]">
                        Completed: {ride.dropoff.completed}
                      </div>
                    )}
                    <div className="text-xs text-[var(--gray-700)] mt-1">
                      {ride.dropoff.location}
                    </div>
                  </div>
                </div>
              </div>

              <div className="md:col-span-4 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="font-semibold text-sm leading-tight">
                      {ride.driver.name}
                    </div>
                    <div className="text-[var(--gray-700)] text-sm">
                      {ride.driver.vehicle}
                    </div>
                    <div className="text-xs text-[var(--gray-500)] mt-1">
                      {ride.details.distance} {ride.details.duration}{" "}
                      {ride.details.stops} stops {ride.details.students}{" "}
                      students
                    </div>
                  </div>
                  <div className="flex items-center mt-1">
                    <span
                      className={`w-2 h-2 rounded-full mr-1 bg-${ride.statusColor}`}
                    ></span>
                    <span
                      className={`text-xs font-medium text-${ride.statusColor} `}
                    >
                      {ride.status}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-3">
                  <Button
                    className="flex-1 py-1.5 rounded-lg text-sm font-medium text-foreground bg-transparent hover:bg-[var(--purple)] transition border-2"
                    onClick={() => onView && onView(ride.id)}
                    variant="ghost"
                  >
                    View
                  </Button>
                  <Button
                    className="flex-1 py-1.5 border border-[--gray-300] rounded-lg text-sm font-medium text-foreground bg-[var(--background)] hover:bg-[var(--purple)] transition"
                    onClick={() => onTrack && onTrack(ride.id)}
                    variant="secondary"
                  >
                    Track
                  </Button>
                  <Button
                    className="flex-1 py-1.5 border border-[--gray-300] rounded-lg text-sm font-medium text-foreground hover:bg-[var(--purple)] transition"
                    style={{ backgroundColor: '#eff6ff' }}
                    onClick={() => onAssignDriver && onAssignDriver(ride.id)}
                    variant="secondary"
                  >
                    Assign
                  </Button>
                  <div className="relative">
                    <Button
                      className="p-2 text-[var(--gray-400)] hover:text-[var(--gray-600)] hover:bg-[var(--purple)]"
                      onClick={() => {
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
                        >
                          <Edit size={16} /> Edit
                        </Button>
                        <Button
                          className="flex !justify-start w-full px-4 py-2 text-sm text-foreground hover:bg-[var(--purple)] gap-2"
                          variant="ghost"
                          onClick={() => {
                            setShowActionMenu(false);
                            onCompleteRide && onCompleteRide(ride.id);
                          }}
                        >
                          <CheckCircle size={16} /> Complete
                        </Button>
                        <Button
                          className="flex !justify-start w-full px-4 py-2 text-sm text-[var(--red)] hover:bg-[var(--purple)] gap-2"
                          variant="ghost"
                          onClick={() => {
                            setShowActionMenu(false);
                            onCancelRide && onCancelRide(ride.id);
                          }}
                        >
                          <XCircle size={16} /> Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div
                className={`h-1.5 rounded-full ${
                  ride.statusColor === "blue"
                    ? "bg-[var(--green)]"
                    : ride.statusColor === "[var(--warning)]"
                    ? "bg-[var(--orange)]"
                    : ride.statusColor === "[var(--red)]"
                    ? "bg-[var(--red)]"
                    : "bg-[var(--gray-500)]"
                }`}
                style={{ width: "10%" }}
              ></div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
