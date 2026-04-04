import { Button } from "@mui/material";

export default function ErrorAIContentTooltip() {
  return (
    <div className="min-w-80.5 p-2">
      <p className="font-medium mb-2 text-[#C00F0C]">Произошла ошибка при запросе к AI</p>
      <p className="text-sm">Попробуйте повторить запрос или закройте уведомление</p>
      <div className=" mt-4">
        <Button
          size="small"
          variant="contained"
          sx={{
            textTransform: "none",
            backgroundColor: "#FCB3AD",
            color: "#000000D9",
          }}
        >
          Закрыть
        </Button>
      </div>
    </div>
  );
}
