import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { ArrowLeft, FolderPen, Save } from "lucide-react";
import Swal from "sweetalert2";


import { useAppDispatch, useAppSelector } from "@store/hooks";

import { actUpdateCategory } from "@store/dashboard/categories/act/actUpdateCategory";
import type { TCategoryFormValues } from "@types";

import { actGetCategoryById } from "@store/dashboard/categories/act/actGetCategoryById";



const categorySchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters"),
  slug: z
    .string()
    .trim()
    .min(2, "Slug must be at least 2 characters")
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only"),
  image: z.union([z.literal(""), z.url("Enter a valid image URL")]),
  description: z.string(),
});

const DashboardEditCategory = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const saving = useAppSelector(
    (state) => state.dashboard.categories.loading,
  );

  const [loadingCategory, setLoadingCategory] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
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

useEffect(() => {
  let active = true;

  const getCategory = async () => {
    if (!id) {
      setLoadError("Category ID is missing.");
      setLoadingCategory(false);
      return;
    }

    setLoadingCategory(true);
    setLoadError(null);

    try {
      const category = await dispatch(
        actGetCategoryById(id),
      ).unwrap();

      if (!active) return;

      reset({
        name: category.name,
        slug: category.slug,
        image: category.image ?? "",
        description: category.description ?? "",
      });
    } catch (error) {
      if (!active) return;

      setLoadError(
        typeof error === "string"
          ? error
          : "Failed to load category.",
      );
    } finally {
      if (active) {
        setLoadingCategory(false);
      }
    }
  };

  void getCategory();

  return () => {
    active = false;
  };
}, [dispatch, id, reset]);

  const onSubmit = async (values: TCategoryFormValues) => {
    if (!id) return;

    try {
      await dispatch(
        actUpdateCategory({
          id,
          category: {
            name: values.name.trim(),
            slug: values.slug.trim(),
            image: values.image.trim() || null,
            description: values.description.trim() || null,
          },
        }),
      ).unwrap();

      await Swal.fire({
        title: "Category updated!",
        text: "Your changes have been saved.",
        icon: "success",
        confirmButtonColor: "#7c3aed",
      });

      navigate("/dashboard/categories");
    } catch (error) {
      await Swal.fire({
        title: "Update failed",
        text:
          typeof error === "string"
            ? error
            : "Something went wrong while updating the category.",
        icon: "error",
        confirmButtonColor: "#7c3aed",
      });
    }
  };

  const fieldClass =
    "mt-2 w-full rounded-xl border border-surface-300 bg-white px-4 py-3 text-sm text-ink-900 outline-none transition placeholder:text-neutral-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10";

  if (loadingCategory) {
    return (
      <div className="p-8">
        <div className="mx-auto max-w-3xl space-y-5">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-neutral-200" />
          <div className="h-72 animate-pulse rounded-2xl bg-neutral-200" />
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="mx-auto flex min-h-[400px] max-w-3xl flex-col items-center justify-center p-6 text-center">
        <h2 className="text-lg font-bold text-ink-900">
          Unable to load category
        </h2>
        <p className="mt-2 text-sm text-error-500">{loadError}</p>
        <button
          type="button"
          onClick={() => navigate("/dashboard/categories")}
          className="mt-5 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
        >
          Back to Categories
        </button>
      </div>
    );
  }

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
            <FolderPen className="h-6 w-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-ink-900">
              Edit Category
            </h1>
            <p className="mt-1 text-sm text-neutral-500">
              Update the category information.
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
              {...register("name")}
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
              {...register("slug")}
              className={fieldClass}
            />
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
              className={`${fieldClass} resize-y`}
            />
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
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DashboardEditCategory;