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
      widthClass="w-full max-w-[1200px]"
    >
      <div className="max-h-[80vh] overflow-y-auto">
        <DriverDetailContent driverId={driverId} />
      </div>
    </BaseModal>
  );
}
