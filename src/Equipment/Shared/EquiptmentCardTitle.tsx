import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { Box, IconButton, Typography } from "@mui/material";
import { FC } from "react";

type EquiptmentCardTitleProps = {
  title: string;
  hideButtons?: boolean;
  onDeleteClick?: () => void;
  onEditClick?: () => void;
  onClick?: () => void;
};

export const EquiptmentCardTitle: FC<EquiptmentCardTitleProps> = ({
  title,
  onDeleteClick,
  onEditClick,
  hideButtons = false,
  onClick,
}) => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography variant="h6">{title}</Typography>
      {!hideButtons ? (
        <Box display="flex" justifyContent="space-between">
          <IconButton size="small" onClick={() => onEditClick && onEditClick()}>
            <ModeEditIcon />
          </IconButton>
          <IconButton size="small" onClick={() => onDeleteClick && onDeleteClick()}>
            <DeleteIcon />
          </IconButton>
        </Box>
      ) : null}
    </Box>
  );
};
