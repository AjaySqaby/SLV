"use client";

import { useState } from 'react'
import { ArrowLeft, Car, X, Copy, Edit, Check, Bell, UserPlus, MapPin, DollarSign, Route } from 'lucide-react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import StatusBadge from '@/components/ui/StatusBadge'
import ProgressBar from '@/components/ui/ProgressBar'
import RideMap from './RideMap'

export default function RideDetailContent({ rideId }) {
  const [isLoading, setIsLoading] = useState(false)

  // Mock data - replace with actual API call
  const getRideData = (id) => {
    if (id === "1") {
      // Completed ride
      return {
        id: id,
        status: "Completed",
        eta: "7:35 AM",
        driver: {
          name: "Yonathan Mekonnen",
          vehicle: "Chrysler Pacifica"
        },
        route: {
          id: "RT-30842",
          district: "86022-Z",
          duration: "45 minutes",
          distance: "11.2 mi"
        },
        passengers: {
          students: 3,
          stops: 4
        },
        pickup: {
          address: "5325 Buford Hwy NE, Doraville, GA",
          scheduledTime: "7:00 AM",
          actualTime: "6:45 AM",
          status: "Complete"
        },
        dropoff: {
          address: "Cross Keys High School",
          scheduledTime: "7:40 AM",
          actualTime: "7:35 AM",
          status: "Complete"
        },
        payment: {
          driverPayment: "$75.00",
          districtCharge: "$120.00"
        }
      }
    } else if (id === "2") {
      // Upcoming ride
      return {
        id: id,
        status: "Scheduled",
        eta: "8:15 AM",
        driver: {
          name: "Yonathan Mekonnen",
          vehicle: "Chrysler Pacifica"
        },
        route: {
          id: "RT-30843",
          district: "86022-Z",
          duration: "35 minutes",
          distance: "8.5 mi"
        },
        passengers: {
          students: 5,
          stops: 3
        },
        pickup: {
          address: "1234 Peachtree St, Atlanta, GA",
          scheduledTime: "7:45 AM",
          actualTime: "Not started",
          status: "Pending"
        },
        dropoff: {
          address: "North Atlanta High School",
          scheduledTime: "8:20 AM",
          actualTime: "Not started",
          status: "Pending"
        },
        payment: {
          driverPayment: "$65.00",
          districtCharge: "$110.00"
        }
      }
    } else {
      // Default ride data
      return {
        id: id,
        status: "In-progress",
        eta: "7:35 AM",
        driver: {
          name: "Yonathan Mekonnen",
          vehicle: "Chrysler Pacifica"
        },
        route: {
          id: "RT-30842",
          district: "86022-Z",
          duration: "45 minutes",
          distance: "11.2 mi"
        },
        passengers: {
          students: 3,
          stops: 4
        },
        pickup: {
          address: "5325 Buford Hwy NE, Doraville, GA",
          scheduledTime: "7:00 AM",
          actualTime: "6:45 AM",
          status: "Complete"
        },
        dropoff: {
          address: "Cross Keys High School",
          scheduledTime: "7:40 AM",
          actualTime: "Not arrived yet",
          status: "Pending"
        },
        payment: {
          driverPayment: "$75.00",
          districtCharge: "$120.00"
        }
      }
    }
  }

  const rideData = getRideData(rideId)

  const handleCancelRide = () => {
    // Handle cancel ride logic
    console.log('Cancel ride')
  }

  const handleDuplicateRide = () => {
    // Handle duplicate ride logic
    console.log('Duplicate ride')
  }

  const handleEditRide = () => {
    // Handle edit ride logic
    console.log('Edit ride')
  }

  const handleForceComplete = () => {
    // Handle force complete logic
    console.log('Force complete')
  }

  const handleSendNotification = () => {
    // Handle send notification logic
    console.log('Send notification')
  }

  const handleAssignDriver = () => {
    // Handle assign driver logic
    console.log('Assign driver')
  }

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen p-6">
      {/* Back Navigation */}
      <div className="mb-4">
        <Button
          variant="ghost"
          size="sm"
          className="flex items-center space-x-2 text-blue-600 hover:text-blue-700"
          onClick={() => window.history.back()}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </Button>
      </div>

      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Car className="w-6 h-6 text-[var(--blue-600)]" />
          <h1 className="text-2xl font-bold text-[var(--blue-600)]">Ride Details #{rideData.id}</h1>
        </div>

        <div className="flex items-center space-x-3">
          <StatusBadge status={rideData.status} />
          <span className="text-sm font-medium text-gray-700">ETA: {rideData.eta}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-between mb-6">
        {/* Left Group - 4 buttons */}
        <div className="flex items-center space-x-3">
          <Button
            variant="danger"
            size="sm"
            onClick={handleCancelRide}
            className="flex items-center space-x-2  border border-gray-300 hover:bg-gray-50 text-white"
          >
            <X className="w-4 h-4" />
            <span>Cancel Ride</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDuplicateRide}
            className="flex items-center space-x-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-900"
          >
            <Copy className="w-4 h-4" />
            <span>Duplicate</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleEditRide}
            className="flex items-center space-x-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-900"
          >
            <Edit className="w-4 h-4" />
            <span>Edit</span>
          </Button>
          <Button
            variant="success"
            size="sm"
            onClick={handleForceComplete}
            className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white"
          >
            <Check className="w-4 h-4" />
            <span>Force Complete</span>
          </Button>
        </div>

        {/* Right Group - 2 buttons */}
        <div className="flex flex-col space-y-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleSendNotification}
            className="flex items-center space-x-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-900"
          >
            <Bell className="w-4 h-4" />
            <span>Send Notification</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleAssignDriver}
            className="flex items-center space-x-2 bg-white border border-gray-300 hover:bg-gray-50 text-gray-900"
          >
            <UserPlus className="w-4 h-4" />
            <span>Assign Driver</span>
          </Button>
        </div>
      </div>

      {/* Ride & Driver Details */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <UserPlus className="w-5 h-5 text-[var(--blue-600)]" />
          <h2 className="text-lg font-semibold text-gray-900">Ride & Driver Details</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Driver Information */}
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-500">Driver Name</span>
              <p className="font-semibold text-gray-900">{rideData.driver.name}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Vehicle</span>
              <p className="font-semibold text-gray-900">{rideData.driver.vehicle}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Route ID</span>
              <p className="font-semibold text-blue-600 underline cursor-pointer">{rideData.route.id}</p>
            </div>
          </div>

          {/* Ride Information */}
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-500">Scheduled Date</span>
              <p className="font-semibold text-gray-900">04/02/2025</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">District</span>
              <p className="font-semibold text-gray-900">{rideData.route.district}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Total Duration</span>
              <p className="font-semibold text-blue-600 underline cursor-pointer">{rideData.route.duration}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Total Distance</span>
              <p className="font-semibold text-blue-600 underline cursor-pointer">{rideData.route.distance}</p>
            </div>
          </div>

          {/* Passengers */}
          <div className="space-y-3">
            <div>
              <span className="text-sm text-gray-500">Number of Students</span>
              <p className="font-semibold text-gray-900">{rideData.passengers.students}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Total Stops</span>
              <p className="font-semibold text-gray-900">{rideData.passengers.stops}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Ride Progress */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <Route className="w-5 h-5 text-[var(--blue-600)]" />
          <h2 className="text-lg font-semibold text-gray-900">Ride Progress</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <StatusBadge status={rideData.status} />
              <span className="text-sm text-gray-600">En Route to Dropoff</span>
            </div>
            <span className="text-sm font-medium text-gray-700">ETA: {rideData.eta}</span>
          </div>

          <ProgressBar progress={70} color="blue" className="h-2" />

          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>Pickup: {rideData.pickup.address}</span>
            <span>Dropoff: {rideData.dropoff.address}</span>
          </div>
        </div>
      </Card>

      {/* Live Tracking Map */}
      <RideMap
        pickup={rideData.pickup}
        dropoff={rideData.dropoff}
        status={rideData.status}
      />

      {/* Pickup Information */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <MapPin className="w-5 h-5 text-[var(--green-600)]" />
          <h2 className="text-lg font-semibold text-gray-900">Pickup Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <span className="text-sm text-gray-500">Pickup Address</span>
            <p className="font-semibold text-gray-900">{rideData.pickup.address}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Scheduled Time</span>
            <p className="font-semibold text-gray-900">{rideData.pickup.scheduledTime}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Actual Time</span>
            <p className="font-semibold text-gray-900">{rideData.pickup.actualTime}</p>
          </div>
          <div className="flex items-end">
            <StatusBadge status={rideData.pickup.status} />
          </div>
        </div>
      </Card>

      {/* Dropoff Information */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <MapPin className="w-5 h-5 text-[var(--red-600)]" />
          <h2 className="text-lg font-semibold text-gray-900">Dropoff Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <span className="text-sm text-gray-500">Dropoff Address</span>
            <p className="font-semibold text-gray-900">{rideData.dropoff.address}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Scheduled Time</span>
            <p className="font-semibold text-gray-900">{rideData.dropoff.scheduledTime}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">Actual Time</span>
            <p className="font-semibold text-gray-900">{rideData.dropoff.actualTime}</p>
          </div>
          <div className="flex items-end">
            <StatusBadge status={rideData.dropoff.status} />
          </div>
        </div>
      </Card>

      {/* Payment Information */}
      <Card className="p-6">
        <div className="flex items-center space-x-2 mb-4">
          <DollarSign className="w-5 h-5 text-[var(--green-600)]" />
          <h2 className="text-lg font-semibold text-gray-900">Payment Information</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <span className="text-sm text-gray-500">Driver Payment</span>
            <p className="font-semibold text-gray-900">{rideData.payment.driverPayment}</p>
          </div>
          <div>
            <span className="text-sm text-gray-500">District Charge</span>
            <p className="font-semibold text-gray-900">{rideData.payment.districtCharge}</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
