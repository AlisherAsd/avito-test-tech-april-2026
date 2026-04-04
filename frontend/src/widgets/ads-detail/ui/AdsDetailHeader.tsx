import EditPenIcon from "@/shared/assets/EditPenIcon";
import { APP_ROUTES } from "@/shared/config/app-routes";
import { formatDate } from "@/shared/lib/formatters";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface Props {
  name: string;
  price: number;
  publicDate: string;
  editDate: string;
  id: string;
}

export default function AdsDetailHeader({ name, price, publicDate, editDate, id }: Props) {
  const navigate = useNavigate();

  const handleClickEdit = () => {
    navigate(APP_ROUTES.ADS_EDIT(id));
  };
  return (
    <div className="flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-medium leading-tight tracking-tight">{name}</h2>
        <span className="text-2xl font-medium leading-tight tracking-tight">
          {price.toLocaleString()} ₽
        </span>
      </div>
      <div className="flex justify-between items-center">
        <Button
          sx={{
            textTransform: "none",
          }}
          variant="contained"
          endIcon={<EditPenIcon />}
          onClick={handleClickEdit}
        >
          Редактировать
        </Button>
        <div className="flex flex-col items-end">
          <span className="text-[#848388]">Опубликовано: {formatDate(publicDate)}</span>
          <span className="text-[#848388]">Отредактировано: {formatDate(editDate)}</span>
        </div>
      </div>
    </div>
  );
}
