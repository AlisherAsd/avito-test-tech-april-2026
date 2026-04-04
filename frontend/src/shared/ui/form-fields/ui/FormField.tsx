import { TextField, type TextFieldProps } from "@mui/material";
import type { ReactNode } from "react";

interface FormFieldProps extends Omit<TextFieldProps, "error"> {
  error?: string;
  required?: boolean;
  label?: string;
  labelIcon?: ReactNode;
  helperText?: string;
}

export function FormField({
  error,
  required,
  label,
  labelIcon,
  helperText,
  ...props
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="flex items-center gap-1 text-sm font-medium text-[#1a1a1a]">
          {required && <span className="text-red-600">*</span>}
          {labelIcon && <span>{labelIcon}</span>}
          <span>{label}</span>
        </label>
      )}

      <TextField
        {...props}
        fullWidth
        error={!!error}
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            minHeight: "32px",
            backgroundColor: "#fff",
            "& input": {
              padding: "4px 12px",
              height: "28px",
              boxSizing: "border-box",
            },
            "& textarea": {
              padding: "8px 12px",
            },
            "& fieldset": {
              borderColor: error ? "#d32f2f" : "#E0E0E4",
            },
            "&:hover fieldset": {
              borderColor: error ? "#d32f2f" : "#1976d2",
            },
          },
        }}
      />

      {(error || helperText) && (
        <div className="flex items-center gap-1 text-sm">
          {error && <span className="text-red-600">{error}</span>}
          {helperText && !error && <span className="text-gray-500">{helperText}</span>}
        </div>
      )}
    </div>
  );
}
