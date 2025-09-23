"use client";

import { useState } from 'react';
import { X, MapPin, Clock, User, Car, Calendar, Map, Eye, Route, Users, Navigation } from 'lucide-react';
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
      <div className="bg-[var(--surface-bg)] p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Driver Information</h3>
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
            <User className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="font-semibold">{routeData.driver}</p>
            <p className="text-sm text-gray-600">4.9 rating</p>
          </div>
        </div>
      </div>

      <div className="bg-[var(--surface-bg)] p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Vehicle Information</h3>
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
            <Car className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="font-semibold">Toyota Sienna</p>
            <p className="text-sm text-gray-600">ID: RT-30845</p>
          </div>
        </div>
      </div>

      <div className="bg-[var(--surface-bg)] p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Route Details</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Route ID:</span>
            <span className="font-medium">{routeData.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Duration:</span>
            <span className="font-medium">{routeData.duration}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Distance:</span>
            <span className="font-medium">{routeData.distance}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Stops:</span>
            <span className="font-medium">{routeData.stops.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Students:</span>
            <span className="font-medium">{routeData.students.length}</span>
          </div>
        </div>
      </div>

      <div className="bg-[var(--surface-bg)] p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Schedule</h3>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Start Time:</span>
            <span className="font-medium">{routeData.startTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">End Time:</span>
            <span className="font-medium">{routeData.endTime}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <StatusBadge status={routeData.status} type="active" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStops = () => (
    <div className="space-y-4">
      {routeData.stops.map((stop, index) => (
        <Card key={stop.id} className="p-6">
          <div className="flex items-start gap-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
              stop.type === 'pickup' ? 'bg-green-500' : 'bg-orange-500'
            }`}>
              {stop.id}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold">{stop.address}</h4>
                <span className="text-sm text-gray-500">{stop.time}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {stop.typeIcon}
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  {stop.students} students
                </span>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );

  const renderStudents = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {routeData.students.map((student) => (
        <Card key={student.id} className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h4 className="font-semibold">{student.name}</h4>
              <p className="text-sm text-gray-600">{student.grade}</p>
              <p className="text-xs text-gray-500">{student.address}</p>
            </div>
            <StatusBadge status={student.status} type="active" />
          </div>
        </Card>
      ))}
    </div>
  );

  const renderMap = () => (
    <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center">
      <div className="text-center">
        <Map className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600 mb-2">Interactive Map View</h3>
        <p className="text-gray-500">Route visualization would appear here</p>
      </div>
    </div>
  );

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-xl w-[95vw] h-[90vh] max-w-7xl mx-4 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <Route className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Route Details #{routeData.id}</h2>
              <p className="text-gray-600">{routeData.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium transition-colors ${
                activeTab === tab.id
                  ? 'text-purple-600 border-b-2 border-purple-600'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 0 && renderOverview()}
          {activeTab === 1 && renderStops()}
          {activeTab === 2 && renderStudents()}
          {activeTab === 3 && renderMap()}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t border-gray-200">
          <Button
            variant="secondary"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            className="bg-purple-600 hover:bg-purple-700"
          >
            Edit Route
          </Button>
        </div>
      </div>
    </div>
  );
}
