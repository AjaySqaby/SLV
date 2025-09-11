import Tabs from "../ui/Tabs";
import React from "react";
import Button from "@/components/ui/Button";

// Top row tabs (0-6)
const topRowTabs = [
  { id: 0, label: "All Rides", color: "bg-cyan" },
  { id: 1, label: "Upcoming", color: "bg-blue" },
  { id: 2, label: "Completed", color: "bg-green" },
  { id: 3, label: "Assigned", color: "bg-purple" },
  { id: 4, label: "Unassigned", color: "bg-amber" },
  { id: 5, label: "Accepted", color: "bg-teal" },
  { id: 6, label: "Unaccepted", color: "bg-orange" },
];

// Bottom row tabs (7-13)
const bottomRowTabs = [
  { id: 7, label: "Not Started", color: "bg-gray" },
  { id: 8, label: "Started", color: "bg-green" },
  { id: 9, label: "Substitute Needed", color: "bg-yellow" },
  { id: 10, label: "In Progress", color: "bg-indigo" },
  { id: 11, label: "Late", color: "bg-red" },
  { id: 12, label: "Rejected", color: "bg-red" },
  { id: 13, label: "Cancelled", color: "bg-red" },
];

const tabList = [...topRowTabs, ...bottomRowTabs];

const getTabCount = (idx, counts) => {
  let count;
  switch (idx) {
    case 0:
      count = counts.all;
      break;
    case 1:
      count = counts.upcoming;
      break;
    case 2:
      count = counts.completed;
      break;
    case 3:
      count = counts.assigned;
      break;
    case 4:
      count = counts.unassigned;
      break;
    case 5:
      count = counts.accepted;
      break;
    case 6:
      count = counts.unaccepted;
      break;
    case 7:
      count = counts.notStarted;
      break;
    case 8:
      count = counts.started;
      break;
    case 9:
      count = counts.substituteNeeded;
      break;
    case 10:
      count = counts.inProgress;
      break;
    case 11:
      count = counts.late;
      break;
    case 12:
      count = counts.rejected;
      break;
    case 13:
      count = counts.cancelled;
      break;
    default:
      count = 0;
  }
  
  return count !== undefined && count !== null ? count : 0;
};

export default function RidesTabs({ activeTab, onTabChange, tabCounts }) {
  const renderTabButton = (tab, idx) => (
    <Button
      key={tab.id}
      onClick={() => onTabChange(idx)}
      className={`flex items-center justify-center px-3 py-2 !rounded-full text-sm font-semibold cursor-pointer border transition-all duration-150 gap-2 w-[13rem] min-w-[13rem]
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
        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold min-w-[24px] ${
          activeTab === idx
            ? `bg-white text-black`
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
        {bottomRowTabs.map((tab, idx) => renderTabButton(tab, idx + 7))}
      </div>
    </div>
  );
}
