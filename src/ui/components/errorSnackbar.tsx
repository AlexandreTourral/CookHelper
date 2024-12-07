import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface ErrorSnackbarProps {
  open: boolean;
  message: string;
  onClose: () => void;
}

export function ErrorSnackbar({ open, message, onClose }: ErrorSnackbarProps) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
    >
      <Alert onClose={onClose} severity="error" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}