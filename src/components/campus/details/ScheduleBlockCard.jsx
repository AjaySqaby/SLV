import { Clock } from "lucide-react";

export default function ScheduleBlockCard({ block }) {
  return (
    <div className={`flex items-center justify-between rounded-lg px-5 py-3 border ${block.color} shadow-sm`}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-200 bg-white">
          <Clock className="w-5 h-5 text-gray-400" />
        </div>
        <div>
          <div className="font-semibold text-base">{block.name}</div>
          <div className="text-xs text-gray-500">{block.type}</div>
        </div>
      </div>
      <div className="text-base font-medium">{block.start} - {block.end}</div>
      <div className="text-xs text-gray-400 min-w-[48px] text-right">{block.duration}</div>
    </div>
  );
} 