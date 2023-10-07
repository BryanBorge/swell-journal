import { Card, CardContent, Typography, Stack, Grid } from "@mui/material";
import { EquiptmentCardTitle } from "../Shared/EquiptmentCardTitle";

export type GloveType = {
  brand: string;
  thickness: string;
  type: string;
};

export const Glove = () => {
  const data = localStorage.getItem("gloves") ?? "";

  const gloves = data ? JSON.parse(data) : [];

  const renderGloves = gloves.map((glove: GloveType) => {
    return (
      <Grid item xs={12} sm={3} key={`${glove.brand}-${glove.thickness}`}>
        <Card elevation={3}>
          <CardContent>
            <Stack spacing={1}>
              <EquiptmentCardTitle title={glove.brand} />
              <Typography>{`${glove.thickness}mm ${glove.type}`}</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    );
  });

  return (
    <Grid container spacing={2}>
      {renderGloves}
    </Grid>
  );
};
