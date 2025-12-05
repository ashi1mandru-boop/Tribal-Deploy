import { Package, CheckCircle, Truck, Clock, Pause, Users } from "lucide-react";

const defaultStats = [
  { title: "Total Orders", value: "50", icon: Package, bgColor: "bg-blue-100", iconColor: "text-blue-600" },
  { title: "Completed", value: "32", icon: CheckCircle, bgColor: "bg-green-100", iconColor: "text-green-600" },
  { title: "Processed", value: "10", icon: Truck, bgColor: "bg-teal-100", iconColor: "text-teal-600" },
  { title: "Processing", value: "2", icon: Clock, bgColor: "bg-blue-100", iconColor: "text-blue-500" },
  { title: "On Hold", value: "2", icon: Pause, bgColor: "bg-orange-100", iconColor: "text-orange-500" },
  { title: "Que", value: "1", icon: Users, bgColor: "bg-purple-100", iconColor: "text-purple-600" },
];

export function StatsCards({ stats = defaultStats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {stats.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div
            key={stat.title}
            className="bg-white rounded-xl p-4 shadow-sm"
            data-testid={`stat-card-${stat.title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500 font-medium mb-2 truncate">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                <IconComponent className={`w-5 h-5 ${stat.iconColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
