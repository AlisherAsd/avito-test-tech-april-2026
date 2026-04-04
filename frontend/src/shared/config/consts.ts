import type { ElectronicType, EstateType, TransmissionType } from "@/entities/ads/types";
import type { ItemCategory } from "../api/types";

export type CategiryRu = Record<ItemCategory, string>;

export const CATEGORIES_RU: CategiryRu = {
  electronics: "Электроника",
  real_estate: "Недвижимость",
  auto: "Авто",
};

export const ELECTRONIC_TYPES_RU: Record<ElectronicType, string> = {
  phone: "Телефон",
  laptop: "Ноутбук",
  misc: "Другое",
};

export const CONDITION_TYPES_RU: Record<"new" | "used", string> = {
  new: "Новое",
  used: "Б/у",
};

export const TRANSMISSIONS_TYPES_RU: Record<TransmissionType, string> = {
  automatic: "Автомат",
  manual: "Механика",
};

export const ESTATE_TYPES_RU: Record<EstateType, string> = {
  room: "Комната",
  house: "Дом",
  flat: "Квартира",
};
