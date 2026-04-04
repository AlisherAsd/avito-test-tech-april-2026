import type { ItemCategory } from "@/shared/api/types";
import { CATEGORIES_RU } from "@/shared/config/consts";
import SelectField from "@/shared/ui/form-fields/ui/SelectField";

const OPTIONS: { value: ItemCategory; label: string }[] = [
  { value: "auto", label: CATEGORIES_RU["auto"] },
  { value: "real_estate", label: CATEGORIES_RU["real_estate"] },
  { value: "electronics", label: CATEGORIES_RU["electronics"] },
];

export default function AdsSelectCategory({
  value,
  handleChange,
}: {
  value: ItemCategory;
  handleChange: (value: ItemCategory) => void;
}) {
  return (
    <SelectField<ItemCategory>
      label="Категория"
      textStyle="default"
      defaultValue='auto'
      value={value}
      handleChange={handleChange}
      options={OPTIONS}
    />
  );
}
