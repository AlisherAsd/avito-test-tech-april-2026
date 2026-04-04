import type { AppDispatch } from "@/app/store";
import { selectDescriptionAi } from "@/entities/ai/model/aiSelectors";
import { fetchGenerateDescription } from "@/entities/ai/model/aiThunk";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export default function AIChat() {
  const dispatch = useDispatch<AppDispatch>();
  const aiDescription = useSelector(selectDescriptionAi);
  function handleTest() {
    dispatch(fetchGenerateDescription({ text: "Айфон 17 краснчй" }));
  }
  return (
    <div className="min-w-50">
      <div>{JSON.stringify(aiDescription)}</div>
      <Button onClick={handleTest}>Получить токен</Button>
    </div>
  );
}
