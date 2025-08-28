import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge";
import { AiOutlineClockCircle, AiOutlineCalendar, AiOutlineUser } from "react-icons/ai";

export default function RidesTab({ rides }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="font-semibold text-base">Recent Rides</div>
        <Button variant="primary">+ Add New Ride</Button>
      </div>
      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-2 text-left">Ride ID</th>
            <th className="p-2 text-left">Route</th>
            <th className="p-2 text-left">Scheduled Date</th>
            <th className="p-2 text-left">Driver</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rides.map((ride) => (
            <tr key={ride.id} className="border-b">
              <td className="p-2 font-medium">{ride.id}</td>
              <td className="p-2">
                <span className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center">
                    <AiOutlineClockCircle className="text-blue-500 w-4 h-4" />
                  </span>
                  <span>{ride.route}</span>
                </span>
              </td>
              <td className="p-2">
                <span className="flex items-center gap-2">
                  <AiOutlineCalendar className="text-blue-500 w-4 h-4" /> 
                  {ride.date}
                </span>
              </td>
              <td className="p-2">
                <span className="flex items-center gap-2">
                  <AiOutlineUser className="text-blue-500 w-4 h-4" /> 
                  {ride.driver}
                </span>
              </td>
              <td className="p-2">
                <StatusBadge status={ride.status} type={ride.status === "In progress" ? "active" : "inactive"} />
              </td>
              <td className="p-2">
                <Button size="sm" variant="secondary">View</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}