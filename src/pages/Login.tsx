import { Link } from "react-router-dom";
import image from "@assets/auth.png";
import { LuBookOpenText } from "react-icons/lu";

import { useLogin } from "@hooks/useLogin";
import { Input } from "@components/form/Input";

export const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    errors,
    onSubmit,
    error,
    loading,
    accessToken,
    navigate,
  } = useLogin();
  return (
    <section className="min-h-[90vh] my-5 bg-surface-100">
      <div className="container flex min-h-screen overflow-hidden rounded-2xl bg-white shadow-xl">
        <div className="hidden w-1/2 border-r border-neutral-200 bg-surface-50 p-12 md:flex md:flex-col">
          <Link
            to="/"
            className="mb-10 flex items-center gap-2 text-xl font-bold text-ink-900"
          >
            <LuBookOpenText
              size={30}
              className="text-secondary-500"
              strokeWidth={2.3}
            />
            Eduvi
          </Link>

          <h1 className="max-w-sm text-4xl font-bold leading-tight text-ink-900">
            Welcome to
            <br />
            Eduvi Online
            <br />
            Learning Platform
          </h1>

          <div className="mt-auto flex justify-center">
            <img src={image} alt="Register" className="w-105" />
          </div>
        </div>


        <div className="flex flex-1 items-center justify-center p-8 lg:p-14">
          <div className="w-full max-w-md">
            <h2 className="mb-8 text-center text-3xl font-bold text-ink-900">
              Sign In
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
             <Input
                name="email"
                type="email"
                placeholder="Email"
                register={register}
                errors={errors.email?.message}
                emailErrors={error}
              />
              <Input
                name="password"
                type="password" 
                placeholder="Password"
                register={register}
                errors={errors.password?.message}
              />

              <label className="flex items-center gap-3 text-sm text-neutral-600">
                <input type="checkbox" className="h-4 w-4 accent-primary-600" />
                I agree to the Terms & Conditions
              </label>

              <button className="w-full rounded-xl bg-primary-600 py-3 font-semibold text-white transition hover:bg-primary-700">
                Sign In
              </button>

              <p className="text-center text-sm text-neutral-500">
                Don't have an account?
                <Link
                  to="/register"
                  className="font-semibold text-primary-600 hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
