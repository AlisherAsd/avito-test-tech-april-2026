import type { EstateType } from "@/entities/ads/types";
import { ESTATE_TYPES_RU } from "@/shared/config/consts";
import SelectField from "@/shared/ui/form-fields/ui/SelectField";

const OPTIONS: { value: EstateType; label: string }[] = [
  { value: "flat", label: ESTATE_TYPES_RU["flat"] },
  { value: "house", label: ESTATE_TYPES_RU["house"] },
  { value: "room", label: ESTATE_TYPES_RU["room"] },
];

export default function EstateTypeSelect({
  value,
  handleChange,
}: {
  value: EstateType;
  handleChange: (value: EstateType) => void;
}) {
  return (
    <SelectField<EstateType>
      label="Тип недвижимости"
      textStyle="default"
      value={value}
      defaultValue="flat"
      handleChange={handleChange}
      options={OPTIONS}
    />
  );
}
