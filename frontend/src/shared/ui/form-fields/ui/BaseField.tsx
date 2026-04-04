// BaseField.tsx - базовый компонент
import UnionIcon from "@/shared/assets/UnionIcon";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import type { BaseFieldProps } from "../model";

function isEmptyValue(value: unknown) {
  return value === "" || value === null || value === undefined;
}

export function BaseField({
  value,
  onChange,
  label,
  placeholder,
  required,
  error,
  textStyle,
  showClear = true,
}: BaseFieldProps) {
  return (
    <div className="space-y-2">
      {label && (
        <label
          className={`flex items-center gap-1 text-[#1a1a1a] ${
            textStyle === "default" ? "font-medium" : "text-sm"
          }`}
        >
          {required && <span className="text-red-600">*</span>}
          <span>{label}</span>
        </label>
      )}

      <TextField
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        fullWidth
        size="small"
        slotProps={{
          input: {
            endAdornment: showClear && value && (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => onChange("")}
                  edge="end"
                  size="small"
                  sx={{ padding: "2px" }}
                >
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
            "& input": {
              height: "32px",
              boxSizing: "border-box",
            },
            "& fieldset": {
              borderColor: error ? "#d32f2f" : isEmptyValue(value) ? "#FFA940" : "#1976d2",
            },
            "&:hover fieldset": {
              borderColor: error ? "#d32f2f" : "#1976d2",
            },
          },
        }}
      />

      {error && (
        <div className="text-red-600 text-sm flex items-center gap-1 mt-2">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
}
