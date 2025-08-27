import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import Button from "@/components/ui/Button";
import { AiOutlineUser } from "react-icons/ai";
import { FiBriefcase } from "react-icons/fi";

export default function EmployeesTab({ campusName }) {
  return (
    <div>
      <div className="font-semibold text-base mb-4">Add School Employee</div>
      <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label={<span><span className="inline-block mr-1"><FiBriefcase className="inline w-4 h-4 text-blue-500" /></span>School*</span>} value={campusName} readOnly />
        <Input label={<span><span className="inline-block mr-1"><AiOutlineUser className="inline w-4 h-4 text-blue-500" /></span>Employee Name*</span>} placeholder="Name" />
        <Input label={<span><span className="inline-block mr-1"><AiOutlineUser className="inline w-4 h-4 text-blue-500" /></span>Employee Phone Number*</span>} placeholder="Phone Number" />
        <Select label={<span><span className="inline-block mr-1"><FiBriefcase className="inline w-4 h-4 text-blue-500" /></span>Position*</span>} options={[
          { value: "", label: "-- Select Position --" },
          { value: "Principal", label: "Principal" },
          { value: "Teacher", label: "Teacher" },
          { value: "Staff", label: "Staff" },
        ]} />
        <Input label={<span><span className="inline-block mr-1"><AiOutlineUser className="inline w-4 h-4 text-blue-500" /></span>Employee Email*</span>} placeholder="Email" className="md:col-span-2" />
        <div className="md:col-span-2 flex justify-end">
          <Button variant="primary">Submit</Button>
        </div>
      </form>
    </div>
  );
} 