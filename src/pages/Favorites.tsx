import { Heart } from "lucide-react";

import CourseCard from "@components/cards/CourseCard";

import Loading from "@components/feedback/loading/Loading";
import { Heading } from "@components/common/heading/Heading";

import useWishList from "@hooks/useWishList";

import CourseCardSkeleton from "@components/feedback/skeletons/courseskeleton/CourseCardSkeleton";

import FavoritesImg from "@assets/course.png";

const Favorites = () => {
  const { loading, error, courseFullInfo } = useWishList();

  return (
    <>
      <Heading
        title="My Favorites"
        description="Keep your favorite courses in one place and come back to them whenever you're ready to learn."
        image={FavoritesImg}
      />

      <Loading
        status={loading}
        error={error}
        skeleton={
          <div className="container mb-6 mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <CourseCardSkeleton count={6} />
          </div>
        }
      >
        <div className="container mb-8 mt-6">
          {/* ================= Header ================= */}
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-ink-900">
                Favorite Courses
              </h2>

              <p className="mt-1 text-sm text-ink-500">
                {courseFullInfo.length}{" "}
                {courseFullInfo.length === 1 ? "course" : "courses"} saved to
                your favorites
              </p>
            </div>
          </div>

          {/* ================= Empty State ================= */}
          {courseFullInfo.length === 0 ? (
            <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-surface-400 bg-surface-50 px-6 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-secondary-100 text-secondary-500">
                <Heart size={38} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-ink-900">
                No favorites yet
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-ink-500">
                You haven't added any courses to your favorites yet. Explore our
                courses and save the ones you'd like to learn later.
              </p>
            </div>
          ) : (
            /* ================= Favorite Courses ================= */

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {courseFullInfo.map((course) => (
                <CourseCard key={course.id} {...course} />
              ))}
            </div>
          )}
        </div>
      </Loading>
    </>
  );
};

export default Favorites;
