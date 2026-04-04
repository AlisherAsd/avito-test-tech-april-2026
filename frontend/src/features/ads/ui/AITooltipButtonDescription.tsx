import CustomTooltip from "@/shared/ui/CustomTooltip";
import AIButton from "./AIButton";
import ErrorAIContentTooltip from "@/shared/ui/ErrorAIContentTooltip";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/app/store";
import { fetchGenerateDescription } from "@/entities/ai/model/aiThunk";
import LoadingAIContent from "@/shared/ui/LoadingAiContent";
import { useState } from "react";
import { pushMessage, resetDescriptionAi } from "@/entities/ai/model/aiSlice";
import type { AdFormData } from "../types";
import {
  selectAiDescriptionLoading,
  selectAiDescriptionStatus,
  selectDescriptionAi,
} from "@/entities/ai/model/aiSelectors";
import { AIContent } from "@/shared/ui/AiContentTooltip";

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
    dispatch(pushMessage({ message: "Улучши описание опираясь на объявление", from: "user" }));
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
        value: aiDescription,
        content: aiDescription,
        handleClose: () => setOpenTooltip(false),
        handleApply: handleApplyDescription,
      });
    return AIContent({
      value: aiDescription,
      content: aiDescription,
      handleClose: () => setOpenTooltip(false),
      handleApply: handleApplyDescription,
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
