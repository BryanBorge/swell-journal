import { Card, CardContent, Typography, Stack, Grid, CircularProgress } from "@mui/material";
import { EquiptmentCardTitle } from "../Shared/EquiptmentCardTitle";
import { useContext, useEffect, useState } from "react";
import { GloveType } from "../Glove/Glove";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../Context/AuthContext";

export type BootType = {
  brand: string;
  thickness: string;
  type: string;
  id?: string;
};

export const Boot = () => {
  const [boots, setBoots] = useState<Array<GloveType>>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const { user } = useContext(AuthContext);

  const getdata = async () => {
    setLoading(true);

    try {
      // Get all wetsuits for the current user
      const bootCollection = collection(db, `boots/${user?.uid}/boots`);

      const bootQuery = query(bootCollection);

      const bootSnapshot = await getDocs(bootQuery);

      const newData = bootSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      })) as Array<BootType>;

      setBoots(newData);
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

  const renderBoots = boots?.map((boot: BootType) => {
    return (
      <Grid item xs={12} sm={3} key={`${boot.brand}-${boot.thickness}`}>
        <Card elevation={3}>
          <CardContent>
            <Stack spacing={1}>
              <EquiptmentCardTitle title={boot.brand} />
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
