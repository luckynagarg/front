import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export default function Input({
  label,
  error,
  id,
  className = "",
  ...props
}: InputProps) {
  return (
    <div>
      {label && (
        <label
          htmlFor={id}
          className="mb-2 block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        className={`h-11 w-full rounded-xl border bg-white px-4 text-sm outline-none transition placeholder:text-slate-400 focus:ring-4 ${
          error
            ? "border-red-300 focus:border-red-500 focus:ring-red-500/10"
            : "border-slate-200 focus:border-cyan-600 focus:ring-cyan-600/10"
        } ${className}`}
        {...props}
      />

      {error && (
        <p className="mt-1.5 text-xs font-medium text-red-600">{error}</p>
      )}
    </div>
  );
}