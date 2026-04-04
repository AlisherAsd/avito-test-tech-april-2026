import type { AdsItem } from "@/entities/ads/types";
import VoidPucture from "@/shared/assets/VoidPicture";
import { formatPriceRub } from "@/shared/lib/formatters";
import { CATEGORIES_RU } from "@/shared/config/consts";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/shared/config/app-routes";

interface Props {
  data: AdsItem;
}

export default function AdsItem({ data }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!data.id) return;
    navigate(APP_ROUTES.ADS_DETAIL(data.id));
  };
  return (
    <article
      onClick={handleClick}
      key={data.id}
      className="overflow-hidden rounded-lg border border-[#EEEEF2] bg-white shadow-sm"
    >
      <div className="relative">
        <VoidPucture />
        <span className="inline-block -bottom-2 left-3  absolute rounded border bg-white border-[#E0E0E4] px-2 text-xs text-[#5c5c66]">
          {CATEGORIES_RU[data.category] || "Без категории"}
        </span>
      </div>
      <div className="p-3">
        <h3 className="mt-1 text-base leading-snug text-[#1a1a1a]">{data.title}</h3>
        <p className="mt-1 text-base font-semibold text-[#00000073]">
          {formatPriceRub(data.price)}
        </p>
        {data.needsRevision ? (
          <div className="flex mt-1 items-center w-fit px-2 py-1 rounded-sm bg-[#F9F1E6] gap-2 text-xs text-[#E37318]">
            <span className="size-1.5 rounded-full bg-[#E37318]" aria-hidden />
            Требует доработок
          </div>
        ) : null}
      </div>
    </article>
  );
}
