import { Button } from "@mui/material";

interface Props {
  value: string;
  content: string;
  handleClose: () => void;
  handleApply: (text: string) => void;
}

export function AIContent({ value, content, handleClose, handleApply }: Props) {
  if (!value || !content) return null;
  return (
    <div className="min-w-80.5 p-2">
      <p className="font-medium mb-2">Ответ AI:</p>
      {content}
      <div className="flex gap-2 mt-4">
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            handleApply(value);
            handleClose();
          }}
        >
          Применить
        </Button>
        <Button size="small" variant="outlined" onClick={handleClose}>
          Закрыть
        </Button>
      </div>
    </div>
  );
}
