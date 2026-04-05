import { MenuItem, Select, type SelectChangeEvent } from "@mui/material";

const sortOptions: { value: string; label: string }[] = [
  { value: "createdAt|desc", label: "По новизне (сначала старые)" },
  { value: "createdAt|asc", label: "По новизне (сначала новые)" },
  { value: "title|asc", label: "По названию (А - Я)" },
  { value: "title|desc", label: "По названию (Я - А)" },
];

interface Props {
  handleSortChange: (event: SelectChangeEvent<string>) => void;
}

export default function AdsSortSelect({ handleSortChange }: Props) {
  return (
    <Select onChange={handleSortChange} defaultValue="createdAt|desc">
      {sortOptions.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}
