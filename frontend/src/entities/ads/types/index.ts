import type { SortColumn } from "@/shared/api/types";
import type { SortDirection } from "@mui/material";

export interface AdsItem {
  id?: string;
  category: "auto" | "real_estate" | "electronics";
  title: string;
  price: number;
  needsRevision: boolean;
}

export interface ItemsGetOut {
  items: AdsItem[];
  total: number;
}

export interface AdsState {
  items: AdsItem[];
  detailAd: ResponseAd | null;
  total: number;
  loading: boolean;
  error: string | null;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}

type BaseAd = {
  id: string;
  title: string;
  description?: string;
  price: number;
  needsRevision: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ResponseAd =
  | (BaseAd & {
      category: "auto";
      params: AutoItemParams;
    })
  | (BaseAd & {
      category: "real_estate";
      params: RealEstateItemParams;
    })
  | (BaseAd & {
      category: "electronics";
      params: ElectronicsItemParams;
    });

export type TransmissionType = "automatic" | "manual";

export type AutoItemParams = {
  brand?: string;
  model?: string;
  yearOfManufacture?: number;
  transmission?: TransmissionType;
  mileage?: number;
  enginePower?: number;
};

export type EstateType = "flat" | "house" | "room";

export type RealEstateItemParams = {
  type?: EstateType;
  address?: string;
  area?: number;
  floor?: number;
};

export type ElectronicType = "phone" | "laptop" | "misc";
export type ConditionType = "new" | "used";

export type ElectronicsItemParams = {
  type?: ElectronicType;
  brand?: string;
  model?: string;
  condition?: ConditionType;
  color?: string;
};

export type BaseRequestAdData = Omit<BaseAd, "id" | "needsRevision" | "createdAt" | "updatedAt">;
export type RequestAdData =
  | (BaseRequestAdData & {
      category: "auto";
      params: AutoItemParams;
    })
  | (BaseRequestAdData & {
      category: "real_estate";
      params: RealEstateItemParams;
    })
  | (BaseRequestAdData & {
      category: "electronics";
      params: ElectronicsItemParams;
    });
