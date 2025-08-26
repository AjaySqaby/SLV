import PageLayout from "@/components/layout/page-layout"
import StudentDetailContent from "@/components/students/StudentDetailContent"

export default async function StudentDetailPage({ params }) {
  const resolvedParams = await params;
  const studentId = resolvedParams.id;
  return (
    <PageLayout activePage="Students" pageTitle="Student Details">
      <StudentDetailContent studentId={studentId} />
    </PageLayout>
  )
}
