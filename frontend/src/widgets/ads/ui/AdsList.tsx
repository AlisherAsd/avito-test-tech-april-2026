import type { AdsItem } from "@/entities/ads/types";
import { AdsItemList } from "@/features/ads";

interface Props {
  ads: AdsItem[];
}

export default function AdsList({ ads }: Props) {
  return (
    <ul className="flex flex-col gap-3">
      {ads.map((ad) => (
        <AdsItemList key={ad.id} data={ad} />
      ))}
    </ul>
  );
}
