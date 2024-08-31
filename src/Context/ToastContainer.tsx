import React, { FC, ReactNode } from "react";
import { SnackbarProvider, useSnackbar, EnqueueSnackbar, SnackbarKey } from "notistack";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const showSuccessToast = (enqueueSnackbar: EnqueueSnackbar) => (message: string) => {
  enqueueSnackbar(message, { variant: "success" });
};

const showInfoToast = (enqueueSnackbar: EnqueueSnackbar) => (message: string) => {
  enqueueSnackbar(message, { variant: "info" });
};

const showWarningToast = (enqueueSnackbar: EnqueueSnackbar) => (message: string) => {
  enqueueSnackbar(message, { variant: "warning" });
};

const showErrorToast = (enqueueSnackbar: EnqueueSnackbar) => (message: string) => {
  enqueueSnackbar(message, { variant: "error" });
};

const showDefaultToast = (enqueueSnackbar: EnqueueSnackbar) => (message: string) => {
  enqueueSnackbar(message, { variant: "error" });
};

const SnackbarCloseButton: FC<{ snackbarKey: SnackbarKey }> = ({ snackbarKey }) => {
  const { closeSnackbar } = useSnackbar();

  return (
    <IconButton onClick={() => closeSnackbar(snackbarKey)}>
      <CloseIcon />
    </IconButton>
  );
};

export const ToastContainer: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <SnackbarProvider
      action={snackbarKey => <SnackbarCloseButton snackbarKey={snackbarKey} />}
      maxSnack={3}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
      }}>
      {children}
    </SnackbarProvider>
  );
};

const useToast = () => {
  const { enqueueSnackbar } = useSnackbar();

  return {
    showSuccessToast: showSuccessToast(enqueueSnackbar),
    showInfoToast: showInfoToast(enqueueSnackbar),
    showWarningToast: showWarningToast(enqueueSnackbar),
    showErrorToast: showErrorToast(enqueueSnackbar),
    showDefaultToast: showDefaultToast(enqueueSnackbar),
  };
};

export default useToast;
