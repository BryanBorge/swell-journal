import { Card, CardContent, Typography, Stack, Grid, CircularProgress } from "@mui/material";
import { EquiptmentCardTitle } from "../Shared/EquiptmentCardTitle";
import { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { AuthContext } from "../../Context/AuthContext";

export type GloveType = {
  brand: string;
  thickness: string;
  type: string;
  id?: string;
};

export const Glove = () => {
  const [gloves, setGloves] = useState<Array<GloveType>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const { user } = useContext(AuthContext);

  const getdata = async () => {
    setLoading(true);

    try {
      // Get all wetsuits for the current user
      const gloveCollection = collection(db, `gloves/${user?.uid}/gloves`);

      const gloveQuery = query(gloveCollection);

      const wetsuitSnapshot = await getDocs(gloveQuery);

      const newData = wetsuitSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      })) as Array<GloveType>;

      setGloves(newData);
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
              <EquiptmentCardTitle title={glove.brand} />
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
