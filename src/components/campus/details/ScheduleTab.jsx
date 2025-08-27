import { Calendar } from "lucide-react";
import Button from "@/components/ui/Button";
import AddBlockModal from "./AddBlockModal";
import ScheduleBlockCard from "./ScheduleBlockCard";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function ScheduleTab({
  activeDay,
  setActiveDay,
  bellScheduleState,
  showAddBlockModal,
  setShowAddBlockModal,
  blockForm,
  setBlockForm,
  handleAddBlock,
}) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <div className="font-semibold text-lg mb-4">Bell Schedule</div>
      <div className="flex items-center gap-2 mb-4">
        {days.map((d) => (
          <Button
            key={d}
            variant={activeDay === d ? "primary" : "secondary"}
            className={`px-5 py-2 rounded-md font-medium transition-colors border ${
              activeDay === d ? "border-blue-600" : "border-gray-200"
            }`}
            onClick={() => setActiveDay(d)}
          >
            {d}
          </Button>
        ))}
        <div className="flex-1" />
        <Button
          variant="success"
          className="px-4 py-2 font-medium flex items-center gap-2"
          onClick={() => {
            setShowAddBlockModal(true);
            setBlockForm((f) => ({ ...f, day: activeDay }));
          }}
        >
          + Add Block
        </Button>
        <Button
          variant="success"
          className="px-4 py-2 font-medium ml-2 flex items-center gap-2"
        >
          Save Schedule
        </Button>
      </div>
      <div className="flex items-center mb-2 mt-4">
        <span className="font-semibold text-base">{activeDay} Schedule</span>
        <span className="ml-2 text-gray-400 flex items-center gap-1 text-sm">
          <Calendar className="w-4 h-4" />
          {(bellScheduleState[activeDay] || []).length} blocks
        </span>
      </div>
      <div className="space-y-3 mt-2">
        {(bellScheduleState[activeDay] || []).map((block, idx) => (
          <ScheduleBlockCard key={idx} block={block} />
        ))}
      </div>
      <AddBlockModal
        open={showAddBlockModal}
        onClose={() => setShowAddBlockModal(false)}
        form={blockForm}
        setForm={setBlockForm}
        onSubmit={handleAddBlock}
      />
    </div>
  );
}
