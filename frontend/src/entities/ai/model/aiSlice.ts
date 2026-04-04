import { createSlice } from "@reduxjs/toolkit";
import type { AiState } from "../types";
import { fetchGenerateDescription } from "./aiThunk";

const initialState: AiState = {
  error: null,
  aiDescription: "",
  loading: false,
};

function setLoading(state: AiState) {
  state.loading = true;
  state.error = null;
}

function setError(state: AiState, message: string) {
  state.loading = false;
  state.error = message || "Ошибка загрузки";
}

const aiSlice = createSlice({
  name: "ai",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGenerateDescription.pending, setLoading)
      .addCase(fetchGenerateDescription.rejected, (state, action) => {
        setError(state, action.error.message || "Ошибка при загрузке AI");
      })
      .addCase(fetchGenerateDescription.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.aiDescription = action.payload;
      });
  },
});

export const aiReducer = aiSlice.reducer;
