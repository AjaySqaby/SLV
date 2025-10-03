"use client";

import { useState } from 'react';
import { X, MapPin, Clock, User, Car, Calendar, Map, Eye, Route, Users, Navigation, Star, CheckCircle, AlertCircle, Play, Pause, Square, Edit } from 'lucide-react';
import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import StatusBadge from '@/components/ui/StatusBadge';

export default function RouteViewModal({ isOpen, onClose, routeId }) {
  const [activeTab, setActiveTab] = useState(0);

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
        status: "Scheduled"
      },
      {
        id: "S-002",
        name: "Sarah Williams",
        grade: "Grade 9",
        address: "1425 Oak Street Apt 204",
        stopId: 1,
        status: "Scheduled"
      },
      {
        id: "S-003",
        name: "David Brown",
        grade: "Grade 11",
        address: "789 Pine Avenue",
        stopId: 2,
        status: "Scheduled"
      },
      {
        id: "S-004",
        name: "Emma Davis",
        grade: "Grade 10",
        address: "456 Elm Street",
        stopId: 3,
        status: "Scheduled"
      },
      {
        id: "S-005",
        name: "Michael Wilson",
        grade: "Grade 12",
        address: "456 Elm Street",
        stopId: 3,
        status: "Scheduled"
      },
      {
        id: "S-006",
        name: "Lisa Anderson",
        grade: "Grade 9",
        address: "321 Maple Drive",
        stopId: 4,
        status: "Scheduled"
      },
      {
        id: "S-007",
        name: "James Taylor",
        grade: "Grade 11",
        address: "321 Maple Drive",
        stopId: 4,
        status: "Scheduled"
      }
    ]
  };

  const tabs = [
    { id: 0, label: "Route Overview" },
    { id: 1, label: "Route Stops" },
    { id: 2, label: "Students" },
    { id: 3, label: "Map View" }
  ];

  const renderOverview = () => (
    <div className="grid grid-cols-2 gap-6">
      {/* Driver Card */}
      <div className="bg-white p-6 rounded-lg border border-[var(--gray-200)] shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-[var(--blue-100)] rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-[var(--blue-600)]" />
          </div>
          <h3 className="text-base font-medium text-[var(--primary-black)]">Driver</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[var(--gray-200)] rounded-full flex items-center justify-center">
            <User className="w-6 h-6 text-[var(--gray-600)]" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-[var(--primary-black)] text-base">{routeData.driver}</p>
            <div className="flex items-center gap-1 text-sm text-[var(--muted-text)]">
              <Star className="w-4 h-4 text-[var(--amber-500)] fill-current" />
              <span>4.9 rating</span>
            </div>
          </div>
          <div className="bg-[var(--green-100)] text-[var(--green-600)] px-3 py-1 rounded-full text-sm font-medium">
            Completed
          </div>
        </div>
      </div>

      {/* Vehicle Card */}
      <div className="bg-white p-6 rounded-lg border border-[var(--gray-200)] shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-[var(--blue-100)] rounded-full flex items-center justify-center">
            <Car className="w-4 h-4 text-[var(--blue-600)]" />
          </div>
          <h3 className="text-base font-medium text-[var(--primary-black)]">Vehicle</h3>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-[var(--gray-200)] rounded-full flex items-center justify-center">
            <Car className="w-6 h-6 text-[var(--gray-600)]" />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-[var(--primary-black)] text-base">Chrysler Pacifica</p>
            <p className="text-sm text-[var(--muted-text)]">ID: RT-30842</p>
          </div>
        </div>
      </div>

      {/* Trip Details Card */}
      <div className="bg-white p-6 rounded-lg border border-[var(--gray-200)] shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[var(--blue-100)] rounded-full flex items-center justify-center">
              <Route className="w-4 h-4 text-[var(--blue-600)]" />
            </div>
            <h3 className="text-base font-medium text-[var(--primary-black)]">Trip Details</h3>
          </div>
          <button className="bg-[var(--blue-100)] text-[var(--blue-600)] px-3 py-1 rounded-full text-sm font-medium hover:bg-[var(--blue-200)] transition-colors flex items-center gap-2">
            <Eye className="w-4 h-4" />
            <span>View Route</span>
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[var(--muted-text)] text-sm">Route:</span>
            <span className="font-semibold text-[var(--primary-black)]">{routeData.id}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--muted-text)] text-sm">Duration:</span>
            <span className="font-semibold text-[var(--primary-black)]">{routeData.duration}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--muted-text)] text-sm">Distance:</span>
            <span className="font-semibold text-[var(--primary-black)]">{routeData.distance}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--muted-text)] text-sm">Stops:</span>
            <span className="font-semibold text-[var(--primary-black)]">{routeData.stops.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--muted-text)] text-sm">Students:</span>
            <span className="font-semibold text-[var(--primary-black)]">{routeData.students.length}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--muted-text)] text-sm">Available Seats:</span>
            <span className="font-semibold text-[var(--primary-black)]">3</span>
          </div>
        </div>
      </div>

      {/* Schedule Card */}
      <div className="bg-white p-6 rounded-lg border border-[var(--gray-200)] shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 bg-[var(--blue-100)] rounded-full flex items-center justify-center">
            <Clock className="w-4 h-4 text-[var(--blue-600)]" />
          </div>
          <h3 className="text-base font-medium text-[var(--primary-black)]">Schedule</h3>
        </div>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[var(--muted-text)] text-sm">Start Time:</span>
            <span className="font-semibold text-[var(--primary-black)]">{routeData.startTime}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--muted-text)] text-sm">End Time:</span>
            <span className="font-semibold text-[var(--primary-black)]">{routeData.endTime}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-[var(--muted-text)] text-sm">Status:</span>
            <StatusBadge status={routeData.status} type="active" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStops = () => (
    <div className="space-y-4">
      {routeData.stops.map((stop, index) => (
        <div key={stop.id} className="bg-white p-6 rounded-lg border border-[var(--gray-200)] shadow-sm">
          <div className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg ${index === 0 ? 'bg-[var(--green)]' : 'bg-[var(--orange)]'
                }`}>
                {index + 1}
              </div>
              {index < routeData.stops.length - 1 && (
                <div className="w-0.5 h-8 bg-[var(--blue-200)] mt-2"></div>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h4 className="font-bold text-[var(--primary-black)] text-base mb-3">
                    {stop.address}
                  </h4>
                  <div className="space-y-2 text-sm text-[var(--muted-text)]">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-[var(--orange-500)]" />
                      <span>{stop.typeIcon}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-[var(--muted-text)]" />
                      <span>{stop.students} student{stop.students !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-[var(--muted-text)]" />
                      <span>Scheduled {stop.time} EST {index === 0 ? 'Pick up' : 'Drop off'} {stop.students} student{stop.students !== 1 ? 's' : ''}</span>
                    </div>
                  </div>

                  {/* Student Information */}
                  <div className="mt-4 flex items-center gap-2">
                    <div className="w-6 h-6 bg-[var(--purple-100)] rounded-full flex items-center justify-center">
                      <User className="w-3 h-3 text-[var(--purple-600)]" />
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[var(--blue-600)] font-medium">Marcus Johnson</span>
                      <span className="text-[var(--muted-text)] text-sm">Grade 10</span>
                      <div className="bg-[var(--gray-100)] text-[var(--muted-text)] px-2 py-1 rounded-full text-xs">
                        Scheduled
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right ml-4">
                  <div className="text-sm font-medium text-[var(--primary-black)] mb-2">
                    {stop.time}
                  </div>
                  <button className="flex items-center gap-1 text-sm text-[var(--blue-600)] hover:underline">
                    <Eye className="w-4 h-4" />
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderStudents = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {routeData.students.map((student) => (
        <Card key={student.id} className="p-4 border border-[var(--card-border)]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[var(--blue-100)] rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-[var(--blue-600)]" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold text-[var(--primary-black)]">{student.name}</h4>
              <div className="flex items-center gap-2 text-sm text-[var(--muted-text)]">
                <span>{student.grade}</span>
                <span>•</span>
                <span className="text-xs text-[var(--gray-500)]">{student.address}</span>
              </div>
            </div>
            <StatusBadge status={student.status} type="active" />
          </div>
        </Card>
      ))}
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

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-[95vw] h-[90vh] max-w-7xl mx-4 overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--gray-200)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[var(--primary-bg)] rounded-full flex items-center justify-center">
              <Route className="w-6 h-6 text-[var(--primary)]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--primary-black)]">Route Details #{routeData.id}</h2>
              <p className="text-[var(--muted-text)]">{routeData.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[var(--hover-bg)] transition-colors"
          >
            <X className="w-6 h-6 text-[var(--gray-500)]" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex mt-2 ml-8">
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
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {activeTab === 0 && renderOverview()}
          {activeTab === 1 && renderStops()}
          {activeTab === 2 && renderStudents()}
          {activeTab === 3 && renderMap()}
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
              <Edit className="w-4 h-4" />
              <span>Edit Route</span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  );
}
