import { useState } from "react";
import type { TCourseDetailsInfo } from "@types";

import img from "@assets/courseDetails.png";
import lessonImg from "@assets/courseDetails.png";

import {
  FaPlay,
  FaChevronDown,
} from "react-icons/fa";

type CourseHeroProps = {
  course: TCourseDetailsInfo;
};

const CourseHero = ({ course }: CourseHeroProps) => {
  const [openSection, setOpenSection] = useState<string | null>(
    course.sections[0]?.id ?? null,
  );

  const totalLessons = course.sections.reduce(
    (acc, section) => acc + section.lessons.length,
    0,
  );

  return (
    <section className="grid grid-cols-1 gap-8 lg:grid-cols-3">

      <div className="lg:col-span-2">
        <div
          className="
            relative
            max-h-full
            overflow-hidden
            rounded-[28px]
            bg-gradient-to-br
            from-primary-50
            to-surface-200
            p-6
            shadow-lg
          "
        >
          <img
            src={img}
            alt={course.title}
            className="
              h-full
              w-full
              rounded-2xl
              object-contain
              transition
              duration-300
              hover:scale-105
            "
          />

          <button
            className="
              absolute
              left-1/2
              top-1/2
              flex
              h-20
              w-20
              -translate-x-1/2
              -translate-y-1/2
              items-center
              justify-center
              rounded-full
              bg-white
              text-primary-600
              shadow-2xl
              transition
              duration-300
              hover:scale-110
            "
          >
            <FaPlay size={22} />
          </button>
        </div>
      </div>


      <aside
        className="
          overflow-hidden
          max-h-full
          rounded-[28px]
          border
          border-primary-100
          bg-surface-200
          shadow-lg
        "
      >

        {/* Header */}
        <div
          className="
            border-b
            border-primary-100
            bg-white
            px-6
            py-5
          "
        >
          <h2 className="text-2xl font-bold text-ink-900">
            Course Playlists
          </h2>

          <p className="mt-2 text-sm text-neutral-500">
            {course.sections.length} Sections • {totalLessons} Lessons
          </p>
        </div>


        {/* Sections */}
        <div
          className="
            custom-scroll
            h-full
            space-y-4
            overflow-y-auto
            p-4
          "
        >

          {course.sections.map((section) => {
            const isOpen = openSection === section.id;

            return (
              <div
                key={section.id}
                className="
                  overflow-hidden
                  rounded-2xl
                  border
                  border-neutral-200
                  bg-white
                  transition-all
                  duration-300
                "
              >

                {/* Section Button */}
                <button
                  onClick={() =>
                    setOpenSection(
                      isOpen ? null : section.id,
                    )
                  }
                  className={`
                    flex
                    w-full
                    items-center
                    justify-between
                    px-5
                    py-4
                    transition-all
                    duration-300

                    ${
                      isOpen
                        ? "bg-primary-600 text-white"
                        : "hover:bg-primary-50 text-ink-900"
                    }
                  `}
                >

                  <div className="text-left">
                    <h3 className="font-semibold">
                      {section.title}
                    </h3>

                    <span
                      className={`
                        text-xs

                        ${
                          isOpen
                            ? "text-primary-100"
                            : "text-neutral-500"
                        }
                      `}
                    >
                      {section.lessons.length} Lessons
                    </span>
                  </div>


                  <FaChevronDown
                    className={`
                      transition-transform
                      duration-300

                      ${
                        isOpen
                          ? "rotate-180"
                          : ""
                      }
                    `}
                  />

                </button>


              
                <div
                  className={`
                    overflow-hidden
                    transition-all
                    duration-500

                    ${
                      isOpen
                        ? "max-h-[1000px] opacity-100"
                        : "max-h-0 opacity-0"
                    }
                  `}
                >

                  <div
                    className="
                      space-y-3
                      bg-surface-50
                      p-4
                    "
                  >

                    {section.lessons.map((lesson) => (

                      <div
                        key={lesson.id}
                        className="
                          group
                          flex
                          items-center
                          gap-3
                          rounded-xl
                          border
                          border-transparent
                          bg-white
                          p-2
                          transition-all
                          duration-300
                          hover:border-primary-200
                          hover:shadow-md
                        "
                      >

                        {/* Thumbnail */}
                        <div
                          className="
                            relative
                            h-16
                            w-24
                            overflow-hidden
                            rounded-lg
                          "
                        >

                          <img
                            src={lessonImg}
                            alt={lesson.title}
                            className="
                              h-full
                              w-full
                              object-cover
                              transition
                              duration-300
                              group-hover:scale-110
                            "
                          />

                          <div
                            className="
                              absolute
                              inset-0
                              flex
                              items-center
                              justify-center
                              bg-black/25
                            "
                          >

                            <div
                              className="
                                flex
                                h-8
                                w-8
                                items-center
                                justify-center
                                rounded-full
                                bg-white
                              "
                            >
                              <FaPlay
                                size={10}
                                className="text-primary-600"
                              />
                            </div>

                          </div>

                        </div>


                        {/* Info */}
                        <div className="min-w-0 flex-1">

                          <h4
                            className="
                              truncate
                              text-sm
                              font-semibold
                              text-ink-900
                            "
                          >
                            {lesson.title}
                          </h4>

                          <p
                            className="
                              mt-1
                              text-xs
                              text-primary-600
                            "
                          >
                            Lesson {lesson.order_number}
                          </p>

                        </div>


                      </div>

                    ))}

                  </div>

                </div>

              </div>
            );
          })}

        </div>

      </aside>

    </section>
  );
};

export default CourseHero;