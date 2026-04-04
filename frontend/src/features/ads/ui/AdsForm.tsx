import { useForm, Controller, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { InputField } from "@/shared/ui/form-fields/ui/InputField";
import { TextareaField } from "@/shared/ui/form-fields/ui/TextareaField";
import type { AdFormData } from "../types";
import { adFormSchema } from "../model/schema";
import { useNavigate, useParams } from "react-router-dom";
import { APP_ROUTES } from "@/shared/config/app-routes";
import { Button } from "@mui/material";
import type { ResponseAd } from "@/entities/ads/types";
import { setDataAdFormData } from "../helpers";
import { useEffect, useState } from "react";
import type { AppDispatch } from "@/app/store";
import { useDispatch } from "react-redux";
import { editAd } from "@/entities/ads/model/adsThunks";
import AdsSelectCategory from "./AdsSelectCategory";
import ElectronicFields from "./electronics/ElectronicFields";
import AutoFields from "./auto/AutoFields";
import EstateFields from "./estate/EstateFields";
import formatFromAdFormDataToAdData from "@/entities/ads/lib/formatFromFormToRequest.ts";
import Notification from "@/shared/ui/Notification";
import AITooltipButtonDescription from "./AITooltipButtonDescription";
import AITooltipButtonPrice from "./AITooltipButtonPrice";

interface Props {
  item: ResponseAd;
}

export default function AdsForm({ item }: Props) {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isOpenSuccesNotification, setOpenSuccesNotification] = useState(false);
  const [isOpenErrorNotification, setOpenErrorNotification] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    setValue,
  } = useForm<AdFormData>({
    resolver: zodResolver(adFormSchema),
    defaultValues: setDataAdFormData(item),
    mode: "onBlur",
  });

  const dispatch = useDispatch<AppDispatch>();

  const submit = handleSubmit(handleClickSave);

  useEffect(() => {
    reset(setDataAdFormData(item));
  }, [item, reset]);

  const category = useWatch({
    control,
    name: "category",
  });

  const [haveTitle, havePrice] = useWatch({
    control,
    name: ["title", "price"],
  });

  const isValid = haveTitle.trim() && havePrice;

  function handleClickCancel() {
    if (!id) return;
    navigate(APP_ROUTES.ADS_DETAIL(id));
  }

  async function handleClickSave(data: AdFormData) {
    if (!id) return;

    try {
      await dispatch(editAd({ id, data: formatFromAdFormDataToAdData(data) })).unwrap();
      setOpenSuccesNotification(true);
      navigate(APP_ROUTES.ADS_DETAIL(id));
    } catch (e) {
      console.error(e);
      setOpenErrorNotification(true);
    }
  }

  function applyAiDescription(text: string) {
    setValue("description", text, { shouldValidate: true, shouldDirty: true });
  }

  function applyAiPrice(text: string) {
    setValue("price", text, { shouldValidate: true, shouldDirty: true });
  }

  return (
    <div className="flex-1">
      <Notification
        open={isOpenSuccesNotification}
        handleClose={() => setOpenSuccesNotification(false)}
        message="Объявление успешно обновлено"
      />
      <Notification
        open={isOpenErrorNotification}
        handleClose={() => setOpenErrorNotification(false)}
        message="Ошибка обновления объявления"
      />
      <div className="h-[calc(100vh-164px)] overflow-y-auto mt-4.5">
        <form className="space-y-4">
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <AdsSelectCategory value={field.value} handleChange={field.onChange} />
            )}
          />
          <hr className="border-t border-[#F0F0F0] my-4.5" />
          <div className="items-center gap-6 flex-1 max-w-114 ">
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <InputField
                  {...field}
                  label="Название"
                  placeholder="Название"
                  required
                  textStyle="default"
                  showClear={true}
                  error={errors.title?.message}
                />
              )}
            />
          </div>
          <hr className="border-t border-[#F0F0F0] my-4.5" />
          <div className="flex items-center gap-6">
            <div className="max-w-114 flex-1">
              <Controller
                name="price"
                control={control}
                render={({ field }) => (
                  <InputField
                    required
                    textStyle="default"
                    {...field}
                    label="Цена"
                    showClear={true}
                    placeholder="Цена"
                    error={errors.price?.message}
                  />
                )}
              />
            </div>
            <div className="mt-8">
              <AITooltipButtonPrice
                getFormData={() => getValues()}
                handleApplyPrice={applyAiPrice}
              />
            </div>
          </div>
          <hr className="border-t border-[#F0F0F0] my-4.5" />
          <div>
            <label className="flex items-center gap-1 text font-medium text-[#1a1a1a]">
              <span>Характеристики</span>
            </label>
            {category === "electronics" && <ElectronicFields control={control} />}
            {category === "auto" && <AutoFields control={control} />}
            {category === "real_estate" && <EstateFields control={control} />}
          </div>
          <hr className="border-t border-[#F0F0F0] my-4.5" />
          <div>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <TextareaField
                  {...field}
                  label="Описание"
                  placeholder="Введите описание"
                  showCounter={true}
                  resizable={true}
                  maxLength={1000}
                  rows={2}
                  error={errors.description?.message}
                />
              )}
            />
            <AITooltipButtonDescription
              getFormData={() => getValues()}
              handleApplyDescription={applyAiDescription}
            />
          </div>
        </form>
      </div>
      <div className="mt-4 flex gap-2.5">
        <Button
          onClick={submit}
          variant="contained"
          type="submit"
          disabled={!isValid}
          sx={{
            textTransform: "none",
          }}
        >
          Сохранить
        </Button>
        <Button
          onClick={handleClickCancel}
          variant="outlined"
          sx={{
            textTransform: "none",
            borderColor: "#E0E0E4",
            color: "#5A5A5A",
            backgroundColor: "white",
            "&:hover": {
              backgroundColor: "#D9D9D9",
              borderColor: "#D9D9D9",
            },
          }}
        >
          Отменить
        </Button>
      </div>
    </div>
  );
}
