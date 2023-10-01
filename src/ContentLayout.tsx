import { useState } from "react";
import {
  Container,
  useTheme,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { BeachForm } from "./Forms/BeachForm";
import { BootForm } from "./Forms/BootForm";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const ContentLayout = () => {
  const [isBeachFormOpen, setIsBeachFormOpen] = useState<boolean>(false);
  const [isBootFormOpen, setIsBootFormOpen] = useState<boolean>(false);
  const theme = useTheme();

  return (
    <>
      <Header />
      <Container sx={{ py: theme.spacing(3) }}>
        <Outlet />
      </Container>
      {/* <Stack alignItems="center" spacing={2}>
        <Stack spacing={1} alignItems="center">
          <Typography variant="h5">Board Form</Typography>
          <Button onClick={() => setIsBoardFormOpen(true)}>Open board form</Button>
        </Stack>

        <Stack spacing={1} alignItems="center">
          <Typography variant="h5">Wetsuit Form</Typography>
          <Button onClick={() => setIsWetSuitFormOpen(true)}>Open wetsuit form</Button>
        </Stack>

        <Stack spacing={1} alignItems="center">
          <Typography variant="h5">Glove Form</Typography>
          <Button onClick={() => setIsGloveFormOpen(true)}>Open glove form</Button>
        </Stack>

        <Stack spacing={1} alignItems="center">
          <Typography variant="h5">Boot Form</Typography>
          <Button onClick={() => setIsBootFormOpen(true)}>Open boot form</Button>
        </Stack>

        <Stack spacing={1} alignItems="center">
          <Typography variant="h5">Beach Form</Typography>
          <Button onClick={() => setIsBeachFormOpen(true)}>Open beach form</Button>
        </Stack>
      </Stack> */}
      <Dialog open={isBootFormOpen} onClose={() => setIsBootFormOpen(false)}>
        <DialogTitle>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography>Add new boot</Typography>
            <IconButton onClick={() => setIsBootFormOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <BootForm />
        </DialogContent>
      </Dialog>

      <Dialog open={isBeachFormOpen} onClose={() => setIsBeachFormOpen(false)}>
        <DialogTitle>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography>Add new beach</Typography>
            <IconButton onClick={() => setIsBeachFormOpen(false)}>
              <CloseIcon />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent>
          <BeachForm />
        </DialogContent>
      </Dialog>
    </>
  );
};
