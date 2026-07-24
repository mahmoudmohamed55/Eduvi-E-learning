import type { FieldValues, Path, UseFormRegister } from "react-hook-form";
type TInputProps<TfieldValues extends FieldValues> = {
  name: Path<TfieldValues>;
  type?: string;
  placeholder: string;
  register: UseFormRegister<TfieldValues>;
  errors: string | undefined;
  emailErrors?: string | null;
};

export const Input = <TFieldValues extends FieldValues>({
  name,
  type,
  placeholder,
  register,
  errors,
  emailErrors,
}: TInputProps<TFieldValues>) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-ink-700">
        {placeholder}
      </label>

      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className={`w-full rounded-xl border px-4 py-3 text-ink-900 outline-none transition-all duration-200
      ${
        errors
          ? "border-error-500 bg-red-50 focus:border-error-500 focus:ring-4 focus:ring-error-500/10"
          : "border-neutral-200 bg-white focus:border-primary-600 focus:ring-4 focus:ring-primary-600/10"
      }`}
      />

      {errors && (
        <p className="mt-2 text-sm font-medium text-error-500">{errors}</p>
      )}
      {emailErrors && (
        <p className="mt-2 text-sm font-medium text-error-500">{emailErrors}</p>
      )}
    </div>
  );
};
