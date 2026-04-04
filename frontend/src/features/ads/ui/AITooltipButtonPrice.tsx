import CustomTooltip from "@/shared/ui/CustomTooltip";
import AIButton from "./AIButton";
import { Button } from "@mui/material";
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
import { resetPriceAi } from "@/entities/ai/model/aiSlice";
import type { AdFormData } from "../types";

function AIContent({
  aiMainPrice,
  aiTextPrice,
  handleClose,
  handleApplyPrice,
}: {
  aiMainPrice: string;
  aiTextPrice: string;
  handleClose: () => void;
  handleApplyPrice: (text: string) => void;
}) {
  if (!aiMainPrice || !aiTextPrice) return null;
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
      {aiTextPrice}
      <div className="flex gap-2 mt-4">
        <Button
          size="small"
          variant="contained"
          onClick={() => {
            handleApplyPrice(aiMainPrice);
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
        aiMainPrice,
        aiTextPrice,
        handleClose: () => setOpenTooltip(false),
        handleApplyPrice,
      });
    return AIContent({
      aiMainPrice,
      aiTextPrice,
      handleClose: () => setOpenTooltip(false),
      handleApplyPrice,
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
