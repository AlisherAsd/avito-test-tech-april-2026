import type { ItemCategory } from "@/shared/api/types";
import { Button, Checkbox, FormControlLabel, FormGroup, Switch } from "@mui/material";

interface Category {
  key: ItemCategory;
  label: string;
}

const CATEGORIES: Category[] = [
  { key: "auto", label: "Авто" },
  { key: "electronics", label: "Электроника" },
  { key: "real_estate", label: "Недвижимость" },
] as const;

interface Props {
  categories: ItemCategory[];
  setNeedsRevision: (value: boolean) => void;
  setSelectedCategory: (value: ItemCategory[]) => void;
  setPage: (value: number) => void;
  needsRevision: boolean;
}

export default function AdsAside({
  categories,
  setNeedsRevision,
  setSelectedCategory,
  setPage,
  needsRevision,
}: Props) {
  function handleCategoryChange(category: ItemCategory) {
    if (categories.includes(category)) {
      setSelectedCategory(categories.filter((c) => c !== category));
    } else {
      setSelectedCategory([...categories, category]);
    }
    setPage(1);
  }

  function handleResetFilters() {
    setSelectedCategory([]);
    setNeedsRevision(false);
  }
  return (
    <aside className="w-full shrink-0 lg:w-[256px] flex flex-col gap-4">
      <div className="rounded-lg bg-white p-4">
        <h2 className="text-base font-semibold">Фильтры</h2>
        <p className="mt-4 text-sm text-[#1a1a1a]">Категория</p>
        <FormGroup className="mt-2 gap-0">
          {CATEGORIES.map((c: Category) => (
            <FormControlLabel
              key={c.key}
              control={
                <Checkbox
                  size="small"
                  onClick={() => handleCategoryChange(c.key)}
                  checked={categories.includes(c.key)}
                />
              }
              label={c.label}
              sx={{ marginY: -0.5 }}
            />
          ))}
        </FormGroup>
        <hr className="border-t border-[#F0F0F0] my-2.5" />
        <div className="flex items-center justify-between gap-2">
          <span className="font-semibold text-sm leading-snug text-[#1a1a1a]">
            Только требующие доработок
          </span>
          <Switch checked={needsRevision} onChange={(e) => setNeedsRevision(e.target.checked)} />
        </div>
      </div>
      <Button
        variant="outlined"
        fullWidth
        onClick={handleResetFilters}
        sx={{
          textTransform: "none",
          borderColor: "#E0E0E4",
          color: "#1a1a1a",
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: "#f5f5f5",
            borderColor: "#E0E0E4",
          },
        }}
      >
        Сбросить фильтры
      </Button>
    </aside>
  );
}
