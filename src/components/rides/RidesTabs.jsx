import Tabs from "../ui/Tabs";
import React from "react";
import Button from "@/components/ui/Button";

const tabList = [
  { id: 0, label: "All Rides", color: "bg-cyan" },
  { id: 1, label: "Upcoming", color: "bg-blue" },
  { id: 2, label: "Unassigned", color: "bg-amber" },
  { id: 3, label: "Completed", color: "bg-green" },
  { id: 4, label: "Canceled", color: "bg-red" },
  { id: 5, label: "Rejected", color: "bg-orange" },
  { id: 6, label: "Assigned", color: "bg-purple" },
  { id: 7, label: "In Progress", color: "bg-blue" },
];

const getTabCount = (idx, counts) => {
  switch (idx) {
    case 0:
      return counts.all;
    case 1:
      return counts.upcoming;
    case 2:
      return counts.unassigned;
    case 3:
      return counts.completed;
    case 4:
      return counts.canceled;
    case 5:
      return counts.rejected;
    case 6:
      return counts.assigned;
    case 7:
      return counts.inProgress;
    default:
      return 0;
  }
};

export default function RidesTabs({ activeTab, onTabChange, tabCounts }) {
  return (
    <div className="flex whitespace-nowrap gap-4">
      {tabList.map((tab, idx) => (
        <Button
          key={tab.id}
          onClick={() => onTabChange(idx)}
          className={`flex items-center px-6 py-3 !rounded-full font-semibold cursor-pointer border transition-all duration-150 gap-2
            ${
              activeTab === idx
                ? `${tab.color} text-white border-transparent`
                : `bg-white text-black border-card-border`
            }
          `}
          variant={activeTab === idx ? "primary" : "secondary"}
        >
          <span>{tab.label}</span>
          <span
            className={`ml-2 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-black ${
              activeTab === idx
                ? `bg-white text-${tab.color.replace("bg-", "")}`
                : `${tab.color} text-white`
            }`}
          >
            {getTabCount(idx, tabCounts)}
          </span>
        </Button>
      ))}
    </div>
  );
}
