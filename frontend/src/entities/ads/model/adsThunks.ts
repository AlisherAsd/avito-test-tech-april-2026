import { createAsyncThunk } from "@reduxjs/toolkit";
import { adsApi } from "../api/adsApi";
import type { ItemsGetOut, RequestAdData } from "../types";
import type { Params } from "@/shared/api/types";

export const fetchAds = createAsyncThunk<ItemsGetOut, Params | undefined>(
  "ads/fetchAds",
  async (params?: Params) => {
    const response = await adsApi.getItems(params);
    return response;
  }
);

export const fetchAdById = createAsyncThunk("ads/fetchAdById", async (id: string) => {
  const response = await adsApi.getItemById(id);
  return response;
});

export const editAd = createAsyncThunk(
  "ads/editAd",
  async (payloadCreator: { id: string; data: RequestAdData }) => {
    const response = await adsApi.editItem(payloadCreator.id, payloadCreator.data);
    return response;
  }
);
