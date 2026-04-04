export interface StateDescription {
  aiDescription: string;
  loading: boolean;
  status: "pending" | "success" | "error" | null;
  error: string | null;
}

export interface StatePrice {
  aiMainPrice: string;
  aiPriceText: string;
  loading: boolean;
  status: "pending" | "success" | "error" | null;
  error: string | null;
}
export interface AiState {
  description: StateDescription;
  price: StatePrice;
}
