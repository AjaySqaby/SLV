"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Plus,
  Maximize2,
  Eye,
  Share2,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  RefreshCw,
} from "lucide-react";

import AddRouteModal from "./route-edit/AddRouteModal";
import ScheduleRideModal from "./ScheduleRideModal";
import BulkScheduleModal from "./BulkScheduleModal";
import AutoGenerateModal from "./AutoGenerateModal";
import RouteViewModal from "./RouteViewModal";
import RouteEditModal from "./RouteEditModal";
import RouteScheduleModal from "./RouteScheduleModal";
import RouteActionsDropdown from "./RouteActionsDropdown";
import SearchInput from "@/components/ui/SearchInput";
import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import StatusBadge from "@/components/ui/StatusBadge";
import DeleteModal from "@/components/common/DeleteModal";

export default function RoutesContent() {
  const router = useRouter();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [bulkScheduleModalOpen, setBulkScheduleModalOpen] = useState(false);
  const [autoGenerateModalOpen, setAutoGenerateModalOpen] = useState(false);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [routeScheduleModalOpen, setRouteScheduleModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [search, setSearch] = useState("");
  const [routes, setRoutes] = useState([
    {
      id: "RT-30842",
      name: "North District Route",
      district: "86022-Z",
      stops: 5,
      distance: "12.4 mi",
      students: 7,
      status: "Active",
      driver: "Sam Kebede",
    },
    {
      id: "RT-30843",
      name: "South Campus Route",
      district: "86022-Z",
      stops: 4,
      distance: "10.2 mi",
      students: 5,
      status: "Active",
      driver: null,
    },
    {
      id: "RT-30844",
      name: "East District Route",
      district: "75044-A",
      stops: 6,
      distance: "15.8 mi",
      students: 9,
      status: "Inactive",
      driver: null,
    },
    {
      id: "RT-30845",
      name: "West Campus Route",
      district: "75044-A",
      stops: 3,
      distance: "8.5 mi",
      students: 4,
      status: "Active",
      driver: null,
    },
  ]);
  const [copySuccess, setCopySuccess] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteRouteId, setDeleteRouteId] = useState(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () =>
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const handleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  };

  // Filter routes based on search
  const filteredRoutes = routes.filter((route) => {
    const q = search.toLowerCase();
    return (
      route.id.toLowerCase().includes(q) ||
      route.name.toLowerCase().includes(q) ||
      route.district.toLowerCase().includes(q) ||
      (route.driver && route.driver.toLowerCase().includes(q))
    );
  });

  // Handler for deleting a route
  const handleDeleteRoute = (routeId) => {
    setDeleteRouteId(routeId);
    setDeleteModalOpen(true);
  };

  const confirmDeleteRoute = () => {
    setRoutes((prev) => prev.filter((r) => r.id !== deleteRouteId));
    setDeleteModalOpen(false);
    setDeleteRouteId(null);
  };

  // Handler for copying the share link
  const handleShareRoute = (routeId) => {
    const link = `${window.location.origin}/eagle-eye?routeId=${routeId}`;
    navigator.clipboard.writeText(link);
    setCopySuccess("Link copied!");
    setTimeout(() => setCopySuccess(""), 1500);
  };

  // Handler for viewing the route
  const handleViewRoute = (routeId) => {
    setSelectedRouteId(routeId);
    setViewModalOpen(true);
  };

  // Handler for editing a route
  const handleEditRoute = (routeId) => {
    setSelectedRouteId(routeId);
    setEditModalOpen(true);
  };

  // Handler for scheduling a route
  const handleScheduleRoute = (route) => {
    setSelectedRoute(route);
    setRouteScheduleModalOpen(true);
  };

  // Handler for bulk scheduling
  const handleBulkSchedule = () => {
    setBulkScheduleModalOpen(true);
  };

  // Handler for auto-generate
  const handleAutoGenerate = () => {
    setAutoGenerateModalOpen(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Routes Management</h1>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-[var(--muted-text)]"
          onClick={handleFullscreen}
        >
          <Maximize2 size={18} />
          {isFullscreen ? "Exit Full Screen" : "Full Screen"}
        </Button>
      </div>

      <div className="bg-[var(--surface-bg)] rounded-lg shadow-sm border border-[var(--card-border)] p-6 mb-8">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-[var(--purple-600)] to-[--blue] bg-clip-text text-transparent">
              Routes Management
            </h2>
            <p className="text-[var(--muted-text)]">
              Manage all transportation routes
            </p>
          </div>
                     <div className="flex gap-3">
             <SearchInput
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               placeholder="Search routes by ID, name or district"
             />
             <Button
               className="text-sm flex items-center justify-center font-medium gap-2 bg-gradient-to-r from-[var(--purple-600)] to-[var(--blue)] hover:from-[var(--purple-700)] hover:to-[var(--blue-600)]"
               onClick={() => setAddModalOpen(true)}
             >
               <Plus size={18} />
               Add New Route
             </Button>
             <Button
               variant="secondary"
               className="text-sm flex items-center justify-center font-medium gap-2 border border-gray-300 bg-white hover:bg-gray-50"
               onClick={handleBulkSchedule}
             >
               <Calendar size={18} />
               Bulk Schedule
             </Button>
             <Button
               variant="secondary"
               className="text-sm flex items-center justify-center font-medium gap-2 border border-gray-300 bg-white hover:bg-gray-50"
               onClick={handleAutoGenerate}
             >
               <RefreshCw size={18} />
               Auto-Generate
             </Button>
           </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
                         <thead>
               <tr className="text-left text-sm text-[var(--muted-text)] border-b border-[var(--card-border)]">
                 <th className="px-6 py-3 font-medium">Route ID</th>
                 <th className="px-6 py-3 font-medium">Name</th>
                 <th className="px-6 py-3 font-medium">District</th>
                 <th className="px-6 py-3 font-medium">Stops</th>
                 <th className="px-6 py-3 font-medium">Distance</th>
                 <th className="px-6 py-3 font-medium">Students</th>
                 <th className="px-6 py-3 font-medium">Status</th>
                 <th className="px-6 py-3 font-medium">Driver</th>
                 <th className="px-6 py-3 font-medium">Actions</th>
               </tr>
             </thead>
            <tbody>
              {filteredRoutes.map((route) => (
                                 <tr
                   key={route.id}
                   className="border-b border-[var(--card-border)] hover:bg-[var(--hover-bg)]"
                 >
                   <td className="px-6 py-4 font-medium">{route.id}</td>
                   <td className="px-6 py-4">{route.name}</td>
                   <td className="px-6 py-4">
                     <span className="text-blue-600 cursor-pointer hover:underline">
                       {route.district}
                     </span>
                   </td>
                   <td className="px-6 py-4">{route.stops}</td>
                   <td className="px-6 py-4">{route.distance}</td>
                   <td className="px-6 py-4">{route.students}</td>
                   <td className="px-6 py-4">
                     <StatusBadge
                       status={route.status}
                       type={route.status === "Active" ? "active" : "inactive"}
                     />
                   </td>
                   <td className="px-6 py-4">
                     {route.driver ? (
                       route.driver
                     ) : (
                       <span className="text-blue-600 cursor-pointer hover:underline">
                         Assign Driver
                       </span>
                     )}
                   </td>
                   <td className="px-6 py-4">
                     <RouteActionsDropdown
                       route={route}
                       onView={handleViewRoute}
                       onEdit={handleEditRoute}
                       onSchedule={handleScheduleRoute}
                     />
                   </td>
                 </tr>
              ))}
            </tbody>
          </table>
        </div>
        {copySuccess && (
          <div className="fixed bottom-8 right-8 bg-[var(--success)] text-white px-4 py-2 rounded shadow-lg z-50 transition-all">
            {copySuccess}
          </div>
        )}
      </div>

      <DeleteModal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onDelete={confirmDeleteRoute}
        itemName={`route ${deleteRouteId}`}
      />
             {addModalOpen && (
         <AddRouteModal
           isOpen={addModalOpen}
           onClose={() => setAddModalOpen(false)}
         />
       )}
       {scheduleModalOpen && (
         <ScheduleRideModal
           isOpen={scheduleModalOpen}
           onClose={() => {
             setScheduleModalOpen(false);
             setSelectedRoute(null);
           }}
           route={selectedRoute}
         />
       )}
       {bulkScheduleModalOpen && (
         <BulkScheduleModal
           isOpen={bulkScheduleModalOpen}
           onClose={() => setBulkScheduleModalOpen(false)}
         />
       )}
       {autoGenerateModalOpen && (
         <AutoGenerateModal
           isOpen={autoGenerateModalOpen}
           onClose={() => setAutoGenerateModalOpen(false)}
         />
       )}

       {/* Route View Modal */}
       {viewModalOpen && (
         <RouteViewModal
           isOpen={viewModalOpen}
           onClose={() => {
             setViewModalOpen(false);
             setSelectedRouteId(null);
           }}
           routeId={selectedRouteId}
         />
       )}

       {/* Route Edit Modal */}
       {editModalOpen && (
         <RouteEditModal
           isOpen={editModalOpen}
           onClose={() => {
             setEditModalOpen(false);
             setSelectedRouteId(null);
           }}
           routeId={selectedRouteId}
         />
       )}

       {/* Route Schedule Modal */}
       {routeScheduleModalOpen && (
         <RouteScheduleModal
           isOpen={routeScheduleModalOpen}
           onClose={() => {
             setRouteScheduleModalOpen(false);
             setSelectedRoute(null);
           }}
           route={selectedRoute}
         />
       )}
     </div>
   );
 }
