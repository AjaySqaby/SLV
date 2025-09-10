import Tabs from "../ui/Tabs";
import React from "react";
import Button from "@/components/ui/Button";

// Top row tabs (0-5)
const topRowTabs = [
  { id: 0, label: "All Rides", color: "bg-cyan" },
  { id: 1, label: "Upcoming", color: "bg-blue" },
  { id: 2, label: "Completed", color: "bg-green" },
  { id: 3, label: "Assigned", color: "bg-purple" },
  { id: 4, label: "Accepted", color: "bg-teal" },
  { id: 5, label: "In Progress", color: "bg-indigo" },
];

// Bottom row tabs (6-12)
const bottomRowTabs = [
  { id: 6, label: "Unassigned", color: "bg-amber" },
  { id: 7, label: "Unaccepted", color: "bg-orange" },
  { id: 8, label: "Not Started", color: "bg-gray" },
  { id: 9, label: "Substitute Needed", color: "bg-yellow" },
  { id: 10, label: "Late", color: "bg-red" },
  { id: 11, label: "Rejected", color: "bg-red" },
  { id: 12, label: "Cancelled", color: "bg-red" },
];

const tabList = [...topRowTabs, ...bottomRowTabs];

const getTabCount = (idx, counts) => {
  switch (idx) {
    case 0:
      return counts.all;
    case 1:
      return counts.upcoming;
    case 2:
      return counts.completed;
    case 3:
      return counts.assigned;
    case 4:
      return counts.accepted;
    case 5:
      return counts.inProgress;
    case 6:
      return counts.unassigned;
    case 7:
      return counts.unaccepted;
    case 8:
      return counts.notStarted;
    case 9:
      return counts.substituteNeeded;
    case 10:
      return counts.late;
    case 11:
      return counts.rejected;
    case 12:
      return counts.cancelled;
    default:
      return 0;
  }
};

export default function RidesTabs({ activeTab, onTabChange, tabCounts }) {
  const renderTabButton = (tab, idx) => (
    <Button
      key={tab.id}
      onClick={() => onTabChange(idx)}
      className={`flex items-center justify-center px-3 py-3 !rounded-full font-semibold cursor-pointer border transition-all duration-150 gap-2 w-48 min-w-48
        ${
          activeTab === idx
            ? `${tab.color} text-white border-transparent`
            : `bg-white text-black border-card-border`
        }
      `}
      variant={activeTab === idx ? "primary" : "secondary"}
    >
      <span className="truncate">{tab.label}</span>
      <span
        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-black ${
          activeTab === idx
            ? `bg-white text-${tab.color.replace("bg-", "")}`
            : `${tab.color} text-white`
        }`}
      >
        {getTabCount(idx, tabCounts)}
      </span>
    </Button>
  );

  return (
    <div className="space-y-4">
      {/* Top Row */}
      <div className="flex flex-wrap gap-4">
        {topRowTabs.map((tab, idx) => renderTabButton(tab, idx))}
      </div>
      
      {/* Bottom Row */}
      <div className="flex flex-wrap gap-4">
        {bottomRowTabs.map((tab, idx) => renderTabButton(tab, idx + 6))}
      </div>
    </div>
  );
}
