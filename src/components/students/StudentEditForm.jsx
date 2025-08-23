import Button from "@/components/ui/Button";
import Link from "next/link";
import StudentFormFields from "./StudentFormFields";

export default function StudentEditForm({ form, handleChange, handleSubmit, gradeOptions, statusOptions }) {
  return (
    <div className="bg-[var(--gray-50)] min-h-screen p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center mb-6">
          <span className="text-2xl mr-2">📝</span>
          <h1 className="text-2xl font-bold">Edit Student</h1>
        </div>
        <Link href="/students" className="text-[var(--blue-600)] hover:underline mb-6 block">&lt; Back to Students</Link>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-[var(--background)] rounded-lg p-6 mb-4">
            <StudentFormFields 
              form={form}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-end">
            <Button variant="primary" type="submit">Update Student</Button>
          </div>
        </form>
      </div>
    </div>
  );
} 