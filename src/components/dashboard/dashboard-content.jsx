import DashboardCard from "../ui/Card";
import {
  BarChart2,
  Car,
  Eye,
  Map,
  Users,
  GraduationCap,
  Building2,
  Building,
  Calendar,
} from "lucide-react";
import Link from "next/link";

export default function DashboardContent() {
  const cards = [
    {
      icon: <Car size={24} />,
      title: "Rides",
      description: "Manage and track all ride activities",
      color: "bg-blue",
      href: "/rides",
    },
    {
      icon: <Car size={24} />,
      title: "Drivers",
      description: "View and manage driver profiles",
      color: "bg-green",
      href: "/drivers",
    },
    {
      icon: <Eye size={24} />,
      title: "Eagle Eye",
      description: "Real-time tracking dashboard",
      color: "bg-purple",
      href: "/eagle-eye",
    },
    {
      icon: <Map size={24} />,
      title: "Routes",
      description: "Manage transportation routes",
      color: "bg-[var(--amber-500)]",
      href: "/routes",
    },
    {
      icon: <Users size={24} />,
      title: "Partners",
      description: "Manage partner organizations",
      color: "bg-red",
      href: "/partners",
    },
    {
      icon: <GraduationCap size={24} />,
      title: "Students",
      description: "Student information and management",
      color: "bg-blue",
      href: "/students",
    },
    {
      icon: <Building2 size={24} />,
      title: "Districts",
      description: "Manage school districts",
      color: "bg-teal",
      href: "/districts",
    },
    {
      icon: <Building size={24} />,
      title: "Campus",
      description: "Manage school campuses",
      color: "bg-orange",
      href: "/campus",
    },
    {
      icon: <BarChart2 size={24} />,
      title: "Reports",
      description: "View analytics and insights",
      color: "bg-teal",
      href: "/reports",
    },
    {
      icon: <Users size={24} />,
      title: "Employees",
      description: "Manage district and SLV staff",
      color: "bg-pink",
      href: "/employees",
    },
    {
      icon: <Calendar size={24} />,
      title: "Onboarding",
      description: "Driver onboarding progress",
      color: "bg-[var(--amber-500)]",
      href: "/onboarding",
    },
  ];

  return (
    <div className="mb-8">
      <h1 className="text-3xl font-bold mb-8">SLV Ride Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <Link key={index} href={card.href} className="block group focus:outline-none">
            <DashboardCard
              icon={card.icon}
              title={card.title}
              description={card.description}
              color={card.color}
              className="cursor-pointer group-hover:shadow-md group-hover:-translate-y-1 transition"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
