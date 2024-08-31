import { Grid, TextField, useTheme } from "@mui/material";
import { DesktopTimePicker } from "@mui/x-date-pickers/DesktopTimePicker";
import { FC } from "react";
import { PageProps } from "./FirstPage";
import { PageTitle, TitleWithToolTip } from "../Shared/PageTitle";
import { Controller, useFormContext } from "react-hook-form";

export const SecondPage: FC<PageProps> = ({ page, onBackClick, onNextClick }) => {
  const toolTipText = "This information is optional but it is recommended to enter all information requested";

  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Grid container justifyContent="center" spacing={1}>
        <Grid item xs={12}>
          <PageTitle
            page={page}
            title="When did you surf?"
            onBackClick={onBackClick}
            onNextClick={onNextClick}
            toolTipText={toolTipText}
            showControls={true}
          />
        </Grid>
        <Grid item>
          <Controller
            name="timeIn"
            control={control}
            render={({ field }: any) => (
              <DesktopTimePicker
                {...field}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    error={!!errors.timeIn}
                    helperText={errors.timeIn ? errors.timeIn.message : ""}
                  />
                )}
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name="timeOut"
            control={control}
            render={({ field }: any) => (
              <DesktopTimePicker
                {...field}
                renderInput={(params: any) => (
                  <TextField
                    {...params}
                    error={!!errors.timeOut}
                    helperText={errors.timeOut ? errors.timeOut.message : ""}
                  />
                )}
              />
            )}
          />
        </Grid>
        <Grid item xs={12}>
          <TitleWithToolTip title="When were the tides?" toolTipText={toolTipText} />
        </Grid>
        <Grid item>
          <Controller
            name="lowTide"
            control={control}
            render={({ field }: any) => (
              <DesktopTimePicker
                {...field}
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
        <Grid item>
          <Controller
            name="highTide"
            control={control}
            render={({ field }: any) => (
              <DesktopTimePicker
                {...field}
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
    </>
  );
};
