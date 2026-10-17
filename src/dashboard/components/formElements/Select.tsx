import type {
  FieldValues,
  Path,
  UseFormRegister,
} from "react-hook-form";

type TSelectOption = {
  label: string;
  value: string;
};

type TSelectProps<TFieldValues extends FieldValues> = {
  name: Path<TFieldValues>;
  placeholder: string;
  register: UseFormRegister<TFieldValues>;
  options: TSelectOption[];
  error?: string;
};

export const Select = <TFieldValues extends FieldValues>({
  name,
  placeholder,
  register,
  options,
  error,
}: TSelectProps<TFieldValues>) => {
  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-ink-700">
        {placeholder}
      </label>

      <select
        {...register(name)}
        className={`w-full rounded-xl border px-4 py-3 text-ink-900 outline-none transition-all duration-200 ${
          error
            ? "border-error-500 bg-red-50 focus:border-error-500 focus:ring-4 focus:ring-error-500/10"
            : "border-neutral-200 bg-white focus:border-primary-600 focus:ring-4 focus:ring-primary-600/10"
        }`}
      >
        <option value="">Select {placeholder}</option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-2 text-sm font-medium text-error-500">
          {error}
        </p>
      )}
    </div>
  );
};