import type { AppDispatch } from "@/app/store";
import { fetchAds } from "@/entities/ads";
import {
  selectAdsError,
  selectAdsLoading,
  selectAdsTotal,
  selectAllAds,
} from "@/entities/ads/model/adsSelectors";
import type { ItemCategory, SortColumn, SortDirection } from "@/shared/api/types";
import { AdsAside, AdsHeader } from "@/widgets/ads";
import AdsSearchHeader from "@/widgets/ads/ui/AdsSearchHeader";
import AdsTable from "@/widgets/ads/ui/AdsTable";
import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function AdsPage() {
  const [selectedTableView, setSelectedTableView] = useState<"grid" | "list">(
    localStorage.getItem("adsTableView") === "grid" ? "grid" : "list"
  );
  const [sortColumn, setSortColumn] = useState<SortColumn>("createdAt");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [query, setQuery] = useState<string>("");
  const [needsRevision, setNeedsRevision] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory[]>([]);
  const [page, setPage] = useState(1);

  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector(selectAllAds);
  const total = useSelector(selectAdsTotal);
  const loading = useSelector(selectAdsLoading);
  const error = useSelector(selectAdsError);

  useEffect(() => {
    dispatch(
      fetchAds({
        page,
        sortColumn,
        sortDirection,
        needsRevision,
        q: query,
        categories: selectedCategory.length > 0 ? selectedCategory : undefined,
      })
    );
  }, [dispatch, sortColumn, sortDirection, page, needsRevision, selectedCategory, query]);

  return (
    <div className="bg-[#F7F5F8] px-8 pt-3 pb-5.5 flex flex-col gap-4 h-full">
      <AdsHeader total={total} />
      <AdsSearchHeader
        setColumnDirection={setSortDirection}
        setSortColumn={setSortColumn}
        setSelectedTableView={setSelectedTableView}
        setQuery={setQuery}
        query={query}
        state={selectedTableView}
      />
      <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-start h-full">
        <AdsAside
          categories={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          needsRevision={needsRevision}
          setNeedsRevision={setNeedsRevision}
          setPage={setPage}
        />
        <div className="min-w-0 min-h-0 flex-1 h-full">
          <AdsTable
            isLoading={loading}
            selectedTableView={selectedTableView}
            items={items}
            error={error}
          />
          <div className="mt-8 flex justify-start">
            <Pagination
              onChange={(_, val) => setPage(val)}
              count={Math.ceil(total / 10) || 1}
              page={page}
              color="primary"
              shape="rounded"
              siblingCount={1}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
