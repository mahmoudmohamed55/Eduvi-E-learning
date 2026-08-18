import { GraduationCap } from "lucide-react";

import EnrollmentCard from "@components/cards/EnrollmentCard";

import Loading from "@components/feedback/loading/Loading";
import { Heading } from "@components/common/heading/Heading";

import useEnrollments from "@hooks/useEnrollments";
import EnrollmentCardSkeleton from "@components/feedback/skeletons/EnrollmentCardSkeleton/EnrollmentCardSkeleton";
import GraduationCapImg from "@assets/category.png";
const Enrollments = () => {
  const { records, loading, error } = useEnrollments();

 

  return (
    <>
      <Heading
        title="My Enrollments"
        description="Continue learning and keep building your skills with the courses you have enrolled in."
        image={GraduationCapImg}
      />

      <Loading
        status={loading}
        error={error}
        skeleton={
          <div className="container mt-6 mb-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <EnrollmentCardSkeleton count={6} />
          </div>
        }
      >
        <div className="container mb-8 mt-6">
          {/* ================= Header ================= */}

          <div className="mb-6 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-ink-900">Your Courses</h2>

              <p className="mt-1 text-sm text-ink-500">
                {records.length} {records.length === 1 ? "course" : "courses"}{" "}
                enrolled
              </p>
            </div>
          </div>

          {/* ================= Empty State ================= */}

          {records.length === 0 ? (
            <div className="flex min-h-80 flex-col items-center justify-center rounded-3xl border border-dashed border-surface-400 bg-surface-50 px-6 text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                <GraduationCap size={38} />
              </div>

              <h3 className="mt-5 text-xl font-bold text-ink-900">
                No courses yet
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-ink-500">
                You haven't enrolled in any courses yet. Explore our courses and
                start your learning journey today.
              </p>
            </div>
          ) : (
            /* ================= Courses ================= */

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {records.map((course) => (
                <EnrollmentCard key={course.id} {...course} />
              ))}
            </div>
          )}
        </div>
      </Loading>
    </>
  );
};

export default Enrollments;
