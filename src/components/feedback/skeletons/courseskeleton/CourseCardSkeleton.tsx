import ContentLoader from "react-content-loader";

type CourseCardSkeletonProps = {
  count?: number;
};

const CourseCardSkeleton = ({ count = 6 }: CourseCardSkeletonProps) => {
  return (
    <div className="container mt-4 rounded-3xl bg-surface-100 px-3 pb-4">
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            className="w-full overflow-hidden rounded-2xl bg-white shadow-sm"
          >
            <ContentLoader
              speed={2}
              viewBox="0 0 360 484"
              backgroundColor="#f1f1f1"
              foregroundColor="#e2e2e2"
              className="block h-auto w-full"
            >
              {/* Image */}
              <rect x="0" y="0" width="360" height="193" />

              {/* Rating */}
              <rect x="288" y="14" width="58" height="32" rx="16" />

              {/* Title */}
              <rect x="20" y="219" width="185" height="20" rx="4" />

              {/* Description */}
              <rect x="20" y="258" width="260" height="14" rx="4" />

              {/* Avatar */}
              <circle cx="50" cy="329" r="20" />

              {/* Instructor Name */}
              <rect x="80" y="322" width="105" height="14" rx="4" />

              {/* Divider */}
              <rect x="20" y="368" width="320" height="1" />

              {/* Level Icon */}
              <rect x="20" y="389" width="14" height="14" rx="2" />

              {/* Level */}
              <rect x="43" y="389" width="70" height="14" rx="4" />

              {/* Divider */}
              <rect x="20" y="424" width="320" height="1" />

              {/* Price */}
              <rect x="20" y="449" width="80" height="22" rx="4" />

              {/* Enroll Button */}
              <rect x="206" y="441" width="126" height="40" rx="9" />
            </ContentLoader>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseCardSkeleton;
