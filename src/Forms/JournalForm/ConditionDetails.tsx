import React, { FC } from "react";
import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import { PageTitle } from "../Shared/PageTitle";
import { Controller, useFormContext } from "react-hook-form";
import { SwellMaskedInput } from "../../Shared/SwellMaskTextField";
import { DesktopTimePicker } from "@mui/x-date-pickers";
import { PageProps } from "./JournalForm";

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

export const ConditionDetails: FC<PageProps> = ({ onBackClick, onNextClick, page }) => {
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
            title="What were the conditions"
            onBackClick={onBackClick}
            onNextClick={onNextClick}
            toolTipText="This information is required to save a journal"
            showControls={true}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography>Temperature</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="airTemp"
                control={control}
                render={({ field }: any) => (
                  <TextField
                    {...field}
                    type="number"
                    fullWidth
                    error={!!errors.airTemp?.message}
                    helperText={errors.airTemp?.message}
                    label="Air Temperature"
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="waterTemp"
                control={control}
                render={({ field }: any) => (
                  <TextField
                    {...field}
                    type="number"
                    fullWidth
                    error={!!errors.waterTemp?.message}
                    helperText={errors.waterTemp?.message}
                    label="Water Temperature"
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
                    required
                    fullWidth
                    error={!!errors.windSpeed?.message}
                    helperText={errors.windSpeed?.message}
                    label="Wind Speed"
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
                        required
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
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography>Tides</Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="lowTide"
                control={control}
                render={({ field }: any) => (
                  <DesktopTimePicker
                    {...field}
                    label="Low Tide"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                      },
                    }}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        error={!!errors.lowTide}
                        helperText={errors.lowTide ? errors.lowTide.message : ""}
                      />
                    )}
                  />
                )}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Controller
                name="highTide"
                control={control}
                render={({ field }: any) => (
                  <DesktopTimePicker
                    {...field}
                    label="High Tide"
                    slotProps={{
                      textField: {
                        fullWidth: true,
                      },
                    }}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        error={!!errors.highTide}
                        helperText={errors.highTide ? errors.highTide.message : ""}
                      />
                    )}
                  />
                )}
              />
            </Grid>
          </Grid>
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
              <Typography>Was this session during a storm?</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Controller
                name="storm"
                control={control}
                render={({ field }: any) => <TextField {...field} label="Storm Name" fullWidth />}
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
