import type { ResponseAd } from "@/entities/ads/types";
import type { AdFormData } from "../types";

export const setInitialAdFormData = (): AdFormData => {
  return {
    title: "",
    description: "",
    price: "",
    category: "auto",
    /** Поля для характеристик электроники */
    brandElectronic: "",
    modelElectronic: "",
    color: "",
    typeElectronic: "laptop",
    condition: "new",
    /** Поля для характеристик авто */
    brandAuto: "",
    modelAuto: "",
    yearOfManufacture: "",
    transmission: "automatic",
    mileage: "",
    enginePower: "",
    /** Поля для характеристик недвижимости */
    typeEstate: "flat",
    address: "",
    area: "",
    floor: "",
  };
};

export const setDataAdFormData = (item?: ResponseAd): Partial<AdFormData> => {
  if (!item) return setInitialAdFormData();

  const base = {
    title: item.title,
    description: item.description ?? "",
    price: String(item.price),
    category: item.category,
  };

  if (item.category === "electronics") {
    return {
      ...base,
      brandElectronic: item.params.brand ?? "",
      modelElectronic: item.params.model ?? "",
      color: item.params.color ?? "",
      typeElectronic: item.params.type ?? "laptop",
      condition: item.params.condition ?? "new",
    };
  }

  if (item.category === "auto") {
    return {
      ...base,
      brandAuto: item.params.brand ?? "",
      modelAuto: item.params.model ?? "",
      yearOfManufacture: item.params.yearOfManufacture ? String(item.params.yearOfManufacture) : "",
      transmission: item.params.transmission ?? "automatic",
      mileage: item.params.mileage ? String(item.params.mileage) : "",
      enginePower: item.params.enginePower ? String(item.params.enginePower) : "",
    };
  }

  return {
    ...base,
    typeEstate: item.params.type ?? "flat",
    address: item.params.address ?? "",
    area: item.params.area ? String(item.params.area) : "",
    floor: item.params.floor ? String(item.params.floor) : "",
  };
};
