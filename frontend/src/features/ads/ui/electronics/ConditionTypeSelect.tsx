import type { ConditionType } from "@/entities/ads/types";
import { CONDITION_TYPES_RU } from "@/shared/config/consts";
import SelectField from "@/shared/ui/form-fields/ui/SelectField";

const OPTIONS: { value: ConditionType; label: string }[] = [
  { value: "new", label: CONDITION_TYPES_RU["new"] },
  { value: "used", label: CONDITION_TYPES_RU["used"] },
];

export default function ConditionTypeSelect({
  value,
  handleChange,
}: {
  value: ConditionType;
  handleChange: (value: ConditionType) => void;
}) {
  return (
    <SelectField<ConditionType>
      label="Состояние"
      textStyle="default"
      value={value}
      defaultValue="new"
      handleChange={handleChange}
      options={OPTIONS}
    />
  );
}
