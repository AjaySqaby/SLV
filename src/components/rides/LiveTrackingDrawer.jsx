"use client"

import { useState } from "react"
import { X, Maximize2, Clock, Battery, ArrowRight } from "lucide-react"
import Button from '@/components/ui/Button'
import RideMap from './RideMap'

export default function LiveTrackingDrawer({ isOpen, onClose, rideId = "1001" }) {
  const [activeTab, setActiveTab] = useState("Live Tracking")

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 bg-[var(--on-primary)] shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-y-0" : "translate-y-full"
      }`}
      style={{ height: "calc(100vh - 64px)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[var(--gray-200)] px-4 py-3">
        <div className="flex items-center">
          <h2 className="text-lg font-medium">Live Tracking - Ride #{rideId}</h2>
          <button
            onClick={onClose}
            className="ml-4 text-[var(--gray-500)] hover:text-[var(--gray-700)] focus:outline-none"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[var(--gray-200)]">
        <button
          className={`px-6 py-3 text-sm font-medium ${
            activeTab === "Route Insight"
              ? "text-[var(--blue-600)] border-b-2 border-[var(--blue-600)]"
              : "text-[var(--gray-500)] hover:text-[var(--gray-700)]"
          }`}
          onClick={() => setActiveTab("Route Insight")}
        >
          Route Insight
        </button>
        <button
          className={`px-6 py-3 text-sm font-medium ${
            activeTab === "Live Tracking"
              ? "text-[var(--blue-600)] border-b-2 border-[var(--blue-600)]"
              : "text-[var(--gray-500)] hover:text-[var(--gray-700)]"
          }`}
          onClick={() => setActiveTab("Live Tracking")}
        >
          Live Tracking
        </button>
      </div>

      {/* Content */}
      <div className="flex h-full">
        {/* Map */}
        <div className="flex-1 relative">
          <div className="absolute inset-0">
            <RideMap embed />
          </div>
          <div className="absolute top-4 right-4 z-10">
            <Button className="bg-[var(--background)] p-2 rounded-md shadow-md" variant="ghost">
              <Maximize2 size={20} />
            </Button>
          </div>
        </div>

        {/* Details Sidebar */}
        <div className="w-80 border-l border-[var(--gray-200)] overflow-y-auto">
          <div className="p-4">
            <h3 className="text-lg font-medium mb-4">Live Tracking Details</h3>

            <div className="space-y-6">
              {/* Time and ETA */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-[var(--gray-500)]">Current Time</p>
                  <p className="font-medium">02:06 PM</p>
                </div>
                <div>
                  <p className="text-sm text-[var(--gray-500)]">ETA</p>
                  <p className="font-medium">-</p>
                </div>
              </div>

              {/* Distance */}
              <div>
                <p className="text-sm text-[var(--gray-500)]">Distance</p>
                <p className="font-medium">13.7 / 25.5 miles</p>
                <div className="w-full bg-[var(--gray-200)] rounded-full h-2 mt-1">
                  <div className="bg-[var(--blue)] h-2 rounded-full" style={{ width: "54%" }}></div>
                </div>
              </div>

              {/* Speed and Battery */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="mr-2 mt-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-muted"
                    >
                      <path d="m8 14-6 6h9v-3"></path>
                      <path d="M18.37 3.63 8 14l3 3L21.37 6.63a2.12 2.12 0 1 0-3-3Z"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-[var(--gray-500)]">Current Speed</p>
                    <p className="font-medium">22 mph</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-2 mt-1">
                    <Battery size={16} className="text-muted" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--gray-500)]">Battery Level</p>
                    <p className="font-medium">98%</p>
                  </div>
                </div>
              </div>

              {/* Time Remaining and Direction */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="mr-2 mt-1">
                    <Clock size={16} className="text-muted" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--gray-500)]">Time Remaining</p>
                    <p className="font-medium">5 min minutes</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mr-2 mt-1">
                    <ArrowRight size={16} className="text-muted" />
                  </div>
                  <div>
                    <p className="text-sm text-[var(--gray-500)]">Direction</p>
                    <p className="font-medium">Moving Forward</p>
                  </div>
                </div>
              </div>

              {/* Recent Events */}
              <div>
                <h4 className="font-medium mb-2">Recent Events:</h4>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[var(--green)] mr-2"></div>
                    <p className="text-sm">Normal Driving</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[var(--blue)] mr-2"></div>
                    <p className="text-sm">Phone Usage: 1 occurrence</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[var(--red)] mr-2"></div>
                    <p className="text-sm">Speeding: 1 occurrence</p>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-[var(--amber-500)] mr-2"></div>
                    <p className="text-sm">Hard Braking: 1 occurrence</p>
                  </div>
                </div>
              </div>

              <div className="text-xs text-[var(--gray-500)] text-center">Click on vehicle for quick details</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-[var(--gray-200)] p-3 bg-[var(--gray-50)]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-1 bg-[var(--blue)] mr-1"></div>
              <span className="text-xs text-[var(--gray-600)]">Route</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full border border-[var(--gray-400)] mr-1"></div>
              <span className="text-xs text-[var(--gray-600)]">Vehicle (with direction)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-[var(--red)] mr-1"></div>
              <span className="text-xs text-[var(--gray-600)]">Speeding Event</span>
            </div>
          </div>
          <div className="text-xs text-[var(--gray-500)]">
            <span>Live Tracking</span>
            <div>Now tracking ride #{rideId}</div>
          </div>
        </div>
      </div>
    </div>
  )
} 