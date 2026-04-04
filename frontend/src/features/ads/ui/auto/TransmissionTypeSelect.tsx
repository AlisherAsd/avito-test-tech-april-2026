import type { TransmissionType } from "@/entities/ads/types";
import { TRANSMISSIONS_TYPES_RU } from "@/shared/config/consts";
import SelectField from "@/shared/ui/form-fields/ui/SelectField";

const OPTIONS: { value: TransmissionType; label: string }[] = [
  { value: "automatic", label: TRANSMISSIONS_TYPES_RU["automatic"] },
  { value: "manual", label: TRANSMISSIONS_TYPES_RU["manual"] },
];

export default function TransmissionTypeSelect({
  value,
  handleChange,
}: {
  value: TransmissionType;
  handleChange: (value: TransmissionType) => void;
}) {
  return (
    <SelectField<TransmissionType>
      label="Передача"
      textStyle="default"
      value={value}
      defaultValue="automatic"
      handleChange={handleChange}
      options={OPTIONS}
    />
  );
}
