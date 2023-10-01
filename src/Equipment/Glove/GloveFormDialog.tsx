import { Stack, Typography, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { FC } from "react";
import { GloveForm } from "../../Forms/GloveForm";

type GloveFormDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const GloveFormDialog: FC<GloveFormDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography>Add new gloves</Typography>
          <IconButton onClick={() => onClose()}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <GloveForm />
      </DialogContent>
    </Dialog>
  );
};
