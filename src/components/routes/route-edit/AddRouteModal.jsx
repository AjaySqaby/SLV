import { useState } from "react";
import { FaRoute } from "react-icons/fa";
import Tabs from "@/components/ui/Tabs";
import RouteEditBasicInfo from "./RouteEditBasicInfo";
import RouteEditStudentInfo from "./RouteEditStudentInfo";
import RouteEditSchedule from "./RouteEditSchedule";
import RouteEditAdditionalStops from "./RouteEditAdditionalStops";
import RouteEditPaymentInfo from "./RouteEditPaymentInfo";
import RouteEditMonitorInfo from "./RouteEditMonitorInfo";
import Button from "@/components/ui/Button";

const tabList = [
  { id: 0, label: "Basic Info" },
  { id: 1, label: "Students" },
  { id: 2, label: "Schedule" },
  { id: 3, label: "Stops" },
  { id: 4, label: "Payment" },
  { id: 5, label: "Monitoring" },
];

export default function AddRouteModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState(0);
  const [routeId, setRouteId] = useState("RT-18129");
  const [district, setDistrict] = useState("");
  const districts = [
    "Atlanta Public Schools",
    "Fulton County Schools",
    "DeKalb County Schools",
  ];

  if (!isOpen) return null;

  const tabContent = [
    <RouteEditBasicInfo
      routeId={routeId}
      setRouteId={setRouteId}
      district={district}
      setDistrict={setDistrict}
      districts={districts}
    />,
    <RouteEditStudentInfo />,
    <RouteEditSchedule />,
    <RouteEditAdditionalStops />,
    <RouteEditPaymentInfo />,
    <RouteEditMonitorInfo />,
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-5">
      <div className="bg-white w-full max-w-3xl mx-auto my-16 rounded-2xl shadow-xl p-0">
        {/* Top Action Row */}
        <div className="flex justify-between items-center mb-6 p-5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-[var(--purple-600)] to-[var(--blue)] flex items-center justify-center">
              <FaRoute className="text-white text-2xl" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--primary-dark)]">
                Add New Route
              </h2>
              <p className="text-[var(--muted-text)] text-sm">
                Create a new transportation route for your school district
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" className="px-4 py-2" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              className="px-4 py-2 flex items-center gap-2"
            >
              Save Route
            </Button>
          </div>
        </div>
        {/* Tabs */}
        <div className="w-full flex justify-center mb-2">
          <Tabs
            tabs={tabList}
            activeTab={activeTab}
            onChange={setActiveTab}
            className="w-full max-w-5xl"
          />
        </div>
        {/* Card */}
        <div className="bg-white rounded-xl shadow border border-[var(--card-border)] mt-2 p-8 w-full">
          {tabContent[activeTab]}
          <div className="flex justify-end gap-3 mt-8">
            <Button variant="secondary" className="px-4 py-2" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="primary"
              className="px-4 py-2 flex items-center gap-2"
            >
              <FaRoute size={18} />
              <span className="hidden sm:inline">Create Route</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
