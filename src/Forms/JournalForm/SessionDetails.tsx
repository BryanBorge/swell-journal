import React, { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Grid, TextField } from "@mui/material";
import { PageTitle } from "../Shared/PageTitle";
import { DesktopDatePicker, DesktopTimePicker } from "@mui/x-date-pickers";
import { PageProps } from "./JournalForm";

export const SessionDetails: FC<PageProps> = ({ onBackClick, onNextClick, page }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12}>
          <PageTitle
            page={page}
            title="Where and when did you surf?"
            onBackClick={onBackClick}
            onNextClick={onNextClick}
            toolTipText="This information is required to save a journal"
            showControls={true}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="date"
            control={control}
            render={({ field }: any) => (
              <DesktopDatePicker
                {...field}
                label="Date"
                disableFuture
                slotProps={{
                  textField: {
                    error: !!errors.date?.message,
                    helperText: errors.date?.message,
                    required: true,
                    fullWidth: true,
                  },
                }}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="location"
            control={control}
            render={({ field }: any) => (
              <TextField
                fullWidth
                required
                {...field}
                error={!!errors.location?.message}
                helperText={errors.location?.message}
                label="Location"
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="timeIn"
            control={control}
            render={({ field }: any) => (
              <DesktopTimePicker
                {...field}
                label="Time In"
                slotProps={{
                  textField: {
                    error: !!errors.timeIn?.message,
                    helperText: errors.timeIn?.message,
                    required: true,
                    fullWidth: true,
                  },
                }}
                renderInput={(params: any) => <TextField {...params} />}
              />
            )}
          />
        </Grid>
        <Grid item xs={6}>
          <Controller
            name="timeOut"
            control={control}
            render={({ field }: any) => (
              <DesktopTimePicker
                {...field}
                label="Time Out"
                slotProps={{
                  textField: {
                    error: !!errors.timeOut?.message,
                    helperText: errors.timeOut?.message,
                    required: true,
                    fullWidth: true,
                  },
                }}
                renderInput={(params: any) => <TextField {...params} />}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <Controller
            name="notes"
            control={control}
            render={({ field }: any) => (
              <TextField
                fullWidth
                label="Notes"
                multiline
                rows={10}
                {...field}
                error={!!errors.notes}
                helperText={errors.notes ? errors.notes.message : ""}
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};
