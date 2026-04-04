import { createSlice } from "@reduxjs/toolkit";
import { fetchAds, fetchAdById, editAd } from "./adsThunks";
import type { AdsState } from "../types";

const initialState: AdsState = {
  items: [],
  detailAd: null,
  total: 0,
  loading: false,
  error: null,
  sortColumn: "createdAt",
  sortDirection: "desc",
};

function setLoading(state: AdsState) {
  state.loading = true;
  state.error = null;
}

function setError(state: AdsState, message: string) {
  state.loading = false;
  state.error = message || "Ошибка загрузки";
}

const adsSlice = createSlice({
  name: "ads",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetAds: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAds.pending, setLoading)
      .addCase(fetchAds.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.total = action.payload.total;
      })
      .addCase(fetchAds.rejected, (state, action) => {
        setError(state, action.error.message || "Ошибка загрузки");
      })
      .addCase(fetchAdById.pending, setLoading)
      .addCase(fetchAdById.fulfilled, (state, action) => {
        state.loading = false;
        state.detailAd = action.payload;
      })
      .addCase(fetchAdById.rejected, (state, action) => {
        setError(state, action.error.message || "Ошибка загрузки");
      })
      .addCase(editAd.pending, setLoading)
      .addCase(editAd.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(editAd.rejected, (state, action) => {
        setError(state, action.error.message || "Ошибка обновления");
      });
  },
});

export const { clearError, resetAds } = adsSlice.actions;

export const adsReducer = adsSlice.reducer;
