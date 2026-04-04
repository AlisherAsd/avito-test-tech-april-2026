import { Controller, type Control } from "react-hook-form";
import type { AdFormData } from "../../types";
import { InputField } from "@/shared/ui/form-fields/ui/InputField";
import TransmissionTypeSelect from "./TransmissionTypeSelect";

interface Props {
  control: Control<AdFormData>;
}

export default function AutoFields({ control }: Props) {
  return (
    <div className="flex flex-col gap-4 mt-3 max-w-114">
      <Controller
        name="transmission"
        control={control}
        render={({ field }) => (
          <TransmissionTypeSelect
            value={field.value || "automatic"}
            handleChange={field.onChange}
          />
        )}
      />
      <Controller
        name="brandAuto"
        control={control}
        render={({ field }) => (
          <InputField
            showClear={true}
            textStyle="sm"
            value={field.value ?? ""}
            onChange={field.onChange}
            label="Бренд"
            placeholder="Бренд"
          />
        )}
      />
      <Controller
        name="modelAuto"
        control={control}
        render={({ field }) => (
          <InputField
            showClear={true}
            textStyle="sm"
            value={field.value ?? ""}
            onChange={field.onChange}
            label="Модель"
            placeholder="Модель"
          />
        )}
      />
      <Controller
        name="yearOfManufacture"
        control={control}
        render={({ field }) => (
          <InputField
            showClear={true}
            textStyle="sm"
            value={field.value ?? ""}
            onChange={field.onChange}
            label="Год производства"
            placeholder="Год производства"
          />
        )}
      />
      <Controller
        name="mileage"
        control={control}
        render={({ field }) => (
          <InputField
            showClear={true}
            textStyle="sm"
            value={field.value ?? ""}
            onChange={field.onChange}
            label="Пробег"
            placeholder="Пробег"
          />
        )}
      />
      <Controller
        name="enginePower"
        control={control}
        render={({ field }) => (
          <InputField
            showClear={true}
            textStyle="sm"
            value={field.value ?? ""}
            onChange={field.onChange}
            label="Л.C"
            placeholder="Л.C"
          />
        )}
      />
    </div>
  );
}
