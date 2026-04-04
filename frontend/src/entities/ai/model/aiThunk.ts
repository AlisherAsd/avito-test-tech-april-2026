import { createAsyncThunk } from "@reduxjs/toolkit";
import { aiApi } from "../api/aiApi";

const promtDescription = (text: string) => `
Улучши описание объявления на основе этих данных: ${text}

Требования:
- Верни ТОЛЬКО текст описания
- Не включай название товара в начало
- Не используй маркированные списки
- Пиши связными предложениями

Описание:
`;

const promtPrice = (text: string) => `Проанализируй объявление и определи рыночную стоимость товара.

Формат ответа (строго соблюдай структуру):
Средняя цена на [ТОВАР]:
[минимальная цена] – [максимальная цена] ₽ — отличное состояние.
От [цена] ₽ — идеал, малый износ.
[минимальная цена] – [максимальная цена] ₽ — срочно или с дефектами.

Данные объявления:
${text}
`;

export const fetchGenerateDescription = createAsyncThunk(
  "ai/fetchGenerateDescription",
  async ({ text }: { text: string }) => {
    const response = await aiApi.generateText(text, promtDescription(text));
    return response;
  }
);

export const fetchGeneratePrice = createAsyncThunk(
  "ai/fetchGeneratePrice",
  async ({ text }: { text: string }) => {
    const response = await aiApi.generateText(text, promtPrice(text));
    return response;
  }
);
