export default function ProgressBar({
  progress,
  className = "",
  color = "blue",
  showPercentage = false,
}) {
  const getColorStyle = (color) => {
    switch (color) {
      case "green":
        return { backgroundColor: "#22c55e" };
      case "red":
        return { backgroundColor: "#ef4444" };
      case "blue":
        return { backgroundColor: "#2563eb" }; // blue-600
      default:
        return { backgroundColor: color };
    }
  };
  
  const progressWidth = typeof progress === 'number' ? `${progress}%` : progress;
  
  return (
    <div className={`w-full ${className}`}>
      <div className="flex-1 h-2 bg-gray-200 rounded-full">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ 
            width: progressWidth,
            ...getColorStyle(color)
          }}
        />
      </div>
      {showPercentage && (
        <div className="text-xs text-[var(--blue-600)] mt-1 text-right">
          {typeof progress === 'number' ? `${progress}%` : progress}
        </div>
      )}
    </div>
  );
}
