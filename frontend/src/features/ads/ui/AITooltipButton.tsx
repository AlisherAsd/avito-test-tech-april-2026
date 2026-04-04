import CustomTooltip from "@/shared/ui/CustomTooltip";
import AIButton from "./AIButton";
import { Button } from "@mui/material";
import ErrorAIContentTooltip from "@/shared/ui/ErrorAIContentTooltip";

interface Props {
  label?: string;
  loading?: boolean;
  isReady?: boolean;
  isErrored?: boolean;
}

export default function AITooltipButton({
  label,
  loading = false,
  isReady = false,
  isErrored = false,
}: Props) {
  const content = (
    <div className="min-w-80.5 p-2">
      <p className="font-medium mb-2">Ответ AI:</p>
      <p className="text-sm">Средняя цена на MacBook Pro 16" M1 Pro (16/512GB):</p>
      <ul className="space-y-1 text-sm">
        <li>• 115 000 – 135 000 ₽ — отличное состояние.</li>
        <li>• От 140 000 ₽ — идеал, малый износ АКБ.</li>
        <li>• 90 000 – 110 000 ₽ — срочно или с дефектами.</li>
      </ul>
      <div className="flex gap-2 mt-4">
        <Button size="small" variant="contained">
          Применить
        </Button>
        <Button size="small" variant="outlined">
          Закрыть
        </Button>
      </div>
    </div>
  );

  return (
    <CustomTooltip content={!isErrored ? content : ErrorAIContentTooltip()} isErrored={isErrored}>
      <AIButton label={label} loading={loading} isReady={isReady} />
    </CustomTooltip>
  );
}
