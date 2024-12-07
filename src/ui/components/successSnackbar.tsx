import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface SuccessSnackbarProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

export function SuccessSnackbar({ open, message, onClose }: SuccessSnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity="success" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}