"use client";
import {
  Users,
  Search,
  Plus,
  MapPin,
  Building2,
  Mail,
  Phone,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  User
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SearchInput from "../ui/SearchInput";
import Button from "../ui/Button";

export default function EmployeesContent() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - replace with actual data from your API
  const employees = [
    {
      id: "E-001",
      name: "John Smith",
      title: "Principal",
      district: "86022-Z",
      campus: "Riverdale High",
      email: "jsmith@riverdale.edu",
      phone: "(404) 555-1234",
      status: "Active"
    },
    {
      id: "E-002",
      name: "Sarah Johnson",
      title: "Assistant Principal",
      district: "86022-Z",
      campus: "Riverdale High",
      email: "sjohnson@riverdale.edu",
      phone: "(404) 555-2345",
      status: "Active"
    },
    {
      id: "E-003",
      name: "Michael Williams",
      title: "Transportation Director",
      district: "86022-Z",
      campus: "District Level",
      email: "mwilliams@district86022z.edu",
      phone: "(404) 555-3456",
      status: "Active"
    },
    {
      id: "E-004",
      name: "Jennifer Davis",
      title: "Teacher",
      district: "75044-A",
      campus: "Lincoln Middle School",
      email: "jdavis@lincolnms.edu",
      phone: "(404) 555-4567",
      status: "Active"
    }
  ];

  const filteredEmployees = employees.filter((employee) => {
    return employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.campus.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Users className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--heading)]">Employee Management</h1>
            <p className="text-[var(--muted-text)]">Manage all employees, create new profiles, and assign them to campuses and districts.</p>
          </div>
        </div>
        <Link href="/employees/add">
          <Button
            variant="primary"
            icon={<Plus className="h-4 w-4" />}
          >
            Add New Employee
          </Button>
        </Link>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-lg border border-[var(--card-border)] shadow-sm">
        <div className="p-6">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-[var(--heading)]">All Employees</h2>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search employees by name, title or campus"
              width="w-full max-w-md"
            />
          </div>

          {/* Table */}
          <div className="overflow-hidden">
            {/* Table Headers */}
            <div className="flex justify-between items-center px-4 py-3 bg-[var(--gray-50)] border-b border-[var(--border)] rounded-t-lg">
              <div className="w-16 font-medium text-[var(--heading)]">ID</div>
              <div className="w-32 font-medium text-[var(--heading)]">Name</div>
              <div className="w-40 font-medium text-[var(--heading)]">Title</div>
              <div className="w-24 font-medium text-[var(--heading)]">District</div>
              <div className="w-32 font-medium text-[var(--heading)]">Campus</div>
              <div className="w-48 font-medium text-[var(--heading)]">Email</div>
              <div className="w-36 font-medium text-[var(--heading)]">Phone</div>
              <div className="w-20 font-medium text-[var(--heading)]">Status</div>
              <div className="w-24 font-medium text-[var(--heading)]">Actions</div>
            </div>

            {/* Table Content */}
            {filteredEmployees.length > 0 ? (
              <div className="divide-y divide-[var(--border)]">
                {filteredEmployees.map((employee) => (
                  <div key={employee.id} className="flex justify-between items-center px-4 py-4 hover:bg-[var(--hover-bg)] transition-colors">
                    <div className="w-16 font-medium text-[var(--heading)]">{employee.id}</div>
                    <div className="w-32 font-medium text-[var(--heading)]">{employee.name}</div>
                    <div className="w-40 text-[var(--muted-text)]">{employee.title}</div>
                    <div className="w-24 text-[var(--muted-text)]">{employee.district}</div>
                    <div className="w-32 flex items-center gap-2 text-[var(--muted-text)]">
                      <Building2 className="h-4 w-4" />
                      {employee.campus}
                    </div>
                    <div className="w-48 flex items-center gap-2 text-[var(--muted-text)]">
                      <Mail className="h-4 w-4" />
                      {employee.email}
                    </div>
                    <div className="w-36 flex items-center gap-2 text-[var(--muted-text)]">
                      <Phone className="h-4 w-4" />
                      {employee.phone}
                    </div>
                    <div className="w-20">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 border border-emerald-200">
                        {employee.status}
                      </span>
                    </div>
                    <div className="w-24 flex items-center gap-1">
                      <button className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors">
                        View
                      </button>
                      <button className="px-2 py-1 text-xs bg-gray-100 hover:bg-gray-200 rounded transition-colors">
                        Edit
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-[var(--gray-100)] rounded-full flex items-center justify-center mb-4">
                  <Users className="h-8 w-8 text-[var(--muted-text)]" />
                </div>
                <p className="text-[var(--muted-text)] text-center">
                  No employees found. Add your first employee!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
