import { actGetUsers } from "@store/dashboard/users/act/actGetUsers";
import { actDeleteUser } from "@store/dashboard/users/act/actDeleteUser";

import { useAppDispatch, useAppSelector } from "@store/hooks";

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Search,
  Plus,
  UserRound,
  Phone,
  CalendarDays,
  ShieldCheck,
  UsersRound,
  RefreshCw,
} from "lucide-react";

import Swal from "sweetalert2";

import DashboardTable, {
  type DashboardTableColumn,
} from "@dashboard/components/table/DashboardTable";

import TableActions from "@dashboard/components/table/TableActions";

const DashboardUsers = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { users, loading, error } = useAppSelector(
    (state) => state.dashboard.users,
  );

  const [search, setSearch] = useState("");

  // =========================
  // GET USERS
  // =========================

  useEffect(() => {
    dispatch(actGetUsers());
  }, [dispatch]);

  // =========================
  // SEARCH
  // =========================

  const filteredUsers = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) return users;

    return users.filter((user) => {
      return (
        user.full_name?.toLowerCase().includes(value) ||
        user.phone?.toLowerCase().includes(value) ||
        user.role?.toLowerCase().includes(value)
      );
    });
  }, [users, search]);

  // =========================
  // ROLE STYLES
  // =========================

  const getRoleStyles = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-primary-100 text-primary-700 ring-primary-200";

      case "instructor":
        return "bg-accent-100 text-accent-700 ring-accent-200";

      default:
        return "bg-neutral-100 text-neutral-700 ring-neutral-200";
    }
  };

  // =========================
  // DATE
  // =========================

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // =========================
  // REFRESH
  // =========================

  const handleRefresh = () => {
    dispatch(actGetUsers());
  };

  // =========================
  // DELETE USER
  // =========================

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Delete user?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      confirmButtonColor: "#7c3aed",
      cancelButtonColor: "#6b7280",
    });

    if (!result.isConfirmed) {
      return;
    }

    try {
      await dispatch(actDeleteUser(id)).unwrap();

      await Swal.fire({
        title: "Deleted!",
        text: "User has been deleted successfully.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#7c3aed",
      });
    } catch (error) {
      await Swal.fire({
        title: "Delete failed",
        text:
          typeof error === "string"
            ? error
            : "Something went wrong while deleting the user.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#7c3aed",
      });
    }
  };

  // =========================
  // TABLE COLUMNS
  // =========================

  const columns: DashboardTableColumn<(typeof users)[number]>[] = [
    {
      key: "user",
      header: "User",

      render: (user) => (
        <div className="flex items-center gap-3">
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.full_name}
              className="h-11 w-11 shrink-0 rounded-full border-2 border-white object-cover shadow-sm ring-1 ring-surface-300"
            />
          ) : (
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary-100 text-primary-600">
              <UserRound className="h-5 w-5" />
            </div>
          )}

          <div className="min-w-0">
            <p className="truncate font-semibold text-ink-900">
              {user.full_name || "Unnamed User"}
            </p>

            <p className="mt-0.5 max-w-[230px] truncate text-xs text-neutral-400">
              ID: {user.id}
            </p>
          </div>
        </div>
      ),
    },

    {
      key: "phone",
      header: "Phone",

      render: (user) => (
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <Phone className="h-4 w-4 text-neutral-400" />

          <span>{user.phone || "—"}</span>
        </div>
      ),
    },

    {
      key: "role",
      header: "Role",

      render: (user) => (
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold capitalize ring-1 ring-inset ${getRoleStyles(
            user.role,
          )}`}
        >
          {user.role === "admin" && (
            <ShieldCheck className="h-3.5 w-3.5" />
          )}

          {user.role}
        </span>
      ),
    },

    {
      key: "created",
      header: "Created",

      render: (user) => (
        <div className="flex items-center gap-2 text-sm text-neutral-600">
          <CalendarDays className="h-4 w-4 text-neutral-400" />

          {formatDate(user.created_at)}
        </div>
      ),
    },

    {
      key: "actions",
      header: "Actions",
      className: "text-right",

      render: (user) => (
        <TableActions
          onEdit={() => {
            navigate(`/dashboard/users/${user.id}/edit`);
          }}
          onDelete={() => {
            handleDelete(user.id);
          }}
        />
      ),
    },
  ];

  // =========================
  // LOADING
  // =========================

  if (loading) {
    return (
      <div className="min-h-full p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-8 w-32 animate-pulse rounded-lg bg-neutral-200" />

              <div className="h-4 w-64 animate-pulse rounded-lg bg-neutral-200" />
            </div>

            <div className="h-11 w-32 animate-pulse rounded-xl bg-neutral-200" />
          </div>

          <div className="h-12 w-full animate-pulse rounded-xl bg-neutral-200" />

          <div className="overflow-hidden rounded-2xl border border-surface-300 bg-surface-50">
            <div className="space-y-4 p-6">
              {Array.from({ length: 7 }).map((_, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4"
                >
                  <div className="h-11 w-11 animate-pulse rounded-full bg-neutral-200" />

                  <div className="h-5 flex-1 animate-pulse rounded bg-neutral-200" />

                  <div className="h-5 w-24 animate-pulse rounded bg-neutral-200" />

                  <div className="h-5 w-20 animate-pulse rounded bg-neutral-200" />

                  <div className="h-5 w-24 animate-pulse rounded bg-neutral-200" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // ERROR
  // =========================

  if (error) {
    return (
      <div className="min-h-full p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-7xl">
          <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-error-500/20 bg-surface-50 px-6 text-center shadow-sm">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-red-50">
              <UsersRound className="h-7 w-7 text-error-500" />
            </div>

            <h2 className="text-lg font-bold text-ink-900">
              Failed to load users
            </h2>

            <p className="mt-2 max-w-md text-sm text-neutral-500">
              {error}
            </p>

            <button
              type="button"
              onClick={handleRefresh}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700"
            >
              <RefreshCw className="h-4 w-4" />
              Try again
            </button>
          </div>
        </div>
      </div>
    );
  }

  // =========================
  // PAGE
  // =========================

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-6">

        {/* Header */}

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100">
                <UsersRound className="h-5 w-5 text-primary-600" />
              </div>

              <div>
                <h1 className="text-2xl font-bold tracking-tight text-ink-900">
                  Users
                </h1>

                <p className="mt-0.5 text-sm text-neutral-500">
                  Manage all users in your Eduvi platform
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/dashboard/users/add")}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-700 hover:shadow-md"
          >
            <Plus className="h-4 w-4" />
            Add User
          </button>
        </div>

        {/* Stats */}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">

          {/* Total */}

          <div className="rounded-2xl border border-surface-300 bg-surface-50 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-500">
                  Total Users
                </p>

                <p className="mt-2 text-2xl font-bold text-ink-900">
                  {users.length}
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-100">
                <UsersRound className="h-5 w-5 text-primary-600" />
              </div>
            </div>
          </div>

          {/* Instructors */}

          <div className="rounded-2xl border border-surface-300 bg-surface-50 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-500">
                  Instructors
                </p>

                <p className="mt-2 text-2xl font-bold text-ink-900">
                  {
                    users.filter(
                      (user) => user.role === "instructor",
                    ).length
                  }
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent-100">
                <UserRound className="h-5 w-5 text-accent-600" />
              </div>
            </div>
          </div>

          {/* Students */}

          <div className="rounded-2xl border border-surface-300 bg-surface-50 p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-neutral-500">
                  Students
                </p>

                <p className="mt-2 text-2xl font-bold text-ink-900">
                  {
                    users.filter(
                      (user) => user.role === "student",
                    ).length
                  }
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-secondary-100">
                <UserRound className="h-5 w-5 text-secondary-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Search */}

        <div className="flex flex-col gap-3 rounded-2xl border border-surface-300 bg-surface-50 p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-md">
            <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, phone or role..."
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
                All Users
              </h2>

              <p className="mt-1 text-xs text-neutral-500">
                Showing {filteredUsers.length} of {users.length} users
              </p>
            </div>
          </div>

          {filteredUsers.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center px-6 text-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-neutral-100">
                <Search className="h-6 w-6 text-neutral-400" />
              </div>

              <h3 className="mt-4 text-base font-semibold text-ink-900">
                No users found
              </h3>

              <p className="mt-1 text-sm text-neutral-500">
                Try changing your search keyword.
              </p>
            </div>
          ) : (
            <DashboardTable
              columns={columns}
              data={filteredUsers}
              rowKey={(user) => user.id}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardUsers;