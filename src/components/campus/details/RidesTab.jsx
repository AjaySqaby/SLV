import { useState, useMemo } from "react";
import DateRangePicker from "@/components/rides/DateRangePicker";
import RidesTable from "@/components/rides/RidesTable";

export default function RidesTab({ rides }) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const parseUsDate = (mmddyyyy) => {
    if (!mmddyyyy) return null;
    const parts = String(mmddyyyy).split("/");
    if (parts.length !== 3) return new Date(mmddyyyy);
    const [mm, dd, yyyy] = parts.map((v) => parseInt(v, 10));
    return new Date(yyyy, mm - 1, dd);
  };

  const filteredRides = useMemo(() => {
    if (!startDate && !endDate) return rides;
    return rides.filter((r) => {
      const d = parseUsDate(r.date);
      if (!d || isNaN(d.getTime())) return false;
      if (startDate && d < new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())) return false;
      if (endDate && d > new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())) return false;
      return true;
    });
  }, [rides, startDate, endDate]);

  const ridesForTable = useMemo(() => {
    return filteredRides.map((r, idx) => ({
      id: String(r.id),
      district: r.route || "",
      date: r.date,
      scheduledTime: "08:30 AM",
      timezone: "EST",
      pickup: {
        scheduled: "08:30 AM",
        arrived: r.status === "Completed" ? "08:35 AM" : "",
        confirmed: "08:20 AM",
        location: "Downtown Pickup Point",
      },
      dropoff: {
        scheduled: "09:30 AM",
        arrived: r.status === "In progress" ? "09:10 AM" : "",
        completed: r.status === "Completed" ? "09:25 AM" : "",
        location: "Central High School",
      },
      driver: { name: r.driver || "-", vehicle: "Toyota Sienna" },
      details: { distance: "3.5 mi", duration: "30 min", stops: 2, students: 2 },
      status: r.status,
      nextStop: { address: "Central High School" },
      stops: [],
    }));
  }, [filteredRides]);

  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Rides</h3>
        <div className="w-full md:w-80">
          <DateRangePicker
            startDate={startDate}
            endDate={endDate}
            onDateRangeChange={(s, e) => {
              setStartDate(s);
              setEndDate(e);
            }}
          />
        </div>
      </div>
      <RidesTable rides={ridesForTable} />
    </div>
  );
}