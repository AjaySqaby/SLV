"use client";

import {
  Pencil,
  Info,
  Trash,
  ChevronRight,
  LogIn,
  Check,
  X,
} from "lucide-react";

export default function PartnerRowActions({
  onEdit,
  onInfo,
  onDelete,
  onNavigate,
  onLogin,
  onToggleStatus,
  status,
}) {
  return (
    <div className="flex gap-2">
      <button
        className="p-1 text-[var(--gray-400)] hover:text-[var(--blue-600)]"
        onClick={onEdit}
        title="Edit"
      >
        <Pencil size={18} />
      </button>

      <button
        className={`p-1 ${
          status === "Active"
            ? "text-[var(--green-600)] hover:text-[var(--red-600)]"
            : "text-[var(--red-600)] hover:text-[var(--green-600)]"
        }`}
        onClick={onToggleStatus}
        title={status === "Active" ? "Mark Inactive" : "Mark Active"}
      >
        {status === "Active" ? <Check size={18} /> : <X size={18} />}
      </button>
      <button
        className="p-1 text-[var(--gray-400)] hover:text-[var(--red-600)]"
        onClick={onDelete}
        title="Delete"
      >
        <Trash size={18} />
      </button>
      <button
        className="p-1 rounded bg-[var(--primary-bg)] text-[var(--purple-600)] hover:bg-[var(--purple-200)] transition"
        onClick={onLogin}
        title="Login as Partner"
      >
        <LogIn size={18} />
      </button>
    </div>
  );
}
