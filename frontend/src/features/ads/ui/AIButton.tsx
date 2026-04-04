import BulbIcon from "@/shared/assets/BulbIcon";
import RedoIcon from "@/shared/assets/RedoIcon";
import { Button, CircularProgress } from "@mui/material";

interface Props {
  label?: string;
  loading?: boolean;
  isReady?: boolean;
}

export default function AIButton({ label, loading = false, isReady = false }: Props) {
  return (
    <Button
      size="small"
      disabled={loading}
      startIcon={
        loading ? (
          <CircularProgress size={16} sx={{ color: "#FFA940" }} />
        ) : !isReady ? (
          <BulbIcon />
        ) : (
          <RedoIcon />
        )
      }
      sx={{
        textTransform: "none",
        backgroundColor: "#F9F1E6",
        color: "#FFA940",
        padding: "4px 9.5px",
        borderRadius: "6px",
        fontSize: "14px",
        fontWeight: 400,
        minHeight: "32px",
        "&:hover": {
          backgroundColor: "#F9F1E6",
        },
        "&.Mui-disabled": {
          backgroundColor: "#F9F1E6",
          color: "#FFA940",
          opacity: 0.7,
        },
      }}
    >
      {!isReady ? label : "Повторить запрос"}
    </Button>
  );
}
