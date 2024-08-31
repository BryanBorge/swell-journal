import { Avatar, Box, Breadcrumbs, Stack, Typography, useTheme } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { WetsuitType } from "../../Equipment/Wetsuit/Wetsuit";
import { GloveType } from "../../Equipment/Glove/Glove";
import { BootType } from "../../Equipment/Boot/Boot";
import { BeachType } from "../BeachForm";
import { FC, useState } from "react";
import { Review } from "./Review";
import { BoardType } from "../../Equipment/Board/Boards";
import { SessionDetails } from "./SessionDetails";
import { ConditionDetails } from "./ConditionDetails";
import { GearDetails } from "./GearDetails";

export type PageProps = {
  page: number;
  onBackClick: () => void;
  onNextClick: () => void;
};

type Wind = {
  speed: number;
  cardinalDirection: CardinalDirections;
  degreeDirection?: number;
};

//Might not be needed
enum DegreeDirections {
  "N" = 0,
  "NNE" = 22.5,
  "NE" = 45,
  "ENE" = 67.5,
  "E" = 90,
  "ESE" = 112.5,
  "SE" = 135,
  "SSE" = 157.5,
  "S" = 180,
  "SSW" = 202.5,
  "SW" = 225,
  "WSW" = 247.5,
  "W" = 270,
  "WNW" = 292.5,
  "NW" = 315,
  "NNW" = 337.5,
  "North" = 0,
  "East" = 90,
  "West" = 270,
  "South" = 180,
}

type CardinalDirections =
  | "N"
  | "NNE"
  | "NE"
  | "ENE"
  | "E"
  | "ESE"
  | "SE"
  | "SSE"
  | "S"
  | "SSW"
  | "SW"
  | "WSW"
  | "W"
  | "WNW"
  | "NW"
  | "NNW";

type Swell = {
  height: number;
  period: number;
  cardinalDirection: CardinalDirections;
  degreeDirection?: number;
};

type JournalEntry = {
  date: Date;
  timeIn: Date;
  timeOut: Date;
  //Create type
  wind: Wind;
  lowTide: Date;
  hightTide: Date;
  //Create type
  swell: Swell;
  storm: string;
  wetsuit?: WetsuitType;
  gloves?: GloveType;
  boots?: BootType;
  board: BoardType;
  beach: BeachType;
  notes?: string;
};

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

const validationSchema = [
  // Page 1 - Session details
  // Date, time in, time out, location, notes
  yup.object({
    date: yup.date().required("Required"),
    timeIn: yup.mixed().required(),
    timeOut: yup.mixed().required(),
    location: yup.string().required("Required"),
    notes: yup.string(),
  }),
  // Page 2 - Condition Details
  // Wind, tides, water/air temp, swell, storm
  yup.object({
    windSpeed: yup.number().required("Required"),
    windDirection: yup.string().oneOf(directions).required("Required"),
    waterTemp: yup.number(),
    airTemp: yup.number(),
    highTide: yup.mixed().required("Required"),
    lowTide: yup.mixed().required("Required"),
    swell: yup.mixed().required("Required"),
    storm: yup.string(),
  }),
  // Page 3 - Gear
  //Board, wetsuit, boots, gloves
  yup.object({
    board: yup.string().required("Required"),
    wetsuit: yup.string(),
    glove: yup.string(),
    boot: yup.string(),
  }),
];

export const schema = yup.object().shape({
  // Page 1 - Session details
  // Date, time in, time out, location, notes
  date: yup.date().required("Required"),
  timeIn: yup.mixed().required("Required"),
  timeOut: yup.mixed().required("Required"),
  location: yup.string().required("Required"),
  notes: yup.string(),
  // Page 2 - Condition Details
  // Wind, tides, water/air temp, swell, storm
  windSpeed: yup.number().required("Required"),
  windDirection: yup.string().oneOf(directions).required("Required"),
  waterTemp: yup.number(),
  airTemp: yup.number(),
  highTide: yup.mixed(),
  lowTide: yup.mixed(),
  swell: yup.mixed().required("Required"),
  storm: yup.string(),
  // Page 3 - Gear
  //Board, wetsuit, boots, gloves
  board: yup.string().required("Required"),
  wetsuit: yup.string(),
  glove: yup.string(),
  boot: yup.string(),
});

export const JournalForm = () => {
  const [page, setPage] = useState<number>(1);

  const currentSchema = validationSchema[page];

  console.log("currentSchema", currentSchema);

  const { ...methods } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const formSwitch = (page: number) => {
    switch (page) {
      case 1:
        return (
          <SessionDetails
            page={page}
            onBackClick={() => setPage(page - 1)}
            onNextClick={() => setPage(page + 1)}
          />
        );
      case 2:
        return (
          <ConditionDetails
            page={page}
            onBackClick={() => setPage(page - 1)}
            onNextClick={() => setPage(page + 1)}
          />
        );
      case 3:
        return (
          <GearDetails
            page={page}
            onBackClick={() => setPage(page - 1)}
            onNextClick={() => setPage(page + 1)}
          />
        );
      case 4:
        return <Review page={page} onBackClick={() => setPage(page - 1)} onNextClick={() => undefined} />;
    }
  };

  return (
    <>
      <FormBreadcrumbs page={page} />
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(data => {
            console.log("SUBMIT DATA!!!", data);
          })}>
          {formSwitch(page)}
        </form>
      </FormProvider>
    </>
  );
};

export const FormBreadcrumbs: FC<{ page: number }> = ({ page }) => {
  const theme = useTheme();

  return (
    <Box display="flex" justifyContent="center" sx={{ py: theme.spacing(2) }}>
      <Breadcrumbs separator="›">
        <FormBreadcrumb currentPage={page} targetPage={1} title="Session Details" />
        <FormBreadcrumb currentPage={page} targetPage={2} title="Conditions" />
        <FormBreadcrumb currentPage={page} targetPage={3} title="Gear" />
        <FormBreadcrumb currentPage={page} targetPage={4} title="Review" />
      </Breadcrumbs>
    </Box>
  );
};

type FormBreadcrumbType = { currentPage: number; title: string; targetPage: number };

export const FormBreadcrumb: FC<FormBreadcrumbType> = ({ currentPage, title, targetPage }) => {
  const theme = useTheme();

  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <Avatar
        sx={{
          width: 24,
          height: 24,
          backgroundColor: currentPage === targetPage ? theme.palette.primary.main : "none",
        }}>
        <Typography>{targetPage}</Typography>
      </Avatar>
      <Typography color={currentPage === targetPage ? "text.primary" : "inherit"}>{title}</Typography>
    </Stack>
  );
};
