import type { SortColumn, SortDirection } from "@/shared/api/types";
import AppstoreIcon from "@/shared/assets/AppstoreIcon";
import SearchIcon from "@/shared/assets/SearchIcon";
import UnorderedListIcon from "@/shared/assets/UnorderedListIcon";
import {
  debounce,
  FormControl,
  MenuItem,
  Select,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import { useCallback, useState } from "react";

interface Props {
  setSelectedTableView: (state: "grid" | "list") => void;
  setSortColumn: (column: SortColumn) => void;
  setColumnDirection: (direction: SortDirection) => void;
  setQuery: (query: string) => void;
  query: string;
  state: "grid" | "list";
}

const sortOptions: { value: string; label: string }[] = [
  { value: "createdAt|desc", label: "По новизне (сначала старые)" },
  { value: "createdAt|asc", label: "По новизне (сначала новые)" },
  { value: "title|asc", label: "По названию (А - Я)" },
  { value: "title|desc", label: "По названию (Я - А)" },
];

export default function AdsSearchHeader({
  setSelectedTableView,
  setColumnDirection,
  setSortColumn,
  setQuery,
  query,
  state,
}: Props) {
  const [localQuery, setLocalQuery] = useState(query);

  const debouncedSetQuery = useCallback(
    // eslint-disable-next-line react-hooks/use-memo
    debounce((value: string) => {
      setQuery(value);
    }, 300),
    [setQuery]
  );

  const handleQueryChange = (value: string) => {
    setLocalQuery(value);
    debouncedSetQuery(value);
  };
  function handleTableViewChange(newView: "grid" | "list") {
    setSelectedTableView(newView);
    localStorage.setItem("adsTableView", newView);
  }

  function handleSortChange(event: SelectChangeEvent<string>) {
    const [value, direction] = (event.target.value as string).split("|");

    setSortColumn(value as SortColumn);
    setColumnDirection(direction as SortDirection);
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white p-3 sm:flex-row sm:items-center">
      <TextField
        placeholder="Найти объявление..."
        fullWidth
        size="small"
        value={localQuery}
        onChange={(e) => handleQueryChange(e.target.value as string)}
        slotProps={{
          input: {
            endAdornment: <SearchIcon />,
          },
        }}
        sx={{
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#F4F4F6",
            borderRadius: "8px",
          },
          "& fieldset": { border: "none" },
        }}
      />
      <div className="flex shrink-0 items-center gap-3">
        <div className="flex gap-1 rounded-lg bg-[#F4F4F6] p-1">
          <button
            type="button"
            className={`rounded-md p-2 transition-colors ${
              state === "grid" ? "bg-white shadow-sm" : "opacity-60 hover:opacity-100"
            }`}
            aria-pressed={true}
            onClick={() => handleTableViewChange("grid")}
            aria-label="Сетка"
          >
            <AppstoreIcon />
          </button>
          <button
            type="button"
            className={`rounded-md p-2 transition-colors ${
              state === "list" ? "bg-white shadow-sm" : "opacity-60 hover:opacity-100"
            }`}
            aria-pressed={true}
            onClick={() => handleTableViewChange("list")}
            aria-label="Список"
          >
            <UnorderedListIcon />
          </button>
        </div>
        <FormControl size="small" sx={{ width: 270 }}>
          <Select onChange={handleSortChange} defaultValue="createdAt|desc">
            {sortOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
}
