import {
  FieldError,
  Label,
  TextField,
} from "@heroui/react";

export default function AuthField({
  label,
  hint,
  error,
  children,
  ...textFieldProps
}) {
  return (
    <TextField
      fullWidth
      className="flex flex-col gap-1.5"
      isInvalid={Boolean(error)}
      {...textFieldProps}
    >
      <Label className="text-sm font-medium text-slate-700">
        {label}
      </Label>

      {children}

      {error ? (
        <FieldError className="text-sm text-red-600">
          {error}
        </FieldError>
      ) : hint ? (
        <p className="text-xs text-slate-500">{hint}</p>
      ) : null}
    </TextField>
  );
}

export function AuthInput({ className, ...props }) {
  return (
    <input
      {...props}
      className={`w-full min-h-11 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-slate-800 shadow-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder:text-slate-400 ${className || ""}`}
    />
  );
}
