import { LuCar } from "react-icons/lu";
import { CiWarning } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { FiMessageCircle } from "react-icons/fi";
import { CiLocationOn } from "react-icons/ci";
import { LuBuilding } from "react-icons/lu";
import { LuBriefcase } from "react-icons/lu";


export const MESSAGE_TYPES = [
  {
    id: "newdriverassigned",
    logo: <LuCar />,
    label: "New Driver Assigned",
    color: "bg-blue-100 border-blue-200 text-blue-700",
    iconBg: "bg-blue-600",
    previewIcon: <LuCar className="text-blue-600 text-2xl" />,
  },
  {
    id: "routedelay",
    logo: <CiWarning />,
    label: "Route Delay",
    color: "bg-yellow-50 border-yellow-200 text-yellow-700",
    iconBg: "bg-yellow-600",
    previewIcon: <CiWarning className="text-yellow-600 text-2xl" />,
  },
  {
    id: "routecanceled",
    logo: <IoMdClose />,
    label: "Route Canceled",
    color: "bg-red-50 border-red-200 text-red-700",
    iconBg: "bg-red-600",
    previewIcon: <IoMdClose className="text-red-600 text-2xl" />,
  },
  {
    id: "custommessage",
    logo: <FiMessageCircle />,
    label: "Custom Message",
    color: "bg-green-50 border-green-200 text-green-700",
    iconBg: "bg-green-400",
    previewIcon: <FiMessageCircle className="text-green-600 text-2xl" />,
  },
];

export const RECIPIENT_GROUPS = [
  { id: "drivers", label: "All Drivers", icon: <LuCar /> },
  {
    id: "districts",
    label: "Districts",
    icon: <CiLocationOn />,
  },
  {
    id: "campuses",
    label: "Campuses",
    icon: <LuBuilding />,
  },
  {
    id: "vendors",
    label: "Vendors",
    icon: <LuBriefcase />,
  },
];

export const DEFAULT_MESSAGES = {
  newdriverassigned: "A new driver has been assigned to your route.",
  routedelay: "Your route has been delayed. Please check updated times.",
  routecanceled: "Your route has been canceled for today.",
  custommessage: "",
};
