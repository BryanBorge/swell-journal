import { Card, CardContent, Typography, Stack, Grid, CircularProgress } from "@mui/material";
import { EquiptmentCardTitle } from "../Shared/EquiptmentCardTitle";
import { FC, useContext, useEffect } from "react";
import { DataContext } from "../../Context/DataContext/DataContext";

export type GloveType = {
  brand: string;
  thickness: string;
  type: string;
  id?: string;
};

type GloveProps = {
  disableEditAndDelete?: boolean;
};

export const Glove: FC<GloveProps> = ({ disableEditAndDelete = false }) => {
  const { getGlovesForUser, deleteGlove, gloves, loading, error } = useContext(DataContext);

  useEffect(() => {
    getGlovesForUser();
  }, []);

  if (error) {
    return <Typography variant="body1">{error}</Typography>;
  }

  if (loading) {
    return <CircularProgress />;
  }

  const renderGloves = gloves?.map((glove: GloveType) => {
    return (
      <Grid item xs={12} sm={3} key={`${glove.brand}-${glove.thickness}`}>
        <Card elevation={3}>
          <CardContent>
            <Stack spacing={1}>
              <EquiptmentCardTitle
                title={glove.brand}
                onDeleteClick={() => {
                  deleteGlove(glove.id);
                  setTimeout(() => {
                    getGlovesForUser();
                  }, 200);
                }}
                hideButtons={disableEditAndDelete}
              />
              <Typography>{`${glove.thickness}mm ${glove.type}`}</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    );
  });

  if (!renderGloves?.length) {
    return <Typography variant="body1">Click the plus above to add gloves!</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {renderGloves}
    </Grid>
  );
};
