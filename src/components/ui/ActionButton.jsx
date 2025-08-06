import { FileText, Calendar, Users, AlertCircle, DollarSign } from "lucide-react"

export default function MarketplaceContent() {
  const rides = [
    {
      id: "RT-38754",
      district: "86022-Z",
      date: "04/06/2025",
      pickup: {
        time: "7:30 AM",
        location: "1234 Peachtree St NE, Atlanta, GA",
      },
      dropoff: {
        time: "8:15 AM",
        location: "Maynard Jackson High School",
      },
      students: 2,
      reason: "Driver unavailable due to illness",
      fare: 45,
    },
    {
      id: "RT-39283",
      district: "86022-Z",
      date: "04/07/2025",
      pickup: {
        time: "6:45 AM",
        location: "5678 Roswell Rd, Sandy Springs, GA",
      },
      dropoff: {
        time: "7:30 AM",
        location: "North Springs High School",
      },
      students: 3,
      reason: "Vehicle maintenance issue",
      fare: 55,
    },
  ]

  return (
    <div>
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
          <FileText className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Ride Marketplace</h1>
          <p className="text-gray-600 text-sm">Available rejected rides that need drivers</p>
        </div>
      </div>

      <div className="flex items-center mb-6">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-4">
          <FileText className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">Ride Marketplace</h1>
          <p className="text-gray-600 text-sm">Available rejected rides that need drivers</p>
        </div>
      </div>

      <div className="space-y-6">
        {rides.map((ride) => (
          <div key={ride.id} className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="font-medium text-blue-600">{ride.id}</span>
                <span className="text-gray-500">District: {ride.district}</span>
              </div>
              <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-xs font-medium">Rejected</span>
            </div>

            <div className="p-6 grid grid-cols-2 gap-6">
              <div>
                <div className="flex items-center mb-4">
                  <Calendar className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Date</p>
                    <p className="font-medium">{ride.date}</p>
                  </div>
                </div>

                <div className="flex items-start mb-4">
                  <div className="mt-1">
                    <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 22V8" />
                        <path d="m5 12 7-4 7 4" />
                        <path d="M5 16l7-4 7 4" />
                        <path d="M5 20l7-4 7 4" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-500">Pickup</p>
                    <p className="font-medium">{ride.pickup.time}</p>
                    <p className="text-sm text-gray-600">{ride.pickup.location}</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="mt-1">
                    <div className="w-6 h-6 rounded-full bg-red-500 flex items-center justify-center text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
                        <path d="m7.5 4.27 9 5.15" />
                        <polyline points="3.29 7 12 12 20.71 7" />
                        <line x1="12" y1="22" x2="12" y2="12" />
                        <circle cx="18.5" cy="15.5" r="2.5" />
                        <path d="M20.27 17.27 22 19" />
                      </svg>
                    </div>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-500">Dropoff</p>
                    <p className="font-medium">{ride.dropoff.time}</p>
                    <p className="text-sm text-gray-600">{ride.dropoff.location}</p>
                  </div>
                </div>
              </div>

              <div>
                <div className="flex items-center mb-4">
                  <Users className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Students</p>
                    <p className="font-medium">{ride.students} students</p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <AlertCircle className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Reason</p>
                    <p className="font-medium">{ride.reason}</p>
                  </div>
                </div>

                <div className="flex items-center mb-4">
                  <DollarSign className="h-5 w-5 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm text-gray-500">Driver Fare</p>
                    <p className="text-2xl font-bold">${ride.fare}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <span className="px-3 py-2 text-gray-500 bg-gray-50 border-r border-gray-300">$</span>
                      <input type="text" value={ride.fare} className="px-3 py-2 w-full focus:outline-none" readOnly />
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">Update Fare</button>
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-gray-100">
              <button className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium">
                Assign Driver
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
