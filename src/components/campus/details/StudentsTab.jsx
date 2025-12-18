import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";
import StudentsTable from "@/components/students/StudentsTable";

export default function StudentsTab({ students, campusName, district }) {
  const router = useRouter();
  return (
    <div>
      <div className="flex justify-end items-center mb-4">
        <Button size="sm" variant="primary" icon={<Plus className="w-4 h-4" />}>Add Student</Button>
      </div>
      <StudentsTable
        students={students.map((s, index) => ({
          id: s.id,
          name: s.name,
          grade: s.grade,
          campus: campusName || "-",
          district: district || "-",
          address: s.address,
          status: s.status,
        }))}
        onView={(id) => router.push("/students")}
      />
    </div>
  );
} 