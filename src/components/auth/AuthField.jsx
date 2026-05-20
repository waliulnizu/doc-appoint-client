import {
  FieldError,
  Input,
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

export function AuthInput(props) {
  return (
    <Input
      fullWidth
      variant="secondary"
      className="min-h-11"
      {...props}
    />
  );
}
