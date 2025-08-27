import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge";
import { AiOutlineClockCircle, AiOutlineCalendar, AiOutlineUser } from "react-icons/ai";

export default function RidesTab({ rides }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <div className="font-semibold text-base">Recent Rides</div>
        <Button variant="success">View All</Button>
      </div>
      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-2 text-left">Ride ID</th>
            <th className="p-2 text-left">Date</th>
            <th className="p-2 text-left">Route</th>
            <th className="p-2 text-left">Driver</th>
            <th className="p-2 text-left">Students</th>
            <th className="p-2 text-left">Time</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {rides.map((r) => (
            <tr key={r.id} className="border-b">
              <td className="p-2 font-medium">{r.id}</td>
              <td className="p-2 flex items-center gap-2"><AiOutlineCalendar className="text-blue-500 w-4 h-4" /> {r.date}</td>
              <td className="p-2">
                <span className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center">
                    <AiOutlineClockCircle className="text-blue-500 w-4 h-4" />
                  </span>
                  <span>{r.route}</span>
                </span>
              </td>
              <td className="p-2 flex items-center gap-2"><AiOutlineUser className="text-blue-500 w-4 h-4" /> {r.driver}</td>
              <td className="p-2">{r.students}</td>
              <td className="p-2">
                <div><span className="text-xs">{r.time.start}</span></div>
                <div><span className="text-xs">{r.time.end}</span></div>
              </td>
              <td className="p-2">
                <StatusBadge status={r.status} type={r.status === "Completed" ? "active" : r.status === "Scheduled" ? "scheduled" : "inactive"} />
              </td>
              <td className="p-2"><Button size="sm" variant="secondary">View</Button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 