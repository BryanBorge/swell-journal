import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import { FC } from "react";

import { Controller, useFormContext } from "react-hook-form";
import { PageProps } from "./FirstPage";
import { PageTitle } from "../Shared/PageTitle";
import { SwellMaskedInput } from "../../Shared/SwellMaskTextField";

const directions = [
  "N",
  "NNE",
  "NE",
  "ENE",
  "E",
  "ESE",
  "SE",
  "SSE",
  "S",
  "SSW",
  "SW",
  "WSW",
  "W",
  "WNW",
  "NW",
  "NNW",
];

export const ThirdPage: FC<PageProps> = ({ onBackClick, onNextClick, page }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PageTitle
            page={page}
            title="How was the swell and wind?"
            onBackClick={onBackClick}
            onNextClick={onNextClick}
            showControls={true}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography>Swell</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="swell"
                control={control}
                render={({ field }: any) => (
                  <TextField
                    {...field}
                    label="Swell"
                    fullWidth
                    InputProps={{
                      inputComponent: SwellMaskedInput,
                    }}
                    placeholder="6.0ft @ 10s S (180)"
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography>Wind</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="windSpeed"
                control={control}
                render={({ field }: any) => (
                  <TextField
                    {...field}
                    type="number"
                    fullWidth
                    error={!!errors.windSpeed?.message}
                    helperText={errors.windSpeed?.message}
                    label="Wind Direction"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="windDirection"
                control={control}
                render={({ field }: any) => (
                  <Autocomplete
                    options={directions}
                    {...field}
                    onChange={(event, values: any) => {
                      field.onChange(values);
                    }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        {...field}
                        error={!!errors.windDirection?.message}
                        helperText={errors.windDirection?.message}
                        label="Wind Direction"
                      />
                    )}
                  />
                )}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
