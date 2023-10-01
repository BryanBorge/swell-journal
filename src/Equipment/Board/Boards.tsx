import { Card, CardContent, Typography, Stack, Grid } from "@mui/material";
import { EquiptmentCardTitle } from "../Shared/EquiptmentCardTitle";

type BoardType = {
  brand: string;
  finSetup: string;
  height: string;
  thickness: string;
  width: string;
};

export const Boards = () => {
  const data = localStorage.getItem("boards") ?? "";

  const boards = data ? JSON.parse(data) : [];

  const renderBoards = boards.map((board: BoardType) => {
    return (
      <Grid item xs={12} sm={3}>
        <Card elevation={3}>
          <CardContent>
            <Stack spacing={1}>
              <EquiptmentCardTitle title={board.brand} />
              <Typography>{`${board.height} x ${board.width} x ${board.thickness}`}</Typography>
              <Typography>{board.finSetup}</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    );
  });

  return (
    <Grid container spacing={2}>
      {renderBoards}
    </Grid>
  );
};
