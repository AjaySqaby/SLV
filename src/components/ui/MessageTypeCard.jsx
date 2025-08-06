import React from "react";

const MessageTypeCard = ({ logo, label, index, selected, onClick }) => {
  const getBgColor = (index, selected) => {
    if (selected) {
      switch (index) {
        case 0: return "bg-[var(--blue)] text-[var(--background)]";
        case 1: return "bg-[var(--warning)] text-[var(--background)]";
        case 2: return "bg-[var(--red)] text-[var(--background)]";
        case 3: return "bg-[var(--green)] text-[var(--background)]";
        default: return "bg-[var(--gray-600)] text-[var(--background)]";
      }
    } else {
      switch (index) {
        case 0: return "bg-[var(--blue-50)] text-[var(--blue-600)]";
        case 1: return "bg-[var(--yellow-50)] text-[var(--yellow-600)]";
        case 2: return "bg-[var(--red-50)] text-[var(--red-600)]";
        case 3: return "bg-{var(--green-50)] text-green-600";
        default: return "bg-[var(--gray-50)] text-[var(--gray-600)]";
      }
    }
  };

  return (
    <div
      className={`flex gap-2 border p-3 items-center rounded cursor-pointer ${
        selected ? "border-2 border-[var(--blue)] hover:border-[var(--blue)]" : "border border-[var(--gray-200)]"
      }`}
      onClick={onClick}
    >
      <div className={`p-2 rounded-lg text-xl ${getBgColor(index, selected)}`}>
        {React.cloneElement(logo, { className: "w-6 h-6", color: "currentColor" })}
      </div>
      <span className="font-medium text-sm">{label}</span>
    </div>
  );
};

export default MessageTypeCard;
