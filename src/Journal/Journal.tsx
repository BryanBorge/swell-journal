import { Box, Typography, useTheme } from "@mui/material";
import { JournalForm } from "../Forms/JournalForm/JournalForm";

export const Journal = () => {
  const theme = useTheme();

  return (
    <Box>
      <Typography variant="h4">Journal</Typography>
      <Typography
        variant="body1"
        gutterBottom
        sx={{
          pb: theme.spacing(5),
        }}>
        Enter some stuff about your surf sessions
      </Typography>
      <JournalForm />
    </Box>
  );
};
