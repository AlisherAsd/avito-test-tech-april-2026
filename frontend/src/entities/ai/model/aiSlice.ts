import { createSlice } from "@reduxjs/toolkit";
import type { AiState, StateDescription, StatePrice } from "../types";
import { fetchGenerateDescription, fetchGeneratePrice } from "./aiThunk";
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
};

function setLoading(state: StateDescription | StatePrice) {
  state.loading = true;
  state.error = null;
  state.status = "pending";
}

function setError(state: StateDescription | StatePrice, message: string) {
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
        }
      });
  },
});

export const { resetAi, resetDescriptionAi, resetPriceAi } = aiSlice.actions;
export const aiReducer = aiSlice.reducer;
