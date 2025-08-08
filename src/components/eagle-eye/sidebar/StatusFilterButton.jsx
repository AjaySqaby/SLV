import Button from "@/components/ui/Button";

export default function StatusFilterButton({
  label,
  isActive,
  onClick,
  colorVar,
}) {
  const isAll = label === "All";
  const allActive =
    "bg-[var(--primary)] text-white border-2 border-[var(--primary)] shadow-sm";
  const allInactive =
    "bg-white border-2 border-[var(--primary)] text-[var(--primary)]";
  const inactiveColor = colorVar
    .replace("bg-", "border-")
    .replace("bg-[", "border-[");
  const textColor = colorVar.replace("bg-", "text-").replace("bg-[", "text-[");

  return (
    <Button
      variant="primary"
      className={`px-3 py-1 rounded-md text-sm font-semibold transition-all duration-150
        ${colorVar} text-white border-2 ${
        isActive ? "border-gray-400" : "border-transparent"
      }
        ${isActive ? "z-10" : "opacity-90"}
      `}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
