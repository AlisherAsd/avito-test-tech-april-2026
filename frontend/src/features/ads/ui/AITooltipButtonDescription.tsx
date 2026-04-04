import CustomTooltip from "@/shared/ui/CustomTooltip";
import AIButton from "./AIButton";
import { Button } from "@mui/material";
import ErrorAIContentTooltip from "@/shared/ui/ErrorAIContentTooltip";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/app/store";
import { fetchGenerateDescription } from "@/entities/ai/model/aiThunk";
import LoadingAIContent from "@/shared/ui/LoadingAiContent";
import { useState } from "react";
import { resetDescriptionAi } from "@/entities/ai/model/aiSlice";
import type { AdFormData } from "../types";
import {
  selectAiDescriptionLoading,
  selectAiDescriptionStatus,
  selectDescriptionAi,
} from "@/entities/ai/model/aiSelectors";

function AIContent({
  aiDescription,
  handleClose,
  handleApplyDescription,
}: {
  aiDescription: string | null;
  handleClose: () => void;
  handleApplyDescription: (text: string) => void;
}) {
  if (!aiDescription) return null;
  return (
    <div className="min-w-80.5 p-2">
      <p className="font-medium mb-2">Ответ AI:</p>
      {/* 
      <p className="text-sm">Средняя цена на MacBook Pro 16" M1 Pro (16/512GB):</p>
      <ul className="space-y-1 text-sm">
        <li>• 115 000 – 135 000 ₽ — отличное состояние.</li>
        <li>• От 140 000 ₽ — идеал, малый износ АКБ.</li>
        <li>• 90 000 – 110 000 ₽ — срочно или с дефектами.</li>
      </ul> */}
      {aiDescription}
      <div className="flex gap-2 mt-4">
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            handleApplyDescription(aiDescription);
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

interface AITooltipButtonProps {
  getFormData: () => AdFormData;
  handleApplyDescription: (text: string) => void;
}

export default function AITooltipButtonDescription({
  getFormData,
  handleApplyDescription,
}: AITooltipButtonProps) {
  const [openTooltip, setOpenTooltip] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const aiDescription = useSelector(selectDescriptionAi);
  const loading = useSelector(selectAiDescriptionLoading);
  const status = useSelector(selectAiDescriptionStatus);
  function handleGenerateDescription() {
    if (status === "pending") {
      return;
    }
    if (status === "success") {
      dispatch(resetDescriptionAi());
    }
    const formData = getFormData();
    dispatch(fetchGenerateDescription({ text: JSON.stringify(formData) }));
  }

  function getContent(status: "error" | "success" | "pending" | null) {
    if (status === "error")
      return ErrorAIContentTooltip({
        handleClick: () => {
          setOpenTooltip(false);
          dispatch(resetDescriptionAi());
        },
      });
    else if (status === "pending")
      return LoadingAIContent({ handleClick: () => setOpenTooltip(false) });
    else if (status === "success")
      return AIContent({
        aiDescription,
        handleClose: () => setOpenTooltip(false),
        handleApplyDescription,
      });
    return AIContent({
      aiDescription,
      handleClose: () => setOpenTooltip(false),
      handleApplyDescription,
    });
  }

  return (
    <CustomTooltip
      setOpen={setOpenTooltip}
      open={openTooltip}
      content={getContent(status)}
      isErrored={status === "error"}
    >
      <AIButton
        onClick={handleGenerateDescription}
        label="Улучшить описание"
        loading={loading}
        isReady={status === "error" || status === "success"}
      />
    </CustomTooltip>
  );
}
