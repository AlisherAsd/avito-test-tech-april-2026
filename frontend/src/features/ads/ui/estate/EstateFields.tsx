import { Controller, type Control } from "react-hook-form";
import type { AdFormData } from "../../types";
import { InputField } from "@/shared/ui/form-fields/ui/InputField";
import EstateTypeSelect from "./EstateTypeSelect";

interface Props {
  control: Control<AdFormData>;
}

export default function EstateFields({ control }: Props) {
  return (
    <div className="flex flex-col gap-4 mt-3 max-w-114">
      <Controller
        name="typeEstate"
        control={control}
        render={({ field }) => (
          <EstateTypeSelect value={field.value || "flat"} handleChange={field.onChange} />
        )}
      />
      <Controller
        name="address"
        control={control}
        render={({ field }) => (
          <InputField
            showClear={true}
            textStyle="sm"
            value={field.value ?? ""}
            onChange={field.onChange}
            label="Адресс"
            placeholder="Адресс"
          />
        )}
      />
      <Controller
        name="floor"
        control={control}
        render={({ field }) => (
          <InputField
            showClear={true}
            textStyle="sm"
            value={field.value ?? ""}
            onChange={field.onChange}
            label="Этаж"
            placeholder="Этаж"
          />
        )}
      />
      <Controller
        name="area"
        control={control}
        render={({ field }) => (
          <InputField
            showClear={true}
            textStyle="sm"
            value={field.value ?? ""}
            onChange={field.onChange}
            label="Площадь кв.м"
            placeholder="Площадь кв.м"
          />
        )}
      />
    </div>
  );
}
