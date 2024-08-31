import { Card, CardContent, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { FC, useContext, useEffect } from "react";
import { EquiptmentCardTitle } from "../Shared/EquiptmentCardTitle";
import { DataContext } from "../../Context/DataContext/DataContext";

export type BoardType = {
  brand: string;
  finSetup: string;
  height: string;
  thickness: string;
  width: string;
  id?: string;
};

type BoardProps = {
  disableEditAndDelete?: boolean;
};

export const Boards: FC<BoardProps> = ({ disableEditAndDelete = false }) => {
  const { boards, error, loading, getBoardsForUser, deleteBoard } = useContext(DataContext);

  useEffect(() => {
    getBoardsForUser();
  }, []);

  const renderBoards = boards?.map((board: BoardType) => {
    return (
      <Grid item xs={12} sm={3} key={`${board.brand}-${board.height}`}>
        <Card elevation={3}>
          <CardContent>
            <Stack spacing={1}>
              <EquiptmentCardTitle
                title={board.brand}
                onDeleteClick={() => {
                  deleteBoard(board.id);
                  setTimeout(() => {
                    getBoardsForUser();
                  }, 200);
                }}
                hideButtons={disableEditAndDelete}
              />
              <Typography>{`${board.height} x ${board.width} x ${board.thickness}`}</Typography>
              <Typography>{board.finSetup}</Typography>
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

  if (!renderBoards?.length) {
    return <Typography>Click the plus above to add a board!</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {renderBoards}
    </Grid>
  );
};
