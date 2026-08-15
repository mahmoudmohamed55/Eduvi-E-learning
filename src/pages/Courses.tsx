import { useSearchParams } from "react-router-dom";

import { GridList } from "@components/common/gridlist/GridList";
import { Heading } from "@components/common/heading/Heading";
import CourseCard from "@components/cards/CourseCard";

import img from "@assets/course.png";
import { useCourses } from "@hooks/useCourses";
import Loading from "@components/feedback/loading/Loading";
import CourseCardSkeleton from "@components/feedback/skeletons/courseskeleton/CourseCardSkeleton";

const PAGE_SIZE = 6;

const Courses = () => {
  const { page, total, record, loading, error } = useCourses();

  const [, setSearchParams] = useSearchParams();

  const totalPages = Math.ceil(total / PAGE_SIZE);

  return (
    <>
      <Heading
        title="Courses"
        description="Explore our wide range of courses and find the perfect one for your learning journey."
        image={img}
      />
      <Loading
        status={loading}
        error={error}
        skeleton={<CourseCardSkeleton count={PAGE_SIZE} />}
      >
        <div className="container mt-4 rounded-3xl bg-surface-100 px-3 pb-4">
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <GridList
              records={record}
              render={(course) => <CourseCard key={course.id} {...course} />}
            />
          </div>

          {totalPages > 1 && (
            <div className="mt-10 flex justify-center gap-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() =>
                    setSearchParams({
                      page: String(index + 1),
                    })
                  }
                  className={`flex h-10 w-10 items-center justify-center rounded-lg border transition cursor-pointer ${
                    page === index + 1
                      ? "border-primary-600 bg-primary-600 text-white"
                      : "border-neutral-300 bg-white hover:border-primary-600 hover:text-primary-600"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </Loading>
    </>
  );
};

export default Courses;
