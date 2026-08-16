import type { SelectHTMLAttributes } from "react";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  options: string[];
};

export default function Select({
  label,
  options,
  id,
  className = "",
  ...props
}: SelectProps) {
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

      <select
        id={id}
        className={`h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none transition focus:border-cyan-600 focus:ring-4 focus:ring-cyan-600/10 ${className}`}
        {...props}
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}