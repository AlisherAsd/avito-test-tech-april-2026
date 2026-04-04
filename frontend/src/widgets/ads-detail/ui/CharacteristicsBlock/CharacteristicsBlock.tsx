import type { ResponseAd } from "@/entities/ads/types";
import { AutoCharacteristics } from "./AutoCharacteristics";
import { RealEstateCharacteristics } from "./RealEstateCharacteristics";
import { ElectronicsCharacteristics } from "./ElectronicsCharacteristics";

type Props = { item: ResponseAd };

export default function CharacteristicsBlock({ item }: Props) {
  return (
    <div>
      <h3 className="mb-3 text-xl font-medium text-gray-900">Характеристики</h3>
      {(() => {
        switch (item.category) {
          case "auto":
            return <AutoCharacteristics data={item.params} />;

          case "real_estate":
            return <RealEstateCharacteristics data={item.params} />;

          case "electronics":
            return <ElectronicsCharacteristics data={item.params} />;
        }
      })()}
    </div>
  );
}
