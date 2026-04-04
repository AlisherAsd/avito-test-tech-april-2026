import axios from "axios";

const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

export const aiApi = {
  generateDescription: async (text: string) => {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "qwen/qwen3.6-plus:free",
        messages: [
          {
            role: "user",
            content: `Улучши описание объявления: ${text}`,
          },
        ],
        reasoning: { enabled: true },
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
