import { Container } from "@mui/material";
import React, { FC, ReactNode } from "react";

const Shell: FC<{ children: ReactNode }> = ({ children }) => {
  return <Container maxWidth="xs">{children}</Container>;
};

export default Shell;
