import Tabs from "@/components/ui/Tabs";

export default function StudentProfileView({ student, activeTab, setActiveTab }) {
  const studentTabs = [
    { id: 0, label: <span><span className='inline-block mr-2'>⚡</span>Routes</span> },
    { id: 1, label: <span><span className='inline-block mr-2'>🚌</span>Rides</span> },
    { id: 2, label: <span><span className='inline-block mr-2'>👨‍✈️</span>Drivers</span> },
    { id: 3, label: <span><span className='inline-block mr-2'>🚫</span>Blocked Drivers</span> },
  ];
  return (
    <div className="bg-[var(--gray-50)] min-h-screen p-6">
      {/* Back button and title */}
      <div className="mb-6">
        <button
          onClick={() => window.history.back()}
          className="flex items-center text-[var(--gray-600)] hover:text-[var(--gray-800)] mb-4"
        >
          <span className="mr-2">&lt;</span> Back
        </button>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-[var(--blue-100)] rounded-full flex items-center justify-center mr-3">
            <span className="text-xl font-bold text-[var(--blue-600)]">{student.initials}</span>
          </div>
          <h1 className="text-2xl font-bold flex items-center">
            <span className="mr-2">{student.name}</span>
            <span className="text-base font-normal text-[var(--gray-500)]">Grade {student.grade}</span>
          </h1>
        </div>
      </div>
      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {/* Student Information */}
        <div className="bg-[var(--background)] rounded-lg shadow-sm border border-[var(--gray-100)] p-6">
          <h2 className="text-lg font-semibold mb-6">Student Information</h2>
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 bg-[var(--gray-100)] rounded-full flex items-center justify-center text-[var(--gray-700)] text-2xl font-semibold mb-2">
              {student.initials}
            </div>
            <h3 className="text-lg font-semibold">{student.name}</h3>
            <p className="text-[var(--gray-500)]">Grade {student.grade}</p>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-[var(--gray-500)]">ID</p>
              <p className="font-medium">{student.studentId}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--gray-500)]">Campus</p>
              <p className="font-medium text-[var(--blue-600)]">{student.campus}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--gray-500)]">District</p>
              <p className="font-medium text-[var(--blue-600)]">{student.district}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--gray-500)]">Address</p>
              <p className="font-medium">{student.address}</p>
            </div>
          </div>
        </div>
        {/* Guardian Information */}
        <div className="bg-[var(--background)] rounded-lg shadow-sm border border-[var(--gray-100)] p-6">
          <h2 className="text-lg font-semibold mb-6">Guardian Information</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-[var(--gray-500)]">Name</p>
              <p className="font-medium">{student.guardian.name}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--gray-500)]">Phone</p>
              <p className="font-medium">{student.guardian.phone}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--gray-500)]">Email</p>
              <p className="font-medium">{student.guardian.email}</p>
            </div>
          </div>
        </div>
        {/* Transportation Details */}
        <div className="bg-[var(--background)] rounded-lg shadow-sm border border-[var(--gray-100)] p-6">
          <h2 className="text-lg font-semibold mb-6">Transportation Details</h2>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-[var(--gray-500)]">Assigned Routes</p>
              <p className="font-medium">{student.transportation.assignedRoutes}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--gray-500)]">Scheduled Rides</p>
              <p className="font-medium">{student.transportation.scheduledRides}</p>
            </div>
            <div>
              <p className="text-sm text-[var(--gray-500)]">Status</p>
              <span className="inline-block px-2 py-1 bg-[var(--green-100)] text-[var(--success-dark)] rounded-full text-xs font-medium">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
      {/* Tabs and Content */}
      <div className="bg-[var(--background)] rounded-lg shadow-sm border border-[var(--gray-100)] overflow-hidden">
        <Tabs
          tabs={studentTabs}
          activeTab={activeTab}
          onChange={setActiveTab}
        />
        <div className="p-6">
          {activeTab === 0 && (
            <>
              <h3 className="text-lg font-semibold mb-4">Assigned Routes ({student.routes.length})</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-left text-sm text-[var(--gray-500)] border-b border-[var(--gray-100)]">
                      <th className="px-6 py-3 font-medium">Route ID</th>
                      <th className="px-6 py-3 font-medium">Name</th>
                      <th className="px-6 py-3 font-medium">Stops</th>
                      <th className="px-6 py-3 font-medium">Distance</th>
                      <th className="px-6 py-3 font-medium">Students</th>
                      <th className="px-6 py-3 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {student.routes.map((route) => (
                      <tr key={route.id} className="border-b border-[var(--gray-100)] hover:bg-[var(--gray-50)]">
                        <td className="px-6 py-4 font-medium">{route.id}</td>
                        <td className="px-6 py-4">{route.name}</td>
                        <td className="px-6 py-4">{route.stops}</td>
                        <td className="px-6 py-4">{route.distance}</td>
                        <td className="px-6 py-4">{route.students ?? "-"}</td>
                        <td className="px-6 py-4">
                          <button className="text-[var(--blue-600)] hover:text-[var(--blue-800)]">View</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
          {activeTab === 1 && (
            <div>Rides tab content here</div>
          )}
          {activeTab === 2 && (
            <div>Drivers tab content here</div>
          )}
          {activeTab === 3 && (
            <div>Blocked Drivers tab content here</div>
          )}
        </div>
      </div>
    </div>
  );
} 