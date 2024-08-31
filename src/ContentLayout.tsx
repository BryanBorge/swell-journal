import { Container, useTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const ContentLayout = () => {
  const theme = useTheme();

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ py: theme.spacing(2) }}>
        <Outlet />
      </Container>
    </>
  );
};
