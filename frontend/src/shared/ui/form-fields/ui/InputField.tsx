import type { BaseFieldProps } from "../model";
import { BaseField } from "./BaseField";

export function InputField(props: BaseFieldProps) {
  return <BaseField {...props} />;
}
