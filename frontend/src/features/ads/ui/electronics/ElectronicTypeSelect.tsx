import type { ElectronicType } from "@/entities/ads/types";
import { ELECTRONIC_TYPES_RU } from "@/shared/config/consts";
import SelectField from "@/shared/ui/form-fields/ui/SelectField";

const OPTIONS: { value: ElectronicType; label: string }[] = [
  { value: "phone", label: ELECTRONIC_TYPES_RU["phone"] },
  { value: "laptop", label: ELECTRONIC_TYPES_RU["laptop"] },
  { value: "misc", label: ELECTRONIC_TYPES_RU["misc"] },
];

export default function ElectronicTypeSelect({
  value,
  handleChange,
}: {
  value: ElectronicType;
  handleChange: (value: ElectronicType) => void;
}) {
  return (
    <SelectField<ElectronicType>
      label="Тип устройства"
      textStyle="default"
      defaultValue="phone"
      value={value}
      handleChange={handleChange}
      options={OPTIONS}
    />
  );
}
