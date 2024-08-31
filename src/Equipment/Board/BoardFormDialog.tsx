import { Stack, Typography, Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import { BoardForm } from "../../Forms/BoardForm";
import { FC } from "react";

type BoardFormDialogProps = {
  open: boolean;
  onClose: () => void;
};

export const BoardFormDialog: FC<BoardFormDialogProps> = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={() => onClose()}>
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography>Add new board</Typography>
          <IconButton onClick={() => onClose()}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <BoardForm closeDialog={() => onClose()} />
      </DialogContent>
    </Dialog>
  );
};
