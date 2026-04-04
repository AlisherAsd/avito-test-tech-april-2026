export type SortColumn = "createdAt" | "title";
export type SortDirection = "asc" | "desc";
export type ItemCategory = "auto" | "real_estate" | "electronics";

export interface Params {
  page: number;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
  needsRevision?: boolean;
  categories?: ItemCategory[];
  q?: string;
}
