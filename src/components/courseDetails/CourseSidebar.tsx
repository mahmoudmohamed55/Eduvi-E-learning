import { LottieHandler } from "@components/feedback/lottie/LottieHandler";
import useAuth from "@hooks/useAuth";
import actAddEnrollments from "@store/enrollments/act/actAddenrollments";
import { useAppDispatch } from "@store/hooks";
import type { TCourseDetailsInfo } from "@types";
import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

type CourseSidebarProps = {
  course: TCourseDetailsInfo;
};

const CourseSidebar = ({ course }: CourseSidebarProps) => {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const totalLessons = course.sections.reduce(
    (acc, section) => acc + section.lessons.length,
    0,
  );

  const averageRating =
    course.reviews.length > 0
      ? (
          course.reviews.reduce((acc, review) => acc + review.rating, 0) /
          course.reviews.length
        ).toFixed(1)
      : "0.0";

  const handlePurchase = async () => {
    if (!user) {
      navigate("/login");
    }
    try {
      setLoading(true);
      setSuccess(false);

      await dispatch(actAddEnrollments(course.id!)).unwrap();

      setSuccess(true);
    } catch (error) {
      console.error("Enrollment failed:", error);
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };
  return (
    <aside
      className="
        max-h-fit
        rounded-3xl
        bg-white
        p-6
        shadow-lg
      "
    >
      <div className="space-y-4">
        {/* Price */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-500">Price</span>

          <span className="font-bold text-secondary-600">${course.price}</span>
        </div>

        {/* Instructor */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-500">Instructor</span>

          <span className="font-semibold text-ink-900">
            {course.instructor?.full_name ?? "Unknown"}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-500">Rating</span>

          <div className="flex items-center gap-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <FaStar
                  key={star}
                  size={14}
                  className={
                    star <= Math.round(Number(averageRating))
                      ? "text-warning-500"
                      : "text-neutral-300"
                  }
                />
              ))}
            </div>

            <span className="text-sm font-semibold text-ink-900">
              {averageRating}
            </span>
          </div>
        </div>

        {/* Level */}
        {course.level && (
          <div className="flex items-center justify-between">
            <span className="text-sm text-neutral-500">Level</span>

            <span
              className="
                rounded-full
                bg-primary-50
                px-3
                py-1
                text-xs
                font-semibold
                text-primary-600
              "
            >
              {course.level}
            </span>
          </div>
        )}

        {/* Lessons */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-500">Lessons</span>

          <span className="font-semibold text-ink-900">{totalLessons}</span>
        </div>

        {/* Sections */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-500">Sections</span>

          <span className="font-semibold text-ink-900">
            {course.sections.length}
          </span>
        </div>
      </div>

      {/* Purchase Button */}
      <button
        type="button"
        disabled={loading || success || course.isEnrolled}
        onClick={handlePurchase}
        className="
          mt-6
          w-full
          rounded-xl
          bg-primary-600
          py-3
          text-sm
          font-semibold
          text-white
          transition
          duration-300
          hover:bg-primary-700
          hover:shadow-lg
          disabled:cursor-not-allowed
          disabled:opacity-60
        "
      >
        {loading
          ? "Processing..."
          : success
            ? "Enrolled Successfully"
            : course.isEnrolled
              ? "Enrolled"
              : "Enroll Now"}
      </button>

      {success && (
        <div className="mt-4">
          <LottieHandler
            type="success"
            message="Course added to your enrollments successfully!"
          />
        </div>
      )}
    </aside>
  );
};

export default CourseSidebar;
