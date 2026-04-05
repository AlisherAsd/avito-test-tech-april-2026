import type { AppDispatch } from "@/app/store";
import { fetchAds } from "@/entities/ads";
import type { ItemCategory, SortColumn, SortDirection } from "@/shared/api/types";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

/**
 * Хук для управления фильтрами и состоянием отображения объявлений на странице AdsPage. Он включает в себя:
 * - selectedTableView: состояние для хранения выбранного вида отображения (grid или list).
 * - sortColumn: состояние для хранения выбранного столбца сортировки.
 * - sortDirection: состояние для хранения направления сортировки (asc или desc).
 * - query: состояние для хранения строки поиска.
 * - needsRevision: состояние для фильтрации объявлений, требующих проверки.
 * - selectedCategory: состояние для хранения выбранных категорий объявлений.
 * - page: состояние для хранения текущей страницы пагинации.
 *
 * Хук также использует useEffect для автоматической загрузки объявлений при изменении фильтров или страницы. Он возвращает все состояния и функции для их обновления, чтобы их можно было использовать в компоненте AdsPage.
 */
export default function useAdsFilters() {
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

  return {
    selectedTableView,
    setSelectedTableView,
    sortColumn,
    setSortColumn,
    sortDirection,
    setSortDirection,
    query,
    setQuery: (value: string) => {
      setQuery(value);
      setPage(1);
    },
    needsRevision,
    setNeedsRevision: (value: boolean) => {
      setNeedsRevision(value);
      setPage(1);
    },
    selectedCategory,
    setSelectedCategory: (value: ItemCategory[]) => {
      setSelectedCategory(value);
      setPage(1);
    },
    page,
    setPage,
  };
}
