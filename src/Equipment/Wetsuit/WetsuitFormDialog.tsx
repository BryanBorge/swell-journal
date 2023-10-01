import { Stack, Typography, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { FC } from "react";
import { WetsuitForm } from "../../Forms/WetsuitForm";

type WetsuitFormDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const WetsuitFormDialog: FC<WetsuitFormDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography>Add new wetsuit</Typography>
          <IconButton onClick={() => onClose()}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <WetsuitForm />
      </DialogContent>
    </Dialog>
  );
};
