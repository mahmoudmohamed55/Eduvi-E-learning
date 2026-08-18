import { Link } from "react-router-dom";
import { FaStar, FaSignal, FaHeart, FaRegHeart } from "react-icons/fa";
import { HiArrowRight } from "react-icons/hi2";
import { LoaderCircle } from "lucide-react";

import type { TCourse } from "@types";

import { useAppDispatch, useAppSelector } from "@store/hooks";

import { actLikeToggle } from "@store/wishList/wishlistSlice";

const CourseCard = ({
  id,
  slug,
  thumbnail: image,
  title,
  instructor,
  level,
  rate,
  price,
  description,
  isLiked,
  isEnrolled,
}: TCourse) => {
  const dispatch = useAppDispatch();

  const { toggleLoading, toggleCourseId } = useAppSelector(
    (state) => state.wishlist,
  );

  const isToggling = toggleLoading === "pending" && toggleCourseId === id;

  const handleLike = (id: string) => {
    if (isToggling) return;

    dispatch(actLikeToggle(id));
  };

  return (
    <div className="group block overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary-200 hover:shadow-xl">
      <div className="relative overflow-hidden">
        {isToggling ? (
          <LoaderCircle
            size={22}
            className="absolute left-3 top-3 z-30 animate-spin text-primary-600"
          />
        ) : isLiked ? (
          <FaHeart
            className="absolute left-3 top-3 z-30 cursor-pointer text-2xl text-red-600"
            onClick={() => handleLike(id)}
          />
        ) : (
          <FaRegHeart
            className="absolute left-3 top-3 z-30 cursor-pointer text-2xl text-red-600"
            onClick={() => handleLike(id)}
          />
        )}

        <img
          src={image}
          alt={title}
          className="h-48 w-full object-cover transition duration-500 group-hover:scale-110"
        />

        <div className="absolute right-3 top-3 flex items-center gap-1 rounded-lg bg-white px-2 py-1 shadow">
          <FaStar className="text-xs text-accent-500" />

          <span className="text-xs font-bold text-ink-900">{rate}</span>
        </div>
      </div>

      <div className="p-5">
        <h3 className="line-clamp-1 text-lg font-bold text-ink-900 transition-colors group-hover:text-primary-600">
          {title}
        </h3>

        <p className="mt-2 line-clamp-2 text-sm leading-7 text-neutral-500">
          {description}
        </p>

        <div className="mt-5 flex items-center gap-3">
          <img
            src={instructor.avatar}
            alt={instructor.full_name}
            className="h-10 w-10 rounded-full"
          />

          <p className="mt-3 line-clamp-2 text-sm leading-6 text-neutral-500">
            {instructor.full_name}
          </p>
        </div>

        <div className="mt-5 flex items-center justify-between border-y border-neutral-200 py-3 text-sm">
          <div className="flex items-center gap-2 text-success-500">
            <FaSignal />

            <span>{level}</span>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <span className="text-2xl font-bold text-ink-900 ">
            {price === 0 ? "Free" : isEnrolled ? "Enrolled" : `$${price}`}
          </span>

          <Link
            to={`/courses/${slug}`}
            className="flex items-center gap-2 rounded-lg border border-primary-600 px-4 py-2 text-sm font-semibold text-primary-600 transition-all duration-300 group-hover:bg-primary-600 group-hover:text-white"
          >
            {isEnrolled ? "Continue Learning" : "Enroll Now"}
            <HiArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
