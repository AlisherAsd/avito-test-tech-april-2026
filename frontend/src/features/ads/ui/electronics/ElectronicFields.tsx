import { Controller, type Control } from "react-hook-form";
import type { AdFormData } from "../../types";
import ElectronicTypeSelect from "./ElectronicTypeSelect";
import { InputField } from "@/shared/ui/form-fields/ui/InputField";
import ConditionTypeSelect from "./ConditionTypeSelect";

interface Props {
  control: Control<AdFormData>;
}

export default function ElectronicFields({ control }: Props) {
  return (
    <div className="flex flex-col gap-4 mt-3 max-w-114">
      <Controller
        name="typeElectronic"
        control={control}
        render={({ field }) => (
          <ElectronicTypeSelect value={field.value || "laptop"} handleChange={field.onChange} />
        )}
      />
      <Controller
        name="brandElectronic"
        control={control}
        render={({ field }) => (
          <InputField
            value={field.value ?? ""}
            onChange={field.onChange}
            showClear={true}
            textStyle="sm"
            label="Бренд"
            placeholder="Бренд"
          />
        )}
      />
      <Controller
        name="modelElectronic"
        control={control}
        render={({ field }) => (
          <InputField
            value={field.value ?? ""}
            onChange={field.onChange}
            showClear={true}
            textStyle="sm"
            label="Модель"
            placeholder="Модель"
          />
        )}
      />
      <Controller
        name="color"
        control={control}
        render={({ field }) => (
          <InputField
            showClear={true}
            textStyle="sm"
            value={field.value ?? ""}
            onChange={field.onChange}
            label="Цвет"
            placeholder="Цвет"
          />
        )}
      />
      <Controller
        name="condition"
        control={control}
        render={({ field }) => (
          <ConditionTypeSelect value={field.value || "new"} handleChange={field.onChange} />
        )}
      />
    </div>
  );
}
