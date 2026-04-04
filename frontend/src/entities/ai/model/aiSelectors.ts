import type { RootState } from "@/app/store";

export const selectDescriptionAi = (state: RootState) => state.ai.aiDescription;
