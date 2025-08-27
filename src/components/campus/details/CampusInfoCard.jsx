import { Calendar } from "lucide-react";

export default function CampusInfoCard({ address }) {
  return (
    <div className="bg-white p-6 border-b border-gray-100">
      <div className="font-semibold text-lg mb-2">Campus Information</div>
      <div className="flex items-center text-gray-700">
        <span className="mr-2">
          <Calendar className="w-4 h-4 inline" />
        </span>
        {address}
      </div>
    </div>
  );
} 