/**
 * Функция для удаления путых полей
 */
export function clearEmptyFields<T extends Record<string, string | number>>(obj: T): Partial<T> {
  const result: Partial<T> = {};

  for (const key in obj) {
    const value = obj[key];

    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      value !== 0 &&
      !(Array.isArray(value) && value.length === 0)
    ) {
      result[key] = value;
    }
  }

  return result;
}
