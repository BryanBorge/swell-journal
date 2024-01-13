import { Card, CardContent, CircularProgress, Grid, Stack, Typography } from "@mui/material";
import { collection, getDoc, getDocs, orderBy, query } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { IFirebaseError, auth, db } from "../../firebase";
import { EquiptmentCardTitle } from "../Shared/EquiptmentCardTitle";

export type BoardType = {
  brand: string;
  finSetup: string;
  height: string;
  thickness: string;
  width: string;
  id?: string;
};

export const Boards = () => {
  const [boardData, setBoardData] = useState<Array<BoardType>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const { user } = useContext(AuthContext);

  const getdata = async () => {
    setLoading(true);

    console.log("user?.uid", user?.uid);
    try {
      // Get all boards for the current user
      const boardCollection = collection(db, `boards/${user?.uid}/boards`);

      const boardQuery = query(boardCollection);

      const boardSnapshot = await getDocs(boardQuery);

      console.log("what", boardSnapshot);
      const newData = boardSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      })) as Array<BoardType>;

      setBoardData(newData);
      setLoading(false);
    } catch (err: any) {
      console.log(err);
      if (err.code === "permission-denied") setError("Sign in or register to see this!");
      else setError("Something went wrong loading boards...");
    }
  };

  useEffect(() => {
    getdata();
  }, []);

  const renderBoards2 = boardData?.map((board: BoardType) => {
    return (
      <Grid item xs={12} sm={3} key={`${board.brand}-${board.height}`}>
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

  if (error) {
    return <Typography variant="body1">{error}</Typography>;
  }

  if (loading) {
    return <CircularProgress />;
  }

  if (!renderBoards2?.length) {
    return <Typography>Click the plus above to add a board!</Typography>;
  }

  return (
    <Grid container spacing={2}>
      {renderBoards2}
    </Grid>
  );
};
