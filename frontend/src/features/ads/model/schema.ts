import z from "zod";

export const categoryEnum = z.enum(["auto", "real_estate", "electronics"]);

export const electronicTypeEnum = z.enum(["phone", "laptop", "misc"]);
export const conditionEnum = z.enum(["new", "used"]);

export const transmissionEnum = z.enum(["automatic", "manual"]);
export const estateEnum = z.enum(["flat", "house", "room"]);

export const adFormSchema = z.object({
  /** Обшие поля */
  title: z
    .string()
    .min(3, "Название должно быть заполнено")
    .max(100, "Название должно быть не длиннее 100 символов"),
  description: z.string(),
  category: categoryEnum,
  price: z
    .string()
    .min(1, "Цена должна быть заполнена")
    .refine((val) => !/^0+(\.0+)?$/.test(val), {
      message: "Цена не может быть равна 0",
    })
    .refine((val) => parseFloat(val) > 0, {
      message: "Цена должна быть больше 0",
    }),
  /** Поля для характеристик электроники */
  brandElectronic: z.string().optional(),
  modelElectronic: z.string().optional(),
  color: z.string().optional(),
  typeElectronic: electronicTypeEnum.optional(),
  condition: conditionEnum.optional(),
  /** Поля для характеристик авто */
  brandAuto: z.string().optional(),
  modelAuto: z.string().optional(),
  yearOfManufacture: z.string().optional(),
  transmission: transmissionEnum.optional(),
  mileage: z.string().optional(),
  enginePower: z.string().optional(),
  /** Поля для характеристик недвижимости */
  typeEstate: estateEnum.optional(),
  address: z.string().optional(),
  area: z.string().optional(),
  floor: z.string().optional(),
});
