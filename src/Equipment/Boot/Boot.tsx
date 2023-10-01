import { Card, CardContent, Typography, Stack, Grid, IconButton, Box } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import DeleteIcon from "@mui/icons-material/Delete";
import { EquiptmentCardTitle } from "../Shared/EquiptmentCardTitle";

type BootType = {
  brand: string;
  thickness: string;
  type: string;
};

export const Boot = () => {
  const data = localStorage.getItem("boots") ?? "";

  const boots = data ? JSON.parse(data) : [];

  const renderBoots = boots.map((boot: BootType) => {
    return (
      <Grid item xs={12} sm={3}>
        <Card elevation={3}>
          <CardContent>
            <Stack spacing={1}>
              <EquiptmentCardTitle title={boot.brand} />
              <Typography>{`${boot.thickness}mm ${boot.type}`}</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    );
  });

  return (
    <Grid container spacing={2}>
      {renderBoots}
    </Grid>
  );
};
