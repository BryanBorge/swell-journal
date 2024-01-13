import { Card, CardContent, Typography, Stack, Grid, CircularProgress } from "@mui/material";
import { EquiptmentCardTitle } from "../Shared/EquiptmentCardTitle";
import { useContext, useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs, query } from "firebase/firestore";
import { AuthContext } from "../../Context/AuthContext";

export type WetsuitType = {
  brand: string;
  suitType: string;
  thickness: string;
  zipperType: string;
  id?: string;
};

export const Wetsuit = () => {
  const [wetSuitData, setWetSuitData] = useState<Array<WetsuitType>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const { user } = useContext(AuthContext);

  const getdata = async () => {
    setLoading(true);

    try {
      // Get all wetsuits for the current user
      const wetsuitCollection = collection(db, `wetsuits/${user?.uid}/wetsuits`);

      const wetsuitQuery = query(wetsuitCollection);

      const wetsuitSnapshot = await getDocs(wetsuitQuery);

      const newData = wetsuitSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      })) as Array<WetsuitType>;

      setWetSuitData(newData);
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

  const renderWetsuits = wetSuitData?.map((wetsuit: WetsuitType) => {
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
