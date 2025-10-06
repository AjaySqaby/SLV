"use client";

import DualTimeDisplay from "@/components/ui/DualTimeDisplay";

export default function InProgressTooltipContent({
  nextStop,
  scheduledTime,
  estimatedTime,
  rideTimezone,
  stops = [],
  stopsCount,
}) {
  const hasStopsList = Array.isArray(stops) && stops.length > 0;
  const shownStops = hasStopsList ? stops.slice(0, 5) : [];

  const getFallbackEstimated = () => {
    if (!scheduledTime) return null;
    // Very simple fallback: append "+10 min" indicator rather than parsing
    return `${scheduledTime} (+10m)`;
  };

  const getNextStopDisplay = () => {
    const str = typeof nextStop === 'string' ? nextStop : (nextStop?.address || nextStop?.name);
    if (str && String(str).trim()) return String(str);
    if (hasStopsList) {
      const s = stops[0];
      const label = s?.address || s?.name || (typeof s === 'string' ? s : '');
      if (label && String(label).trim()) return String(label);
    }
    return 'To be announced';
  };

  return (
    <div className="text-[11px] leading-4">
      <div className="mb-2">
        <div className="text-gray-600">Next stop:</div>
        <div className="text-[var(--primary-black)] whitespace-normal break-words">
          {getNextStopDisplay()}
        </div>
      </div>
      <div className="mb-2">
        <div>
          <span className="text-gray-600">Scheduled:</span>
          <span className="ml-1 text-[var(--primary-black)]">
            {scheduledTime ? (
              <DualTimeDisplay rideTime={scheduledTime} rideTimezone={rideTimezone} showLabels={false} />
            ) : (
              "--:--"
            )}
          </span>
        </div>
        <div className="mt-1">
          <span className="text-gray-600">Estimated:</span>
          <span className="ml-1 text-[var(--primary-black)]">
            {estimatedTime ? (
              <DualTimeDisplay rideTime={estimatedTime} rideTimezone={rideTimezone} showLabels={false} />
            ) : (
              getFallbackEstimated() || "N/A"
            )}
          </span>
        </div>
      </div>
      {hasStopsList ? (
        <div>
          <div className="text-gray-600 mb-1">Stops:</div>
          <ul className="list-disc pl-4 space-y-1 max-h-40 overflow-auto">
            {shownStops.map((s, i) => (
              <li key={i} className="text-[var(--primary-black)] whitespace-normal break-words">
                {typeof s === "string" ? s : s?.address || "--"}
              </li>
            ))}
          </ul>
          {stops.length > shownStops.length && (
            <div className="text-gray-500 mt-1">+{stops.length - shownStops.length} more</div>
          )}
        </div>
      ) : (
        (typeof stopsCount === "number" || typeof stopsCount === "string") && (
          <div className="text-gray-600">Stops: <span className="text-[var(--primary-black)]">{stopsCount}</span></div>
        )
      )}
    </div>
  );
}


