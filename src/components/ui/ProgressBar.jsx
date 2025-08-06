export default function ProgressBar({
  progress,
  className = "",
  color = "blue",
}) {
  const colorClass =
    color === "green"
      ? "bg-[var(--green)]"
      : color === "red"
      ? "bg-[var(--red)]"
      : color === "blue"
      ? "bg-[var(--blue)]"
      : color;
  return (
    <div className={`flex w-32 items-center ${className}`}>
      <div className="flex-1 h-2 bg-gray-200 rounded-full mr-2">
        <div
          className={`h-full ${colorClass} rounded-full transition-all duration-300`}
          style={{ width: progress }}
        />
      </div>
    </div>
  );
}
