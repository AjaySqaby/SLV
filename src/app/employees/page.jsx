import PageLayout from "@/components/layout/page-layout";
import EmployeesContent from "@/components/employees/employees-content";

export default function EmployeesPage() {
  return (
    <PageLayout activePage="Employees" pageTitle="Employee Management">
      <EmployeesContent />
    </PageLayout>
  );
}
