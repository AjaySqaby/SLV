"use client";

import { useState } from "react";
import { X } from "lucide-react";
import BaseModal from "@/components/common/BaseModal";
import DriverDetailContent from "./DriverDetailContent";

export default function DriverDetailModal({ isOpen, onClose, driverId }) {
  if (!isOpen || !driverId) return null;

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      title="Driver Details" 
      size="xl" 
      widthClass="w-[95vw] h-[90vh] max-w-7xl mx-4 overflow-hidden"
    >
      <div className="max-h-[calc(90vh-200px)] overflow-y-auto">
        <DriverDetailContent driverId={driverId} />
      </div>
    </BaseModal>
  );
}
