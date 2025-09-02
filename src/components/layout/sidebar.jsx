import Link from "next/link";
import {
  BarChart2,
  Car,
  Eye,
  Map,
  Users,
  GraduationCap,
  Building2,
  Building,
  ShoppingBag,
  Bell,
  UserPlus,
  FileText,
} from "lucide-react";
import Image from "next/image";

export default function Sidebar({ activePage = "Dashboard" }) {
  const menuItems = [
    { icon: <BarChart2 size={20} />, label: "Dashboard", href: "/dashboard" },
    { icon: <Car size={20} />, label: "Rides", href: "/rides" },
    { icon: <Eye size={20} />, label: "Eagle Eye", href: "/eagle-eye" },
    { icon: <Map size={20} />, label: "Routes", href: "/routes" },
    { icon: <Users size={20} />, label: "Partners", href: "/partners"  },
    { icon: <Car size={20} />, label: "Drivers", href: "/drivers" },
    { icon: <GraduationCap size={20} />, label: "Students", href: "/students"  },
    { icon: <Building size={20} />, label: "Campus", href: "/campus"  },
    { icon: <Building2 size={20} />, label: "Districts", href: "/districts"  },
    { icon: <Users size={20} />, label: "Employees", href: "/employees"  },
    {
      icon: <ShoppingBag size={20} />,
      label: "Marketplace",
      href: "/marketplace",
    },
    {
      icon: <Bell size={20} />,
      label: "Notifications",
      href: "#",
    },
    { icon: <UserPlus size={20} />, label: "Onboarding", href: "#" },
    { icon: <FileText size={20} />, label: "Reports", href: "#" },
  ];

  const driverStatuses = [
    { color: "bg-[var(--green)]", label: "Active - Driver can accept rides" },
    { color: "bg-[var(--red)]", label: "Inactive - Account deactivated" },
    { color: "bg-[var(--amber-500)]", label: "On Leave - Temporary pause" },
    { color: "bg-[var(--blue)]", label: "Pending - Completing onboarding" },
  ];

  return (
    <aside className="w-56 bg-white border-r border-gray-200 flex flex-col h-full">
      <div className="p-4 flex-1">
        <div className="flex items-center mb-6 pl-4">
          <Link href="/dashboard">
            <Image src="/logo.png" alt="logo" width={100} height={100} />
          </Link>
        </div>
        <nav>
          <ul className="space-y-1 flex flex-col">
            {menuItems.map((item, index) => (
              <li key={index}>
                <Link
                  href={item.href}
                  className={`sidebar-item hover:text-[var(--primary-black)] hover:bg-[var(--primary-hover)] ${
                    item.label === activePage ? "active" : ""
                  } py-2`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="p-4 border-t border-gray-200">
        <h3 className="font-semibold text-gray-800 mb-2">Driver Management</h3>
        <p className="text-xs text-gray-600 mb-3">
          Control driver status by activating, deactivating, or setting them on
          leave.
        </p>
        <div className="space-y-2">
          {driverStatuses.map((status, index) => (
            <div key={index} className="flex items-center">
              <div
                className={`w-2 h-2 rounded-full ${status.color} mr-2`}
              ></div>
              <span className="text-xs text-gray-700">{status.label}</span>
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}
