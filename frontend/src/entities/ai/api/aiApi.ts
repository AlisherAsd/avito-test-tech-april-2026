import axios from "axios";

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export const aiApi = {
  generateText: async (text: string, prompt: string) => {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "qwen/qwen3.6-plus:free",
        messages: [
          {
            role: "system",
            content: "Отвечай максимально коротко. Только факты. Без пояснений.",
          },
          {
            role: "user",
            content: `${prompt}: ${text}`,
          },
        ],
        max_tokens: 100,
        temperature: 0.3,
        top_p: 0.8,
        stream: false,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data?.choices?.[0]?.message?.content ?? "";
  },
};
