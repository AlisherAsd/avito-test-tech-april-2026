import type { AppDispatch } from "@/app/store";
import { fetchAdById } from "@/entities/ads";
import {
  selectAdsError,
  selectAdsLoading,
  selectDetailAd,
} from "@/entities/ads/model/adsSelectors";
import type { ResponseAd } from "@/entities/ads/types";
import { AdsForm } from "@/features/ads";
import AIChat from "@/features/ai/ui/AiChat";
import Loader from "@/shared/ui/Loader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export default function AdsEditPage() {
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
        <h2 className="text-2xl font-medium leading-tight tracking-tight">
          Редактирование объявления
        </h2>
        <div className="flex justify-between">
          <AdsForm item={item} />
          <AIChat />
        </div>
      </div>
    </div>
  );
}
