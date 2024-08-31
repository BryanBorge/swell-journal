import { Stack, Typography, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { FC } from "react";
import { BootForm } from "../../Forms/BootForm";

type BootFormDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const BootFormDialog: FC<BootFormDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography>Add new boots</Typography>
          <IconButton onClick={() => onClose()}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <BootForm closeDialog={() => onClose()} />
      </DialogContent>
    </Dialog>
  );
};
