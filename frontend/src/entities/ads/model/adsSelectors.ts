import type { RootState } from "@/app/store";

export const selectAllAds = (state: RootState) => state.ads.items;
export const selectDetailAd = (state: RootState) => state.ads.detailAd;
export const selectAdsTotal = (state: RootState) => state.ads.total;
export const selectAdsLoading = (state: RootState) => state.ads.loading;
export const selectAdsError = (state: RootState) => state.ads.error;
