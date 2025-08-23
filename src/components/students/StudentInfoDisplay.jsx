import { User, Hash, Building2, Home, Phone, Mail, Contact, Truck, Route, Car, CheckCircle } from 'lucide-react'
import StatusBadge from '@/components/ui/StatusBadge'

export default function StudentInfoDisplay({ student, variant = "default", className = "" }) {
  const isCompact = variant === "compact"
  
  const InfoItem = ({ icon: Icon, label, value, isLink = false, className = "" }) => (
    <div className={`flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-lg ${className}`}>
      <Icon className="w-4 h-4 text-[var(--gray-500)]" />
      <div>
        <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">{label}</span>
        {isLink ? (
          <p className="text-sm text-[var(--blue-600)] hover:underline cursor-pointer font-medium">{value}</p>
        ) : (
          <p className="text-sm font-medium text-[var(--gray-900)]">{value}</p>
        )}
      </div>
    </div>
  )

  if (isCompact) {
    return (
      <div className={`space-y-4 ${className}`}>
        <InfoItem icon={Hash} label="Student ID" value={student.studentId || student.id} />
        <InfoItem icon={Building2} label="Campus" value={student.campus} isLink />
        <InfoItem icon={Building2} label="District" value={student.district} isLink />
        <InfoItem icon={Home} label="Address" value={student.address} />
      </div>
    )
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <InfoItem icon={Hash} label="Student ID" value={student.studentId || student.id} />
      <InfoItem icon={Building2} label="Campus" value={student.campus} isLink />
      <InfoItem icon={Building2} label="District" value={student.district} isLink />
      <InfoItem icon={Home} label="Address" value={student.address} />
    </div>
  )
}

export function GuardianInfoDisplay({ guardian, className = "" }) {
  const InfoItem = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-lg">
      <Icon className="w-4 h-4 text-[var(--gray-500)]" />
      <div>
        <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">{label}</span>
        <p className="text-sm font-medium text-[var(--gray-900)]">{value}</p>
      </div>
    </div>
  )

  return (
    <div className={`space-y-4 ${className}`}>
      <InfoItem icon={User} label="Name" value={guardian.name} />
      <InfoItem icon={Phone} label="Phone" value={guardian.phone} />
      <InfoItem icon={Mail} label="Email" value={guardian.email} />
    </div>
  )
}

export function TransportationInfoDisplay({ transportation, className = "" }) {
  const InfoItem = ({ icon: Icon, label, value, showStatus = false }) => (
    <div className="flex items-center gap-3 p-3 bg-[var(--gray-50)] rounded-lg">
      <Icon className="w-4 h-4 text-[var(--gray-500)]" />
      <div className="flex items-center gap-2">
        <span className="text-xs text-[var(--gray-500)] uppercase tracking-wide">{label}</span>
        {showStatus ? (
          <StatusBadge status={value} />
        ) : (
          <p className="text-sm font-medium text-[var(--gray-900)]">{value}</p>
        )}
      </div>
    </div>
  )

  return (
    <div className={`space-y-4 ${className}`}>
      <InfoItem icon={Route} label="Assigned Routes" value={transportation.assignedRoutes} />
      <InfoItem icon={Car} label="Scheduled Rides" value={transportation.scheduledRides} />
      <InfoItem icon={CheckCircle} label="Status" value={transportation.status} showStatus />
    </div>
  )
}
