export default function PageHeader({ icon: Icon, title, description, iconBgColor = "bg-purple-100", iconColor = "text-purple-600" }) {
  return (
    <div className="flex items-center mb-6">
      <div className={`w-10 h-10 ${iconBgColor} rounded-full flex items-center justify-center mr-4`}>
        <Icon className={`h-5 w-5 ${iconColor}`} />
      </div>
      <div>
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  )
} 