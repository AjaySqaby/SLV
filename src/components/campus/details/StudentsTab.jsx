import { useState } from "react";
import { useRouter } from "next/navigation";
import SearchInput from "@/components/ui/SearchInput";
import Button from "@/components/ui/Button";
import StatusBadge from "@/components/ui/StatusBadge"
import { AiOutlineUser } from "react-icons/ai";

export default function StudentsTab({ students }) {
  const [search, setSearch] = useState("");
  const router = useRouter();
  const filteredStudents = students.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.id.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <SearchInput
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search students..."
          width="w-[300px]"
        />
        <Button variant="primary">Add Student</Button>
      </div>
      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-50">
            <th className="p-2 text-left">Student ID</th>
            <th className="p-2 text-left">Name</th>
            <th className="p-2 text-left">Grade</th>
            <th className="p-2 text-left">Homeroom</th>
            <th className="p-2 text-left">Address</th>
            <th className="p-2 text-left">Transportation</th>
            <th className="p-2 text-left">Status</th>
            <th className="p-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((s) => (
            <tr 
              key={s.id} 
              className="border-b hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => router.push('/students')}
            >
              <td className="p-2 font-medium">{s.id}</td>
              <td className="p-2">
                <span className="flex items-center gap-2">
                  <span className="w-7 h-7 rounded-full bg-blue-50 flex items-center justify-center">
                    <AiOutlineUser className="text-blue-500 w-4 h-4" />
                  </span>
                  <span className="font-semibold">{s.name}</span>
                </span>
              </td>
              <td className="p-2">{s.grade}</td>
              <td className="p-2">{s.homeroom}</td>
              <td className="p-2">{s.address}</td>
              <td className="p-2">{s.transportation}</td>
              <td className="p-2">
                <StatusBadge status={s.status} type={s.status === "Active" ? "active" : "inactive"} />
              </td>
              <td className="p-2">
                <Button 
                  size="sm" 
                  variant="secondary"
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push('/students');
                  }}
                  className="bg-gray-50 border-gray-200 text-gray-700 hover:bg-gray-100"
                >
                  View
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
} 