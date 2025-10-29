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
    <div className="flex mt-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className="px-6 py-3 font-medium cursor-pointer transition-all duration-200 hover:opacity-90 rounded-lg"
          style={{
            backgroundColor: activeTab === tab.id ? 'var(--primary)' : 'var(--gray-100)',
            color: activeTab === tab.id ? 'var(--on-primary)' : 'var(--muted-text)',
            borderBottom: activeTab === tab.id ? '2px solid var(--primary)' : 'none',
            marginRight: '4px',
            fontSize: '14px'
          }}
        >
          <div className="flex items-center gap-2">
            {getTabIcon(tab.id)}
            <span>{tab.label}</span>
            {tab.count !== null && tab.count !== undefined && (
              <span className="text-xs bg-[var(--gray-200)] text-[var(--gray-700)] px-2 py-0.5 rounded-full">
                {tab.count}
              </span>
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
