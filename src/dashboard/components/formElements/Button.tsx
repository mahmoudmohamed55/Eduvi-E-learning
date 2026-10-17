import type { ButtonHTMLAttributes, ReactNode } from "react";

type TButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  loading?: boolean;
};

export const Button = ({
  children,
  loading = false,
  disabled,
  className = "",
  ...props
}: TButtonProps) => {
  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-primary-700 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
      )}

      {loading ? "Please wait..." : children}
    </button>
  );
};