import PageLayout from "@/components/layout/page-layout";
import StudentsContent from "@/components/students/students-content";

export default function StudentsPage() {
  return (
    <PageLayout activePage="Students" pageTitle="Students">
      <StudentsContent />
    </PageLayout>
  );
}
