import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, LoaderCircle } from "lucide-react";
import Swal from "sweetalert2";
import { z } from "zod";

import { useAppDispatch, useAppSelector } from "@store/hooks";

import {
  actAddCourse,
  actGetCourseById,
  actGetCourseFormOptions,
  actUpdateCourse,
  clearSelectedCourse,
} from "@store/dashboard/courses/courseSlice";
import type { TCourseFormValues } from "@types";
import courseSchema from "@validations/courseSchema";

type TCourseFormProps = {
  mode: "add" | "edit";
};

const defaultValues: TCourseFormValues = {
  title: "",
  slug: "",
  description: "",
  thumbnail: "",
  price: 0,
  category_id: "",
  instructor_id: "",
  level: "beginner",
  rate: 0,
};

const DashboardCourseForm = ({ mode }: TCourseFormProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    selectedCourse,
    selectedLoading,
    selectedError,
    options,
    optionsLoading,
    saving,
  } = useAppSelector((state) => state.dashboard.courses);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<z.input<typeof courseSchema>, any, z.output<typeof courseSchema>>(
    {
      resolver: zodResolver(courseSchema),
      defaultValues,
    },
  );

  useEffect(() => {
    dispatch(actGetCourseFormOptions());

    if (mode === "edit" && id) {
      dispatch(actGetCourseById(id));
    }

    return () => {
      dispatch(clearSelectedCourse());
    };
  }, [dispatch, mode, id]);

  useEffect(() => {
    if (mode === "edit" && selectedCourse) {
      reset({
        title: selectedCourse.title,
        slug: selectedCourse.slug,
        description: selectedCourse.description ?? "",
        thumbnail: selectedCourse.thumbnail ?? "",
        price: Number(selectedCourse.price),
        category_id: selectedCourse.category_id,
        instructor_id: selectedCourse.instructor_id,
        level: selectedCourse.level,
        rate: Number(selectedCourse.rate ?? 0),
      });
    }
  }, [mode, selectedCourse, reset]);

  const onSubmit = async (values: z.output<typeof courseSchema>) => {
    const result =
      mode === "add"
        ? await dispatch(actAddCourse(values))
        : await dispatch(
            actUpdateCourse({
              id: id!,
              data: values,
            }),
          );

    if (
      actAddCourse.fulfilled.match(result) ||
      actUpdateCourse.fulfilled.match(result)
    ) {
      await Swal.fire({
        title: "Success",
        text:
          mode === "add"
            ? "Course added successfully."
            : "Course updated successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/dashboard/courses");
    } else {
      Swal.fire({
        title: "Error",
        text: String(result.payload ?? "Something went wrong"),
        icon: "error",
      });
    }
  };

  if (mode === "edit" && selectedLoading) {
    return <p className="py-12 text-center text-gray-500">Loading course...</p>;
  }

  if (mode === "edit" && selectedError) {
    return (
      <div className="space-y-4">
        <p className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
          {selectedError}
        </p>

        <button
          type="button"
          onClick={() => navigate("/dashboard/courses")}
          className="text-sm font-medium text-violet-600 transition hover:text-violet-700"
        >
          Back to courses
        </button>
      </div>
    );
  }

  if (mode === "edit" && !selectedCourse) {
    return null;
  }

  const fieldClass =
    "mt-2 w-full rounded-lg border border-violet-100 bg-white px-3 py-2.5 text-sm text-gray-800 outline-none transition placeholder:text-gray-400 focus:border-violet-400 focus:ring-2 focus:ring-violet-100";

  const labelClass = "block text-sm font-medium text-gray-700";

  return (
    <section className="mx-auto max-w-4xl space-y-6">
      {/* Back button */}
      <button
        type="button"
        onClick={() => navigate("/dashboard/courses")}
        className="inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-violet-600"
      >
        <ArrowLeft size={17} />
        Back to courses
      </button>

      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {mode === "add" ? "Add Course" : "Edit Course"}
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          {mode === "add"
            ? "Fill in the information to create a course."
            : "Update the course information."}
        </p>
      </div>

      {optionsLoading && (
        <p className="text-sm text-gray-500">
          Loading categories and instructors...
        </p>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 rounded-xl border border-violet-200 bg-white p-5 sm:p-7"
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {/* Course title */}
          <div>
            <label className={labelClass}>Course title</label>

            <input
              {...register("title", {
                onChange: (event) => {
                  const slug = event.target.value
                    .toLowerCase()
                    .trim()
                    .replace(/[^a-z0-9]+/g, "-")
                    .replace(/^-|-$/g, "");

                  setValue("slug", slug, {
                    shouldValidate: true,
                  });
                },
              })}
              placeholder="React Fundamentals"
              className={fieldClass}
            />

            {errors.title && (
              <p className="mt-1 text-xs text-red-600">
                {errors.title.message}
              </p>
            )}
          </div>

          {/* Slug */}
          <div>
            <label className={labelClass}>Slug</label>

            <input
              {...register("slug")}
              placeholder="react-fundamentals"
              className={fieldClass}
            />

            {errors.slug && (
              <p className="mt-1 text-xs text-red-600">{errors.slug.message}</p>
            )}
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label className={labelClass}>Description</label>

            <textarea
              {...register("description")}
              rows={4}
              placeholder="Describe what students will learn..."
              className={`${fieldClass} resize-y`}
            />

            {errors.description && (
              <p className="mt-1 text-xs text-red-600">
                {errors.description.message}
              </p>
            )}
          </div>

          {/* Thumbnail */}
          <div className="sm:col-span-2">
            <label className={labelClass}>Thumbnail URL</label>

            <input
              {...register("thumbnail")}
              placeholder="https://example.com/course.jpg"
              className={fieldClass}
            />

            {errors.thumbnail && (
              <p className="mt-1 text-xs text-red-600">
                {errors.thumbnail.message}
              </p>
            )}
          </div>

          {/* Category */}
          <div>
            <label className={labelClass}>Category</label>

            <select {...register("category_id")} className={fieldClass}>
              <option value="">Choose category</option>

              {options.categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {errors.category_id && (
              <p className="mt-1 text-xs text-red-600">
                {errors.category_id.message}
              </p>
            )}
          </div>

          {/* Instructor */}
          <div>
            <label className={labelClass}>Instructor</label>

            <select {...register("instructor_id")} className={fieldClass}>
              <option value="">Choose instructor</option>

              {options.instructors.map((instructor) => (
                <option key={instructor.id} value={instructor.id}>
                  {instructor.full_name}
                </option>
              ))}
            </select>

            {errors.instructor_id && (
              <p className="mt-1 text-xs text-red-600">
                {errors.instructor_id.message}
              </p>
            )}
          </div>

          {/* Level */}
          <div>
            <label className={labelClass}>Level</label>

            <select {...register("level")} className={fieldClass}>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            {errors.level && (
              <p className="mt-1 text-xs text-red-600">
                {errors.level.message}
              </p>
            )}
          </div>

          {/* Price */}
          <div>
            <label className={labelClass}>Price</label>

            <input
              type="number"
              min="0"
              step="0.01"
              {...register("price", { valueAsNumber: true })}
              className={fieldClass}
            />

            {errors.price && (
              <p className="mt-1 text-xs text-red-600">
                {errors.price.message}
              </p>
            )}
          </div>

          {/* Rating */}
          <div>
            <label className={labelClass}>Rating (0–5)</label>

            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              {...register("rate", { valueAsNumber: true })}
              className={fieldClass}
            />

            {errors.rate && (
              <p className="mt-1 text-xs text-red-600">{errors.rate.message}</p>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap justify-end gap-3 border-t border-violet-100 pt-5">
          <button
            type="button"
            onClick={() => navigate("/dashboard/courses")}
            className="rounded-lg border border-violet-100 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-violet-50 hover:text-violet-700"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={saving || optionsLoading}
            className="inline-flex items-center gap-2 rounded-lg bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-violet-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {saving && <LoaderCircle size={16} className="animate-spin" />}

            {saving
              ? "Saving..."
              : mode === "add"
                ? "Add Course"
                : "Save Changes"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default DashboardCourseForm;
