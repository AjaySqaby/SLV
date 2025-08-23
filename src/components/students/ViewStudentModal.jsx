import Modal from "@/components/common/Modal";
import { GraduationCap } from "lucide-react";

export default function ViewStudentModal({ open, onClose, student }) {
  if (!student) return null;
  return (
    <Modal open={open} onClose={onClose} widthClass="max-w-lg w-full">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mr-4">
          <GraduationCap className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-blue-600">{student.name}</h2>
          <p className="text-gray-500 text-sm">Student Details and Profile Information</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow p-6 border border-gray-100">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <div className="text-xs text-gray-700">Student ID</div>
            <div className="font-medium text-gray-900">{student.studentId}</div>
          </div>
          <div>
            <div className="text-xs text-gray-700">Grade</div>
            <div className="font-medium text-gray-900">{student.grade}</div>
          </div>
          <div>
            <div className="text-xs text-gray-700">Campus</div>
            <div className="font-medium text-blue-700">{student.campus}</div>
          </div>
          <div>
            <div className="text-xs text-gray-700">District</div>
            <div className="font-medium text-blue-700">{student.district}</div>
          </div>
          <div className="col-span-2">
            <div className="text-xs text-gray-700">Status</div>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${student.status === "Active" ? "bg-green-100 text-green-700" : "bg-gray-200 text-gray-600"}`}>
              {student.status}
            </span>
          </div>
        </div>
        <div>
          <div className="text-xs text-gray-700 mb-1">Address</div>
          <div className="font-medium text-gray-900">{student.address}</div>
        </div>
      </div>
    </Modal>
  );
} 