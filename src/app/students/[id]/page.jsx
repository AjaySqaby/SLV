import PageLayout from "@/components/layout/page-layout"
import StudentDetailContent from "@/components/students/StudentDetailContent"

export default async function StudentDetailPage({ params }) {
  const studentId = await params.id;
  return (
    <PageLayout activePage="Routes" pageTitle="Student Details">
      <StudentDetailContent studentId={studentId} />
    </PageLayout>
  )
}
