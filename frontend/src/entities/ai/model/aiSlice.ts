import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { AiState, Message, StateChat, StateDescription, StatePrice } from "../types";
import { fetchGenerateAnswer, fetchGenerateDescription, fetchGeneratePrice } from "./aiThunk";
import { extractPriceFromAIResponse } from "@/shared/lib/extractPriceFromAIResponse";

const initialState: AiState = {
  description: {
    aiDescription: "",
    loading: false,
    status: null,
    error: null,
  },
  price: {
    aiMainPrice: "",
    aiPriceText: "",
    loading: false,
    status: null,
    error: null,
  },
  chat: {
    chat: [],
    loading: false,
    status: null,
    error: null,
  },
};

function setLoading(state: StateDescription | StatePrice | StateChat) {
  state.loading = true;
  state.error = null;
  state.status = "pending";
}

function setError(state: StateDescription | StatePrice | StateChat, message: string) {
  state.loading = false;
  state.error = message || "Ошибка загрузки";
  state.status = "error";
}

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {
    resetAi: () => initialState,
    resetDescriptionAi: (state) => {
      state.description = {
        aiDescription: "",
        loading: false,
        status: null,
        error: null,
      };
    },
    resetPriceAi: (state) => {
      state.price = {
        aiPriceText: "",
        aiMainPrice: "",
        loading: false,
        status: null,
        error: null,
      };
    },
    pushMessage: (state, action: PayloadAction<Message>) => {
      state.chat.chat.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenerateDescription.pending, (state) => setLoading(state.description))
      .addCase(fetchGenerateDescription.rejected, (state, action) => {
        setError(state.description, action.error.message || "Ошибка при загрузке AI");
      })
      .addCase(fetchGenerateDescription.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload) {
          state.description.loading = false;
          state.description.status = "success";
          state.description.aiDescription = action.payload;
          state.chat.chat.push({ message: action.payload, from: "ai" });
        }
      })
      .addCase(fetchGeneratePrice.pending, (state) => setLoading(state.price))
      .addCase(fetchGeneratePrice.rejected, (state, action) => {
        setError(state.price, action.error.message || "Ошибка при загрузке AI");
      })
      .addCase(fetchGeneratePrice.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload) {
          state.price.loading = false;
          state.price.status = "success";
          state.price.aiPriceText = action.payload;
          state.price.aiMainPrice = extractPriceFromAIResponse(action.payload) || "0";
          state.chat.chat.push({ message: action.payload, from: "ai" });
        }
      })
      .addCase(fetchGenerateAnswer.pending, (state) => setLoading(state.chat))
      .addCase(fetchGenerateAnswer.rejected, (state, action) => {
        setError(state.chat, action.error.message || "Ошибка при загрузке AI");
      })
      .addCase(fetchGenerateAnswer.fulfilled, (state, action) => {
        console.log(action.payload);
        if (action.payload) {
          state.chat.loading = false;
          state.chat.status = "success";
          state.chat.chat.push({ message: action.payload, from: "ai" });
        }
      });
  },
});

export const { resetAi, resetDescriptionAi, resetPriceAi, pushMessage } = aiSlice.actions;
export const aiReducer = aiSlice.reducer;
