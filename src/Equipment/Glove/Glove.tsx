import { Card, CardContent, Typography, Stack, Grid, CircularProgress } from "@mui/material";
import { EquiptmentCardTitle } from "../Shared/EquiptmentCardTitle";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";

export type GloveType = {
  brand: string;
  thickness: string;
  type: string;
  id?: string;
};

export const Glove = () => {
  const [gloves, setGloves] = useState<Array<GloveType>>();
  const [loading, setLoading] = useState<boolean>(false);

  const getdata = async () => {
    setLoading(true);
    await getDocs(collection(db, "gloves")).then(querySnapshot => {
      const newData = querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
      })) as Array<GloveType>;
      setGloves(newData);
      setLoading(false);
    });
  };

  useEffect(() => {
    getdata();
  }, []);

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

  return (
    <Grid container spacing={2}>
      {renderGloves}
    </Grid>
  );
};
