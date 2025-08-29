"use client";
import {
  Building2,
  Search,
  Plus,
  MapPin,
  GraduationCap,
  Users,
  Route,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye
} from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import SearchInput from "../ui/SearchInput";
import Button from "../ui/Button";

export default function DistrictsContent() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  
  // Mock data - replace with actual data from your API
  const districts = [
    // Uncomment the below data to see how it looks with actual districts
    /*
    {
      id: "D-001",
      name: "Atlanta Public Schools",
      location: "Atlanta, GA",
      schools: 87,
      students: 52000,
      routes: 156,
    },
    {
      id: "D-002", 
      name: "Fulton County Schools",
      location: "Fulton County, GA",
      schools: 105,
      students: 95000,
      routes: 203,
    },
    {
      id: "D-003",
      name: "Cobb County Schools", 
      location: "Cobb County, GA",
      schools: 112,
      students: 110000,
      routes: 245,
    },
    */
  ];

  const filteredDistricts = districts.filter((district) => {
    return district.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
           district.location.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <Building2 className="h-5 w-5 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--heading)]">School Districts</h1>
        </div>
        <Link href="/districts/add">
          <Button
            variant="primary"
            icon={<Plus className="h-4 w-4" />}
          >
            Add District
          </Button>
        </Link>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-lg border border-[var(--card-border)] shadow-sm">
        <div className="p-6">
          {/* Card Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-[var(--heading)]">All Districts</h2>
          </div>

          {/* Search Bar */}
          <div className="mb-6">
            <SearchInput
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search districts..."
              width="w-full max-w-md"
            />
          </div>

          {/* Table */}
          <div className="overflow-hidden">
            {/* Table Headers */}
            <div className="grid grid-cols-6 gap-4 px-4 py-3 bg-[var(--gray-50)] border-b border-[var(--border)] rounded-t-lg">
              <div className="font-medium text-[var(--heading)]">District Name</div>
              <div className="font-medium text-[var(--heading)]">Location</div>
              <div className="font-medium text-[var(--heading)]">Schools</div>
              <div className="font-medium text-[var(--heading)]">Students</div>
              <div className="font-medium text-[var(--heading)]">Routes</div>
              <div className="font-medium text-[var(--heading)]">Actions</div>
            </div>

            {/* Table Content */}
            {filteredDistricts.length > 0 ? (
              <div className="divide-y divide-[var(--border)]">
                {filteredDistricts.map((district) => (
                  <div key={district.id} className="grid grid-cols-6 gap-4 px-4 py-4 hover:bg-[var(--hover-bg)] transition-colors">
                    <div className="font-medium text-[var(--heading)]">{district.name}</div>
                    <div className="flex items-center gap-2 text-[var(--muted-text)]">
                      <MapPin className="h-4 w-4" />
                      {district.location}
                    </div>
                    <div className="flex items-center gap-2 text-[var(--muted-text)]">
                      <Building2 className="h-4 w-4" />
                      {district.schools}
                    </div>
                    <div className="flex items-center gap-2 text-[var(--muted-text)]">
                      <Users className="h-4 w-4" />
                      {district.students}
                    </div>
                    <div className="flex items-center gap-2 text-[var(--muted-text)]">
                      <Route className="h-4 w-4" />
                      {district.routes}
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="p-1 hover:bg-[var(--hover-bg)] rounded transition-colors">
                        <Eye className="h-4 w-4 text-[var(--muted-text)]" />
                      </button>
                      <button className="p-1 hover:bg-[var(--hover-bg)] rounded transition-colors">
                        <Edit className="h-4 w-4 text-[var(--muted-text)]" />
                      </button>
                      <button className="p-1 hover:bg-[var(--hover-bg)] rounded transition-colors">
                        <Trash2 className="h-4 w-4 text-[var(--muted-text)]" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty State */
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-16 h-16 bg-[var(--gray-100)] rounded-full flex items-center justify-center mb-4">
                  <Building2 className="h-8 w-8 text-[var(--muted-text)]" />
                </div>
                <p className="text-[var(--muted-text)] text-center">
                  No districts found. Add your first district!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
