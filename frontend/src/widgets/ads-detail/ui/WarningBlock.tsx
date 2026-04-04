import { getEmptyFields } from "@/entities/ads/lib/getEmptyFields";
import type { ResponseAd } from "@/entities/ads/types";
import ExclamationCircleIcon from "@/shared/assets/ExclamationCircleIcon";

interface Props {
  item: ResponseAd;
}

export default function WarningBlock({ item }: Props) {
  const emptyFields = getEmptyFields(item);
  if (emptyFields.length === 0) {
    return null;
  }
  return (
    <div className="rounded-lg mb-9 w-full max-w-lg border border-[#FFE4CC] bg-[#F9F1E6] p-4 flex gap-3 shadow-lg">
      <ExclamationCircleIcon />
      <div className="flex flex-col">
        <h3 className="font-semibold">Требуются доработки</h3>
        <p className="mb-2 mt-1 text-sm">У объявления не заполнены поля:</p>
        <ul className="space-y-1 text-sm">
          {emptyFields.map((field) => (
            <li key={field} className="flex items-center gap-2">
              <span className="size-1 rounded-full bg-[#E37318]" />
              {field}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
