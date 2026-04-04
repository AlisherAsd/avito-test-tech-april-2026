import CustomTooltip from "@/shared/ui/CustomTooltip";
import AIButton from "./AIButton";
import ErrorAIContentTooltip from "@/shared/ui/ErrorAIContentTooltip";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from "@/app/store";
import {
  selectAiPriceLoading,
  selectAiPriceStatus,
  selectMainPriceAi,
  selectTextPriceAi,
} from "@/entities/ai/model/aiSelectors";
import { fetchGeneratePrice } from "@/entities/ai/model/aiThunk";
import LoadingAIContent from "@/shared/ui/LoadingAiContent";
import { useState } from "react";
import { pushMessage, resetPriceAi } from "@/entities/ai/model/aiSlice";
import type { AdFormData } from "../types";
import { AIContent } from "@/shared/ui/AiContentTooltip";

interface AITooltipButtonProps {
  getFormData: () => AdFormData;
  handleApplyPrice: (text: string) => void;
}

export default function AITooltipButtonPrice({
  getFormData,
  handleApplyPrice,
}: AITooltipButtonProps) {
  const [openTooltip, setOpenTooltip] = useState(false);

  const dispatch = useDispatch<AppDispatch>();
  const aiMainPrice = useSelector(selectMainPriceAi);
  const aiTextPrice = useSelector(selectTextPriceAi);
  const loading = useSelector(selectAiPriceLoading);
  const status = useSelector(selectAiPriceStatus);
  function handleGenerateDescription() {
    if (status === "pending") {
      return;
    }
    if (status === "success") {
      dispatch(resetPriceAi());
    }
    const formData = getFormData();
    dispatch(
      pushMessage({ message: "Скажи рыночную стоимость опираясь на объявление", from: "user" })
    );
    dispatch(fetchGeneratePrice({ text: JSON.stringify(formData) }));
  }

  function getContent(status: "error" | "success" | "pending" | null) {
    if (status === "error")
      return ErrorAIContentTooltip({
        handleClick: () => {
          setOpenTooltip(false);
          dispatch(resetPriceAi());
        },
      });
    else if (status === "pending")
      return LoadingAIContent({ handleClick: () => setOpenTooltip(false) });
    else if (status === "success")
      return AIContent({
        value: aiMainPrice,
        content: aiTextPrice,
        handleClose: () => setOpenTooltip(false),
        handleApply: handleApplyPrice,
      });
    return AIContent({
      value: aiMainPrice,
      content: aiTextPrice,
      handleClose: () => setOpenTooltip(false),
      handleApply: handleApplyPrice,
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
        label="Узнать рыночную стоимость"
        loading={loading}
        isReady={status === "error" || status === "success"}
      />
    </CustomTooltip>
  );
}
