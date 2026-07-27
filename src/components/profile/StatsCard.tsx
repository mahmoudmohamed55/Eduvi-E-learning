import type { LucideIcon } from "lucide-react";

type StatsCardProps = {
  title: string;
  value: number | string;
  icon: LucideIcon;
  iconBgClass?: string;
  iconTextClass?: string;
};

const StatsCard = ({
  title,
  value,
  icon: Icon,
  iconBgClass = "bg-violet-100",
  iconTextClass = "text-violet-600",
}: StatsCardProps) => {
  return (
    <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h3 className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </h3>
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl ${iconBgClass}`}
        >
          <Icon className={iconTextClass} size={26} />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;