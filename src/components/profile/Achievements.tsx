import {
  Award,
  BookMarked,
  Flame,
} from "lucide-react";

import AchievementCard from "./AchievementCard";

const Achievements = () => {
  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-xl font-semibold text-gray-900">
        Achievements
      </h2>

      <div className="space-y-4">
        <AchievementCard
          title="Course Explorer"
          description="Successfully enrolled in your first course."
          icon={BookMarked}
        />

        <AchievementCard
          title="Fast Learner"
          description="Completed more than 10 lessons."
          icon={Flame}
          iconBgClass="bg-orange-100"
          iconTextClass="text-orange-600"
        />

        <AchievementCard
          title="Dedicated Student"
          description="Reached over 75% overall learning progress."
          icon={Award}
          iconBgClass="bg-green-100"
          iconTextClass="text-green-600"
        />
      </div>
    </section>
  );
};

export default Achievements;