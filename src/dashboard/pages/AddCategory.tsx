import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";


import { ArrowLeft, FolderPlus, Save } from "lucide-react";
import Swal from "sweetalert2";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAddCategory } from "@store/dashboard/categories/act/actAddCategory";
import type { TCategoryFormValues } from "@types";
import { categorySchema } from "@dashboard/validations/categorySchema";





const slugify = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const AddCategory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loading = useAppSelector(
    (state) => state.dashboard.categories.loading,
  );

  const [slugEdited, setSlugEdited] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<TCategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      slug: "",
      image: "",
      description: "",
    },
  });

  const onSubmit = async (values: TCategoryFormValues) => {
    try {
      await dispatch(
        actAddCategory({
          name: values.name.trim(),
          slug: values.slug.trim(),
          image: values.image.trim() || null,
          description: values.description.trim() || null,
        }),
      ).unwrap();

      await Swal.fire({
        title: "Category added!",
        text: "The category was created successfully.",
        icon: "success",
        confirmButtonColor: "#7c3aed",
      });

      navigate("/dashboard/categories");
    } catch (error) {
      await Swal.fire({
        title: "Could not add category",
        text:
          typeof error === "string"
            ? error
            : "Something went wrong. Check the category details and try again.",
        icon: "error",
        confirmButtonColor: "#7c3aed",
      });
    }
  };

  const fieldClass =
    "mt-2 w-full rounded-xl border border-surface-300 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition placeholder:text-neutral-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10";

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <button
          type="button"
          onClick={() => navigate("/dashboard/categories")}
          className="inline-flex items-center gap-2 text-sm font-medium text-neutral-600 transition hover:text-primary-600"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Categories
        </button>

        <div className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100">
            <FolderPlus className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-ink-900">
              Add Category
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              Create a new learning category.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5 rounded-2xl border border-surface-300 bg-surface-50 p-5 shadow-sm sm:p-7"
        >
          <div>
            <label htmlFor="name" className="text-sm font-semibold text-ink-900">
              Category Name *
            </label>
            <input
              id="name"
              {...register("name", {
                onChange: (event) => {
                  if (!slugEdited) {
                    setValue("slug", slugify(event.target.value), {
                      shouldValidate: true,
                    });
                  }
                },
              })}
              placeholder="e.g. Web Development"
              className={fieldClass}
            />
            {errors.name && (
              <p className="mt-1.5 text-sm text-error-500">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="slug" className="text-sm font-semibold text-ink-900">
              Slug *
            </label>
            <input
              id="slug"
              {...register("slug", {
                onChange: () => setSlugEdited(true),
              })}
              placeholder="web-development"
              className={fieldClass}
            />
            <p className="mt-1.5 text-xs text-neutral-500">
              Used in URLs. Use lowercase letters, numbers and hyphens.
            </p>
            {errors.slug && (
              <p className="mt-1.5 text-sm text-error-500">
                {errors.slug.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="image" className="text-sm font-semibold text-ink-900">
              Image URL
            </label>
            <input
              id="image"
              {...register("image")}
              placeholder="https://example.com/category.jpg"
              className={fieldClass}
            />
            {errors.image && (
              <p className="mt-1.5 text-sm text-error-500">
                {errors.image.message}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="text-sm font-semibold text-ink-900"
            >
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              {...register("description")}
              placeholder="Describe what students will learn..."
              className={`${fieldClass} resize-y`}
            />
            {errors.description && (
              <p className="mt-1.5 text-sm text-error-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-surface-300 pt-5 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={() => navigate("/dashboard/categories")}
              className="rounded-xl border border-surface-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-600 transition hover:bg-neutral-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {loading ? "Saving..." : "Save Category"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;