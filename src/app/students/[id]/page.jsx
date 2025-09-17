import PageLayout from "@/components/layout/page-layout"
import StudentProfilePage from "@/components/students/StudentProfilePage"

export default function StudentProfile({ params }) {
  return (
    <PageLayout activePage="Students" pageTitle="Student Profile">
      <StudentProfilePage studentId={params.id} />
    </PageLayout>
  )
}