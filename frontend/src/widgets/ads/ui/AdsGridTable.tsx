import type { AdsItem } from "@/entities/ads/types";
import { AdsItemGrid } from "@/features/ads";

interface Props {
  ads: AdsItem[];
}

export default function AdsGridTable({ ads }: Props) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4">
      {ads.map((ad) => (
        <AdsItemGrid data={ad} key={ad.id} />
      ))}
    </div>
  );
}
