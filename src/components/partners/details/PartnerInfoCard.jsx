"use client"

export default function PartnerInfoCard({ partner }) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-[var(--gray-100)] p-6 mb-6">
      <div className="flex items-center mb-6">
        <div className="w-12 h-12 bg-[var(--blue-100)] rounded-lg flex items-center justify-center text-blue-600 font-bold text-xl mr-4">
          {partner.id.substring(0, 2)}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{partner.name}</h2>
          <div className="flex items-center">
            <span
              className={`px-2 py-1 rounded-full text-xs font-medium mr-2 ${
                partner.status === "Active" ? "bg-[var(--green-100)] text-[var(--success-dark)]" : "bg-[var(--gray-100)] text-[var(--gray-900)]"
              }`}
            >
              {partner.status}
            </span>
            <span className="text-[var(--gray-600)]">{partner.location}</span>
          </div>
        </div>
        <button className="ml-auto px-4 py-2 bg-[var(--blue-600)] text-white rounded-md hover:bg-[var(--blue-800)]">
          Login as Partner
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-[var(--gray-50)] rounded-lg p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[var(--purple-100)] rounded-full flex items-center justify-center mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--purple-600)]"
              >
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-[var(--gray-500)]">Drivers</p>
              <p className="text-2xl font-bold">{partner.stats.drivers}</p>
            </div>
          </div>
        </div>

        <div className="bg-[var(--gray-50)] rounded-lg p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[var(--green-100)] rounded-full flex items-center justify-center mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-green-600"
              >
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-[var(--gray-500)]">Routes</p>
              <p className="text-2xl font-bold">{partner.stats.routes}</p>
            </div>
          </div>
        </div>

        <div className="bg-[var(--gray-50)] rounded-lg p-4">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-[var(--orange-100)] rounded-full flex items-center justify-center mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-[var(--orange-600)]"
              >
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.5 2.8C1.4 11.3 1 12.1 1 13v3c0 .6.4 1 1 1h2" />
                <circle cx="7" cy="17" r="2" />
                <path d="M9 17h6" />
                <circle cx="17" cy="17" r="2" />
              </svg>
            </div>
            <div>
              <p className="text-sm text-[var(--gray-500)]">Rides</p>
              <p className="text-2xl font-bold">{partner.stats.rides}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 