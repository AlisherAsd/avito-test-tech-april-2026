export type { AdsItem, ItemsGetOut, AdsState } from "./types";

export { adsApi } from "./api/adsApi";

export { adsReducer } from "./model/adsSlice";
export { fetchAds, fetchAdById } from "./model/adsThunks";
export { clearError, resetAds } from "./model/adsSlice";
export {
  selectAllAds,
  selectAdsTotal,
  selectAdsLoading,
  selectAdsError,
} from "./model/adsSelectors";
