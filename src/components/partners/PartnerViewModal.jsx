"use client";
import { useState } from 'react';
import { X, Building2, User, Mail, Phone, MapPin, Users, Route, Car, Star, CheckCircle, Calendar, Clock, DollarSign, FileText, Shield, Settings, Pencil, ShieldCheck, FileCheck, Users2 } from 'lucide-react';
import DateRangePicker from '@/components/rides/DateRangePicker';
import RidesTable from '@/components/rides/RidesTable';
import Button from '@/components/ui/Button';
import AddPartnerModal from './AddPartnerModal';

export default function PartnerViewModal({ isOpen, onClose, partnerId }) {
  // Guard before any hooks to satisfy Rules of Hooks when modal is closed
  if (!isOpen) return null;
  const [activeTab, setActiveTab] = useState('overview');
  const [editOpen, setEditOpen] = useState(false);

  // Mock partner data
  const partner = {
    id: partnerId || "CT",
    name: "City Transit Solutions",
    contact: {
      name: "John Smith",
      email: "john@citytransit.com",
      phone: "+1 (555) 123-4567"
    },
    location: "Atlanta, GA",
    address: "123 Main Street, Atlanta, GA 30309",
    drivers: 12,
    routes: 8,
    rides: 156,
    status: "Active",
    rating: 4.8,
    joinDate: "2023-01-15",
    lastActive: "2024-01-15",
    totalEarnings: "$45,230",
    monthlyEarnings: "$3,850",
    insurance: {
      provider: "State Farm Insurance",
      policyNumber: "SF-2024-001234",
      expiryDate: "2024-12-31"
    },
    fleet: {
      sedans: 4,
      suvs: 3,
      buses: 2,
      vans: 3
    },
    serviceArea: "Metro Atlanta",
    operatingHours: "6:00 AM - 10:00 PM"
  };

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'drivers', label: 'Drivers' },
    { id: 'routes', label: 'Routes' },
    { id: 'rides', label: 'Rides' },
    { id: 'documents', label: 'Documents' },
    { id: 'financial', label: 'Financial' }
  ];

  const [rideStart, setRideStart] = useState(null);
  const [rideEnd, setRideEnd] = useState(null);
  const partnerRides = [
    { id: 'R-1001', route: 'RT-30842', date: '04/02/2025', driver: 'Yonathan Mekonnen', status: 'In progress' },
    { id: 'R-1002', route: 'RT-30843', date: '04/03/2025', driver: 'Michael Johnson', status: 'Assigned' },
    { id: 'R-1003', route: 'RT-30841', date: '03/28/2025', driver: 'Sarah Lee', status: 'Completed' },
  ];
  const parseUsDate = (mmddyyyy) => {
    if (!mmddyyyy) return null;
    const parts = String(mmddyyyy).split('/');
    if (parts.length !== 3) return new Date(mmddyyyy);
    const [mm, dd, yyyy] = parts.map((v) => parseInt(v, 10));
    return new Date(yyyy, mm - 1, dd);
  };
  const filteredPartnerRides = partnerRides.filter((r) => {
    const d = parseUsDate(r.date);
    if (!d || isNaN(d.getTime())) return false;
    if (rideStart && d < new Date(rideStart.getFullYear(), rideStart.getMonth(), rideStart.getDate())) return false;
    if (rideEnd && d > new Date(rideEnd.getFullYear(), rideEnd.getMonth(), rideEnd.getDate())) return false;
    return true;
  });

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Partner Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#3b82f6' }}>
              <Building2 className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold" style={{ color: '#111827' }}>Company Information</h3>
              <p className="text-sm" style={{ color: '#6b7280' }}>Basic company details</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#3b82f6' }}>
                <Building2 className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm" style={{ color: '#111827' }}>{partner.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#f59e0b' }}>
                <MapPin className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm" style={{ color: '#6b7280' }}>{partner.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#10b981' }}>
                <CheckCircle className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm font-medium" style={{ color: '#10b981' }}>{partner.status}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#8b5cf6' }}>
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-semibold" style={{ color: '#111827' }}>Contact Information</h3>
              <p className="text-sm" style={{ color: '#6b7280' }}>Primary contact details</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#8b5cf6' }}>
                <User className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm" style={{ color: '#111827' }}>{partner.contact.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#ef4444' }}>
                <Mail className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm" style={{ color: '#6b7280' }}>{partner.contact.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: '#06b6d4' }}>
                <Phone className="w-3 h-3 text-white" />
              </div>
              <span className="text-sm" style={{ color: '#6b7280' }}>{partner.contact.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-gray-100 p-4 text-center shadow-lg hover:shadow-xl transition-all duration-200">
          <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: '#3b82f6' }}>
            <Users className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold" style={{ color: '#111827' }}>{partner.drivers}</div>
          <div className="text-sm" style={{ color: '#6b7280' }}>Drivers</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-100 p-4 text-center shadow-lg hover:shadow-xl transition-all duration-200">
          <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: '#10b981' }}>
            <Route className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold" style={{ color: '#111827' }}>{partner.routes}</div>
          <div className="text-sm" style={{ color: '#6b7280' }}>Routes</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-100 p-4 text-center shadow-lg hover:shadow-xl transition-all duration-200">
          <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: '#8b5cf6' }}>
            <Car className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold" style={{ color: '#111827' }}>{partner.rides}</div>
          <div className="text-sm" style={{ color: '#6b7280' }}>Total Rides</div>
        </div>

        <div className="bg-white rounded-lg border border-gray-100 p-4 text-center shadow-lg hover:shadow-xl transition-all duration-200">
          <div className="w-8 h-8 rounded-full flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: '#f59e0b' }}>
            <Star className="w-6 h-6 text-white" />
          </div>
          <div className="text-2xl font-bold" style={{ color: '#111827' }}>{partner.rating}</div>
          <div className="text-sm" style={{ color: '#6b7280' }}>Rating</div>
        </div>
      </div>

      {/* Fleet Information */}
      <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-200">
        <h3 className="text-lg font-semibold mb-4" style={{ color: '#111827' }}>Fleet Information</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#dbeafe' }}>
            <div className="text-xl font-bold" style={{ color: '#1d4ed8' }}>{partner.fleet.sedans}</div>
            <div className="text-sm" style={{ color: '#6b7280' }}>Sedans</div>
          </div>
          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#dcfce7' }}>
            <div className="text-xl font-bold" style={{ color: '#166534' }}>{partner.fleet.suvs}</div>
            <div className="text-sm" style={{ color: '#6b7280' }}>SUVs</div>
          </div>
          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#f3e8ff' }}>
            <div className="text-xl font-bold" style={{ color: '#7c3aed' }}>{partner.fleet.buses}</div>
            <div className="text-sm" style={{ color: '#6b7280' }}>Buses</div>
          </div>
          <div className="text-center p-3 rounded-lg" style={{ backgroundColor: '#fef3c7' }}>
            <div className="text-xl font-bold" style={{ color: '#d97706' }}>{partner.fleet.vans}</div>
            <div className="text-sm" style={{ color: '#6b7280' }}>Vans</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDrivers = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
        <h3 className="text-lg font-semibold text-[var(--primary-black)] mb-4">Active Drivers</h3>
        <div className="space-y-3">
          {[
            { name: "Mike Johnson", status: "Active", rides: 45, rating: 4.9 },
            { name: "Sarah Wilson", status: "Active", rides: 38, rating: 4.8 },
            { name: "David Brown", status: "Active", rides: 42, rating: 4.7 }
          ].map((driver, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-[var(--gray-50)] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[var(--purple)] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {driver.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="font-medium text-[var(--primary-black)]">{driver.name}</div>
                  <div className="text-sm text-[var(--muted-text)]">{driver.rides} rides • {driver.rating}★</div>
                </div>
              </div>
              <span className="px-2 py-1 bg-[var(--green-100)] text-[var(--green-600)] text-xs font-medium rounded-full">
                {driver.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRoutes = () => (
    <div className="space-y-4">
      <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
        <h3 className="text-lg font-semibold text-[var(--primary-black)] mb-4">Active Routes</h3>
        <div className="space-y-3">
          {[
            { name: "Downtown Route", stops: 8, students: 25, duration: "45 min" },
            { name: "Suburban Route", stops: 12, students: 18, duration: "60 min" },
            { name: "Airport Route", stops: 5, students: 12, duration: "30 min" }
          ].map((route, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-[var(--gray-50)] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[var(--blue-100)] rounded-full flex items-center justify-center">
                  <Route className="w-4 h-4 text-[var(--blue-600)]" />
                </div>
                <div>
                  <div className="font-medium text-[var(--primary-black)]">{route.name}</div>
                  <div className="text-sm text-[var(--muted-text)]">{route.stops} stops • {route.students} students</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-[var(--primary-black)]">{route.duration}</div>
                <div className="text-xs text-[var(--muted-text)]">Duration</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRides = () => {
    const ridesForTable = filteredPartnerRides.map((r) => ({
      id: r.id,
      district: r.route,
      date: r.date,
      scheduledTime: "08:30 AM",
      timezone: "EST",
      pickup: { scheduled: "08:30 AM", arrived: r.status === 'Completed' ? '08:35 AM' : '', confirmed: '08:20 AM', location: 'Downtown Pickup Point' },
      dropoff: { scheduled: "09:30 AM", arrived: r.status === 'In progress' ? '09:10 AM' : '', completed: r.status === 'Completed' ? '09:25 AM' : '', location: 'Central High School' },
      driver: { name: r.driver, vehicle: 'Toyota Sienna' },
      details: { distance: '3.5 mi', duration: '30 min', stops: 2, students: 2 },
      status: r.status,
      nextStop: { address: 'Central High School' },
      stops: [],
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

  const renderDocuments = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-100 p-6 shadow-lg hover:shadow-xl transition-all duration-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold" style={{ color: '#111827' }}>Documents</h3>
          <button className="px-3 py-1 text-sm rounded-md text-white hover:opacity-90 transition-opacity" style={{ backgroundColor: '#3b82f6' }}>Upload</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm border-b" style={{ color: '#6b7280', borderColor: '#e5e7eb' }}>
                <th className="px-6 py-3 font-medium">Document</th>
                <th className="px-6 py-3 font-medium">Status</th>
                <th className="px-6 py-3 font-medium">Expiry</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Insurance Certificate', status: 'Pending Update', expiry: '2025-01-31', icon: ShieldCheck, bgColor: '#ef4444' },
                { name: 'W-9 Form', status: 'Current', expiry: '-', icon: FileCheck, bgColor: '#10b981' },
                { name: 'Driver Roster', status: 'Current', expiry: '-', icon: Users2, bgColor: '#8b5cf6' },
              ].map((doc, i) => (
                <tr key={i} className="border-b hover:bg-gray-50 transition-colors" style={{ borderColor: '#e5e7eb' }}>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center" style={{ backgroundColor: doc.bgColor }}>
                        <doc.icon className="w-3 h-3 text-white" />
                      </div>
                      <span style={{ color: '#111827' }}>{doc.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full ${doc.status === 'Current' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{doc.status}</span>
                  </td>
                  <td className="px-6 py-3" style={{ color: '#6b7280' }}>{doc.expiry}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderFinancial = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[var(--green-100)] rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-[var(--green-600)]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--primary-black)]">Earnings</h3>
              <p className="text-sm text-[var(--muted-text)]">Financial performance</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-[var(--muted-text)]">Total Earnings</span>
              <span className="text-lg font-bold text-[var(--primary-black)]">{partner.totalEarnings}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[var(--muted-text)]">This Month</span>
              <span className="text-lg font-bold text-[var(--green-600)]">{partner.monthlyEarnings}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[var(--blue-100)] rounded-full flex items-center justify-center">
              <Shield className="w-6 h-6 text-[var(--blue-600)]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--primary-black)]">Insurance</h3>
              <p className="text-sm text-[var(--muted-text)]">Coverage details</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-[var(--muted-text)]">Provider</span>
              <span className="text-sm font-medium text-[var(--primary-black)]">{partner.insurance.provider}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[var(--muted-text)]">Policy #</span>
              <span className="text-sm font-medium text-[var(--primary-black)]">{partner.insurance.policyNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[var(--muted-text)]">Expires</span>
              <span className="text-sm font-medium text-[var(--primary-black)]">{partner.insurance.expiryDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'drivers':
        return renderDrivers();
      case 'routes':
        return renderRoutes();
      case 'rides':
        return renderRides();
      case 'documents':
        return renderDocuments();
      case 'financial':
        return renderFinancial();
      default:
        return renderOverview();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-[9999] backdrop-blur-sm"
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
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold" style={{ color: '#111827' }}>Partner Details</h2>
              <p style={{ color: '#6b7280' }}>{partner.name} - {partnerId || "CT"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setEditOpen(true)}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Edit partner"
              title="Edit"
            >
              <Pencil className="w-5 h-5" style={{ color: '#6b7280' }} />
            </button>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors"
              aria-label="Close"
              title="Close"
            >
              <X className="w-6 h-6" style={{ color: '#6b7280' }} />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-2 mt-2 ml-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-6 py-3 text-sm font-medium cursor-pointer flex items-center gap-2 transition-all duration-200 hover:opacity-90"
              style={{
                backgroundColor: activeTab === tab.id ? '#8b5cf6' : '#f3f4f6',
                color: activeTab === tab.id ? '#ffffff' : '#6b7280',
                border: activeTab === tab.id ? 'none' : '1px solid #e5e7eb',
                borderRadius: '12px'
              }}
            >
              {tab.id === 'overview' && <Building2 className="w-4 h-4" />}
              {tab.id === 'drivers' && <Users className="w-4 h-4" />}
              {tab.id === 'routes' && <Route className="w-4 h-4" />}
              {tab.id === 'rides' && <Car className="w-4 h-4" />}
              {tab.id === 'documents' && <FileText className="w-4 h-4" />}
              {tab.id === 'financial' && <DollarSign className="w-4 h-4" />}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto flex-1">
          {renderContent()}
        </div>

        {/* Footer removed as per design: only pencil icon in header */}
      </div>
      {editOpen && (
        <AddPartnerModal
          isOpen={editOpen}
          onClose={() => setEditOpen(false)}
          mode="edit"
          initialValues={{
            companyName: partner.name,
            contactName: partner.contact.name,
            contactEmail: partner.contact.email,
            contactPhone: partner.contact.phone,
            companyAddress: partner.address,
            city: partner.location.split(',')[0] || '',
            state: partner.location.split(',')[1]?.trim() || '',
            insuranceProvider: partner.insurance.provider,
            naicNumber: partner.insurance.policyNumber,
            generalLiabilityLimit: '',
            autoLiabilityLimit: '',
            workersCompInsurance: '',
            sedans: String(partner.fleet.sedans || ''),
            suvs: String(partner.fleet.suvs || ''),
            buses: String(partner.fleet.buses || ''),
            vans: String(partner.fleet.vans || ''),
            serviceArea: partner.serviceArea,
            operatingHoursStart: (partner.operatingHours || '').split(' - ')[0] || '',
            operatingHoursEnd: (partner.operatingHours || '').split(' - ')[1] || '',
          }}
        />
      )}
    </div>
  );
}
