"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import {
  BarChart2,
  Users,
  MapPin,
  Clock,
  Download,
  Calendar,
  Car
} from "lucide-react";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Select from "@/components/ui/Select";
import DateRangePicker from "@/components/rides/DateRangePicker";
import { Check } from "lucide-react";

export default function ReportsContent() {
  const [selectedReport, setSelectedReport] = useState("rides");
  const [startDate, setStartDate] = useState(new Date(2025, 8, 3)); // Sept 3, 2025
  const [endDate, setEndDate] = useState(new Date(2025, 8, 3)); // Sept 3, 2025
  const [filterScope, setFilterScope] = useState("district"); // district | campus | partner
  const [selectedEntities, setSelectedEntities] = useState([]); // empty => All
  const [entityMenuOpen, setEntityMenuOpen] = useState(false);
  const entityMenuRef = useRef(null);

  // Enforce scope for specific reports (e.g., District Finance → Districts)
  const enforcedScope = useMemo(() => {
    if (selectedReport === "district_finance") return "district";
    if (selectedReport === "partner_finance") return "partner";
    return null;
  }, [selectedReport]);
  const scope = enforcedScope || filterScope;

  // Keep scope in sync when a report enforces it; default to "All" entities
  useEffect(() => {
    if (enforcedScope && filterScope !== enforcedScope) {
      setFilterScope(enforcedScope);
      setSelectedEntities([]);
    }
  }, [enforcedScope]); // intentionally omit filterScope from deps

  // Close entity dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (entityMenuRef.current && !entityMenuRef.current.contains(e.target)) {
        setEntityMenuOpen(false);
      }
    }
    if (typeof document !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, []);

  // Sample data matching your image
  const overviewStats = [
    {
      title: "Total Rides",
      subtitle: "Current reporting period",
      value: "382",
      change: "↑ 12% from previous period",
      changeType: "positive"
    },
    {
      title: "Total Distance",
      subtitle: "Miles traveled",
      value: "4,285 mi",
      change: "↑ 8% from previous period",
      changeType: "positive"
    },
    {
      title: "On-Time Rate",
      subtitle: "Arrival performance",
      value: "94.2%",
      change: "↑ 2.5% from previous period",
      changeType: "positive"
    },
    {
      title: "Students Served",
      subtitle: "Total passengers",
      value: "1,246",
      change: "↑ 5% from previous period",
      changeType: "positive"
    }
  ];

  const ridesByDayData = [
    { day: 'Monday', completed: 45, inProgress: 8, cancelled: 3 },
    { day: 'Tuesday', completed: 38, inProgress: 6, cancelled: 2 },
    { day: 'Wednesday', completed: 47, inProgress: 5, cancelled: 4 },
    { day: 'Thursday', completed: 42, inProgress: 7, cancelled: 2 },
    { day: 'Friday', completed: 65, inProgress: 12, cancelled: 5 },
    { day: 'Saturday', completed: 28, inProgress: 4, cancelled: 2 },
    { day: 'Sunday', completed: 20, inProgress: 3, cancelled: 1 }
  ];

  const rideStatusData = [
    { name: 'Completed', value: 68, color: '#22c55e' },
    { name: 'In Progress', value: 14, color: '#F59E0B' },
    { name: 'Cancelled', value: 6, color: '#ef4444' },
    { name: 'Assigned', value: 12, color: '#3b82f6' }
  ];

  const reportOptions = [
    { value: "rides", label: "Rides Report" },
    { value: "drivers", label: "Driver Report" },
    { value: "students", label: "Student Report" },
    { value: "routes", label: "Route Report" },
    // New reports requested
    { value: "driver_ontime", label: "Driver On-Time Performance" },
    { value: "driver_payout", label: "Driver Payout Report" },
    { value: "district_finance", label: "District Finance Report" },
    { value: "partner_finance", label: "Partner Finance Report" }
  ];

  const handleDateRangeChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const exportReport = () => {
    // Export functionality
    console.log('Exporting report...', {
      selectedReport,
      startDate,
      endDate,
      filterScope: scope,
      selectedEntities: selectedEntities.length ? selectedEntities : "ALL"
    });
  };

  // Entity lists (mocked, sourced from existing sample data across app)
  const districtOptions = useMemo(() => ([
    { value: "atlanta-public", label: "Atlanta Public Schools" },
    { value: "fulton-county", label: "Fulton County Schools" },
    { value: "cobb-county", label: "Cobb County Schools" },
    { value: "northside", label: "Northside School District" },
    { value: "dekalb", label: "DeKalb County Schools" },
    { value: "gwinnett", label: "Gwinnett County Schools" },
  ]), []);

  const campusOptions = useMemo(() => ([
    { value: "riverdale-high", label: "Riverdale High" },
    { value: "westview-elementary", label: "Westview Elementary" },
    { value: "lincoln-middle", label: "Lincoln Middle School" },
    { value: "washington-high", label: "Washington High" },
  ]), []);

  const partnerOptions = useMemo(() => ([
    { value: "city-transit", label: "City Transit Solutions" },
    { value: "school-ride", label: "School Ride Services" },
    { value: "metro-transport", label: "Metro Transport Co." },
    { value: "green-routes", label: "Green Routes LLC" },
  ]), []);

  const currentEntityOptions = useMemo(() => {
    if (scope === "district") return districtOptions;
    if (scope === "campus") return campusOptions;
    return partnerOptions;
  }, [scope, districtOptions, campusOptions, partnerOptions]);

  const isAllSelected = selectedEntities.length === 0;

  const toggleEntity = (value) => {
    setSelectedEntities((prev) => {
      const exists = prev.includes(value);
      if (exists) {
        const next = prev.filter((v) => v !== value);
        return next;
      }
      return [...prev, value];
    });
  };

  const clearToAll = () => setSelectedEntities([]);

  // Minimal datasets for new reports (mock)
  const driverOnTimeData = [
    { name: "Driver A", onTime: 96 },
    { name: "Driver B", onTime: 91 },
    { name: "Driver C", onTime: 88 },
    { name: "Driver D", onTime: 94 },
    { name: "Driver E", onTime: 89 },
  ];

  const driverPayoutRows = [
    { name: "Driver A", rides: 54, amount: 1620 },
    { name: "Driver B", rides: 41, amount: 1230 },
    { name: "Driver C", rides: 38, amount: 1140 },
    { name: "Driver D", rides: 49, amount: 1470 },
  ];

  const districtFinanceRows = [
    { name: "Atlanta Public Schools", rides: 182, amount: 54600 },
    { name: "Fulton County Schools", rides: 121, amount: 36300 },
    { name: "Cobb County Schools", rides: 79, amount: 23700 },
  ];

  const partnerFinanceRows = [
    { name: "City Transit Solutions", rides: 156, amount: 46800 },
    { name: "School Ride Services", rides: 102, amount: 30600 },
    { name: "Metro Transport Co.", rides: 88, amount: 26400 },
  ];
  // Minimal datasets for legacy "Student Report" and "Route Report"
  const studentReportRows = [
    { name: "Alice Johnson", rides: 24, noShows: 1 },
    { name: "Brian Smith", rides: 18, noShows: 0 },
    { name: "Carla Gomez", rides: 21, noShows: 2 },
    { name: "Derrick Lee", rides: 15, noShows: 1 },
  ];
  const routeReportRows = [
    { name: "Route 101", completed: 56, inProgress: 4, cancelled: 2 },
    { name: "Route 202", completed: 41, inProgress: 3, cancelled: 1 },
    { name: "Route 303", completed: 33, inProgress: 2, cancelled: 0 },
    { name: "Route 404", completed: 27, inProgress: 1, cancelled: 1 },
  ];

  // Translate selected entity values → labels for filtering
  const selectedEntityLabels = useMemo(() => {
    if (selectedEntities.length === 0) return [];
    const map = new Map(currentEntityOptions.map(o => [o.value, o.label]));
    return selectedEntities.map(v => map.get(v)).filter(Boolean);
  }, [selectedEntities, currentEntityOptions]);

  // Filter finance datasets based on selected entities (when relevant)
  const filteredDistrictFinanceRows = useMemo(() => {
    if (scope !== "district" || selectedEntityLabels.length === 0) return districtFinanceRows;
    return districtFinanceRows.filter(r => selectedEntityLabels.includes(r.name));
  }, [scope, selectedEntityLabels]);

  const filteredPartnerFinanceRows = useMemo(() => {
    if (scope !== "partner" || selectedEntityLabels.length === 0) return partnerFinanceRows;
    return partnerFinanceRows.filter(r => selectedEntityLabels.includes(r.name));
  }, [scope, selectedEntityLabels]);

  // --- Rides report filtering (mock aggregation using simple multipliers) ---
  const multipliersByLabel = useMemo(() => {
    return {
      // Districts
      "Atlanta Public Schools": 1.0,
      "Fulton County Schools": 0.9,
      "Cobb County Schools": 0.8,
      "Northside School District": 0.6,
      "DeKalb County Schools": 0.7,
      "Gwinnett County Schools": 1.2,
      // Campuses
      "Riverdale High": 0.55,
      "Westview Elementary": 0.40,
      "Lincoln Middle School": 0.45,
      "Washington High": 0.50,
      // Partners
      "City Transit Solutions": 0.9,
      "School Ride Services": 0.7,
      "Metro Transport Co.": 0.6,
      "Green Routes LLC": 0.5,
    };
  }, []);

  const { ridesByDayFiltered, rideStatusFiltered } = useMemo(() => {
    // Only apply when we're on the Rides report; otherwise return defaults
    const shouldApply = selectedReport === "rides";
    // Compute scale:
    // - If specific entities are selected: sum their multipliers
    // - If "All" (no specific selections): use the average multiplier for the current scope options
    let scale = 1;
    if (shouldApply) {
      if (selectedEntityLabels.length > 0) {
        scale = selectedEntityLabels.reduce((acc, label) => acc + (multipliersByLabel[label] || 1), 0);
      } else {
        const labels = currentEntityOptions.map(o => o.label);
        if (labels.length > 0) {
          const sum = labels.reduce((acc, label) => acc + (multipliersByLabel[label] || 1), 0);
          scale = sum / labels.length;
        }
      }
    }

    const scaleNumber = (n) => Math.round(n * scale);
    const ridesByDayFilteredLocal = ridesByDayData.map((d) => ({
      day: d.day,
      completed: scaleNumber(d.completed),
      inProgress: scaleNumber(d.inProgress),
      cancelled: scaleNumber(d.cancelled),
    }));

    // Build ride status distribution from the aggregated rides by day
    const totals = ridesByDayFilteredLocal.reduce(
      (acc, d) => {
        acc.completed += d.completed;
        acc.inProgress += d.inProgress;
        acc.cancelled += d.cancelled;
        return acc;
      },
      { completed: 0, inProgress: 0, cancelled: 0 }
    );
    const grand = totals.completed + totals.inProgress + totals.cancelled;
    const pct = (v) => (grand === 0 ? 0 : Math.round((v / grand) * 100));
    const completedPct = pct(totals.completed);
    const inProgressPct = pct(totals.inProgress);
    const cancelledPct = pct(totals.cancelled);
    const assignedPct = Math.max(0, 100 - completedPct - inProgressPct - cancelledPct);

    const rideStatusFilteredLocal = [
      { name: "Completed", value: completedPct, color: "#22c55e" },
      { name: "In Progress", value: inProgressPct, color: "#F59E0B" },
      { name: "Cancelled", value: cancelledPct, color: "#ef4444" },
      { name: "Assigned", value: assignedPct, color: "#3b82f6" },
    ];

    return {
      ridesByDayFiltered: shouldApply ? ridesByDayFilteredLocal : ridesByDayData,
      rideStatusFiltered: shouldApply ? rideStatusFilteredLocal : rideStatusData,
    };
  }, [selectedReport, selectedEntityLabels, multipliersByLabel, ridesByDayData, rideStatusData, currentEntityOptions]);

  // Scale value accessible for overview stats
  const ridesScale = useMemo(() => {
    if (selectedReport !== "rides") return 1;
    if (selectedEntityLabels.length > 0) {
      return selectedEntityLabels.reduce((acc, label) => acc + (multipliersByLabel[label] || 1), 0);
    }
    const labels = currentEntityOptions.map(o => o.label);
    if (labels.length === 0) return 1;
    const sum = labels.reduce((acc, label) => acc + (multipliersByLabel[label] || 1), 0);
    return sum / labels.length;
  }, [selectedReport, selectedEntityLabels, multipliersByLabel, currentEntityOptions]);

  const ridesOverviewStats = useMemo(() => {
    if (selectedReport !== "rides") return overviewStats;
    // Compute totals from filtered rides
    const totals = ridesByDayFiltered.reduce(
      (acc, d) => {
        acc.completed += d.completed;
        acc.inProgress += d.inProgress;
        acc.cancelled += d.cancelled;
        return acc;
      },
      { completed: 0, inProgress: 0, cancelled: 0 }
    );
    const totalRides = totals.completed + totals.inProgress + totals.cancelled;
    const baseMiles = 4285; // from sample data
    const baseStudents = 1246; // from sample data
    const miles = Math.round(baseMiles * ridesScale);
    const students = Math.round(baseStudents * ridesScale);
    const formatNumber = (n) => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return [
      {
        title: "Total Rides",
        subtitle: "Current reporting period",
        value: `${formatNumber(totalRides)}`,
        change: "↑ 12% from previous period",
        changeType: "positive",
      },
      {
        title: "Total Distance",
        subtitle: "Miles traveled",
        value: `${formatNumber(miles)} mi`,
        change: "↑ 8% from previous period",
        changeType: "positive",
      },
      {
        title: "On-Time Rate",
        subtitle: "Arrival performance",
        value: `${rideStatusFiltered.find((r) => r.name === "Completed")?.value ?? 0}%`,
        change: "↑ 2.5% from previous period",
        changeType: "positive",
      },
      {
        title: "Students Served",
        subtitle: "Total passengers",
        value: `${formatNumber(students)}`,
        change: "↑ 5% from previous period",
        changeType: "positive",
      },
    ];
  }, [selectedReport, ridesByDayFiltered, rideStatusFiltered, ridesScale, overviewStats]);

  const renderNewReport = () => {
    // Backward-compatible: show useful content when "Driver Report" is chosen
    if (selectedReport === "drivers") {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* On-Time Performance (reuse) */}
          <Card className="p-6 bg-white border border-[var(--border)]">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[var(--heading)] mb-1">
                Driver On-Time Performance
              </h3>
              <p className="text-sm text-[var(--muted-text)]">
                Percentage of on-time arrivals by driver
              </p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={driverOnTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} stroke="#6b7280" />
                  <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} stroke="#6b7280" />
                  <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                  <Bar dataKey="onTime" fill="#22c55e" name="On-Time %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Payouts (reuse) */}
          <Card className="p-6 bg-white border border-[var(--border)]">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[var(--heading)] mb-1">Driver Payouts</h3>
              <p className="text-sm text-[var(--muted-text)]">Rides and payout amount for selected period</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Driver</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Rides</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Payout</th>
                  </tr>
                </thead>
                <tbody>
                  {driverPayoutRows.map((r, idx) => (
                    <tr key={idx} className="border-b border-[var(--gray-100)]">
                      <td className="px-6 py-3">{r.name}</td>
                      <td className="px-6 py-3">{r.rides}</td>
                      <td className="px-6 py-3">${r.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      );
    }
    if (selectedReport === "students") {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-white border border-[var(--border)]">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[var(--heading)] mb-1">Student Report</h3>
              <p className="text-sm text-[var(--muted-text)]">Rides and no-shows by student</p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={studentReportRows}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} stroke="#6b7280" />
                  <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} stroke="#6b7280" />
                  <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                  <Legend />
                  <Bar dataKey="rides" fill="#3b82f6" name="Rides" />
                  <Bar dataKey="noShows" fill="#ef4444" name="No-Shows" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card className="p-6 bg-white border border-[var(--border)]">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[var(--heading)] mb-1">Student Report</h3>
              <p className="text-sm text-[var(--muted-text)]">Rides and no-shows by student</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Student</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Rides</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">No-Shows</th>
                  </tr>
                </thead>
                <tbody>
                  {studentReportRows.map((r, idx) => (
                    <tr key={idx} className="border-b border-[var(--gray-100)]">
                      <td className="px-6 py-3">{r.name}</td>
                      <td className="px-6 py-3">{r.rides}</td>
                      <td className="px-6 py-3">{r.noShows}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      );
    }
    if (selectedReport === "routes") {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-white border border-[var(--border)]">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[var(--heading)] mb-1">Route Report</h3>
              <p className="text-sm text-[var(--muted-text)]">Status counts by route</p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={routeReportRows}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} stroke="#6b7280" />
                  <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} stroke="#6b7280" />
                  <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                  <Legend />
                  <Bar dataKey="completed" fill="#22c55e" name="Completed" />
                  <Bar dataKey="inProgress" fill="#F59E0B" name="In Progress" />
                  <Bar dataKey="cancelled" fill="#ef4444" name="Cancelled" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card className="p-6 bg-white border border-[var(--border)]">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[var(--heading)] mb-1">Route Report</h3>
              <p className="text-sm text-[var(--muted-text)]">Status counts by route</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Route</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Completed</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">In Progress</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Cancelled</th>
                  </tr>
                </thead>
                <tbody>
                  {routeReportRows.map((r, idx) => (
                    <tr key={idx} className="border-b border-[var(--gray-100)]">
                      <td className="px-6 py-3">{r.name}</td>
                      <td className="px-6 py-3">{r.completed}</td>
                      <td className="px-6 py-3">{r.inProgress}</td>
                      <td className="px-6 py-3">{r.cancelled}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      );
    }
    if (selectedReport === "driver_ontime") {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-white border border-[var(--border)]">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[var(--heading)] mb-1">
                Driver On-Time Performance
              </h3>
              <p className="text-sm text-[var(--muted-text)]">
                Percentage of on-time arrivals by driver
              </p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={driverOnTimeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} stroke="#6b7280" />
                  <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} stroke="#6b7280" />
                  <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                  <Bar dataKey="onTime" fill="#22c55e" name="On-Time %" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      );
    }
    if (selectedReport === "driver_payout") {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-white border border-[var(--border)]">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[var(--heading)] mb-1">Driver Payouts</h3>
              <p className="text-sm text-[var(--muted-text)]">Payout amount by driver</p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={driverPayoutRows}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} stroke="#6b7280" />
                  <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} stroke="#6b7280" />
                  <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, 'Amount']} contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                  <Bar dataKey="amount" fill="#8b5cf6" name="Amount" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card className="p-6 bg-white border border-[var(--border)]">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[var(--heading)] mb-1">Driver Payouts</h3>
              <p className="text-sm text-[var(--muted-text)]">Rides and payout amount for selected period</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Driver</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Rides</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Payout</th>
                  </tr>
                </thead>
                <tbody>
                  {driverPayoutRows.map((r, idx) => (
                    <tr key={idx} className="border-b border-[var(--gray-100)]">
                      <td className="px-6 py-3">{r.name}</td>
                      <td className="px-6 py-3">{r.rides}</td>
                      <td className="px-6 py-3">${r.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      );
    }
    if (selectedReport === "district_finance") {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-white border border-[var(--border)]">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[var(--heading)] mb-1">District Finance</h3>
              <p className="text-sm text-[var(--muted-text)]">Billable amount by district</p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredDistrictFinanceRows}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} stroke="#6b7280" />
                  <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} stroke="#6b7280" />
                  <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, 'Amount']} contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                  <Bar dataKey="amount" fill="#10b981" name="Amount" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card className="p-6 bg-white border border-[var(--border)]">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[var(--heading)] mb-1">District Finance</h3>
              <p className="text-sm text-[var(--muted-text)]">Billable rides and amount by district</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">District</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Rides</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDistrictFinanceRows.map((r, idx) => (
                    <tr key={idx} className="border-b border-[var(--gray-100)]">
                      <td className="px-6 py-3">{r.name}</td>
                      <td className="px-6 py-3">{r.rides}</td>
                      <td className="px-6 py-3">${r.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      );
    }
    if (selectedReport === "partner_finance") {
      return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 bg-white border border-[var(--border)]">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[var(--heading)] mb-1">Partner Finance</h3>
              <p className="text-sm text-[var(--muted-text)]">Billable amount by partner</p>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={filteredPartnerFinanceRows}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} stroke="#6b7280" />
                  <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} stroke="#6b7280" />
                  <Tooltip formatter={(v) => [`$${v.toLocaleString()}`, 'Amount']} contentStyle={{ backgroundColor: 'white', border: '1px solid #e5e7eb', borderRadius: '8px' }} />
                  <Bar dataKey="amount" fill="#f59e0b" name="Amount" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
          <Card className="p-6 bg-white border border-[var(--border)]">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[var(--heading)] mb-1">Partner Finance</h3>
              <p className="text-sm text-[var(--muted-text)]">Billable rides and amount by partner</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[var(--gray-50)] border-b border-[var(--gray-200)]">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Partner</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Rides</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold text-[var(--gray-700)]">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPartnerFinanceRows.map((r, idx) => (
                    <tr key={idx} className="border-b border-[var(--gray-100)]">
                      <td className="px-6 py-3">{r.name}</td>
                      <td className="px-6 py-3">{r.rides}</td>
                      <td className="px-6 py-3">${r.amount.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      );
    }
    // Fallback so nothing is blank
    return (
      <Card className="p-6 bg-white border border-[var(--border)]">
        <h3 className="text-lg font-semibold text-[var(--heading)] mb-1">Report</h3>
        <p className="text-sm text-[var(--muted-text)]">No specific visualization implemented for this selection yet.</p>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <BarChart2 className="text-[var(--blue-500)]" size={32} />
            Reports & Analytics
          </h1>
          <p className="text-[var(--muted-text)] mt-1">
            Generate and view reports on rides, drivers, districts, and more.
          </p>
        </div>

        <div className="flex items-end gap-4">
          {/* Report Type Selector */}
          <div className="w-72">
            <Select
              options={reportOptions}
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              width="w-full"
              className="text-[var(--muted-text)]"
            />
          </div>

          {/* Scope selector (District/Campus/Partner) */}
          {!enforcedScope ? (
            <div className="w-56">
              <Select
                options={[
                  { value: "district", label: "Districts" },
                  { value: "campus", label: "Campuses" },
                  { value: "partner", label: "Partners" },
                ]}
                value={filterScope}
                onChange={(e) => { setFilterScope(e.target.value); setSelectedEntities([]); }}
                width="w-full"
                className="text-[var(--muted-text)]"
              />
            </div>
          ) : (
            <div className="w-56">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-sm w-full text-left cursor-default"
                disabled
              >
                {scope === "district" ? "Districts" : scope === "campus" ? "Campuses" : "Partners"}
              </button>
            </div>
          )}

          {/* Entity Multi Select - styled like Notification page checkboxes */}
          <div className="relative" ref={entityMenuRef}>
            <button
              type="button"
              onClick={() => setEntityMenuOpen((v) => !v)}
              className="px-4 py-2 border border-gray-300 rounded-lg bg-white text-sm min-w-40"
            >
              {isAllSelected ? `All ${scope === "district" ? "Districts" : scope === "campus" ? "Campuses" : "Partners"}` : `${selectedEntities.length} selected`}
            </button>
            {entityMenuOpen && (
              <div className="absolute z-30 mt-2 w-64 bg-white border border-[var(--gray-200)] rounded-lg shadow-lg p-2">
                <div className="px-2 py-1">
                  <div className="flex items-center gap-2 text-sm">
                    <button
                      type="button"
                      role="checkbox"
                      aria-checked={isAllSelected}
                      onClick={clearToAll}
                      className={`relative w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${isAllSelected
                        ? "bg-[var(--blue-600)] border-[var(--blue-600)]"
                        : "bg-white border-[var(--gray-300)] hover:border-[var(--blue-400)]"
                        }`}
                    >
                      {isAllSelected && <Check className="w-3 h-3 text-white" />}
                    </button>
                    <span>All</span>
                  </div>
                </div>
                <div className="max-h-56 overflow-y-auto mt-1">
                  {currentEntityOptions.map((opt) => {
                    const checked = selectedEntities.includes(opt.value);
                    return (
                      <div key={opt.value} className="flex items-center gap-2 px-2 py-1 text-sm hover:bg-[var(--gray-50)] cursor-pointer">
                        <button
                          type="button"
                          role="checkbox"
                          aria-checked={checked}
                          onClick={() => toggleEntity(opt.value)}
                          className={`relative w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${checked
                            ? "bg-[var(--blue-600)] border-[var(--blue-600)]"
                            : "bg-white border-[var(--gray-300)] hover:border-[var(--blue-400)]"
                            }`}
                        >
                          {checked && <Check className="w-3 h-3 text-white" />}
                        </button>
                        <span>{opt.label}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Date Range Picker */}
          <div className="w-64">
            <DateRangePicker
              startDate={startDate}
              endDate={endDate}
              onDateRangeChange={handleDateRangeChange}
            />
          </div>

          <div>
            <Button
              className="bg-[var(--blue-500)] hover:bg-[var(--blue-600)] text-white px-6 py-2"
              icon={<Download size={16} />}
              onClick={exportReport}
            >
              Export Report
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      {selectedReport === "rides" ? (
        <>
          {/* Overview Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {ridesOverviewStats.map((stat, index) => (
              <Card key={index} className="p-6 bg-white border border-[var(--border)]">
                <div>
                  <h3 className="text-lg font-semibold text-[var(--heading)] mb-1">
                    {stat.title}
                  </h3>
                  <p className="text-sm text-[var(--muted-text)] mb-3">
                    {stat.subtitle}
                  </p>
                  <p className="text-3xl font-bold text-[var(--heading)] mb-2">
                    {stat.value}
                  </p>
                  <p className="text-sm text-[var(--green)] font-medium">
                    {stat.change}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Rides by Day Chart */}
            <Card className="p-6 bg-white border border-[var(--border)]">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[var(--heading)] mb-1">
                  Rides by Day of Week
                </h3>
                <p className="text-sm text-[var(--muted-text)]">
                  Breakdown of ride status by weekday
                </p>
              </div>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={ridesByDayFiltered}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis
                      dataKey="day"
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      stroke="#6b7280"
                    />
                    <YAxis
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      stroke="#6b7280"
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: 'white',
                        border: '1px solid #e5e7eb',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      }}
                    />
                    <Legend />
                    <Bar
                      dataKey="completed"
                      stackId="a"
                      fill="#22c55e"
                      name="Completed"
                    />
                    <Bar
                      dataKey="inProgress"
                      stackId="a"
                      fill="#F59E0B"
                      name="In Progress"
                    />
                    <Bar
                      dataKey="cancelled"
                      stackId="a"
                      fill="#ef4444"
                      name="Cancelled"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Ride Status Distribution */}
            <Card className="p-6 bg-white border border-[var(--border)]">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-[var(--heading)] mb-1">
                  Ride Status Distribution
                </h3>
                <p className="text-sm text-[var(--muted-text)]">
                  Overall breakdown by status
                </p>
              </div>
              <div className="h-80 flex items-center">
                <div className="flex-1 h-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={rideStatusFiltered}
                        cx="50%"
                        cy="50%"
                        outerRadius={120}
                        innerRadius={0}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {rideStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: 'white',
                          border: '1px solid #e5e7eb',
                          borderRadius: '8px',
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                        formatter={(value) => [`${value}%`, '']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="w-40 space-y-4 ml-4">
                  {rideStatusData.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div
                        className="w-4 h-4 rounded-full mr-3"
                        style={{ backgroundColor: item.color }}
                      />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-[var(--heading)]">
                          {item.name} {item.value}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          </div>
        </>
      ) : (
        renderNewReport()
      )}
    </div>
  );
}
