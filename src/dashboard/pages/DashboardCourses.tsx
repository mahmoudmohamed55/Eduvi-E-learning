import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";
import Swal from "sweetalert2";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
  actDeleteCourse,
  actGetCourses,
} from "@store/dashboard/courses/courseSlice";

const PAGE_SIZE = 6;
const MAX_VISIBLE_PAGES = 5;

const DashboardCourses = () => {
  const dispatch = useAppDispatch();

  const { record, total, loading, error } = useAppSelector(
    (state) => state.dashboard.courses,
  );

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(actGetCourses({ page, search }));
  }, [dispatch, page, search]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  useEffect(() => {
    if (page > totalPages) {
      setPage(totalPages);
    }
  }, [page, totalPages]);

  // Generate visible pagination numbers.
  const getVisiblePages = () => {
    const visibleCount = Math.min(MAX_VISIBLE_PAGES, totalPages);
    let start = Math.max(1, page - Math.floor(visibleCount / 2));

    let end = start + visibleCount - 1;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - visibleCount + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
  };

  const visiblePages = getVisiblePages();

  const handleDelete = async (id: string, title: string) => {
    const result = await Swal.fire({
      title: "Delete course?",
      text: `Are you sure you want to delete "${title}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#dc2626",
    });

    if (!result.isConfirmed) return;

    const response = await dispatch(actDeleteCourse(id));

    if (actDeleteCourse.fulfilled.match(response)) {
      await Swal.fire({
        title: "Deleted!",
        text: "Course deleted successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      const nextTotal = total - 1;
      const nextPage = Math.min(
        page,
        Math.max(1, Math.ceil(nextTotal / PAGE_SIZE)),
      );

      if (nextPage !== page) {
        setPage(nextPage);
      } else {
        dispatch(actGetCourses({ page: nextPage, search }));
      }
    } else {
      Swal.fire({
        title: "Error",
        text: String(response.payload ?? "Failed to delete course"),
        icon: "error",
      });
    }
  };

  const pageButtonClass = (active: boolean) =>
    `flex h-9 min-w-9 items-center justify-center rounded-lg border px-3 text-sm font-medium transition cursor-pointer ${
      active
        ? "border-violet-600 bg-violet-600 text-white shadow-sm"
        : "border-violet-100 bg-white text-gray-600 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700"
    }`;

  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Courses</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage all courses on your platform.
          </p>
        </div>

        <Link
          to="/dashboard/courses/add"
          className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700"
        >
          <Plus size={18} />
          Add Course
        </Link>
      </div>

      {/* Search and refresh */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="relative w-full max-w-md">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="search"
            value={search}
            onChange={(event) => {
              setSearch(event.target.value);
              setPage(1);
            }}
            placeholder="Search by title or slug..."
            className="w-full rounded-lg border border-violet-100 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100"
          />
        </div>

        <button
          type="button"
          onClick={() => dispatch(actGetCourses({ page, search }))}
          disabled={loading}
          className="inline-flex items-center gap-2 rounded-lg border border-violet-100 bg-white px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-violet-50 hover:text-violet-700 disabled:opacity-50"
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          Refresh
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* Courses table */}
      <div className="overflow-x-auto rounded-xl border border-violet-200 bg-white">
        <table className="w-full min-w-[850px] text-left text-sm">
          <thead className="border-b border-violet-200 bg-white text-gray-500">
            <tr>
              <th className="px-5 py-4 font-semibold">Course</th>
              <th className="px-5 py-4 font-semibold">Category</th>
              <th className="px-5 py-4 font-semibold">Instructor</th>
              <th className="px-5 py-4 font-semibold">Level</th>
              <th className="px-5 py-4 font-semibold">Price</th>
              <th className="px-5 py-4 text-right font-semibold">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-violet-100">
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-12 text-center text-gray-500"
                >
                  Loading courses...
                </td>
              </tr>
            ) : record.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  className="px-5 py-12 text-center text-gray-500"
                >
                  No courses found.
                </td>
              </tr>
            ) : (
              record.map((course) => (
                <tr
                  key={course.id}
                  className="transition hover:bg-violet-50/40"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      {course.thumbnail ? (
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="h-12 w-16 shrink-0 rounded-md border border-gray-100 object-cover"
                        />
                      ) : (
                        <div className="flex h-12 w-16 shrink-0 items-center justify-center rounded-md bg-violet-50 text-xs font-medium text-violet-600">
                          Course
                        </div>
                      )}

                      <div className="min-w-0">
                        <p className="max-w-64 truncate font-semibold text-gray-900">
                          {course.title}
                        </p>
                        <p className="mt-1 max-w-64 truncate text-xs text-gray-500">
                          {course.slug}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {course.category?.name ?? "—"}
                  </td>

                  <td className="px-5 py-4 text-gray-600">
                    {course.instructor?.full_name ?? "—"}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full border border-violet-100 bg-violet-50 px-2.5 py-1 text-xs font-medium capitalize text-violet-700">
                      {course.level}
                    </span>
                  </td>

                  <td className="px-5 py-4 font-semibold text-gray-900">
                    {Number(course.price).toFixed(2)}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        to={`/dashboard/courses/${course.id}/edit`}
                        aria-label={`Edit ${course.title}`}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-violet-50 hover:text-violet-600"
                      >
                        <Pencil size={17} />
                      </Link>

                      <button
                        type="button"
                        aria-label={`Delete ${course.title}`}
                        onClick={() => handleDelete(course.id, course.title)}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          Showing {total === 0 ? 0 : (page - 1) * PAGE_SIZE + 1}
          {"–"}
          {Math.min(page * PAGE_SIZE, total)} of {total} courses
        </p>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            aria-label="Previous page"
            disabled={page === 1 || loading}
            onClick={() => setPage((current) => current - 1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-100 bg-white text-gray-600 transition hover:bg-violet-50 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronLeft size={17} />
          </button>

          {visiblePages[0] > 1 && (
            <>
              <button
                type="button"
                onClick={() => setPage(1)}
                className={pageButtonClass(page === 1)}
              >
                1
              </button>

              {visiblePages[0] > 2 && (
                <span className="flex h-9 w-6 items-center justify-center text-gray-400">
                  <MoreHorizontal size={18} />
                </span>
              )}
            </>
          )}

          {visiblePages.map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              aria-label={`Go to page ${pageNumber}`}
              aria-current={page === pageNumber ? "page" : undefined}
              onClick={() => setPage(pageNumber)}
              className={pageButtonClass(page === pageNumber)}
            >
              {pageNumber}
            </button>
          ))}

          {visiblePages[visiblePages.length - 1] < totalPages && (
            <>
              {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
                <span className="flex h-9 w-6 items-center justify-center text-gray-400">
                  <MoreHorizontal size={18} />
                </span>
              )}

              <button
                type="button"
                onClick={() => setPage(totalPages)}
                className={pageButtonClass(page === totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            type="button"
            aria-label="Next page"
            disabled={page >= totalPages || loading}
            onClick={() => setPage((current) => current + 1)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-violet-100 bg-white text-gray-600 transition hover:bg-violet-50 hover:text-violet-700 disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default DashboardCourses;
