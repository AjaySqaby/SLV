"use client";

import { useState, useEffect } from "react";
import { Shield, Eye, Settings } from "lucide-react";
import Toggle from "../ui/Toggle";

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

// Convert flat array format to permissions object
const parsePermissions = (permissionsArray) => {
  const permissionsObj = {};
  DASHBOARD_PERMISSIONS.forEach((perm) => {
    permissionsObj[perm.id] = {
      view: permissionsArray.includes(`${perm.id}:view`) || permissionsArray.includes(perm.id),
      manage: permissionsArray.includes(`${perm.id}:manage`)
    };
  });
  return permissionsObj;
};

// Convert permissions object to flat array format
const serializePermissions = (permissionsObj) => {
  const permissionsArray = [];
  Object.keys(permissionsObj).forEach((permId) => {
    if (permissionsObj[permId].view) {
      permissionsArray.push(`${permId}:view`);
    }
    if (permissionsObj[permId].manage) {
      permissionsArray.push(`${permId}:manage`);
    }
  });
  return permissionsArray;
};

export default function PermissionsSelector({ selectedPermissions = [], onChange }) {
  // Parse selectedPermissions (flat array) into object structure
  const [permissions, setPermissions] = useState(() => parsePermissions(selectedPermissions));

  // Update internal state when selectedPermissions prop changes
  useEffect(() => {
    setPermissions(parsePermissions(selectedPermissions));
  }, [selectedPermissions]);

  const handleToggleView = (permissionId, newValue) => {
    const newPermissions = {
      ...permissions,
      [permissionId]: {
        ...permissions[permissionId],
        view: newValue
      }
    };
    
    // If disabling view, also disable manage
    if (!newValue) {
      newPermissions[permissionId].manage = false;
    }
    
    setPermissions(newPermissions);
    if (onChange) {
      onChange(serializePermissions(newPermissions));
    }
  };

  const handleToggleManage = (permissionId, newValue) => {
    const newPermissions = {
      ...permissions,
      [permissionId]: {
        ...permissions[permissionId],
        manage: newValue
      }
    };
    
    // If enabling manage, also enable view
    if (newValue) {
      newPermissions[permissionId].view = true;
    }
    
    setPermissions(newPermissions);
    if (onChange) {
      onChange(serializePermissions(newPermissions));
    }
  };

  const handleSelectAll = () => {
    const allPermissions = {};
    DASHBOARD_PERMISSIONS.forEach((perm) => {
      allPermissions[perm.id] = { view: true, manage: true };
    });
    setPermissions(allPermissions);
    if (onChange) {
      onChange(serializePermissions(allPermissions));
    }
  };

  const handleDeselectAll = () => {
    const emptyPermissions = {};
    DASHBOARD_PERMISSIONS.forEach((perm) => {
      emptyPermissions[perm.id] = { view: false, manage: false };
    });
    setPermissions(emptyPermissions);
    if (onChange) {
      onChange([]);
    }
  };

  const totalSelected = Object.values(permissions).reduce((sum, perm) => {
    return sum + (perm.view ? 1 : 0) + (perm.manage ? 1 : 0);
  }, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
       
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {DASHBOARD_PERMISSIONS.map((permission) => {
          const perm = permissions[permission.id] || { view: false, manage: false };
          return (
            <div
              key={permission.id}
              className="p-4 rounded-lg border-2 border-[var(--gray-200)] bg-white hover:border-[var(--purple-300)] transition-all duration-200"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-1">
                  <div className="font-medium text-sm text-[var(--primary-black)]">
                    {permission.label}
                  </div>
                  <div className="text-xs text-[var(--muted-text)] mt-1">
                    {permission.description}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3 pt-3 border-t border-[var(--gray-100)]">
                {/* View Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Eye className="w-4 h-4 text-[var(--gray-500)]" />
                    <span className="text-sm font-medium text-[var(--gray-700)]">View</span>
                  </div>
                  <Toggle
                    checked={perm.view}
                    onChange={(value) => handleToggleView(permission.id, value)}
                  />
                </div>
                
                {/* Manage Toggle */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Settings className="w-4 h-4 text-[var(--gray-500)]" />
                    <span className="text-sm font-medium text-[var(--gray-700)]">Manage</span>
                  </div>
                  <Toggle
                    checked={perm.manage}
                    onChange={(value) => handleToggleManage(permission.id, value)}
                    disabled={!perm.view}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {totalSelected > 0 && (
        <div className="mt-4 p-3 bg-[var(--blue-50)] rounded-lg border border-[var(--blue-200)]">
          <p className="text-sm text-[var(--blue-700)]">
            <strong>{totalSelected}</strong> permission{totalSelected !== 1 ? "s" : ""} selected
          </p>
        </div>
      )}
    </div>
  );
}

