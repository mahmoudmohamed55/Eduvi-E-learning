const EnrollmentCardSkeleton = ({ count = 6 }: { count?: number }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-3xl border border-surface-300 bg-surface-50 shadow-sm"
        >
          {/* Image */}

          <div className="h-52 animate-pulse bg-surface-300" />

          <div className="space-y-4 p-5">
            {/* Title */}

            <div className="h-5 w-4/5 animate-pulse rounded-lg bg-surface-300" />

            <div className="h-5 w-3/5 animate-pulse rounded-lg bg-surface-300" />

            {/* Description */}

            <div className="h-4 w-full animate-pulse rounded-lg bg-surface-300" />

            <div className="h-4 w-4/5 animate-pulse rounded-lg bg-surface-300" />

            {/* Divider */}

            <div className="border-t border-surface-300 pt-4">
              <div className="flex justify-between">
                <div className="h-4 w-20 animate-pulse rounded-lg bg-surface-300" />

                <div className="h-4 w-20 animate-pulse rounded-lg bg-surface-300" />
              </div>
            </div>

            {/* Footer */}

            <div className="flex items-center justify-between pt-2">
              <div className="space-y-2">
                <div className="h-3 w-16 animate-pulse rounded bg-surface-300" />

                <div className="h-6 w-20 animate-pulse rounded bg-surface-300" />
              </div>

              <div className="h-10 w-28 animate-pulse rounded-xl bg-surface-300" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default EnrollmentCardSkeleton;
