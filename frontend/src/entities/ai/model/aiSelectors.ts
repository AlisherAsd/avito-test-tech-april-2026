import type { RootState } from "@/app/store";

export const selectDescriptionAi = (state: RootState) => state.ai.description.aiDescription;
export const selectTextPriceAi = (state: RootState) => state.ai.price.aiPriceText;
export const selectMainPriceAi = (state: RootState) => state.ai.price.aiMainPrice;
export const selectAiPriceLoading = (state: RootState) => state.ai.price.loading;
export const selectAiPriceError = (state: RootState) => state.ai.price.error;
export const selectAiPriceStatus = (state: RootState) => state.ai.price.status;
export const selectAiDescriptionLoading = (state: RootState) => state.ai.description.loading;
export const selectADescriptioneError = (state: RootState) => state.ai.description.error;
export const selectAiDescriptionStatus = (state: RootState) => state.ai.description.status;
export const selectAiChat = (state: RootState) => state.ai.chat.chat;
export const selectAiChatLoading = (state: RootState) => state.ai.chat.loading;
export const selectAiChatError = (state: RootState) => state.ai.chat.error;
export const selectAiChatStatus = (state: RootState) => state.ai.chat.status;
