"use client";

import { useState } from "react";
import { RiArrowLeftLine } from "react-icons/ri";
import BaseModal from "@/components/common/BaseModal";
import DriverDetailContent from "./DriverDetailContent";

export default function DriverDetailModal({ isOpen, onClose, driverId, onBack }) {
  if (!isOpen || !driverId) return null;

  return (
    <BaseModal 
      isOpen={isOpen} 
      onClose={onClose} 
      onBack={onBack}
      title="Driver Details" 
      size="xl" 
      widthClass="w-[95vw] h-[calc(100vh-3rem)] max-h-[calc(100vh-3rem)] max-w-7xl mx-4 overflow-hidden"
    >
      <div className="max-h-[calc(100vh-3rem-200px)] overflow-y-auto">
        <DriverDetailContent driverId={driverId} />
      </div>
    </BaseModal>
  );
}
