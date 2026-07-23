import { Link } from "react-router-dom";
import image from "@assets/auth.png";
import { LuBookOpenText } from "react-icons/lu";
import { useRegister } from "@hooks/useRegister";

export const Register = () => {
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
  } = useRegister();
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

          <div className="mt-10 flex justify-center">
            <img src={image} alt="Register" className="w-105" />
          </div>
        </div>

        {/* Right */}
        <div className="flex flex-1 items-center justify-center p-8 lg:p-14">
          <div className="w-full max-w-md">
            <h2 className="mb-8 text-center text-3xl font-bold text-ink-900">
              Create Account
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="mb-2 block text-sm font-medium text-ink-700">
                  Full Name
                </label>

                <input
                  type="text"
                  {...register("name")}
                  placeholder="Enter your full name"
                  className={`w-full rounded-xl border px-4 py-3 text-ink-900 outline-none transition-all duration-200
      ${
        errors.name
          ? "border-error-500 bg-red-50 focus:border-error-500 focus:ring-4 focus:ring-error-500/10"
          : "border-neutral-200 bg-white focus:border-primary-600 focus:ring-4 focus:ring-primary-600/10"
      }`}
                />

                {errors.name && (
                  <p className="mt-2 text-sm font-medium text-error-500">
                    {errors.name.message}
                  </p>
                )}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-ink-700">
                  Email
                </label>

                <input
                  type="email"
                  {...register("email")}
                  placeholder="Enter your email"
                  className={`w-full rounded-xl border px-4 py-3 text-ink-900 outline-none transition-all duration-200
      ${
        errors.email
          ? "border-error-500 bg-red-50 focus:border-error-500 focus:ring-4 focus:ring-error-500/10"
          : "border-neutral-200 bg-white focus:border-primary-600 focus:ring-4 focus:ring-primary-600/10"
      }`}
                />

                {errors.email && !error && (
                  <p className="mt-2 text-sm font-medium text-error-500">
                    {errors.email.message}
                  </p>
                )}
                {error && (
                  <p className="mt-2 text-sm font-medium text-error-500">
                    {error}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-ink-700">
                  Password
                </label>

                <input
                  type="password"
                  {...register("password")}
                  placeholder="********"
                  className={`w-full rounded-xl border px-4 py-3 text-ink-900 outline-none transition-all duration-200
      ${
        errors.password
          ? "border-error-500 bg-red-50 focus:border-error-500 focus:ring-4 focus:ring-error-500/10"
          : "border-neutral-200 bg-white focus:border-primary-600 focus:ring-4 focus:ring-primary-600/10"
      }`}
                />

                {errors.password && (
                  <p className="mt-2 text-sm font-medium text-error-500">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-ink-700">
                  Confirm Password
                </label>

                <input
                  {...register("confirmPassword")}
                  type="password"
                  placeholder="********"
                  className={`w-full rounded-xl border px-4 py-3 text-ink-900 outline-none transition-all duration-200
      ${
        errors.confirmPassword
          ? "border-error-500 bg-red-50 focus:border-error-500 focus:ring-4 focus:ring-error-500/10"
          : "border-neutral-200 bg-white focus:border-primary-600 focus:ring-4 focus:ring-primary-600/10"
      }`}
                />
                {errors.confirmPassword && (
                  <p className="mt-2 text-sm font-medium text-error-500">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <label className="flex items-center gap-3 text-sm text-neutral-600">
                <input type="checkbox" className="h-4 w-4 accent-primary-600" />
                I agree to the Terms & Conditions
              </label>

              <button className="w-full cursor-pointer rounded-xl bg-primary-600 py-3 font-semibold text-white transition hover:bg-primary-700">
                Sign Up
              </button>

              <p className="text-center text-sm text-neutral-500">
                Already have an account?
                <Link
                  to="/login"
                  className="font-semibold  text-primary-600 hover:underline"
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
