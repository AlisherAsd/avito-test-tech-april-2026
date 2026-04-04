import type { RealEstateItemParams } from "@/entities/ads/types";
import { ESTATE_TYPES_RU } from "@/shared/config/consts";
import { BlockRow } from "@/shared/ui/CharacteristicsBlockRow";

export function RealEstateCharacteristics({ data }: { data: RealEstateItemParams }) {
  return (
    <div className="flex flex-col gap-1.5">
      {data.type && <BlockRow label="Тип недвижимости" value={ESTATE_TYPES_RU[data.type]} />}
      {data.address && <BlockRow label="Адрес" value={data.address} />}
      {data.area && <BlockRow label="Площадь" value={`${data.area} м²`} />}
      {data.floor && <BlockRow label="Этаж" value={`${data.floor}-й`} />}
    </div>
  );
}
