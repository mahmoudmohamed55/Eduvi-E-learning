import type { TCategory } from "@types";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";

const CategoryCard = ({
  slug,
  image,
  name,
  description,
  courses,
}: TCategory) => {
  return (
    <Link
      to={`/categories/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-200 hover:shadow-lg"
    >

      <div className="flex gap-5 p-5">
        <div className="w-32 h-full  shrink-0 overflow-hidden rounded-xl bg-primary-50">
          <img
            src={image}
            alt={name}
            className="h-full  object-cover transition duration-500 group-hover:scale-110"
          />
        </div>

        <div className="flex flex-1 flex-col justify-center">
          <h3 className="text-2xl font-bold text-ink-900 transition-colors group-hover:text-primary-600">
            {name}
          </h3>

          <p className="mt-2 line-clamp-3 text-sm leading-7 text-neutral-500">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-neutral-200 px-5 py-4">
        <span className="rounded-md bg-primary-100 px-3 py-1.5 text-xs font-semibold text-primary-700">
          {courses.length} Courses
        </span>

        <span className="flex items-center gap-2 font-semibold text-primary-600">
          Explore

          <FaArrowRightLong className="transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110 animate-bounce" />
        </span>
      </div>
    </Link>
  );
};

export default CategoryCard;