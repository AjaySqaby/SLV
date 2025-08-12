"use client";
import { useState } from "react";
import RouteEditTabs from "./RouteEditTabs";
import RouteEditDetails from "./RouteEditDetails";
import RouteEditMap from "./RouteEditMap";
import RouteEditBasicInfo from "./RouteEditBasicInfo";
import RouteEditCampusInfo from "./RouteEditCampusInfo";
import RouteEditStudentInfo from "./RouteEditStudentInfo";
import RouteEditPaymentInfo from "./RouteEditPaymentInfo";
import RouteEditMonitorInfo from "./RouteEditMonitorInfo";
import RouteEditBellTimes from "./RouteEditBellTimes";
import RouteEditSchedule from "./RouteEditSchedule";
import RouteEditAdditionalStops from "./RouteEditAdditionalStops";
import RouteEditNotes from "./RouteEditNotes";
import Button from "@/components/ui/Button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function RouteEditContent({ routeId }) {
  const [activeTab, setActiveTab] = useState("Route Details");
  const router = useRouter();

  const handleBack = () => {
    router.push("/routes");
  };

  const handleSave = () => {
    // Save logic here
    console.log("Saving route changes...");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Route Details":
        return <RouteEditDetails routeId={routeId} />;
      case "Route Map":
        return <RouteEditMap routeId={routeId} />;
      case "Basic Info":
        return <RouteEditBasicInfo routeId={routeId} />;
      case "Campus Info":
        return <RouteEditCampusInfo routeId={routeId} />;
      case "Student Info":
        return <RouteEditStudentInfo routeId={routeId} />;
      case "Payment Info":
        return <RouteEditPaymentInfo routeId={routeId} />;
      case "Monitor Info":
        return <RouteEditMonitorInfo routeId={routeId} />;
      case "Bell Times":
        return <RouteEditBellTimes routeId={routeId} />;
      case "Schedule":
        return <RouteEditSchedule routeId={routeId} />;
      case "Additional Stops":
        return <RouteEditAdditionalStops routeId={routeId} />;
      case "Notes":
        return <RouteEditNotes routeId={routeId} />;
      default:
        return <RouteEditDetails routeId={routeId} />;
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-r from-[var(--header-gradient-from)] via-[var(--header-gradient-via)] to-[var(--header-gradient-to)] py-4 px-6 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center text-[var(--header-logo)]">
          <Button onClick={handleBack} variant="ghost" className="mr-4">
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-medium">Edit Route</h1>
        </div>
        <Button 
          onClick={handleSave} 
          variant="secondary" 
          className="bg-[var(--surface-bg)] text-[var(--primary)] px-4 py-2 rounded-full text-sm font-medium shadow-sm"
        >
          Save Changes
        </Button>
      </div>

      {/* Tabs */}
      <RouteEditTabs activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Content */}
      <div className="p-6">
        {renderTabContent()}
      </div>
    </div>
  );
}
