import { FormControl, MenuItem, Select } from "@mui/material";

interface Props<T extends string> {
  textStyle?: "sm" | "default";
  label: string;
  value: T;
  handleChange: (value: T) => void;
  options: { value: T; label: string }[];
  defaultValue: T;
}

export default function SelectField<T extends string>({
  textStyle,
  label,
  value,
  handleChange,
  options,
  defaultValue,
}: Props<T>) {
  return (
    <div className="space-y-2 flex flex-col">
      {label && (
        <label
          className={`flex items-center gap-1 text-[#1a1a1a] ${
            textStyle === "default" ? "font-medium" : "text-sm"
          }`}
        >
          <span>{label}</span>
        </label>
      )}
      <FormControl size="small" sx={{ width: 256 }}>
        <Select
          defaultValue={defaultValue}
          value={value}
          onChange={(e) => handleChange(e.target.value as T)}
        >
          {options?.map((option: { value: T; label: string }) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
