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
} from "lucide-react";

import AddRouteModal from "./route-edit/AddRouteModal";
import ScheduleRideModal from "./ScheduleRideModal";
import SearchInput from "@/components/ui/SearchInput";
import Button from "@/components/ui/Button";
import IconButton from "@/components/ui/IconButton";
import StatusBadge from "@/components/ui/StatusBadge";
import DeleteModal from "@/components/common/DeleteModal";

export default function RoutesContent() {
  const router = useRouter();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [scheduleModalOpen, setScheduleModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
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

  // Handler for viewing the route in eagle-eye
  const handleViewRoute = (routeId) => {
    router.push(`/eagle-eye?routeId=${routeId}`);
  };

  // Handler for scheduling a route
  const handleScheduleRoute = (route) => {
    setSelectedRoute(route);
    setScheduleModalOpen(true);
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
              placeholder="Search routes..."
            />
            <Button
              className="text-sm flex items-center justify-center font-medium gap-2 bg-gradient-to-r from-[var(--purple-600)] to-[var(--blue)] hover:from-[var(--purple-700)] hover:to-[var(--blue-600)]"
              onClick={() => setAddModalOpen(true)}
            >
              <Plus size={18} />
              Add New Route
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
                     <div className="flex gap-2">
                       <Button
                         variant="secondary"
                         className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200"
                         onClick={() => handleViewRoute(route.id)}
                       >
                         View
                       </Button>
                       <Button
                         variant="secondary"
                         className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200"
                         onClick={() => {
                           router.push(`/routes/edit/${route.id}`);
                         }}
                       >
                         Edit
                       </Button>
                                               <Button
                          variant="secondary"
                          className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200"
                          onClick={() => handleScheduleRoute(route)}
                        >
                          Schedule
                        </Button>
                     </div>
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
     </div>
   );
 }
