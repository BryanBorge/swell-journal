import { Autocomplete, Grid, TextField } from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { FC } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { PageTitle } from "../Shared/PageTitle";
import { schema } from "./JournalForm";

const beaches = localStorage.getItem("beaches");

export type PageProps = {
  page: number;
  onBackClick: () => void;
  onNextClick: () => void;
};

export const FirstPage: FC<PageProps> = ({ onBackClick, onNextClick, page }) => {
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
            title="When and where did you surf?"
            onBackClick={onBackClick}
            onNextClick={onNextClick}
            toolTipText="This information is required to save a journal"
            showControls={true}
          />
        </Grid>
        <Grid item>
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
                  },
                }}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name="location"
            control={control}
            render={({ field }: any) => (
              // <Autocomplete
              // options={[]}
              // {...field}
              // onChange={(event, values: any) => {
              //   field.onChange(values);
              // }}
              // renderInput={params => (
              <TextField
                required
                // {...params}
                {...field}
                error={!!errors.location?.message}
                helperText={errors.location?.message}
                label="Location"
              />
              //   )}
              // />
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};
