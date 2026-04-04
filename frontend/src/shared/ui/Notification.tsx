import { Snackbar } from "@mui/material";

interface Props {
  open: boolean;
  handleClose: () => void;
  message: string;
}

export default function Notification({ open, handleClose, message }: Props) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      message={message}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
    />
  );
}
