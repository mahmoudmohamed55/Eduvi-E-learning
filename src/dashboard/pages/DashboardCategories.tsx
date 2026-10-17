import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Plus,
  FolderOpen,
  CalendarDays,
  RefreshCw,

  Image as ImageIcon,
} from "lucide-react";

import Swal from "sweetalert2";

import { useAppDispatch, useAppSelector } from "@store/hooks";

import { actGetCategories } from "@store/dashboard/categories/act/actGetCategories";


import DashboardTable, {
  type DashboardTableColumn,
} from "@dashboard/components/table/DashboardTable";

import TableActions from "@dashboard/components/table/TableActions";
import { actDeleteCategory } from "@store/dashboard/categories/act/Actdeletecategory";
import type { TDashboardCategory } from "@types";



const DashboardCategories = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { categories, loading, error } = useAppSelector(
    (state) => state.dashboard.categories,
  );

  const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(actGetCategories());
  }, [dispatch]);

  const filteredCategories = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return categories;

    return categories.filter((category) => {
      return (
        category.name?.toLowerCase().includes(value) ||
        category.slug?.toLowerCase().includes(value) ||
        category.description?.toLowerCase().includes(value)
      );
    });
  }, [categories, search]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const handleRefresh = () => {
    dispatch(actGetCategories());
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete category?",
      text: "Courses may depend on this category. This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      confirmButtonColor: "#7c3aed",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) return;

    try {
      await dispatch(actDeleteCategory(id)).unwrap();

      await Swal.fire({
        title: "Deleted!",
        text: "Category has been deleted successfully.",
        icon: "success",
        confirmButtonColor: "#7c3aed",
      });
    } catch (deleteError) {
      await Swal.fire({
        title: "Delete failed",
        text:
          typeof deleteError === "string"
            ? deleteError
            : "Something went wrong while deleting the category.",
        icon: "error",
        confirmButtonColor: "#7c3aed",
      });
    }
  };

  const columns: DashboardTableColumn<TDashboardCategory>[] = [
    {
      key: "category",
      header: "Category",
      render: (category) => (
        <div className="flex items-center gap-3">
          {category.image ? (
            <img
              src={category.image}
              alt={category.name}
              className="h-12 w-12 shrink-0 rounded-xl border border-surface-300 object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-primary-600">
              <ImageIcon className="h-5 w-5" />
            </div>
          )}

          <div className="min-w-0">
            <p className="truncate font-semibold text-ink-900">
              {category.name}
            </p>
            <p className="mt-0.5 truncate text-xs text-neutral-400">
              ID: {category.id}
            </p>
          </div>
        </div>
      ),
    },
    {
      key: "slug",
      header: "Slug",
      render: (category) => (
        <span className="rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-600">
          {category.slug}
        </span>
      ),
    },
    {
      key: "description",
      header: "Description",
      render: (category) => (
        <p className="max-w-xs truncate text-sm text-neutral-600">
          {category.description || "—"}
        </p>
      ),
    },
    {
      key: "created",
      header: "Created",
      render: (category) => (
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <CalendarDays className="h-4 w-4 text-neutral-400" />
          {formatDate(category.created_at)}
        </div>
      ),
    },
    {
      key: "actions",
      header: "Actions",
      className: "text-right",
      render: (category) => (
        <TableActions
          onEdit={() =>
            navigate(`/dashboard/categories/${category.id}/edit`)
          }
          onDelete={() => handleDelete(category.id)}
        />
      ),
    },
  ];

  if (loading) {
    return (
      <div className="min-h-full p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="h-8 w-48 animate-pulse rounded-lg bg-neutral-200" />
          <div className="h-12 w-full animate-pulse rounded-xl bg-neutral-200" />
          <div className="space-y-4 rounded-2xl border border-surface-300 bg-surface-50 p-6">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="h-12 w-12 animate-pulse rounded-xl bg-neutral-200" />
                <div className="h-5 flex-1 animate-pulse rounded bg-neutral-200" />
                <div className="h-5 w-24 animate-pulse rounded bg-neutral-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center p-6 text-center">
        <FolderOpen className="mb-4 h-10 w-10 text-error-500" />
        <h2 className="text-lg font-bold text-ink-900">
          Failed to load categories
        </h2>
        <p className="mt-2 max-w-md text-sm text-neutral-500">{error}</p>
        <button
          type="button"
          onClick={handleRefresh}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-700"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100">
              <FolderOpen className="h-5 w-5 text-primary-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-ink-900">
                Categories
              </h1>
              <p className="mt-0.5 text-sm text-neutral-500">
                Manage learning categories in your Eduvi platform
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/dashboard/categories/add")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 hover:shadow-md"
          >
            <Plus className="h-4 w-4" />
            Add Category
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-surface-300 bg-surface-50 p-5 shadow-sm">
            <p className="text-sm font-medium text-neutral-500">
              Total Categories
            </p>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-2xl font-bold text-ink-900">
                {categories.length}
              </p>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100">
                <FolderOpen className="h-5 w-5 text-primary-600" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-surface-300 bg-surface-50 p-5 shadow-sm">
            <p className="text-sm font-medium text-neutral-500">
              With Images
            </p>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-2xl font-bold text-ink-900">
                {categories.filter((category) => category.image).length}
              </p>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-100">
                <ImageIcon className="h-5 w-5 text-accent-600" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-surface-300 bg-surface-50 p-5 shadow-sm">
            <p className="text-sm font-medium text-neutral-500">
              Without Images
            </p>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-2xl font-bold text-ink-900">
                {categories.filter((category) => !category.image).length}
              </p>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-100">
                <ImageIcon className="h-5 w-5 text-secondary-500" />
              </div>
            </div>
          </div>
        </div>

    
        <div className="flex flex-col gap-3 rounded-2xl border border-surface-300 bg-surface-50 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, slug or description..."
              className="h-11 w-full rounded-xl border border-surface-300 bg-neutral-50 pl-10 pr-4 text-sm text-ink-900 outline-none transition placeholder:text-neutral-400 focus:border-primary-500 focus:bg-white focus:ring-4 focus:ring-primary-500/10"
            />
          </div>

          <button
            type="button"
            onClick={handleRefresh}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-surface-300 bg-white px-4 text-sm font-medium text-neutral-600 transition hover:border-primary-300 hover:bg-primary-50 hover:text-primary-600"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-surface-300 bg-surface-50 shadow-sm">
          <div className="flex flex-col gap-1 border-b border-surface-300 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-ink-900">
                All Categories
              </h2>
              <p className="mt-1 text-xs text-neutral-500">
                Showing {filteredCategories.length} of {categories.length} categories
              </p>
            </div>
          </div>

          {filteredCategories.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
                <Search className="h-6 w-6 text-neutral-400" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-ink-900">
                No categories found
              </h3>
              <p className="mt-1 text-sm text-neutral-500">
                Try changing your search keyword.
              </p>
            </div>
          ) : (
            <DashboardTable
              columns={columns}
              data={filteredCategories}
              rowKey={(category) => category.id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardCategories;