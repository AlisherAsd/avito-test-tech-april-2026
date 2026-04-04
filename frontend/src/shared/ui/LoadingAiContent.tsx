
import { Button } from "@mui/material";
import Loader from "./Loader";

interface Props {
  handleClick: () => void
}


export default function LoadingAIContent({ handleClick }: Props) {
  return (
    <div className="min-w-80.5 p-2">
      <div className=" flex flex-col justify-center items-center">
      <p className="font-medium mb-2">AI генерирует ответ...</p>
      <Loader />
      </div>
       <div className=" mt-4">
        <Button
          size="small"
          variant="contained"
          onClick={handleClick}
          sx={{
            textTransform: "none",
          }}
        >
          Отменить
        </Button>
      </div>
    </div>
  );
}
