import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";



import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actUpdateUser } from "@store/dashboard/users/act/actUpdateUser";
import { Input } from "@dashboard/components/formElements/Input";
import { Select } from "@dashboard/components/formElements/Select";
import { Button } from "@dashboard/components/formElements/Button";

type TUpdateUserForm = {
  full_name: string;
  phone: string;
  avatar: string;
  role: "student" | "instructor" | "admin" | "";
};

const UpdateUser = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { id } = useParams<{ id: string }>();

  const { users, loading, error } = useAppSelector(
    (state) => state.dashboard.users
  );

  const user = users.find((user) => user.id === id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TUpdateUserForm>({
    defaultValues: {
      full_name: "",
      phone: "",
      avatar: "",
      role: "",
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        full_name: user.full_name ?? "",
        phone: user.phone ?? "",
        avatar: user.avatar ?? "",
        role: user.role,
      });
    }
  }, [user, reset]);

  const onSubmit = async (data: TUpdateUserForm) => {
    if (!id || !data.role) return;

    const result = await dispatch(
      actUpdateUser({
        id,
        full_name: data.full_name,
        phone: data.phone || null,
        avatar: data.avatar || null,
        role: data.role,
      })
    );

    if (actUpdateUser.fulfilled.match(result)) {
      navigate("/dashboard");
    }
  };

  if (!user) {
    return (
      <div className="min-h-full p-4 sm:p-6 lg:p-8">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-2xl border border-surface-300 bg-surface-50 p-8 text-center shadow-sm">
            <h2 className="text-lg font-bold text-ink-900">
              User not found
            </h2>

            <p className="mt-2 text-sm text-neutral-500">
              The user you are trying to edit does not exist.
            </p>

            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="mt-5 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700"
            >
              Back to Users
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold tracking-tight text-ink-900">
            Update User
          </h1>

          <p className="mt-1 text-sm text-neutral-500">
            Update user information and role
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="rounded-2xl border border-surface-300 bg-surface-50 p-5 shadow-sm sm:p-6"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Input
              name="full_name"
              placeholder="Full Name"
              register={register}
              error={errors.full_name?.message}
            />

            <Input
              name="phone"
              type="tel"
              placeholder="Phone"
              register={register}
              error={errors.phone?.message}
            />

            <div className="sm:col-span-2">
              <Input
                name="avatar"
                type="url"
                placeholder="Avatar URL"
                register={register}
                error={errors.avatar?.message}
              />
            </div>

            <Select
              name="role"
              placeholder="Role"
              register={register}
              error={errors.role?.message}
              options={[
                {
                  label: "Student",
                  value: "student",
                },
                {
                  label: "Instructor",
                  value: "instructor",
                },
                {
                  label: "Admin",
                  value: "admin",
                },
              ]}
            />
          </div>

          {/* Error */}
          {error && (
            <div className="mt-5 rounded-xl border border-error-500/20 bg-red-50 px-4 py-3 text-sm font-medium text-error-500">
              {error}
            </div>
          )}

          {/* Actions */}
          <div className="mt-6 flex items-center justify-end gap-3 border-t border-surface-300 pt-5">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="rounded-xl border border-surface-300 bg-white px-5 py-3 text-sm font-semibold text-neutral-600 transition hover:bg-neutral-50"
            >
              Cancel
            </button>

            <Button type="submit" loading={loading}>
              Update User
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateUser;