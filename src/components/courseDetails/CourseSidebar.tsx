import type { TCourseDetailsInfo } from "@types";
import { FaStar } from "react-icons/fa";

type CourseSidebarProps = {
  course: TCourseDetailsInfo;
};

const CourseSidebar = ({ course }: CourseSidebarProps) => {
  const totalLessons = course.sections.reduce(
    (acc, section) => acc + section.lessons.length,
    0,
  );

  const averageRating =
    course.reviews.length > 0
      ? (
          course.reviews.reduce(
            (acc, review) => acc + review.rating,
            0,
          ) / course.reviews.length
        ).toFixed(1)
      : "0.0";


  return (
    <aside
      className="
        rounded-3xl
        bg-white
        p-6
        shadow-lg
        max-h-fit
      "
    >

      <div className="space-y-4">

        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-500">
            Price
          </span>

          <span className="font-bold text-secondary-600">
            ${course.price}
          </span>
        </div>


        {/* Instructor */}
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-500">
            Instructor
          </span>

          <span className="font-semibold text-ink-900">
            {course.instructor?.full_name ?? "Unknown"}
          </span>
        </div>


        {/* Rating */}
        <div className="flex items-center justify-between">

          <span className="text-sm text-neutral-500">
            Rating
          </span>


          <div className="flex items-center gap-2">

            <div className="flex gap-1">
              {[1,2,3,4,5].map((star)=>(
                <FaStar
                  key={star}
                  className={
                    star <= Math.round(Number(averageRating))
                      ? "text-warning-500"
                      : "text-neutral-300"
                  }
                  size={14}
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

            <span className="text-sm text-neutral-500">
              Level
            </span>

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

          <span className="text-sm text-neutral-500">
            Lessons
          </span>

          <span className="font-semibold text-ink-900">
            {totalLessons}
          </span>

        </div>




        <div className="flex items-center justify-between">

          <span className="text-sm text-neutral-500">
            Sections
          </span>

          <span className="font-semibold text-ink-900">
            {course.sections.length}
          </span>

        </div>


      </div>



      {/* Button */}
      <button
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
        "
      >
        Purchase Course
      </button>


    </aside>
  );
};

export default CourseSidebar;