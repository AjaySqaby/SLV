"use client";
import { RiRouteLine, RiTimeLine, RiToolsLine, RiUserAddLine, RiUserUnfollowLine } from "react-icons/ri";

export default function DriverTabs({ tabs, activeTab, onTabChange }) {
  const getTabIcon = (tabId) => {
    switch (tabId) {
      case "upcoming-rides":
        return <RiTimeLine className="w-4 h-4" />;
      case "completed-rides":
        return <RiRouteLine className="w-4 h-4" />;
      case "assigned-routes":
        return <RiRouteLine className="w-4 h-4" />;
      case "maintenance":
        return <RiToolsLine className="w-4 h-4" />;
      case "onboarding":
        return <RiUserAddLine className="w-4 h-4" />;
      case "blocked-students":
        return <RiUserUnfollowLine className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <nav className="flex justify-between px-6 pt-6">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`
            px-6 py-3 text-sm font-medium border-b-2 transition-all duration-200 flex items-center gap-2 flex-1 justify-center
            ${
              activeTab === tab.id
                ? "border-blue-500 text-blue-600 bg-blue-50 rounded-t-lg"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50"
            }
          `}
        >
          {getTabIcon(tab.id)}
          <span>{tab.label}</span>
          {tab.count !== null && tab.count !== undefined && (
            <span className="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </nav>
  );
}
