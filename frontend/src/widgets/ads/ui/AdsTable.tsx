import type { AdsItem } from "@/entities/ads/types";
import AdsGridTable from "./AdsGridTable";
import AdsList from "./AdsList";
import Loader from "@/shared/ui/Loader";

interface Props {
  selectedTableView: "grid" | "list";
  items: AdsItem[];
  isLoading?: boolean;
  error?: string | null;
}

export default function AdsTable({ selectedTableView, items, isLoading, error }: Props) {
  if (error) {
    return (
      <div className="h-full flex items-center justify-center">
        <span className="text-red-500">Ошибка загрузки объявления: {error}</span>{" "}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-280px)]">
        <div className="h-full flex items-center justify-center">
          <Loader />
        </div>
      </div>
    );
  }

  if (items.length === 0 && !isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-280px)]">
        <p className="text-sm text-[#1a1a1a]">Объявления не найдены :( </p>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-280px)] overflow-y-auto">
      {selectedTableView === "grid" ? <AdsGridTable ads={items} /> : <AdsList ads={items} />}
    </div>
  );
}
