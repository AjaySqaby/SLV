"use client";

import { useState } from "react";
import EagleEyeHeader from "./EagleEyeHeader";
import SearchFilters from "./SearchFilters";
import MapView from "./MapView";
import Sidebar from "./Sidebar";
import AssignRouteDriverModal from "@/components/routes/AssignRouteDriverModal";
import RideDetailModal from "./ride-detail-modal";

export default function EagleEyeContent() {
  // Removed All/District/School/Partner tabs in favor of a single search bar
  const [activeStatusFilter, setActiveStatusFilter] = useState("All");
  const [showRideModal, setShowRideModal] = useState(false);
  const [selectedRideId, setSelectedRideId] = useState(null);
  const [selectedRideStatus, setSelectedRideStatus] = useState(null);
  const [sidebarTab, setSidebarTab] = useState("rides");
  const [showSuggest, setShowSuggest] = useState(false);
  const [suggestRide, setSuggestRide] = useState(null);
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [assignContext, setAssignContext] = useState({ routeId: null, driverName: null });

  const rides = [
    {
      id: "RT1001",
      driver: {
        name: "Michael Davis",
        avatar: "/driver1.jpg",
        location: "1221 Broadway",
        phone: "(510) 555-1234",
      },
      eta: "08:30 AM",
      status: "On Time",
      statusColor: "green", // Green for on time
    },
    {
      id: "RT1002",
      driver: {
        name: "Sophia Martinez",
        avatar: "/driver2.jpg",
        location: "365 14th St",
        phone: "(510) 555-5678",
      },
      eta: "09:15 AM",
      status: "Delayed",
      statusColor: "red", // Red for delayed
    },
    {
      id: "RT1003",
      driver: {
        name: "Unassigned",
        avatar: "",
        location: "",
        phone: "",
      },
      eta: "--",
      status: "Unknown",
      statusColor: "black", // Black for unknown
    },
  ];

  // Legacy filter lists removed per requirement

  const openRideModal = (rideId, status) => {
    setSelectedRideId(rideId);
    setSelectedRideStatus(status || null);
    setShowRideModal(true);
  };

  const handleSmartSuggest = (ride) => {
    setSuggestRide(ride);
    setShowSuggest(true);
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
          onSmartSuggest={handleSmartSuggest}
        />
      </div>

      <RideDetailModal
        isOpen={showRideModal}
        onClose={() => setShowRideModal(false)}
        rideId={selectedRideId}
        rideStatus={selectedRideStatus || (rides.find(r=>r.id===selectedRideId)?.status) || 'In Progress'}
      />

      {/* Smart Suggestion Drawer */}
      {showSuggest && suggestRide && (
        <div className="fixed inset-0 z-[9998]" onClick={()=>{setShowSuggest(false); setSuggestRide(null);}}>
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-lg bg-white border-l border-[var(--border)] shadow-xl"
               onClick={(e)=>e.stopPropagation()}>
            <div className="p-4 border-b border-[var(--border)] flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">Smart Suggestion</h3>
                <p className="text-xs text-[var(--muted-text)]">Ride {suggestRide.id}</p>
              </div>
              <button className="w-9 h-9 rounded-full hover:bg-[var(--hover-bg)]" onClick={()=>{setShowSuggest(false); setSuggestRide(null);}}>✕</button>
            </div>
            <div className="p-4 space-y-3 overflow-y-auto max-h-[calc(100vh-140px)]">
              {[{
                id: 'D1', name: 'Sarah Williams', distance: 0.6, status: 'Ready Now', minutesToDrop: 0, eta: '10 min', avatar: '/driver3.jpg'
              },{
                id: 'D3', name: 'David Thompson', distance: 1.3, status: 'On Active Ride', minutesToDrop: 12, eta: '18 min', avatar: '/driver4.jpg'
              }].map(d => (
                <div key={d.id} className="p-3 border border-[var(--gray-200)] rounded-lg flex items-center gap-3">
                  <img src={d.avatar} alt={d.name} className="w-10 h-10 rounded-full object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-[var(--heading)]">{d.name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${d.status === 'Ready Now' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}`}>{d.status}</span>
                    </div>
                    <div className="text-xs text-[var(--muted-text)]">Deadhead: {d.distance} mi • {d.minutesToDrop ? `${d.minutesToDrop} min to drop-off •` : ''} ETA pickup: {d.eta}</div>
                  </div>
                  <button
                    className="text-xs px-3 py-1 rounded bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]"
                    onClick={()=>{
                      setAssignContext({ routeId: suggestRide.id, driverName: d.name });
                      setAssignModalOpen(true);
                    }}
                  >Assign</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {assignModalOpen && (
        <AssignRouteDriverModal
          isOpen={assignModalOpen}
          onClose={()=>setAssignModalOpen(false)}
          routeId={assignContext.routeId}
          currentDriverName={null}
          driverOptions={[
            { value: 'D1', label: 'Sarah Williams' },
            { value: 'D3', label: 'David Thompson' },
          ]}
          initialMode="assign"
          initialSelectedDriver={assignContext.driverName === 'Sarah Williams' ? 'D1' : 'D3'}
          onApply={(payload)=>{
            console.log('Assigned from suggestion', payload);
            setAssignModalOpen(false);
            setShowSuggest(false);
            setSuggestRide(null);
          }}
        />
      )}
    </div>
  );
}
