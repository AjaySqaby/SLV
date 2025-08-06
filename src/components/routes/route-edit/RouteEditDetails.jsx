import RouteEditBasicInfo from "./RouteEditBasicInfo";
import RouteEditCampusInfo from "./RouteEditCampusInfo";
import RouteEditBellTimes from "./RouteEditBellTimes";
import RouteEditStudentInfo from "./RouteEditStudentInfo";
import RouteEditNotes from "./RouteEditNotes";
import RouteEditMonitorInfo from "./RouteEditMonitorInfo";
import RouteEditAdditionalStops from "./RouteEditAdditionalStops";
import RouteEditSchedule from "./RouteEditSchedule";
import RouteEditPaymentInfo from "./RouteEditPaymentInfo";

export default function RouteEditDetails({ routeId }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div className="space-y-6">
        <RouteEditBasicInfo routeId={routeId} />
        <RouteEditCampusInfo />
        <RouteEditBellTimes />
        <RouteEditStudentInfo />
        <RouteEditNotes />
      </div>
      <div className="space-y-6">
        <RouteEditMonitorInfo />
        <RouteEditAdditionalStops />
        <RouteEditSchedule />
        <RouteEditPaymentInfo />
      </div>
    </div>
  );
} 