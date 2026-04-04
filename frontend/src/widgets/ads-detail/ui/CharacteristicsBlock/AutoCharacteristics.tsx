import type { AutoItemParams } from "@/entities/ads/types";
import { TRANSMISSIONS_TYPES_RU } from "@/shared/config/consts";
import { BlockRow } from "@/shared/ui/CharacteristicsBlockRow";

export function AutoCharacteristics({ data }: { data: AutoItemParams }) {
  return (
    <div className="flex flex-col gap-1.5">
      {data.brand && <BlockRow label="Бренд" value={data.brand} />}
      {data.model && <BlockRow label="Модель" value={data.model} />}
      {data.yearOfManufacture && (
        <BlockRow label="Год выпуска" value={`${data.yearOfManufacture} г.`} />
      )}
      {data.transmission && (
        <BlockRow label="Коробка передач" value={TRANSMISSIONS_TYPES_RU[data.transmission]} />
      )}
      {data.mileage && <BlockRow label="Пробег" value={`${data.mileage.toLocaleString()} км`} />}
      {data.enginePower && (
        <BlockRow label="Мощность двигателя" value={`${data.enginePower} л.с.`} />
      )}
    </div>
  );
}
