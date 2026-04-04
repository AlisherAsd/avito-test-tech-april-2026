import { createAsyncThunk } from "@reduxjs/toolkit";
import { aiApi } from "../api/aiApi";

export const fetchGenerateDescription = createAsyncThunk(
  "ai/fetchAuthToken",
  async ({ text }: { text: string }) => {
    const response = await aiApi.generateDescription(text);
    return response;
  }
);
