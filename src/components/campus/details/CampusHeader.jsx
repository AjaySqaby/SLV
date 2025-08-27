import { Building } from "lucide-react";
import Button from "@/components/ui/Button";

export default function CampusHeader({
  name,
  type,
  id,
  status,
  students,
  district,
  onEdit,
}) {
  return (
    <div className="flex items-center gap-6 mb-6">
      <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow border border-gray-100">
        <Building className="h-10 w-10 text-blue-600" />
      </div>
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-[var(--heading)]">{name}</h1>
          {status && (
            <span className="bg-[var(--green-100)] text-[var(--green-700)] text-sm font-semibold px-3 py-1 rounded-full ml-2">
              {status}
            </span>
          )}
        </div>
        <div className="text-gray-600 text-base font-medium">
          {type} <span className="mx-2">•</span> ID: {id}
        </div>
      </div>
      <div className="flex-1 flex justify-end">
        <Button
          variant="secondary"
          className="bg-white text-gray-700 px-4 py-2 rounded hover:bg-gray-50 border border-gray-200 shadow"
          onClick={onEdit}
        >
          Edit Campus
        </Button>
      </div>
    </div>
  );
}
