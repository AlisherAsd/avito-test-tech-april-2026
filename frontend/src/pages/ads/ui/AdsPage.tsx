import {
  selectAdsError,
  selectAdsLoading,
  selectAdsTotal,
  selectAllAds,
} from "@/entities/ads/model/adsSelectors";
import useAdsFilters from "@/features/ads/helpers/useAdsFilters";
import { AdsAside, AdsHeader } from "@/widgets/ads";
import AdsSearchHeader from "@/widgets/ads/ui/AdsSearchHeader";
import AdsTable from "@/widgets/ads/ui/AdsTable";
import { Pagination } from "@mui/material";
import { useSelector } from "react-redux";

export default function AdsPage() {
  const {
    selectedTableView,
    setSelectedTableView,
    setSortColumn,
    setSortDirection,
    query,
    setQuery,
    needsRevision,
    setNeedsRevision,
    selectedCategory,
    setSelectedCategory,
    page,
    setPage,
  } = useAdsFilters();

  const items = useSelector(selectAllAds);
  const total = useSelector(selectAdsTotal);
  const loading = useSelector(selectAdsLoading);
  const error = useSelector(selectAdsError);

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
