import {
  ArrowRight,
  BookOpen,
  Clock3,
  GraduationCap,
  PlayCircle,
  Star,
} from "lucide-react";

import type { TCourse } from "@types";

interface EnrollmentCardProps extends TCourse {
  onContinue?: () => void;
}

const EnrollmentCard = ({
  title,
  description,
  thumbnail,
  price,
  level,
  rate,
  onContinue,
}: EnrollmentCardProps) => {
  return (
    <article className="group overflow-hidden rounded-3xl border border-surface-300 bg-surface-50 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      {/* ================= Image ================= */}

      <div className="relative h-52 overflow-hidden">
        <img
          src={thumbnail}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-linear-to-t from-ink-950/70 via-transparent to-transparent" />

        {/* Level */}

        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
            {level}
          </span>
        </div>

        {/* Rating */}

        <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-sm font-semibold text-ink-800 shadow-lg">
          <Star
            size={15}
            className="fill-accent-500 text-accent-500"
          />

          <span>{rate}</span>
        </div>

        {/* Completed / Enrolled */}

        <div className="absolute bottom-4 left-4 flex items-center gap-2 text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-600">
            <GraduationCap size={18} />
          </div>

          <div>
            <p className="text-xs text-white/70">
              Your course
            </p>

            <p className="text-sm font-semibold">
              Enrolled
            </p>
          </div>
        </div>
      </div>

      {/* ================= Content ================= */}

      <div className="p-5">
        <h3 className="line-clamp-2 min-h-14 text-lg font-bold leading-7 text-ink-900 transition-colors group-hover:text-primary-600">
          {title}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-ink-500">
          {description}
        </p>

        {/* Stats */}

        <div className="mt-5 flex items-center gap-4 border-t border-surface-300 pt-4 text-sm text-ink-500">
          <div className="flex items-center gap-1.5">
            <BookOpen size={16} className="text-primary-600" />
            <span>Course</span>
          </div>

          <div className="flex items-center gap-1.5">
            <Clock3 size={16} className="text-secondary-500" />
            <span>Self paced</span>
          </div>
        </div>

        {/* Footer */}

        <div className="mt-5 flex items-center justify-between">
          <div>
            <span className="text-xs text-ink-400">
              Course price
            </span>

            <p className="text-xl font-bold text-ink-900">
              {price === 0 ? "Free" : `$${price}`}
            </p>
          </div>

          <button
            type="button"
            onClick={onContinue}
            className="group/button flex items-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-primary-700"
          >
            <PlayCircle size={18} />

            <span>Continue</span>

            <ArrowRight
              size={16}
              className="transition-transform duration-300 group-hover/button:translate-x-1"
            />
          </button>
        </div>
      </div>
    </article>
  );
};

export default EnrollmentCard;