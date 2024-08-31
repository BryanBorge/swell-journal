import { Card, CardContent, Typography, Stack, Grid, CircularProgress, CardActionArea } from "@mui/material";
import { EquiptmentCardTitle } from "../Shared/EquiptmentCardTitle";
import { FC, useContext, useEffect, useState } from "react";
import { DataContext } from "../../Context/DataContext/DataContext";
import { useTheme } from "@emotion/react";

export type WetsuitType = {
  brand: string;
  suitType: string;
  thickness: string;
  zipperType: string;
  id?: string;
};

type WetsuitProps = {
  disableEditAndDelete?: boolean;
};

export const Wetsuit: FC<WetsuitProps> = ({ disableEditAndDelete = false }) => {
  const { getWetsuitsForUser, deleteWetsuit, wetsuits, loading, error } = useContext(DataContext);

  useEffect(() => {
    getWetsuitsForUser();
  }, []);

  const renderWetsuits = wetsuits?.map((wetsuit: WetsuitType) => {
    return (
      <Grid item xs={12} sm={3} key={`${wetsuit.brand}-${wetsuit.thickness}`}>
        <Card elevation={3}>
          <CardContent>
            <Stack spacing={0.5}>
              <EquiptmentCardTitle
                title={wetsuit.brand}
                onDeleteClick={() => {
                  deleteWetsuit(wetsuit.id);
                  setTimeout(() => {
                    getWetsuitsForUser();
                  }, 200);
                }}
                hideButtons={disableEditAndDelete}
              />
              <Typography>{`${wetsuit.thickness}mm ${wetsuit.suitType} ${wetsuit.zipperType}`}</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    );
  });

  if (error) {
    return <Typography variant="body1">{error}</Typography>;
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (!renderWetsuits?.length) {
    return <Typography variant="body1">Click the plus above to add a wetsuit!</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {renderWetsuits}
    </Grid>
  );
};

export const EquipmentCard = ({
  brand,
  desc,
  selected,
  onClick,
}: {
  brand: any;
  desc: any;
  selected: boolean;
  onClick: () => void;
}) => {
  const theme = useTheme();

  return (
    <Card
      onClick={() => onClick()}
      elevation={selected ? 5 : 2}
      sx={theme => ({ border: selected ? `2px solid ${theme.palette.success.main}` : undefined })}>
      <CardActionArea>
        <CardContent>
          <Stack spacing={0.5}>
            <EquiptmentCardTitle title={brand} hideButtons />
            <Typography>{desc}</Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
