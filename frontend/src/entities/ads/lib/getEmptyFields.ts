import type { ResponseAd } from "../types";

/**
 * Функция для получения списка пустых полей в объявлении.
 * @param item - Объявление, для которого нужно проверить поля.
 * @returns Массив строк с названиями пустых полей.
 */
export function getEmptyFields(item: ResponseAd): string[] {
  if (item.category === "auto") {
    const emptyFields = [];
    if (!item.params?.brand) emptyFields.push("Цвет");
    if (!item.params?.model) emptyFields.push("Состояние");
    if (!item.params?.yearOfManufacture) emptyFields.push("Год выпуска");
    if (!item.params?.transmission) emptyFields.push("Коробка передач");
    if (!item.params?.mileage) emptyFields.push("Пробег");
    if (!item.params?.enginePower) emptyFields.push("Мощность двигателя");
    if (!item?.description) emptyFields.push("Описание");
    return emptyFields;
  }
  if (item.category === "real_estate") {
    const emptyFields = [];
    if (!item.params?.type) emptyFields.push("Тип недвижимости");
    if (!item.params?.address) emptyFields.push("Адрес");
    if (!item.params?.area) emptyFields.push("Площадь");
    if (!item.params?.floor) emptyFields.push("Этаж");
    if (!item?.description) emptyFields.push("Описание");
    return emptyFields;
  }
  if (item.category === "electronics") {
    const emptyFields = [];
    if (!item.params?.type) emptyFields.push("Тип техники");
    if (!item.params?.brand) emptyFields.push("Бренд");
    if (!item.params?.model) emptyFields.push("Модель");
    if (!item.params?.condition) emptyFields.push("Состояние");
    if (!item.params?.color) emptyFields.push("Цвет");
    if (!item?.description) emptyFields.push("Описание");
    return emptyFields;
  }
  return [];
}
