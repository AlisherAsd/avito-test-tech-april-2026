import type { AdFormData } from "@/features/ads/types";
import type {
  AutoItemParams,
  BaseRequestAdData,
  ElectronicsItemParams,
  RealEstateItemParams,
  RequestAdData,
} from "../types";
import { clearEmptyFields } from "@/shared/lib/clearEmptyFields";

export default function formatFromAdFormDataToAdData(item: AdFormData): RequestAdData {
  const mainFields: BaseRequestAdData = {
    title: item.title,
    description: item.description || "",
    price: parseFloat(item.price) || 0,
  };
  if (item.category === "auto") {
    const params = clearEmptyFields<AutoItemParams>({
      brand: item?.brandAuto || "",
      model: item?.modelAuto || "",
      yearOfManufacture: parseInt(item?.yearOfManufacture || "") || 0,
      transmission: item?.transmission || "automatic",
      mileage: parseFloat(item?.mileage || "") || 0,
      enginePower: parseFloat(item?.enginePower || "") || 0,
    });
    return {
      ...mainFields,
      category: "auto",
      params,
    };
  }

  if (item.category === "electronics") {
    const params = clearEmptyFields<ElectronicsItemParams>({
      type: item?.typeElectronic || "laptop",
      brand: item?.brandElectronic || "",
      model: item?.modelElectronic || "",
      condition: item?.condition || "new",
      color: item?.color || "",
    });
    return {
      ...mainFields,
      category: "electronics",
      params,
    };
  }
  const params = clearEmptyFields<RealEstateItemParams>({
    type: item?.typeEstate || "flat",
    address: item?.address || "",
    area: parseFloat(item?.area || "") || 0,
    floor: parseInt(item?.floor || "") || 0,
  });
  return {
    ...mainFields,
    category: "real_estate",
    params,
  };
}
