import axios from "axios";
import type { ItemsGetOut, RequestAdData, ResponseAd } from "../types";
import type { Params } from "@/shared/api/types";

const BASE_API_URL = import.meta.env.VITE_BASE_API_URL;

const inittialParams: Params = {
  page: 0,
  sortColumn: "createdAt",
  sortDirection: "desc",
  needsRevision: false,
};

const normolizeParams = (params: Params): Params => {
  return {
    ...params,
    page: params.page < 1 ? 1 : params.page,
  };
};

export const adsApi = {
  getItems: async (params: Params = inittialParams): Promise<ItemsGetOut> => {
    const response = await axios.get(
      `${BASE_API_URL}/items?limit=10&q=${params.q || ""}&skip=${(normolizeParams(params).page - 1) * 10}&sortColumn=${params.sortColumn}&sortDirection=${params.sortDirection}&needsRevision=${params.needsRevision || false}&categories=${params.categories ? params.categories.join(",") : ""}`
    );
    return response.data;
  },

  getItemById: async (id: string): Promise<ResponseAd> => {
    const response = await axios.get(`${BASE_API_URL}/items/${id}`);
    return response.data;
  },

  editItem: async (id: string, data: Partial<RequestAdData>): Promise<void> => {
    const response = await axios.put(`${BASE_API_URL}/items/${id}`, data);
    return response.data;
  },
};
