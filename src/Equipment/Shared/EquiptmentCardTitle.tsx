import { Typography, IconButton, Box } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { FC } from "react";

export const EquiptmentCardTitle: FC<{ title: string }> = ({ title }) => {
  return (
    <Box display="flex" justifyContent="space-between">
      <Typography variant="h6">{title}</Typography>
      <Box display="flex" justifyContent="space-between">
        <IconButton size="small">
          <ModeEditIcon />
        </IconButton>
        <IconButton size="small">
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};
