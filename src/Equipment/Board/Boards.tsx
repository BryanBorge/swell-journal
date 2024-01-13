import { Card, CardContent, Typography, Stack, Grid, CircularProgress } from "@mui/material";
import { EquiptmentCardTitle } from "../Shared/EquiptmentCardTitle";
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export type BoardType = {
  brand: string;
  finSetup: string;
  height: string;
  thickness: string;
  width: string;
};

export type FirestoreBoardType = {
  brand: string;
  fins: string;
  height: string;
  thickness: string;
  width: string;
  id?: string;
};

export const Boards = () => {
  const [boardData, setBoardData] = useState<Array<FirestoreBoardType>>();
  const [loading, setLoading] = useState<boolean>(false);

  const getdata = async () => {
    setLoading(true);
    await getDocs(collection(db, "boards")).then(querySnapshot => {
      const newData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      })) as Array<FirestoreBoardType>;
      setBoardData(newData);
      setLoading(false);
    });
  };

  useEffect(() => {
    getdata();
  }, []);

  const renderBoards2 = boardData?.map((board: FirestoreBoardType) => {
    return (
      <Grid item xs={12} sm={3} key={`${board.brand}-${board.height}`}>
        <Card elevation={3}>
          <CardContent>
            <Stack spacing={1}>
              <EquiptmentCardTitle title={board.brand} />
              <Typography>{`${board.height} x ${board.width} x ${board.thickness}`}</Typography>
              <Typography>{board.fins}</Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    );
  });

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={2}>
      {renderBoards2}
    </Grid>
  );
};
