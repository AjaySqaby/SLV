"use client";

import { useState } from "react";
import BaseModal from "@/components/common/BaseModal";
import Button from "@/components/ui/Button";
import { Copy, Check } from "lucide-react";
import { formatDate } from "@/utils/common";

const formatHistoryText = (driver, data) => {
  let text = `Onboarding History for ${driver?.name || "Driver"}\n\n`;
  data.forEach((item) => {
    text += `${item.label} (${formatDate(item.start)} - ${formatDate(
      item.complete
    )})\n`;
    text += `Steps Completed: ${item.steps}\n\n`;
    item.stages.forEach((stage) => {
      text += `${stage.stage}: ${formatDate(stage.completed)}\n`;
      if (stage.notes) text += `Notes: ${stage.notes}\n`;
      text += "\n";
    });
    text += "---\n\n";
  });
  return text;
};

export default function OnboardingHistoryModal({
  isOpen,
  onClose,
  driver,
  historyData,
}) {
  const data = historyData || [
    {
      label: "Initial",
      start: "Jan 15, 2023",
      complete: "Feb 10, 2023",
      steps: 7,
      open: true,
      stages: [
        {
          stage: "Background Check",
          completed: "Jan 20, 2023",
          notes: "Passed with no issues",
        },
        {
          stage: "Fingerprinting",
          completed: "Jan 25, 2023",
          notes: "Completed at local police station",
        },
        {
          stage: "Document Collection",
          completed: "Jan 30, 2023",
          notes: "All documents verified",
        },
        {
          stage: "Medical Exam",
          completed: "Feb 5, 2023",
          notes: "Passed medical examination",
        },
        {
          stage: "Drug & Alcohol Test",
          completed: "Feb 5, 2023",
          notes: "Passed drug screening",
        },
        {
          stage: "Vehicle Inspection",
          completed: "Feb 8, 2023",
          notes: "Vehicle meets all requirements",
        },
        {
          stage: "Training & Assessments",
          completed: "Feb 10, 2023",
          notes: "Completed all training modules",
        },
      ],
    },
    {
      label: "Recertification",
      start: "Jan 20, 2024",
      complete: "Feb 15, 2024",
      steps: 3,
      open: false,
      stages: [
        {
          stage: "Background Check",
          completed: "Jan 25, 2024",
          notes: "Passed with no issues",
        },
        {
          stage: "Medical Exam",
          completed: "Feb 5, 2024",
          notes: "Passed medical examination",
        },
        {
          stage: "Training & Assessments",
          completed: "Feb 15, 2024",
          notes: "Completed all training modules",
        },
      ],
    },
  ];

  const [sections, setSections] = useState(data.map((d) => !!d.open));
  const [copied, setCopied] = useState(false);

  const handleCopyAll = async () => {
    const text = formatHistoryText(driver, data);
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title="Onboarding History"
      size="xl"
    >
      <div className="space-y-6">
        <div className="text-[var(--gray-500)] text-sm">
          Complete history for {driver?.name || "John Smith"} (ID: driver-1)
        </div>

        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-[var(--heading)]">
            Onboarding History
          </h3>
          <Button
            variant="secondary"
            onClick={handleCopyAll}
            className="flex items-center gap-2"
          >
            {copied ? (
              <>
                <Check size={16} />
                Copied!
              </>
            ) : (
              <>
                <Copy size={16} />
                Copy All
              </>
            )}
          </Button>
        </div>

        <div className="space-y-4">
          {data.map((item, index) => (
            <div
              key={index}
              className="border border-[var(--border)] rounded-lg overflow-hidden"
            >
              <div
                className={`p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 cursor-pointer ${
                  item.label === "Initial"
                    ? "bg-[var(--blue-50)]"
                    : "bg-[var(--purple-200)]"
                }`}
                onClick={() =>
                  setSections((prev) => {
                    const next = [...prev];
                    next[index] = !next[index];
                    return next;
                  })
                }
              >
                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      item.label === "Initial"
                        ? "bg-[var(--blue-600)] text-white"
                        : "bg-[var(--purple-600)] text-white"
                    }`}
                  >
                    {item.label}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-[var(--gray-600)]">
                    <svg
                      className="w-4 h-4 text-[var(--gray-400)]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                    Start: {formatDate(item.start)}
                  </span>
                  <span className="flex items-center gap-1 text-sm text-[var(--green-600)]">
                    <svg
                      className="w-4 h-4 text-[var(--green)]"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Complete: {formatDate(item.complete)}
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-[var(--gray-500)]">
                    {item.steps} steps
                  </span>
                  <svg
                    className={`w-5 h-5 transform transition-transform ${
                      sections[index] ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </div>

              {sections[index] && (
                <div className="bg-white">
                  <div className="grid grid-cols-3 gap-4 p-4 bg-[var(--gray-50)] border-b border-[var(--border)] text-sm font-medium text-[var(--gray-700)]">
                    <div>STAGE</div>
                    <div>COMPLETED</div>
                    <div>NOTES</div>
                  </div>

                  {item.stages.map((stage, stageIndex) => (
                    <div
                      key={stageIndex}
                      className="grid grid-cols-3 gap-4 p-4 border-b border-[var(--border)] last:border-b-0"
                    >
                      <div className="text-sm font-medium text-[var(--heading)]">
                        {stage.stage}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[var(--gray-600)]">
                        <svg
                          className="w-4 h-4 text-[var(--gray-400)]"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" />
                          <path d="M16 2v4M8 2v4M3 10h18" />
                        </svg>
                        {formatDate(stage.completed)}
                      </div>
                      <div className="text-sm text-[var(--gray-600)]">
                        {stage.notes}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </BaseModal>
  );
}
