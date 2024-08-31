import { Card, CardContent, Typography, Stack, Grid, CircularProgress } from "@mui/material";
import { EquiptmentCardTitle } from "../Shared/EquiptmentCardTitle";
import { useContext, useEffect } from "react";
import { DataContext } from "../../Context/DataContext/DataContext";

export type BootType = {
  brand: string;
  thickness: string;
  type: string;
  id?: string;
};

export const Boot = () => {
  const { boots, error, loading, getBootsForUser, deleteBoot } = useContext(DataContext);

  useEffect(() => {
    getBootsForUser();
  }, []);

  if (error) {
    return <Typography variant="body1">{error}</Typography>;
  }

  if (loading) {
    return <CircularProgress />;
  }

  const renderBoots = boots?.map((boot: BootType) => {
    return (
      <Grid item xs={12} sm={3} key={`${boot.brand}-${boot.thickness}`}>
        <Card elevation={3}>
          <CardContent>
            <Stack spacing={1}>
              <EquiptmentCardTitle
                title={boot.brand}
                onDeleteClick={() => {
                  deleteBoot(boot.id);
                  setTimeout(() => {
                    getBootsForUser();
                  }, 200);
                }}
              />
              <Typography>{`${boot.thickness}mm ${boot.type}`}</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    );
  });

  if (!renderBoots?.length) {
    return <Typography variant="body1">Click the plus above to add boots!</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {renderBoots}
    </Grid>
  );
};
