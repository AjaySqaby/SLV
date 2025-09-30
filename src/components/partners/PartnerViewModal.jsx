"use client";
import { useState } from 'react';
import { X, Building2, User, Mail, Phone, MapPin, Users, Route, Car, Star, CheckCircle, Calendar, Clock, DollarSign, FileText, Shield, Settings } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function PartnerViewModal({ isOpen, onClose, partnerId }) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen) return null;

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
    { id: 'financial', label: 'Financial' }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Partner Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[var(--blue-100)] rounded-full flex items-center justify-center">
              <Building2 className="w-8 h-8 text-[var(--blue-600)]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--primary-black)]">Company Information</h3>
              <p className="text-sm text-[var(--muted-text)]">Basic company details</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <Building2 className="w-4 h-4 text-[var(--gray-400)]" />
              <span className="text-sm text-[var(--primary-black)]">{partner.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <MapPin className="w-4 h-4 text-[var(--gray-400)]" />
              <span className="text-sm text-[var(--muted-text)]">{partner.address}</span>
            </div>
            <div className="flex items-center gap-3">
              <CheckCircle className="w-4 h-4 text-[var(--green-600)]" />
              <span className="text-sm text-[var(--green-600)] font-medium">{partner.status}</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-[var(--purple-100)] rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-[var(--purple-600)]" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-[var(--primary-black)]">Contact Information</h3>
              <p className="text-sm text-[var(--muted-text)]">Primary contact details</p>
            </div>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-[var(--gray-400)]" />
              <span className="text-sm text-[var(--primary-black)]">{partner.contact.name}</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[var(--gray-400)]" />
              <span className="text-sm text-[var(--muted-text)]">{partner.contact.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[var(--gray-400)]" />
              <span className="text-sm text-[var(--muted-text)]">{partner.contact.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg border border-[var(--gray-200)] p-4 text-center shadow-sm hover:shadow-md transition-all duration-200">
          <div className="w-8 h-8 bg-[var(--blue-100)] rounded-full flex items-center justify-center mx-auto mb-2">
            <Users className="w-6 h-6 text-[var(--blue-600)]" />
          </div>
          <div className="text-2xl font-bold text-[var(--primary-black)]">{partner.drivers}</div>
          <div className="text-sm text-[var(--muted-text)]">Drivers</div>
        </div>

        <div className="bg-white rounded-lg border border-[var(--gray-200)] p-4 text-center shadow-sm hover:shadow-md transition-all duration-200">
          <div className="w-8 h-8 bg-[var(--green-100)] rounded-full flex items-center justify-center mx-auto mb-2">
            <Route className="w-6 h-6 text-[var(--green-600)]" />
          </div>
          <div className="text-2xl font-bold text-[var(--primary-black)]">{partner.routes}</div>
          <div className="text-sm text-[var(--muted-text)]">Routes</div>
        </div>

        <div className="bg-white rounded-lg border border-[var(--gray-200)] p-4 text-center shadow-sm hover:shadow-md transition-all duration-200">
          <div className="w-8 h-8 bg-[var(--purple-100)] rounded-full flex items-center justify-center mx-auto mb-2">
            <Car className="w-6 h-6 text-[var(--purple-600)]" />
          </div>
          <div className="text-2xl font-bold text-[var(--primary-black)]">{partner.rides}</div>
          <div className="text-sm text-[var(--muted-text)]">Total Rides</div>
        </div>

        <div className="bg-white rounded-lg border border-[var(--gray-200)] p-4 text-center shadow-sm hover:shadow-md transition-all duration-200">
          <div className="w-8 h-8 bg-[var(--amber-100)] rounded-full flex items-center justify-center mx-auto mb-2">
            <Star className="w-6 h-6 text-[var(--amber-600)]" />
          </div>
          <div className="text-2xl font-bold text-[var(--primary-black)]">{partner.rating}</div>
          <div className="text-sm text-[var(--muted-text)]">Rating</div>
        </div>
      </div>

      {/* Fleet Information */}
      <div className="bg-white rounded-lg border border-[var(--gray-200)] p-6 shadow-sm hover:shadow-md transition-all duration-200">
        <h3 className="text-lg font-semibold text-[var(--primary-black)] mb-4">Fleet Information</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-3 bg-[var(--blue-100)] rounded-lg">
            <div className="text-xl font-bold text-[var(--blue-600)]">{partner.fleet.sedans}</div>
            <div className="text-sm text-[var(--muted-text)]">Sedans</div>
          </div>
          <div className="text-center p-3 bg-[var(--green-100)] rounded-lg">
            <div className="text-xl font-bold text-[var(--green-600)]">{partner.fleet.suvs}</div>
            <div className="text-sm text-[var(--muted-text)]">SUVs</div>
          </div>
          <div className="text-center p-3 bg-[var(--purple-100)] rounded-lg">
            <div className="text-xl font-bold text-[var(--purple-600)]">{partner.fleet.buses}</div>
            <div className="text-sm text-[var(--muted-text)]">Buses</div>
          </div>
          <div className="text-center p-3 bg-[var(--amber-100)] rounded-lg">
            <div className="text-xl font-bold text-[var(--amber-600)]">{partner.fleet.vans}</div>
            <div className="text-sm text-[var(--muted-text)]">Vans</div>
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
        className="bg-white rounded-2xl w-[95vw] h-[89vh] max-w-7xl mx-4 overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[var(--gray-200)]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[var(--primary-bg)] rounded-full flex items-center justify-center">
              <Building2 className="w-6 h-6 text-[var(--primary)]" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[var(--primary-black)]">Partner Details</h2>
              <p className="text-[var(--muted-text)]">{partner.name} - {partnerId || "CT"}</p>
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
        <div className="p-6 overflow-y-auto max-h-[calc(85vh-200px)]">
          {renderContent()}
        </div>

        {/* Footer - Fixed at bottom */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-[var(--gray-200)] p-6">
          <div className="flex justify-end gap-3">
            <Button
              variant="secondary"
              onClick={onClose}
            >
              Close
            </Button>
            <Button
              className="bg-[var(--primary)] hover:bg-[var(--primary-dark)] text-white"
              onClick={() => console.log('Edit partner')}
            >
              Edit Partner
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
