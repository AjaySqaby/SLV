"use client";

import { useState } from 'react';
import { X, MapPin, Clock, User, Car, Calendar, Map, Eye, Route, Users, Navigation, Star, CheckCircle, AlertCircle, Play, Pause, Square, Edit, ArrowLeft, FileText, Hash, Timer, MapPin as MapPinIcon, Users as UsersIcon, UserCheck } from 'lucide-react';
import DateRangePicker from '@/components/rides/DateRangePicker';
import RidesTable from '@/components/rides/RidesTable';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import StatusBadge from '@/components/ui/StatusBadge';
import DriverDetailModal from '@/components/drivers/DriverDetailModal';
import StudentProfilePage from '@/components/students/StudentProfilePage';
import Collapse from '@/components/ui/Collapse';
import RouteEditModal from './RouteEditModal';
import { countEquipmentFromStudents, formatEquipmentCounts } from '@/utils/equipment';

export default function RouteViewModal({ isOpen, onClose, routeId }) {
  const [activeTab, setActiveTab] = useState(0);
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [selectedDriverId, setSelectedDriverId] = useState(null);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  
  // Accordion state - only one collapse can be open at a time
  const [openCollapse, setOpenCollapse] = useState(null);

  // Rides tab state - must be declared before any conditional returns
  const [rideStart, setRideStart] = useState(null);
  const [rideEnd, setRideEnd] = useState(null);

  if (!isOpen) return null;

  // Mock route data - replace with actual API call
  const routeData = {
    id: routeId || "RT-30842",
    name: "North District Route",
    district: "86022-Z",
    stops: 5,
    distance: "12.4 mi",
    students: 7,
    status: "Active",
    driver: "Sam Kebede",
    driverId: "D-001",
    duration: "25 min",
    startTime: "8:00 AM",
    endTime: "8:25 AM",
    stops: [
      {
        id: 1,
        type: "pickup",
        address: "1425 Oak Street Apt 204, Springfield, MA 01103",
        time: "8:00 AM",
        students: 2,
        typeIcon: "Residential"
      },
      {
        id: 2,
        type: "pickup",
        address: "789 Pine Avenue, Springfield, MA 01105",
        time: "8:08 AM",
        students: 1,
        typeIcon: "Residential"
      },
      {
        id: 3,
        type: "pickup",
        address: "456 Elm Street, Springfield, MA 01107",
        time: "8:15 AM",
        students: 2,
        typeIcon: "Residential"
      },
      {
        id: 4,
        type: "pickup",
        address: "321 Maple Drive, Springfield, MA 01109",
        time: "8:20 AM",
        students: 2,
        typeIcon: "Residential"
      },
      {
        id: 5,
        type: "dropoff",
        address: "48:50 Riverside Drive, Boston, MA",
        time: "8:25 AM",
        students: 7,
        typeIcon: "School Campus"
      }
    ],
    students: [
      {
        id: "S-001",
        name: "Marcus Johnson",
        grade: "Grade 10",
        address: "1425 Oak Street Apt 204",
        stopId: 1,
        status: "Scheduled",
        equipment: ["Booster Seat"]
      },
      {
        id: "S-002",
        name: "Sarah Williams",
        grade: "Grade 9",
        address: "1425 Oak Street Apt 204",
        stopId: 1,
        status: "Scheduled",
        equipment: ["Wheelchair"]
      },
      {
        id: "S-003",
        name: "David Brown",
        grade: "Grade 11",
        address: "789 Pine Avenue",
        stopId: 2,
        status: "Scheduled",
        equipment: ["Booster Seat"]
      },
      {
        id: "S-004",
        name: "Emma Davis",
        grade: "Grade 10",
        address: "456 Elm Street",
        stopId: 3,
        status: "Scheduled",
        equipment: []
      },
      {
        id: "S-005",
        name: "Michael Wilson",
        grade: "Grade 12",
        address: "456 Elm Street",
        stopId: 3,
        status: "Scheduled",
        equipment: ["Harness"]
      },
      {
        id: "S-006",
        name: "Lisa Anderson",
        grade: "Grade 9",
        address: "321 Maple Drive",
        stopId: 4,
        status: "Scheduled",
        equipment: []
      },
      {
        id: "S-007",
        name: "James Taylor",
        grade: "Grade 11",
        address: "321 Maple Drive",
        stopId: 4,
        status: "Scheduled",
        equipment: ["Car Seat"]
      }
    ]
  };

  const tabs = [
    { id: 1, label: "Route Stops" },
    { id: 2, label: "Students" },
    { id: 3, label: "Map View" },
    { id: 4, label: "Rides" }
  ];

  const handleCollapseToggle = (collapseId) => {
    setOpenCollapse(openCollapse === collapseId ? null : collapseId);
  };

  const renderOverview = () => (
    <div className="space-y-4">
      {/* Overview content can be added here if needed */}
    </div>
  );

  const renderStops = () => (
    <div className="space-y-6">
      {/* Stops with vertical line */}
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5" style={{ backgroundColor: '#dbeafe' }}></div>

        <div className="space-y-8">
          {routeData.stops.map((stop, index) => (
            <div key={stop.id} className="relative">
              <div className="flex items-start gap-4">
                {/* Stop number circle */}
                <div className="relative z-10 w-12 h-12 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: index === 0 ? '#10b981' : '#f97316' }}>
                  <span className="text-white font-bold text-lg">{index + 1}</span>
                </div>

                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold" style={{ color: '#111827' }}>{stop.address}</h4>
                    <button className="flex items-center gap-1 text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: '#3b82f6' }}>
                      <Eye className="w-4 h-4" />
                      View Details
                    </button>
                  </div>

                  <div className="space-y-2 text-sm" style={{ color: '#6b7280' }}>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-sm flex items-center justify-center" style={{ backgroundColor: '#f59e0b' }}>
                        <span className="text-white text-xs">🏠</span>
                      </div>
                      <span>{stop.typeIcon}</span>
                    </div>
                    <div className="ml-6">
                      <span>Scheduled {stop.time} EST {index === 0 ? 'Pick up' : 'Drop off'} {stop.students} student{stop.students !== 1 ? 's' : ''}</span>
                    </div>
                  </div>

                  {/* Student info */}
                  <div className="mt-4 flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#8b5cf6' }}>
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        className="font-semibold hover:underline cursor-pointer"
                        style={{ color: '#3b82f6' }}
                      >
                        Marcus Johnson
                      </button>
                      <span style={{ color: '#6b7280' }}>Grade 10</span>
                      <span className="px-2 py-1 text-xs rounded" style={{ backgroundColor: '#f3f4f6', color: '#6b7280' }}>Scheduled</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStudents = () => (
    <div className="space-y-6">
      {/* Student Detail Card */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Student Header */}
        <div className="p-6 border-b" style={{ borderColor: '#e5e7eb' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {/* Simple Profile Picture */}
              <div className="w-12 h-12 rounded-full overflow-hidden flex items-center justify-center" style={{ backgroundColor: '#f3f4f6' }}>
                <User className="w-6 h-6" style={{ color: '#6b7280' }} />
              </div>
              <div>
                <button
                  className="text-xl font-bold hover:underline cursor-pointer"
                  style={{ color: '#3b82f6' }}
                  onClick={() => { setSelectedStudentId(routeData.students[0]?.id); setShowStudentModal(true); }}
                >
                  {routeData.students[0]?.name}
                </button>
                <p className="text-sm mt-1" style={{ color: '#6b7280' }}>{routeData.students[0]?.grade}</p>
              </div>
            </div>
            <span
              className="px-3 py-1 text-xs rounded-full"
              style={{
                backgroundColor: '#f3f4f6',
                color: '#6b7280'
              }}
            >
              {routeData.students[0]?.status}
            </span>
          </div>
        </div>

        {/* Pickup Section */}
        <div className="relative">
          <div
            className="p-6 rounded-t-lg"
            style={{ backgroundColor: '#dcfce7' }}
          >
            <div className="flex items-start gap-4">
              {/* Pickup Circle */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ backgroundColor: '#10b981' }}
              >
                1
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold" style={{ color: '#111827' }}>Pickup</h4>
                  <Clock className="w-4 h-4" style={{ color: '#6b7280' }} />
                  <span className="text-sm" style={{ color: '#6b7280' }}>8:00 AM EST</span>
                </div>
                <p className="text-sm" style={{ color: '#6b7280' }}>
                  {routeData.stops[0]?.address}
                </p>
              </div>
            </div>
          </div>

          {/* Vertical Line */}
          <div
            className="absolute left-6 top-16 w-0.5 h-16"
            style={{ backgroundColor: '#10b981' }}
          ></div>
        </div>

        {/* Dropoff Section */}
        <div className="relative">
          <div
            className="p-6"
            style={{ backgroundColor: '#fef3c7' }}
          >
            <div className="flex items-start gap-4">
              {/* Dropoff Circle */}
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ backgroundColor: '#f97316' }}
              >
                2
              </div>

              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold" style={{ color: '#111827' }}>Dropoff</h4>
                  <Clock className="w-4 h-4" style={{ color: '#6b7280' }} />
                  <span className="text-sm" style={{ color: '#6b7280' }}>8:25 AM EST</span>
                </div>
                <p className="text-sm" style={{ color: '#6b7280' }}>
                  {routeData.stops[routeData.stops.length - 1]?.address}
                </p>
              </div>
            </div>
          </div>

          {/* Vertical Line */}
          <div
            className="absolute left-6 top-16 w-0.5 h-16"
            style={{ backgroundColor: '#f97316' }}
          ></div>
        </div>

        {/* Notes Section */}
        <div className="relative">
          <div
            className="p-6 rounded-b-lg"
            style={{ backgroundColor: '#dbeafe' }}
          >
            <div className="flex items-start gap-4">
              {/* Notes Icon */}
              <div
                className="w-8 h-8 rounded flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: '#3b82f6' }}
              >
                <FileText className="w-4 h-4 text-white" />
              </div>

              <div className="flex-1">
                <h4 className="font-semibold mb-2" style={{ color: '#111827' }}>Notes</h4>
                <p className="text-sm" style={{ color: '#3b82f6' }}>
                  Guardian requested pickup at main building entrance. Student requires wheelchair accessibility.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderMap = () => (
    <div className="h-[500px] bg-white rounded-lg border border-[var(--gray-200)] shadow-sm overflow-hidden">
      <div className="h-full relative">
        {/* Map Header */}
        <div className="absolute top-4 left-4 z-10 flex gap-2">
          <button className="bg-white px-4 py-2 rounded-lg shadow-md text-sm font-medium text-[var(--primary-black)] border border-[var(--gray-200)]">
            Map
          </button>
          <button className="bg-white px-4 py-2 rounded-lg shadow-md text-sm font-medium text-[var(--muted-text)] border border-[var(--gray-200)] hover:text-[var(--primary-black)] transition-colors">
            Satellite
          </button>
        </div>

        {/* Map Container */}
        <div className="h-full bg-gradient-to-br from-[var(--blue-50)] to-[var(--green-50)] relative">
          {/* Map Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48cGF0dGVybiBpZD0iZ3JpZCIgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiBwYXR0ZXJuVW5pdHM9InVzZXJTcGFjZU9uVXNlIj48cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjZGRkIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')]"></div>
          </div>

          {/* Route Line */}
          <div className="absolute inset-0">
            <svg className="w-full h-full">
              <path
                d="M 80 120 Q 200 80 320 120 Q 400 160 480 200 Q 520 240 560 280 Q 600 320 640 360 Q 680 400 720 440"
                stroke="var(--green)"
                strokeWidth="4"
                fill="none"
                strokeDasharray="8,4"
                className="animate-pulse"
              />
            </svg>
          </div>

          {/* Start Point */}
          <div className="absolute top-20 left-16 z-20">
            <div className="bg-white rounded-full p-3 shadow-lg border-2 border-[var(--green)]">
              <div className="w-4 h-4 bg-[var(--green)] rounded-full"></div>
            </div>
            <div className="bg-white px-3 py-1 rounded-full shadow-md text-xs font-medium text-[var(--primary-black)] mt-2 ml-2">
              START
            </div>
          </div>

          {/* Drop Point */}
          <div className="absolute bottom-20 right-16 z-20">
            <div className="bg-white rounded-full p-3 shadow-lg border-2 border-[var(--orange)]">
              <div className="w-4 h-4 bg-[var(--orange)] rounded-full"></div>
            </div>
            <div className="bg-white px-3 py-1 rounded-full shadow-md text-xs font-medium text-[var(--primary-black)] mt-2 ml-2">
              DROP
            </div>
          </div>

          {/* Route Info */}
          <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-4 border border-[var(--gray-200)]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-[var(--green-100)] rounded-full flex items-center justify-center">
                <Route className="w-4 h-4 text-[var(--green-600)]" />
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--primary-black)]">Route RT-30842</p>
                <p className="text-xs text-[var(--muted-text)]">2 stops • 1 student • 6.2 miles total</p>
              </div>
            </div>
            <div className="mt-2 text-right">
              <p className="text-xs text-[var(--muted-text)]">Est. Duration</p>
              <p className="text-lg font-bold text-[var(--primary-black)]">25 min</p>
            </div>
          </div>

          {/* Map Controls */}
          <div className="absolute bottom-4 right-4 flex flex-col gap-2">
            <button className="bg-white rounded-lg shadow-md p-2 border border-[var(--gray-200)] hover:bg-[var(--gray-50)] transition-colors">
              <Navigation className="w-4 h-4 text-[var(--muted-text)]" />
            </button>
            <button className="bg-white rounded-lg shadow-md p-2 border border-[var(--gray-200)] hover:bg-[var(--gray-50)] transition-colors">
              <Map className="w-4 h-4 text-[var(--muted-text)]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const routeRides = [
    { id: 'R-2001', route: routeData.id, date: '04/01/2025', driver: 'Sam Kebede', status: 'Completed' },
    { id: 'R-2002', route: routeData.id, date: '04/02/2025', driver: 'John Doe', status: 'In progress' },
    { id: 'R-2003', route: routeData.id, date: '04/05/2025', driver: 'Jane Smith', status: 'Assigned' },
  ];
  const parseUsDate = (mmddyyyy) => {
    if (!mmddyyyy) return null;
    const parts = String(mmddyyyy).split('/');
    if (parts.length !== 3) return new Date(mmddyyyy);
    const [mm, dd, yyyy] = parts.map((v) => parseInt(v, 10));
    return new Date(yyyy, mm - 1, dd);
  };
  const filteredRouteRides = routeRides.filter((r) => {
    const d = parseUsDate(r.date);
    if (!d || isNaN(d.getTime())) return false;
    if (rideStart && d < new Date(rideStart.getFullYear(), rideStart.getMonth(), rideStart.getDate())) return false;
    if (rideEnd && d > new Date(rideEnd.getFullYear(), rideEnd.getMonth(), rideEnd.getDate())) return false;
    return true;
  });

  const renderRides = () => {
    const equipmentSummary = formatEquipmentCounts(countEquipmentFromStudents(routeData.students));
    const ridesForTable = filteredRouteRides.map((r) => ({
      id: r.id,
      district: r.route,
      date: r.date,
      scheduledTime: '08:30 AM',
      timezone: 'America/Los_Angeles',
      pickup: { scheduled: '08:30 AM', arrived: r.status === 'Completed' ? '08:35 AM' : '', confirmed: '08:20 AM', location: '1221 Broadway, Oakland, CA 94612' },
      dropoff: { scheduled: '09:30 AM', arrived: r.status === 'In progress' ? '09:10 AM' : '', completed: r.status === 'Completed' ? '09:25 AM' : '', location: '388 9th St, Oakland, CA 94607' },
      driver: { name: r.driver, vehicle: 'Toyota Sienna' },
      details: { distance: '3.5 mi', duration: '30 min', stops: 2, students: 2 },
      status: r.status,
      nextStop: { address: 'Central High School' },
      stops: [],
      equipmentSummary,
    }));
    return (
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h3 className="text-lg font-semibold text-[var(--primary-black)]">Rides</h3>
          <div className="w-full md:w-80">
            <DateRangePicker
              startDate={rideStart}
              endDate={rideEnd}
              onDateRangeChange={(s, e) => {
                setRideStart(s);
                setRideEnd(e);
              }}
            />
          </div>
        </div>
        <RidesTable rides={ridesForTable} />
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[10000] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl !max-w-[82rem] mx-4 w-full h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: '#e5e7eb' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center shadow-sm" style={{ backgroundColor: '#8b5cf6' }}>
              <Route className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: '#111827' }}>Route Details</h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
            aria-label="Close"
            title="Close"
          >
            <X className="w-6 h-6" style={{ color: '#6b7280' }} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="px-6 pt-4">
            {/* Collapse - Route Information */}
            <Collapse 
              title="Route Information" 
              icon={
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" className="text-purple-600">
                  <path d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
              }
              isOpen={openCollapse === 'route-info'}
              onToggle={() => handleCollapseToggle('route-info')}
            >
            <div className="space-y-6">
              {/* Route Profile Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full border border-[var(--gray-200)] overflow-hidden bg-[var(--gray-100)] flex items-center justify-center">
                    <Route className="w-8 h-8 text-[var(--blue-600)]" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-2xl text-[var(--primary-black)]">{routeData.name}</div>
                    <div className="text-sm text-[var(--muted-text)]">Route ID: {routeData.id}</div>
                    <div className="text-sm text-[var(--muted-text)]">District: {routeData.district}</div>
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="bg-[var(--green)] text-white px-3 py-1 rounded-full text-sm font-medium" style={{ minWidth: '87px', minHeight: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    {routeData.status}
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 transition-colors bg-[var(--blue-100)] text-[var(--blue-600)]">
                      <Eye className="w-4 h-4" />
                      <span>View Route</span>
                    </button>
                    <button 
                      onClick={() => setShowEditModal(true)}
                      className="px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 transition-colors bg-[var(--purple-100)] text-[var(--purple-600)] hover:bg-[var(--purple-200)]"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit Route</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Route Information Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--blue-100)] flex items-center justify-center">
                    <Hash className="w-4 h-4 text-[var(--blue-600)]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-[var(--muted-text)]">ROUTE ID</div>
                    <div className="text-sm font-medium text-[var(--primary-black)]">{routeData.id}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--green-100)] flex items-center justify-center">
                    <Timer className="w-4 h-4 text-[var(--green-600)]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-[var(--muted-text)]">DURATION</div>
                    <div className="text-sm font-medium text-[var(--primary-black)]">{routeData.duration}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--orange-100)] flex items-center justify-center">
                    <MapPinIcon className="w-4 h-4 text-[var(--orange-600)]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-[var(--muted-text)]">DISTANCE</div>
                    <div className="text-sm font-medium text-[var(--primary-black)]">{routeData.distance}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[var(--purple-100)] flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-[var(--purple-600)]" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm text-[var(--muted-text)]">STOPS</div>
                    <div className="text-sm font-medium text-[var(--primary-black)]">{routeData.stops.length}</div>
                  </div>
                </div>
              </div>

              {/* Students, Seats and Equipment Section */}
              <div className="pt-4 border-t border-[var(--gray-200)]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--red-100)] flex items-center justify-center">
                      <UsersIcon className="w-4 h-4 text-[var(--red-600)]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-[var(--muted-text)]">STUDENTS</div>
                      <div className="text-sm font-medium text-[var(--primary-black)]">{routeData.students.length}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--cyan-100)] flex items-center justify-center">
                      <UserCheck className="w-4 h-4 text-[var(--cyan-600)]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-[var(--muted-text)]">AVAILABLE SEATS</div>
                      <div className="text-sm font-medium text-[var(--primary-black)]">3</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--blue-100)] flex items-center justify-center">
                      <span className="text-sm">🧰</span>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-[var(--muted-text)]">EQUIPMENT NEEDED</div>
                      {(() => {
                        const eqCounts = countEquipmentFromStudents(routeData.students);
                        const summary = formatEquipmentCounts(eqCounts);
                        return (
                          <div className="flex flex-wrap gap-2 mt-1">
                            {summary
                              ? summary.split(', ').map((part) => (
                                  <span key={part} className="px-2 py-1 text-xs font-medium rounded-full bg-[var(--gray-100)] text-[var(--gray-700)]">{part}</span>
                                ))
                              : <span className="text-sm text-[var(--gray-500)]">None</span>}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Driver Information */}
              <div className="pt-4 border-t border-[var(--gray-200)]">
                <h4 className="text-md font-semibold text-[var(--primary-black)] mb-4">Driver Information</h4>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full overflow-hidden bg-[var(--gray-100)] flex items-center justify-center">
                    <img
                      src="/driver1.jpg"
                      alt={routeData.driver}
                      className="w-full h-full object-cover"
                      onError={(e)=>{ e.currentTarget.style.display='none'; e.currentTarget.parentElement.querySelector('[data-fallback]')?.classList.remove('hidden'); }}
                    />
                    <div data-fallback className="hidden w-full h-full flex items-center justify-center text-lg font-bold text-[var(--primary)]">
                      {routeData.driver.split(' ').map(n=>n[0]).join('').slice(0,2)}
                    </div>
                  </div>
                  <div className="flex-1">
                    <button
                      className="font-semibold text-lg hover:underline text-left text-[var(--primary-black)]"
                      onClick={() => { setSelectedDriverId(routeData.driverId); setShowDriverModal(true); }}
                    >
                      {routeData.driver}
                    </button>
                    <div className="flex items-center gap-1 text-sm text-[var(--muted-text)]">
                      <Star className="w-4 h-4 text-[var(--yellow-500)]" fill="currentColor" />
                      <span>4.9 rating</span>
                    </div>
                  </div>
                  <div className="px-3 py-1 rounded-full text-sm font-medium bg-[var(--green-100)] text-[var(--green-600)]" style={{ minWidth: '87px', minHeight: '24px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    Completed
                  </div>
                </div>
              </div>

              {/* Vehicle Information */}
              <div className="pt-4 border-t border-[var(--gray-200)]">
                <h4 className="text-md font-semibold text-[var(--primary-black)] mb-4">Vehicle Information</h4>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[var(--gray-100)]">
                    <Car className="w-6 h-6 text-[var(--gray-600)]" />
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold text-lg text-[var(--primary-black)]">Chrysler Pacifica</div>
                    <div className="text-sm text-[var(--muted-text)]">ID: RT-30842</div>
                  </div>
                </div>
              </div>

              {/* Schedule Information */}
              <div className="pt-4 border-t border-[var(--gray-200)]">
                <h4 className="text-md font-semibold text-[var(--primary-black)] mb-4">Schedule Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--green-100)] flex items-center justify-center">
                      <Clock className="w-4 h-4 text-[var(--green-600)]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-[var(--muted-text)]">START TIME</div>
                      <div className="text-sm font-medium text-[var(--primary-black)]">{routeData.startTime}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[var(--red-100)] flex items-center justify-center">
                      <Clock className="w-4 h-4 text-[var(--red-600)]" />
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-[var(--muted-text)]">END TIME</div>
                      <div className="text-sm font-medium text-[var(--primary-black)]">{routeData.endTime}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Collapse>

          {/* Tabs Section - always visible outside general info */}
          <div className="pt-4 border-t border-[var(--gray-200)]">
            <div className="flex mt-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="px-6 py-3 font-medium cursor-pointer transition-all duration-200 hover:opacity-90 rounded-lg"
                  style={{
                    backgroundColor: activeTab === tab.id ? 'var(--primary)' : 'var(--gray-100)',
                    color: activeTab === tab.id ? 'var(--on-primary)' : 'var(--muted-text)',
                    borderBottom: activeTab === tab.id ? '2px solid var(--primary)' : 'none',
                    marginRight: '4px',
                    fontSize: '14px'
                  }}
                >
                  <div className="flex items-center gap-2">
                    {tab.id === 1 && <MapPin className="w-4 h-4" />}
                    {tab.id === 2 && <Users className="w-4 h-4" />}
                    {tab.id === 3 && <Map className="w-4 h-4" />}
                    {tab.id === 4 && <Car className="w-4 h-4" />}
                    <span>{tab.label}</span>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-4">
              {activeTab === 0 && renderOverview()}
              {activeTab === 1 && renderStops()}
              {activeTab === 2 && renderStudents()}
              {activeTab === 3 && renderMap()}
              {activeTab === 4 && renderRides()}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-end gap-3 p-6 border-t border-[var(--gray-200)]">
        <Button
          variant="secondary"
          onClick={onClose}
        >
          <div className="flex items-center gap-2">
            <X className="w-4 h-4" />
            <span>Close</span>
          </div>
        </Button>
        <Button
          className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white"
        >
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>Save Route</span>
          </div>
        </Button>
      </div>
    </div>

      {/* Driver Detail Modal */}
      <DriverDetailModal
        isOpen={showDriverModal}
        onClose={() => { setShowDriverModal(false); setSelectedDriverId(null); }}
        onBack={() => { setShowDriverModal(false); setSelectedDriverId(null); }}
        driverId={selectedDriverId}
      />

      {/* Student Profile Modal */}
      {showStudentModal && selectedStudentId && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[10000] backdrop-blur-sm"
          onClick={() => { setShowStudentModal(false); setSelectedStudentId(null); }}
        >
          <div
            className="bg-white rounded-2xl w-[95vw] h-[90vh] max-w-7xl mx-4 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-[var(--gray-200)]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[var(--primary-bg)] rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-[var(--primary)]" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-[var(--primary-black)]">Student Details</h2>
                  <p className="text-[var(--muted-text)]">{selectedStudentId}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => { setShowStudentModal(false); setSelectedStudentId(null); }}
                  className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--hover-bg)] transition-colors"
                  aria-label="Back"
                >
                  {/* Using X as back is not ideal; prefer ArrowLeft, but keep consistency with imports above */}
                  <X className="w-6 h-6 text-[var(--gray-500)]" />
                </button>
              </div>
            </div>
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
              <StudentProfilePage studentId={selectedStudentId} />
            </div>
          </div>
        </div>
      )}

      {/* Route Edit Modal */}
      {showEditModal && (
        <RouteEditModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          routeId={routeId}
        />
      )}
    </div>
  );
}
