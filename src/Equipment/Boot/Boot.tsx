import { Card, CardContent, Typography, Stack, Grid, CircularProgress } from "@mui/material";
import { EquiptmentCardTitle } from "../Shared/EquiptmentCardTitle";
import { useEffect, useState } from "react";
import { GloveType } from "../Glove/Glove";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
export type BootType = {
  brand: string;
  thickness: string;
  type: string;
};

export const Boot = () => {
  const [boots, setBoots] = useState<Array<GloveType>>();
  const [loading, setLoading] = useState<boolean>(false);

  const getdata = async () => {
    setLoading(true);
    await getDocs(collection(db, "boots")).then(querySnapshot => {
      const newData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      })) as Array<GloveType>;
      setBoots(newData);
      setLoading(false);
    });
  };

  useEffect(() => {
    getdata();
  }, []);

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

  return (
    <Grid container spacing={2}>
      {renderBoots}
    </Grid>
  );
};
