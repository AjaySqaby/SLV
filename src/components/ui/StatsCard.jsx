import { MapPin, TrendingUp, Users, Clock } from "lucide-react";

export default function StatsCard({ title, value, details, icon, iconType, iconBg, iconColor }) {
  let IconComponent = null;
  let bg = iconBg || "bg-gray-100";
  let color = iconColor || "text-gray-500";

  if (!icon && iconType) {
    switch (iconType) {
      case "location":
        IconComponent = MapPin;
        bg = "bg-blue-50";
        color = "text-blue-600";
        break;
      case "trend":
        IconComponent = TrendingUp;
        bg = "bg-green-50";
        color = "text-green-600";
        break;
      case "users":
        IconComponent = Users;
        bg = "bg-purple-50";
        color = "text-purple-600";
        break;
      case "clock":
        IconComponent = Clock;
        bg = "bg-orange-50";
        color = "text-orange-500";
        break;
      default:
        IconComponent = null;
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-4">
        <div className={`w-12 h-12 ${bg} rounded-full flex items-center justify-center`}>
          {icon ? icon : IconComponent && <IconComponent className={`w-6 h-6 ${color}`} />}
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {details && <p className="text-sm text-gray-500">{details}</p>}
          </div>
        </div>
      </div>
    </div>
  );
} 