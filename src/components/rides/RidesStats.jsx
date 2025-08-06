import React from "react";

function StatIconWithBadge({ icon, count, iconBg, iconColor, badgeBg }) {
  return (
    <div
      className={`relative flex items-center justify-center w-12 h-12 rounded-full ${iconBg}`}
    >
      <span className={`text-2xl ${iconColor}`}>{icon}</span>
      <span
        className={`absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold text-white ${badgeBg} shadow`}
      >
        {count}
      </span>
    </div>
  );
}

export default function RidesStats({ stats }) {
  return (
    <div className="grid grid-cols-5 gap-4 mb-6">
      <div className=" p-4 rounded-lg shadow-sm flex flex-col items-center">
        <StatIconWithBadge
          icon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M22 12H18L15 21L9 3L6 12H2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          count={stats.total}
          iconBg="bg-[var(--cyan-light)]"
          iconColor="text-[var(--cyan)]"
          badgeBg="bg-cyan"
        />
        <div className="text-gray-700 text-sm mt-2">Total Rides</div>
        <div className="text-2xl font-bold text-black">{stats.total}</div>
      </div>
      <div className="bg-[var(--background)] p-4 rounded-lg shadow-sm flex flex-col items-center">
        <StatIconWithBadge
          icon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M8 12L11 15L16 9"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          }
          count={stats.completed}
          iconBg="bg-[var(--green-light)]"
          iconColor="text-[var(--green)]"
          badgeBg="bg-[var(--green)]"
        />
        <div className="text-gray-700 text-sm mt-2">Completed</div>
        <div className="text-2xl font-bold text-black">{stats.completed}</div>
      </div>
      <div className="bg-[var(--background)] p-4 rounded-lg shadow-sm flex flex-col items-center">
        <StatIconWithBadge
          icon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M12 8V12M12 12H16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          }
          count={stats.inProgress}
          iconBg="bg-[var(--blue-light)]"
          iconColor="text-[var(--blue)]"
          badgeBg="bg-[var(--blue)]"
        />
        <div className="text-gray-700 text-sm mt-2">In Progress</div>
        <div className="text-2xl font-bold text-black">{stats.inProgress}</div>
      </div>
      <div className="bg-[var(--background)] p-4 rounded-lg shadow-sm flex flex-col items-center">
        <StatIconWithBadge
          icon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M15 9L9 15M9 9L15 15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          }
          count={stats.canceled}
          iconBg="bg-[var(--red-light)]"
          iconColor="text-[var(--red)]"
          badgeBg="bg-[var(--red)]"
        />
        <div className="text-gray-700 text-sm mt-2">Canceled</div>
        <div className="text-2xl font-bold text-black">{stats.canceled}</div>
      </div>
      <div className="bg-[var(--background)] p-4 rounded-lg shadow-sm flex flex-col items-center">
        <StatIconWithBadge
          icon={
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M8 12H16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          }
          count={stats.rejected}
          iconBg="bg-[var(--pink-light)]"
          iconColor="text-[var(--pink)]"
          badgeBg="bg-[var(--pink)]"
        />
        <div className="text-gray-700 text-sm mt-2">Rejected</div>
        <div className="text-2xl font-bold text-black">{stats.rejected}</div>
      </div>
    </div>
  );
}
