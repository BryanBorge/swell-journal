import { Card, CardContent, Typography, Stack, Grid } from "@mui/material";
import { EquiptmentCardTitle } from "../Shared/EquiptmentCardTitle";

export type BootType = {
  brand: string;
  thickness: string;
  type: string;
};

export const Boot = () => {
  const data = localStorage.getItem("boots") ?? "";

  const boots = data ? JSON.parse(data) : [];

  const renderBoots = boots.map((boot: BootType) => {
    return (
      <Grid item xs={12} sm={3} key={`${boot.brand}-${boot.thickness}`}>
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
