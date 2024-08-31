import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import { FC, useState } from "react";

type EquiptmentCardTitleProps = {
  title: string;
  hideButtons?: boolean;
  onDeleteClick?: () => void;
  onEditClick?: () => void;
};

export const EquiptmentCardTitle: FC<EquiptmentCardTitleProps> = ({
  title,
  onDeleteClick,
  onEditClick,
  hideButtons = false,
}) => {
  const [open, setOpen] = useState(false);

  const handleDeleteClick = () => {
    setOpen(true);
  };

  const handleConfirmDelete = () => {
    setOpen(false);
    if (onDeleteClick) {
      onDeleteClick();
    }
  };

  const handleCancelDelete = () => {
    setOpen(false);
  };

  return (
    <>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6">{title}</Typography>
        {!hideButtons ? (
          <Box display="flex" justifyContent="space-between">
            {/* <IconButton size="small" onClick={() => onEditClick && onEditClick()}>
            <ModeEditIcon />
          </IconButton> */}
            <IconButton size="small" onClick={() => handleDeleteClick()}>
              <DeleteIcon />
            </IconButton>
          </Box>
        ) : null}
      </Box>
      <Dialog open={open} onClose={handleCancelDelete}>
        <DialogTitle>Are you sure?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this item? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancelDelete} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} variant="outlined" color="primary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
