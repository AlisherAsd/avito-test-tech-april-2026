import { adsReducer } from "@/entities/ads/model/adsSlice";
import { configureStore } from "@reduxjs/toolkit";
import store from "./store";
import { aiReducer } from "@/entities/ai/model/aiSlice";

export default configureStore({
  reducer: {
    ads: adsReducer,
    ai: aiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
