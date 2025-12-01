"use client";

import { useState } from "react";
import RideDetailContent from "@/components/rides/RideDetailContent";
import ManageTripModal from '@/components/common/modals/ManageTripModal'
import EditTripModal from '@/components/common/modals/EditTripModal'
import DriverDetailModal from '@/components/drivers/DriverDetailModal'
import BaseModal from '@/components/common/BaseModal'
import { Map, MapPin, Car, FileText, Shield, Calendar, CheckCircle, AlertCircle, User } from 'lucide-react'
import { FaPlay, FaUsers, FaHistory } from "react-icons/fa";

export default function RideDetailModal({
  isOpen,
  onClose,
  rideId = "SLV1001-75185",
  rideStatus = "In Progress",
}) {
  // Modal states
  const [showManageTripModal, setShowManageTripModal] = useState(false)
  const [showEditTripModal, setShowEditTripModal] = useState(false)
  const [showDriverDetailModal, setShowDriverDetailModal] = useState(false)
  const [selectedDriverId, setSelectedDriverId] = useState(null)
  const [showVehicleModal, setShowVehicleModal] = useState(false)
  const [selectedVehicleId, setSelectedVehicleId] = useState(null)

  if (!isOpen) return null;

  // Custom tabs for Eagle Eye - All tabs in specific sequence
  const customTabs = [
    {
      value: 'stops',
      label: 'TRIP STOPS',
      icon: FaPlay
    },
    {
      value: 'students',
      label: 'STUDENTS',
      icon: FaUsers
    },
    {
      value: 'ridelog',
      label: 'TIMELINE',
      icon: FaHistory
    },
    {
      value: 'livetracking',
      label: 'LIVE TRACKING',
      icon: Map
    },
    {
      value: 'stops-list',
      label: 'STOPS',
      icon: MapPin
    }
  ]

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-start justify-center z-[9000] pt-6"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl !max-w-[82rem] mx-4 w-full h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex-1 overflow-hidden flex flex-col">
          <RideDetailContent
            rideId={rideId}
            onClose={onClose}
            rideStatus={rideStatus}
            showMapViewButtons={true}
            customTabs={customTabs}
            onManageTrip={() => setShowManageTripModal(true)}
            onEditTrip={() => setShowEditTripModal(true)}
            onViewDriver={(driverId) => {
              setSelectedDriverId(driverId);
              setShowDriverDetailModal(true);
            }}
            onViewVehicle={(vehicleId) => {
              setSelectedVehicleId(vehicleId);
              setShowVehicleModal(true);
            }}
          />
        </div>
      </div>
      
      {/* Modal Components */}
      <ManageTripModal
        isOpen={showManageTripModal}
        onClose={() => setShowManageTripModal(false)}
        rideId={rideId}
        onConfirm={(data) => {
          console.log('Manage Trip confirmed:', data);
          setShowManageTripModal(false);
          // Handle manage trip logic here
        }}
      />
      
      <EditTripModal
        isOpen={showEditTripModal}
        onClose={() => setShowEditTripModal(false)}
        rideId={rideId}
        onConfirm={(data) => {
          console.log('Edit Trip confirmed:', data);
          setShowEditTripModal(false);
          // Handle edit trip logic here
        }}
      />
      
      <DriverDetailModal
        isOpen={showDriverDetailModal}
        onClose={() => {
          setShowDriverDetailModal(false);
          setSelectedDriverId(null);
        }}
        driverId={selectedDriverId}
        onBack={() => {
          setShowDriverDetailModal(false);
          setSelectedDriverId(null);
        }}
      />

      {/* Vehicle Modal */}
      <VehicleDetailModal
        isOpen={showVehicleModal}
        onClose={() => {
          setShowVehicleModal(false);
          setSelectedVehicleId(null);
        }}
        driverId={selectedVehicleId}
      />
    </div>
  );
}

// Vehicle Detail Modal Component
function VehicleDetailModal({ isOpen, onClose, driverId }) {
  // Get vehicle data from driver - this is a simplified version
  // In real app, you'd fetch this from API
  const getVehicleData = (driverId) => {
    const vehicleMap = {
      "D-001": {
        make: "Chrysler Pacifica",
        year: 2022,
        licensePlate: "RT-30842",
        type: "Minivan",
        color: "Silver",
        vin: "2C4RC1DG3MR123456",
        driverName: "Yonathan Mekonnen",
        driverId: "D-001",
        insurance: {
          provider: "State Farm Insurance",
          policyNumber: "SF-2024-789456",
          validFrom: "2024-01-15",
          validTo: "2025-01-15",
          status: "Active"
        },
        registration: {
          number: "GA-REG-2024-001",
          issuedDate: "2024-01-10",
          expiryDate: "2025-01-10",
          status: "Valid"
        },
        inspection: {
          lastInspection: "2024-12-01",
          nextInspection: "2025-06-01",
          status: "Passed",
          certificate: "INSP-2024-12345"
        },
        capacity: {
          seats: 7,
          maxStudents: 6
        }
      },
      "D-002": {
        make: "Toyota Sienna",
        year: 2023,
        licensePlate: "RT-30845",
        type: "Minivan",
        color: "Black",
        vin: "5TDKZ3DC3NS234567",
        driverName: "William Rodriguez",
        driverId: "D-002",
        insurance: {
          provider: "Geico Insurance",
          policyNumber: "GC-2024-456789",
          validFrom: "2024-02-01",
          validTo: "2025-02-01",
          status: "Active"
        },
        registration: {
          number: "GA-REG-2024-002",
          issuedDate: "2024-02-05",
          expiryDate: "2025-02-05",
          status: "Valid"
        },
        inspection: {
          lastInspection: "2024-11-15",
          nextInspection: "2025-05-15",
          status: "Passed",
          certificate: "INSP-2024-12346"
        },
        capacity: {
          seats: 8,
          maxStudents: 7
        }
      },
      "D-003": {
        make: "Honda Odyssey",
        year: 2021,
        licensePlate: "RT-30846",
        type: "Minivan",
        color: "White",
        vin: "5FNRL6H78MB345678",
        driverName: "Maria Sanchez",
        driverId: "D-003",
        insurance: {
          provider: "Progressive Insurance",
          policyNumber: "PR-2024-321654",
          validFrom: "2024-03-01",
          validTo: "2025-03-01",
          status: "Active"
        },
        registration: {
          number: "GA-REG-2024-003",
          issuedDate: "2024-03-10",
          expiryDate: "2025-03-10",
          status: "Valid"
        },
        inspection: {
          lastInspection: "2024-10-20",
          nextInspection: "2025-04-20",
          status: "Passed",
          certificate: "INSP-2024-12347"
        },
        capacity: {
          seats: 8,
          maxStudents: 7
        }
      }
    };
    return vehicleMap[driverId] || null;
  };

  const vehicleData = getVehicleData(driverId);

  if (!isOpen || !vehicleData) return null;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Vehicle Details"
      size="xl"
      widthClass="w-[95vw] h-[90vh] max-w-7xl mx-4 overflow-hidden"
    >
      <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-4">
            {/* Vehicle Overview */}
            <div className="bg-white rounded-lg p-6 border" style={{ borderColor: 'var(--gray-200)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--blue-600)' }}>
                  <Car className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: 'var(--heading)' }}>Vehicle Overview</h3>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: 'var(--gray-200)' }}>
                  <span className="text-sm" style={{ color: 'var(--muted-text)' }}>Make/Model:</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--heading)' }}>{vehicleData.make}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: 'var(--gray-200)' }}>
                  <span className="text-sm" style={{ color: 'var(--muted-text)' }}>Year:</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--heading)' }}>{vehicleData.year}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: 'var(--gray-200)' }}>
                  <span className="text-sm" style={{ color: 'var(--muted-text)' }}>Type:</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--heading)' }}>{vehicleData.type}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: 'var(--gray-200)' }}>
                  <span className="text-sm" style={{ color: 'var(--muted-text)' }}>Color:</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--heading)' }}>{vehicleData.color}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: 'var(--gray-200)' }}>
                  <span className="text-sm" style={{ color: 'var(--muted-text)' }}>License Plate:</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--heading)' }}>{vehicleData.licensePlate}</span>
                </div>
                <div className="flex justify-between items-center py-2 border-b" style={{ borderColor: 'var(--gray-200)' }}>
                  <span className="text-sm" style={{ color: 'var(--muted-text)' }}>VIN:</span>
                  <span className="text-sm font-medium font-mono" style={{ color: 'var(--heading)' }}>{vehicleData.vin}</span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-sm" style={{ color: 'var(--muted-text)' }}>Capacity:</span>
                  <span className="text-sm font-medium" style={{ color: 'var(--heading)' }}>
                    {vehicleData.capacity.seats} seats ({vehicleData.capacity.maxStudents} students)
                  </span>
                </div>
              </div>
            </div>

            {/* Driver Information */}
            <div className="bg-white rounded-lg p-6 border" style={{ borderColor: 'var(--gray-200)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--purple-600)' }}>
                  <User className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold" style={{ color: 'var(--heading)' }}>Assigned Driver</h3>
              </div>
              <div className="space-y-2">
                <p className="text-base font-medium" style={{ color: 'var(--heading)' }}>{vehicleData.driverName}</p>
                <p className="text-sm" style={{ color: 'var(--muted-text)' }}>Driver ID: {vehicleData.driverId}</p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-4">
            {/* Insurance */}
            <div className="bg-white rounded-lg p-6 border" style={{ borderColor: 'var(--gray-200)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--green-600)' }}>
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--heading)' }}>Insurance</h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                    vehicleData.insurance.status === 'Active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {vehicleData.insurance.status === 'Active' ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <AlertCircle className="w-3 h-3 mr-1" />
                    )}
                    {vehicleData.insurance.status}
                  </span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--muted-text)' }}>Provider:</span>
                  <span className="font-medium" style={{ color: 'var(--heading)' }}>{vehicleData.insurance.provider}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--muted-text)' }}>Policy #:</span>
                  <span className="font-medium font-mono" style={{ color: 'var(--heading)' }}>{vehicleData.insurance.policyNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--muted-text)' }}>Valid From:</span>
                  <span className="font-medium" style={{ color: 'var(--heading)' }}>{formatDate(vehicleData.insurance.validFrom)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--muted-text)' }}>Valid To:</span>
                  <span className="font-medium" style={{ color: 'var(--heading)' }}>{formatDate(vehicleData.insurance.validTo)}</span>
                </div>
              </div>
            </div>

            {/* Registration */}
            <div className="bg-white rounded-lg p-6 border" style={{ borderColor: 'var(--gray-200)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--blue-600)' }}>
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--heading)' }}>Registration</h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                    vehicleData.registration.status === 'Valid' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {vehicleData.registration.status === 'Valid' ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <AlertCircle className="w-3 h-3 mr-1" />
                    )}
                    {vehicleData.registration.status}
                  </span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--muted-text)' }}>Registration #:</span>
                  <span className="font-medium font-mono" style={{ color: 'var(--heading)' }}>{vehicleData.registration.number}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--muted-text)' }}>Issued:</span>
                  <span className="font-medium" style={{ color: 'var(--heading)' }}>{formatDate(vehicleData.registration.issuedDate)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--muted-text)' }}>Expires:</span>
                  <span className="font-medium" style={{ color: 'var(--heading)' }}>{formatDate(vehicleData.registration.expiryDate)}</span>
                </div>
              </div>
            </div>

            {/* Inspection */}
            <div className="bg-white rounded-lg p-6 border" style={{ borderColor: 'var(--gray-200)' }}>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--orange)' }}>
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold" style={{ color: 'var(--heading)' }}>Inspection</h3>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                    vehicleData.inspection.status === 'Passed' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {vehicleData.inspection.status === 'Passed' ? (
                      <CheckCircle className="w-3 h-3 mr-1" />
                    ) : (
                      <AlertCircle className="w-3 h-3 mr-1" />
                    )}
                    {vehicleData.inspection.status}
                  </span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span style={{ color: 'var(--muted-text)' }}>Last Inspection:</span>
                  <span className="font-medium" style={{ color: 'var(--heading)' }}>{formatDate(vehicleData.inspection.lastInspection)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--muted-text)' }}>Next Inspection:</span>
                  <span className="font-medium" style={{ color: 'var(--heading)' }}>{formatDate(vehicleData.inspection.nextInspection)}</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: 'var(--muted-text)' }}>Certificate #:</span>
                  <span className="font-medium font-mono" style={{ color: 'var(--heading)' }}>{vehicleData.inspection.certificate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </BaseModal>
  );
}