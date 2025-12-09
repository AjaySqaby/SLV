import Button from "@/components/ui/Button";
import Link from "next/link";
import StudentFormFields from "./StudentFormFields";

export default function StudentEditForm({ form, handleChange, handleSubmit, gradeOptions, statusOptions, isModal = false }) {
  return (
    <div className={`${isModal ? 'p-6' : 'bg-[var(--gray-50)] min-h-screen p-6'}`}>
      <div className={`${isModal ? '' : 'max-w-5xl mx-auto'}`}>
        {!isModal && (
          <>
            <div className="flex items-center mb-6">
              <span className="text-2xl mr-2">📝</span>
              <h1 className="text-2xl font-bold">Edit Student</h1>
            </div>
            <Link href="/students" className="text-[var(--blue-600)] hover:underline mb-6 block">&lt; Back to Students</Link>
          </>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <StudentFormFields 
            form={form}
            onChange={handleChange}
            isModal={isModal}
          />
        
        </form>
      </div>
    </div>
  );
} 