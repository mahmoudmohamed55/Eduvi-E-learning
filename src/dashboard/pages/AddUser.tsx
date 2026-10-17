import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import { actAddUser } from "@store/dashboard/users/act/actAddUser";

import { Input } from "@dashboard/components/formElements/Input";
import { Select } from "@dashboard/components/formElements/Select";
import { Button } from "@dashboard/components/formElements/Button";

type TAddUserForm = {
  email: string;
  password: string;
  full_name: string;
  phone: string;
  role: "student" | "instructor" | "admin" | "";
};

const AddUser = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loading } = useAppSelector(
    (state) => state.dashboard.users
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TAddUserForm>({
    defaultValues: {
      email: "",
      password: "",
      full_name: "",
      phone: "",
      role: "",
    },
  });

  const onSubmit = async (data: TAddUserForm) => {
    if (!data.role) return;

    try {
      await dispatch(
        actAddUser({
          email: data.email,
          password: data.password,
          full_name: data.full_name,
          phone: data.phone || null,
          role: data.role,
        })
      ).unwrap();

      await Swal.fire({
        title: "User Added!",
        text: "The user has been created successfully.",
        icon: "success",
        confirmButtonText: "OK",
        confirmButtonColor: "#7c3aed",
      });

      navigate("/dashboard");
    } catch (error) {
      await Swal.fire({
        title: "Failed!",
        text:
          typeof error === "string"
            ? error
            : "Something went wrong while creating the user.",
        icon: "error",
        confirmButtonText: "OK",
        confirmButtonColor: "#7c3aed",
      });
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-ink-900">
          Add User
        </h1>

        <p className="mt-1 text-sm text-neutral-500">
          Create a new user account.
        </p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="rounded-2xl border border-surface-300 bg-white p-6 shadow-sm"
      >
        <div className="grid gap-5 md:grid-cols-2">
          <Input
            name="email"
            type="email"
            placeholder="Email"
            register={register}
            error={errors.email?.message}
          />

          <Input
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors.password?.message}
          />

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

          <Select
            name="role"
            placeholder="Role"
            register={register}
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
            error={errors.role?.message}
          />
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="bg-neutral-100 text-neutral-700 hover:bg-neutral-200 hover:shadow-none"
          >
            Cancel
          </Button>

          <Button type="submit" loading={loading}>
            Add User
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;