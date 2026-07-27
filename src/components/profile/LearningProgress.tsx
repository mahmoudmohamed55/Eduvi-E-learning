type LearningProgressProps = {
  progress: number;
};

const LearningProgress = ({
  progress,
}: LearningProgressProps) => {
  return (
    <section className="rounded-3xl border border-gray-100 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">
          Learning Progress
        </h2>

        <span className="text-lg font-bold text-violet-600">
          {progress}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="h-3 overflow-hidden rounded-full bg-gray-100">
        <div
          className="h-full rounded-full bg-violet-600 transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>

      <p className="mt-4 text-sm leading-6 text-gray-500">
        Great job! Keep learning and complete more lessons to
        reach 100%.
      </p>
    </section>
  );
};

export default LearningProgress;