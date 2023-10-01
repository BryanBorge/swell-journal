import { Boards } from "./Board/Boards";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme, IconButton } from "@mui/material";
import { Wetsuit } from "./Wetsuit/Wetsuit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { FC } from "react";
import { Glove } from "./Glove/Glove";
import { Boot } from "./Boot/Boot";

export const Equipment = () => {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: theme.spacing(5) }}>
      <EquiptmentTitle title="Boards" />
      <Boards />
      <EquiptmentTitle title="Wetsuits" />
      <Wetsuit />
      <EquiptmentTitle title="Gloves" />
      <Glove />
      <EquiptmentTitle title="Boots" />
      <Boot />
    </Box>
  );
};

const EquiptmentTitle: FC<{ title: string }> = ({ title }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="flex-start">
      <Typography variant="h3">{title}</Typography>
      <IconButton size="large">
        <AddCircleOutlineIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
};
