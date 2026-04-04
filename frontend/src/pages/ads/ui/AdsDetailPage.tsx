import type { AppDispatch } from "@/app/store";
import { fetchAdById } from "@/entities/ads";
import {
  selectAdsError,
  selectAdsLoading,
  selectDetailAd,
} from "@/entities/ads/model/adsSelectors";
import type { ResponseAd } from "@/entities/ads/types";
import VoidPucture from "@/shared/assets/VoidPicture";
import Loader from "@/shared/ui/Loader";
import { AdsDetailHeader, CharacteristicsBlock, WarningBlock } from "@/widgets/ads-detail";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function AdsDetailPage() {
  const { id } = useParams();

  const dispatch = useDispatch<AppDispatch>();
  const item: ResponseAd | null = useSelector(selectDetailAd);
  const loading = useSelector(selectAdsLoading);
  const error = useSelector(selectAdsError);

  useEffect(() => {
    dispatch(fetchAdById(id || ""));
  }, [dispatch, id]);

  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <span className="text-red-500">Ошибка загрузки объявления: {error}</span>{" "}
      </div>
    );
  }

  if (loading) {
    return (
      <div className="h-full">
        <div className="h-full flex items-center justify-center">
          <Loader />
        </div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="h-full flex items-center justify-center">
        <span className="text-gray-500">Объявление не найдено :( </span>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="p-8">
        <AdsDetailHeader
          name={item.title}
          price={item.price}
          publicDate={item.createdAt}
          editDate={item.updatedAt}
          id={item.id}
        />
        <hr className="border-t border-[#F0F0F0] my-8" />
        <div className="flex gap-8">
          <div className="w-full max-w-120 h-90 overflow-hidden rounded-lg">
            <div className="w-full h-full">
              <VoidPucture />
            </div>
          </div>
          <div className="flex flex-col w-full">
            {/* предупреждение */}
            {item.needsRevision && <WarningBlock item={item} />}
            {/* характеристики */}
            {Object.keys(item.params).length > 0 ? (
              <CharacteristicsBlock item={item} />
            ) : (
              <span className="text-gray-500">Характеристики не указаны</span>
            )}
          </div>
        </div>
        <div className="mt-8 w-full max-w-120">
          <h1 className="text-xl font-medium text-gray-900">Описание</h1>
          <p className="pt-4">{item.description || "Описания нет"}</p>
        </div>
      </div>
    </div>
  );
}
