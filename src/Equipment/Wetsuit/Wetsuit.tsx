import { Card, CardContent, Typography, Stack, Grid } from "@mui/material";
import { EquiptmentCardTitle } from "../Shared/EquiptmentCardTitle";

export type WetsuitType = {
  brand: string;
  suitType: string;
  thickness: string;
  zipperType: string;
};

export const Wetsuit = () => {
  const data = localStorage.getItem("wetsuits") ?? "";

  const wetsuits = data ? JSON.parse(data) : [];

  const renderWetsuits = wetsuits.map((wetsuit: WetsuitType) => {
    return (
      <Grid item xs={12} sm={3} key={`${wetsuit.brand}-${wetsuit.thickness}`}>
        <Card elevation={3}>
          <CardContent>
            <Stack spacing={0.5}>
              <EquiptmentCardTitle title={wetsuit.brand} />
              <Typography>{`${wetsuit.thickness}mm ${wetsuit.suitType} ${wetsuit.zipperType}`}</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    );
  });

  return (
    <Grid container spacing={2}>
      {renderWetsuits}
    </Grid>
  );
};
