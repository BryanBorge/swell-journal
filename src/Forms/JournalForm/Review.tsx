import { Button, Divider, Grid, TextField, Typography } from "@mui/material";
import { FC, useContext } from "react";
import { PageTitle } from "../Shared/PageTitle";
import { useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import { DataContext } from "../../Context/DataContext/DataContext";
import { PageProps } from "./JournalForm";

export const Review: FC<PageProps> = ({ page, onBackClick, onNextClick }) => {
  const { getValues } = useFormContext();
  const { boards, wetsuits, gloves, boots } = useContext(DataContext);

  console.log("getValues in review screen", getValues());

  const formattedDate = dayjs(getValues("date")).format("dddd M/D/YY");
  const formatteTimeIn = dayjs(getValues("timeIn")).format("h:mm A");
  const formattedTimeOut = dayjs(getValues("timeOut")).format("h:mm A");
  const formattedLowTide = dayjs(getValues("lowTide")).format("h:mm A");
  const formattedHighTide = dayjs(getValues("highTide")).format("h:mm A");

  const selectedBoard = boards.find(board => board.id === getValues("board"));

  console.log("selectedBoard", selectedBoard);

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PageTitle
            page={page}
            title="Review your data"
            onBackClick={onBackClick}
            onNextClick={onNextClick}
            showControls={true}
          />
        </Grid>
        <Grid item xs={4} sm={6}>
          <Typography>{formattedDate}</Typography>
        </Grid>
        <Grid item xs={4} sm={3}>
          <Typography textAlign="right">{`IN - ${formatteTimeIn}`}</Typography>
        </Grid>
        <Grid item xs={4} sm={3}>
          <Typography textAlign="right">{`OUT - ${formattedTimeOut}`}</Typography>
        </Grid>
        <Grid item sx={{ width: "100%" }}>
          <Divider />
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>{`Air Temp - ${getValues("airTemp")}`}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>{`Water Temp - ${getValues("waterTemp")}`}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>{`Low Tide - ${formattedLowTide}`}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography gutterBottom>{`High Tide - ${formattedHighTide}`}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography gutterBottom>{`Swell - ${getValues("swell")}`}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography gutterBottom>{`${selectedBoard?.height} ${selectedBoard?.brand} @ ${getValues(
            "location"
          )}`}</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField fullWidth multiline rows={10} label="Notes" disabled value={getValues("notes")} />
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="flex-end">
          <Button variant="contained">SUBMIT</Button>
        </Grid>
      </Grid>
    </>
  );
};
