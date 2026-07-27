import {
  BookOpen,
  CheckCircle2,
  Clock3,
  TrendingUp,
} from "lucide-react";

import StatsCard from "./StatsCard";

type StatsGridProps = {
  enrolledCourses: number;
  completedLessons: number;
  pendingLessons: number;
  progress: number;
};

const StatsGrid = ({
  enrolledCourses,
  completedLessons,
  pendingLessons,
  progress,
}: StatsGridProps) => {
  return (
    <section>
      <h2 className="mb-5 text-xl font-semibold text-gray-900">
        Statistics
      </h2>

      <div className="grid gap-5 sm:grid-cols-2">
        <StatsCard
          title="Enrolled Courses"
          value={enrolledCourses}
          icon={BookOpen}
        />

        <StatsCard
          title="Completed Lessons"
          value={completedLessons}
          icon={CheckCircle2}
          iconBgClass="bg-green-100"
          iconTextClass="text-green-600"
        />

        <StatsCard
          title="Pending Lessons"
          value={pendingLessons}
          icon={Clock3}
          iconBgClass="bg-orange-100"
          iconTextClass="text-orange-600"
        />

        <StatsCard
          title="Overall Progress"
          value={`${progress}%`}
          icon={TrendingUp}
          iconBgClass="bg-blue-100"
          iconTextClass="text-blue-600"
        />
      </div>
    </section>
  );
};

export default StatsGrid;