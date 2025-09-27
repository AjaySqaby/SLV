"use client";

import { useState } from "react";
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

export default function ReportsContent() {
  const [selectedReport, setSelectedReport] = useState("rides");
  const [startDate, setStartDate] = useState(new Date(2025, 8, 3)); // Sept 3, 2025
  const [endDate, setEndDate] = useState(new Date(2025, 8, 3)); // Sept 3, 2025

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
    { value: "routes", label: "Route Report" }
  ];

  const handleDateRangeChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);
  };

  const exportReport = () => {
    // Export functionality
    console.log('Exporting report...');
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
          <div className="w-48">
            <Select
              options={reportOptions}
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              width="w-full"
              className="text-[var(--muted-text)]"
            />
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

      {/* Overview Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
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
              <BarChart data={ridesByDayData}>
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
                    data={rideStatusData}
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
    </div>
  );
}
