import type {
  ConditionType,
  ElectronicType,
  EstateType,
  TransmissionType,
} from "@/entities/ads/types";
import type { ItemCategory } from "@/shared/api/types";

export type AdFormData = {
  /** Обшие поля */
  title: string;
  description: string;
  price: string;
  category: ItemCategory;
  /** Поля для характеристик электроники */
  brandElectronic?: string;
  modelElectronic?: string;
  color?: string;
  typeElectronic?: ElectronicType;
  condition?: ConditionType;
  /** Поля для характеристик авто */
  brandAuto?: string;
  modelAuto?: string;
  yearOfManufacture?: string;
  transmission?: TransmissionType;
  mileage?: string;
  enginePower?: string;
  /** Поля для характеристик недвижимости */
  typeEstate?: EstateType;
  address?: string;
  area?: string;
  floor?: string;
};
