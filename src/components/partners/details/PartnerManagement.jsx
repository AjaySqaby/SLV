"use client";

import { useState } from "react";
import { Search, Plus, Eye, Trash } from "lucide-react";
import DriversTable from "./DriversTable";

export default function PartnerManagement({ partner, onAddDriver }) {
  const [activeTab, setActiveTab] = useState("Drivers");

  return (
    <div className="bg-[var(--background)] rounded-lg shadow-sm border border-[var(--gray-100)] overflow-hidden">
      <div className="p-6 border-b border-[var(--gray-100)]">
        <h3 className="text-lg font-semibold">Partner Management</h3>
        <p className="text-sm text-[var(--gray-500)]">
          Manage drivers, routes and rides for this partner
        </p>
      </div>

      <div className="flex border-b border-[var(--gray-100)]">
        <button
          className={`px-6 py-3 text-sm font-medium ${
            activeTab === "Drivers"
              ? "border-b-2 border-[var(--blue)] text-[var(--blue-600)]"
              : "text-[var(--gray-500)] hover:text-[var(--gray-700)]"
          }`}
          onClick={() => setActiveTab("Drivers")}
        >
          Drivers
        </button>
        <button
          className={`px-6 py-3 text-sm font-medium ${
            activeTab === "Routes"
              ? "border-b-2 border-[var(--blue)] text-[var(--blue-600)]"
              : "text-[var(--gray-500)] hover:text-[var(--gray-700)]"
          }`}
          onClick={() => setActiveTab("Routes")}
        >
          Routes
        </button>
        <button
          className={`px-6 py-3 text-sm font-medium ${
            activeTab === "Rides"
              ? "border-b-2 border-[var(--blue)] text-[var(--blue-600)]"
              : "text-[var(--gray-500)] hover:text-[var(--gray-700)]"
          }`}
          onClick={() => setActiveTab("Rides")}
        >
          Rides
        </button>
      </div>

      <div className="p-4 flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search drivers..."
            className="pl-10 pr-4 py-2 border border-[var(--gray-300)] rounded-lg w-64"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-[var(--gray-400)]" />
        </div>

        <button
          className="flex items-center gap-2 px-4 py-2 bg-[var(--blue-600)] text-white rounded-md hover:bg-[var(--blue-dark)]"
          onClick={onAddDriver}
        >
          <Plus size={18} />
          Add Driver
        </button>
      </div>

      {activeTab === "Drivers" && <DriversTable drivers={partner.drivers} />}
      {activeTab === "Routes" && (
        <div className="p-6 text-center text-[var(--gray-500)]">
          <p>Routes information will be displayed here.</p>
        </div>
      )}
      {activeTab === "Rides" && (
        <div className="p-6 text-center text-[var(--gray-500)]">
          <p>Rides information will be displayed here.</p>
        </div>
      )}
    </div>
  );
}
