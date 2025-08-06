import { useState } from "react";
import RouteEditHeader from "./RouteEditHeader";
import RouteEditTabs from "./RouteEditTabs";
import RouteEditDetails from "./RouteEditDetails";
import RouteEditMap from "./RouteEditMap";

export default function RouteEditModal({ isOpen, onClose, routeId }) {
  const [activeTab, setActiveTab] = useState("Route Details");
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
      <RouteEditHeader onClose={onClose} />
      <RouteEditTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="p-6">
        {activeTab === "Route Details" && <RouteEditDetails routeId={routeId} />}
        {activeTab === "Route Map" && <RouteEditMap routeId={routeId} />}
      </div>
    </div>
  );
} 