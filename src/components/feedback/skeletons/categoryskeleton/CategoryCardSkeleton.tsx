import ContentLoader from "react-content-loader";

type CategoryCardSkeletonProps = {
  count?: number;
};

const CategoryCardSkeleton = ({ count = 6 }: CategoryCardSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="w-full overflow-hidden rounded-2xl bg-white shadow-sm"
        >
          <ContentLoader
            speed={2}
            viewBox="0 0 340 260"
            backgroundColor="#f1f1f1"
            foregroundColor="#e2e2e2"
            className="block h-auto w-full"
          >
            {/* Image */}
            <rect x="20" y="20" width="128" height="156" rx="12" />

            {/* Title - line 1 */}
            <rect x="168" y="28" width="120" height="20" rx="4" />

            {/* Title - line 2 */}
            <rect x="168" y="56" width="90" height="20" rx="4" />

            {/* Description */}
            <rect x="168" y="100" width="140" height="12" rx="4" />

            <rect x="168" y="124" width="125" height="12" rx="4" />

            <rect x="168" y="148" width="110" height="12" rx="4" />

            {/* Bottom divider */}
            <rect x="0" y="196" width="340" height="1" />

            {/* Courses badge */}
            <rect x="20" y="216" width="76" height="28" rx="6" />

            {/* Explore */}
            <rect x="238" y="220" width="70" height="18" rx="4" />
          </ContentLoader>
        </div>
      ))}
    </div>
  );
};

export default CategoryCardSkeleton;
