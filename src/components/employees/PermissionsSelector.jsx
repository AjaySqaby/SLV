"use client";

import { useState } from "react";
import { Shield, CheckSquare, Square } from "lucide-react";

const DASHBOARD_PERMISSIONS = [
  { id: "dashboard", label: "Dashboard", description: "View dashboard overview" },
  { id: "rides", label: "Rides", description: "View and manage rides" },
  { id: "eagle-eye", label: "Eagle Eye", description: "Real-time tracking dashboard" },
  { id: "routes", label: "Routes", description: "View and manage routes" },
  { id: "drivers", label: "Drivers", description: "View and manage drivers" },
  { id: "students", label: "Students", description: "View and manage students" },
  { id: "districts", label: "Districts", description: "View and manage districts" },
  { id: "campus", label: "Campus", description: "View and manage campuses" },
  { id: "partners", label: "Partners", description: "View and manage partners" },
  { id: "employees", label: "Employees", description: "View and manage employees" },
  { id: "reports", label: "Reports", description: "View reports and analytics" },
  { id: "notifications", label: "Notifications", description: "View notifications" },
  { id: "marketplace", label: "Marketplace", description: "Access marketplace" },
];

export default function PermissionsSelector({ selectedPermissions = [], onChange }) {
  const [permissions, setPermissions] = useState(selectedPermissions);

  const handleTogglePermission = (permissionId) => {
    const newPermissions = permissions.includes(permissionId)
      ? permissions.filter((id) => id !== permissionId)
      : [...permissions, permissionId];
    
    setPermissions(newPermissions);
    if (onChange) {
      onChange(newPermissions);
    }
  };

  const handleSelectAll = () => {
    const allPermissions = DASHBOARD_PERMISSIONS.map((p) => p.id);
    setPermissions(allPermissions);
    if (onChange) {
      onChange(allPermissions);
    }
  };

  const handleDeselectAll = () => {
    setPermissions([]);
    if (onChange) {
      onChange([]);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-[var(--purple-600)]" />
          <h3 className="font-semibold text-[var(--primary-black)]">Dashboard Permissions</h3>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleSelectAll}
            className="text-sm text-[var(--blue-600)] hover:underline"
          >
            Select All
          </button>
          <span className="text-[var(--gray-300)]">|</span>
          <button
            type="button"
            onClick={handleDeselectAll}
            className="text-sm text-[var(--gray-600)] hover:underline"
          >
            Deselect All
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
        {DASHBOARD_PERMISSIONS.map((permission) => {
          const isSelected = permissions.includes(permission.id);
          return (
            <div
              key={permission.id}
              onClick={() => handleTogglePermission(permission.id)}
              className={`
                p-4 rounded-lg border-2 cursor-pointer transition-all duration-200
                ${isSelected
                  ? "border-[var(--purple-600)] bg-[var(--purple-50)]"
                  : "border-[var(--gray-200)] bg-white hover:border-[var(--purple-300)] hover:bg-[var(--purple-50)]"
                }
              `}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">
                  {isSelected ? (
                    <CheckSquare className="w-5 h-5 text-[var(--purple-600)]" />
                  ) : (
                    <Square className="w-5 h-5 text-[var(--gray-400)]" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="font-medium text-sm text-[var(--primary-black)]">
                    {permission.label}
                  </div>
                  <div className="text-xs text-[var(--muted-text)] mt-1">
                    {permission.description}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {permissions.length > 0 && (
        <div className="mt-4 p-3 bg-[var(--blue-50)] rounded-lg border border-[var(--blue-200)]">
          <p className="text-sm text-[var(--blue-700)]">
            <strong>{permissions.length}</strong> permission{permissions.length !== 1 ? "s" : ""} selected
          </p>
        </div>
      )}
    </div>
  );
}

