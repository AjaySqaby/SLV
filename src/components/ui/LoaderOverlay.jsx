"use client";

import { createPortal } from "react-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useEffect, useState } from "react";

export default function LoaderOverlay({ show, label = "Loading..." }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!show || !mounted) return null;

  const content = (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40"
      role="alert"
      aria-busy="true"
      aria-live="assertive"
    >
      <div className="flex flex-col items-center gap-4 bg-white rounded-xl px-6 py-5 shadow-xl border border-[var(--gray-200)]">
        <ClipLoader size={34} color="#7c3aed" speedMultiplier={0.9} />
        <span className="text-sm font-medium text-[var(--heading)]">{label}</span>
      </div>
    </div>
  );
  return createPortal(content, document.body);
}


