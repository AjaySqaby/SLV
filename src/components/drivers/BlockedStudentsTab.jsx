"use client";
import { RiShieldUserLine, RiErrorWarningLine } from "react-icons/ri";

export default function BlockedStudentsTab({ driverId }) {
  // Error state as shown in the screenshot
  const hasError = true;

  return (
    <div>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Blocked Students
      </h3>
      
      <p className="text-sm text-gray-600 mb-6">Students who cannot be transported by this driver</p>

      {hasError ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
          <RiErrorWarningLine className="w-5 h-5 text-red-500 flex-shrink-0" />
          <span className="text-red-700 font-medium">Error loading blocked students</span>
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-lg">
          <RiShieldUserLine className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-lg font-medium">No blocked students found</p>
          <p className="text-sm">There are no blocked students for this driver.</p>
        </div>
      )}
    </div>
  );
}
