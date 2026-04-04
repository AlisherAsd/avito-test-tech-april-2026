export interface BaseFieldProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  error?: string;
  showClear?: boolean;
  textStyle?: "default" | "sm";
}
