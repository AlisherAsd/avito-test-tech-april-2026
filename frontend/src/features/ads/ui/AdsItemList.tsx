import type { AdsItem } from "@/entities/ads/types";
import VoidPucture from "@/shared/assets/VoidPicture";
import { formatPriceRub } from "@/shared/lib/formatters";
import { CATEGORIES_RU } from "@/shared/config/consts";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "@/shared/config/app-routes";

interface Props {
  data: AdsItem;
}

export default function AdsItemList({ data }: Props) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!data.id) return;
    navigate(APP_ROUTES.ADS_DETAIL(data.id));
  };
  return (
    <li
      onClick={handleClick}
      className="flex gap-4 overflow-hidden rounded-lg border border-[#EEEEF2] bg-white shadow-sm"
    >
      <div className="h-fit w-44.75 shrink-0 overflow-hidden rounded-md">
        <div className="h-full w-full">
          <VoidPucture />
        </div>
      </div>
      <div className="min-w-0 flex-1 p-4">
        <span className="text-sm text-[#848388]">
          {CATEGORIES_RU[data.category] || "Без категории"}
        </span>
        <h3 className="mt-1 text-base text-[#1a1a1a]">{data.title}</h3>
        <p className="mt-1 text-base font-medium text-[#00000073]">{formatPriceRub(data.price)}</p>
        {data.needsRevision ? (
          <div className="flex mt-1 items-center w-fit px-2 py-1 rounded-sm bg-[#F9F1E6] gap-2 text-xs text-[#E37318]">
            <span className="size-1.5 rounded-full bg-[#E37318]" aria-hidden />
            Требует доработок
          </div>
        ) : null}
      </div>
    </li>
  );
}
