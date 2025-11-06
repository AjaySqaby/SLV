"use client";

import MaintenanceDetailContent from "./MaintenanceDetailContent";

export default function MaintenanceDetailModal({ isOpen, onClose, maintenanceId }) {
  if (!isOpen || !maintenanceId) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-start justify-center z-[10000] pt-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl !max-w-[82rem] mx-4 w-full max-h-[calc(100vh-3rem)] overflow-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <MaintenanceDetailContent maintenanceId={maintenanceId} onBack={onClose} />
      </div>
    </div>
  );
}


