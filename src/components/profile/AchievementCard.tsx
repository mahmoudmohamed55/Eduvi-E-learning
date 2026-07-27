import type { LucideIcon } from "lucide-react";

type AchievementCardProps = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconBgClass?: string;
  iconTextClass?: string;
};

const AchievementCard = ({
  title,
  description,
  icon: Icon,
  iconBgClass = "bg-violet-100",
  iconTextClass = "text-violet-600",
}: AchievementCardProps) => {
  return (
    <div className="flex items-start gap-4 rounded-2xl border border-gray-100 p-4 transition-all duration-300 hover:shadow-md">
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBgClass}`}
      >
        <Icon className={iconTextClass} size={22} />
      </div>

      <div>
        <h3 className="font-semibold text-gray-900">
          {title}
        </h3>

        <p className="mt-1 text-sm leading-6 text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
};

export default AchievementCard;