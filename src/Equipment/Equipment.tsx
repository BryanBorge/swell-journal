import { Boards } from "./Board/Boards";
import Box from "@mui/material/Box";
import { useTheme, Typography, IconButton } from "@mui/material";
import { Wetsuit } from "./Wetsuit/Wetsuit";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { FC, useState } from "react";
import { Glove } from "./Glove/Glove";
import { Boot } from "./Boot/Boot";
import { BoardFormDialog } from "./Board/BoardFormDialog";
import { WetsuitFormDialog } from "./Wetsuit/WetsuitFormDialog";
import { GloveFormDialog } from "./Glove/GloveFormDialog";
import { BootFormDialog } from "./Boot/BootFormDialog";

export const Equipment = () => {
  const [isBoardFormOpen, setIsBoardFormOpen] = useState<boolean>(false);
  const [isWetSuitFormOpen, setIsWetSuitFormOpen] = useState<boolean>(false);
  const [isGloveFormOpen, setIsGloveFormOpen] = useState<boolean>(false);
  const [isBootFormOpen, setIsBootFormOpen] = useState<boolean>(false);
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", rowGap: theme.spacing(5) }}>
      <>
        <EquiptmentTitle title="Boards" onClick={() => setIsBoardFormOpen(true)} />
        <Boards />
        <BoardFormDialog open={isBoardFormOpen} onClose={() => setIsBoardFormOpen(false)} />
      </>
      <>
        <EquiptmentTitle title="Wetsuits" onClick={() => setIsWetSuitFormOpen(true)} />
        <Wetsuit />
        <WetsuitFormDialog open={isWetSuitFormOpen} onClose={() => setIsWetSuitFormOpen(false)} />
      </>
      <>
        <EquiptmentTitle title="Gloves" onClick={() => setIsGloveFormOpen(true)} />
        <Glove />
        <GloveFormDialog open={isGloveFormOpen} onClose={() => setIsGloveFormOpen(false)} />
      </>
      <>
        <EquiptmentTitle title="Boots" onClick={() => setIsBootFormOpen(true)} />
        <Boot />
        <BootFormDialog open={isBootFormOpen} onClose={() => setIsBootFormOpen(false)} />
      </>
    </Box>
  );
};

const EquiptmentTitle: FC<{ title: string; onClick: () => void }> = ({ title, onClick }) => {
  return (
    <Box display="flex" alignItems="center" justifyContent="flex-start">
      <Typography variant="h3">{title}</Typography>
      <IconButton size="large" onClick={() => onClick()}>
        <AddCircleOutlineIcon fontSize="inherit" />
      </IconButton>
    </Box>
  );
};
