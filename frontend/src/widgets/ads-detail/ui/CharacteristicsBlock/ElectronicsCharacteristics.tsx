import type { ElectronicsItemParams } from "@/entities/ads/types";
import { CONDITION_TYPES_RU, ELECTRONIC_TYPES_RU } from "@/shared/config/consts";
import { BlockRow } from "@/shared/ui/CharacteristicsBlockRow";

export function ElectronicsCharacteristics({ data }: { data: ElectronicsItemParams }) {
  return (
    <div className="flex flex-col gap-1.5">
      {data.type && <BlockRow label="Тип устройства" value={ELECTRONIC_TYPES_RU[data.type]} />}
      {data.brand && <BlockRow label="Бренд" value={data.brand} />}
      {data.model && <BlockRow label="Модель" value={data.model} />}
      {data.condition && <BlockRow label="Состояние" value={CONDITION_TYPES_RU[data.condition]} />}
      {data.color && <BlockRow label="Цвет" value={data.color} />}
    </div>
  );
}
