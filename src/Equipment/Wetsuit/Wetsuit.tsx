import { Card, CardContent, Typography, Stack, Grid, CircularProgress } from "@mui/material";
import { EquiptmentCardTitle } from "../Shared/EquiptmentCardTitle";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

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

  const getdata = async () => {
    setLoading(true);
    await getDocs(collection(db, "wetsuits")).then(querySnapshot => {
      const newData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      })) as Array<WetsuitType>;
      setWetSuitData(newData);
      setLoading(false);
    });
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

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={2}>
      {renderWetsuits}
    </Grid>
  );
};
