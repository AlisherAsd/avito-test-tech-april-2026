import { IconButton, InputAdornment, TextField } from "@mui/material";
import type { BaseFieldProps } from "../model";
import UnionIcon from "@/shared/assets/UnionIcon";

interface TextareaFieldProps extends BaseFieldProps {
  showCounter?: boolean;
  resizable?: boolean;
  rows?: number;
  maxLength?: number;
}

export function TextareaField({
  value,
  onChange,
  label,
  placeholder,
  required,
  error,
  showClear = false,
  showCounter = false,
  resizable = true,
  rows = 4,
  maxLength = 1000,
}: TextareaFieldProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label className="flex items-center gap-1 text font-medium text-[#1a1a1a]">
          {required && <span className="text-red-600">*</span>}
          <span>{label}</span>
        </label>
      )}

      <TextField
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        multiline
        rows={rows}
        fullWidth
        size="small"
        slotProps={{
          input: {
            endAdornment: showClear && value && (
              <InputAdornment position="end" sx={{ alignSelf: "flex-start", mt: 1 }}>
                <IconButton onClick={() => onChange("")} edge="end" size="small">
                  <UnionIcon />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: "8px",
            backgroundColor: "#fff",
            alignItems: "flex-start",
            "& textarea": {
              resize: resizable ? "vertical" : "none",
              minHeight: `${rows * 24}px`,
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

      {showCounter && (
        <div className="flex justify-between items-center mt-1">
          <div>
            {error && (
              <div className="text-red-600 mt-1 text-sm flex items-center">
                <span>{error}</span>
              </div>
            )}
          </div>
          {showCounter && (
            <div
              className={`text-sm ${value.length > maxLength ? "text-red-600" : "text-gray-500"}`}
            >
              {value.length}/{maxLength}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
