import { Avatar, Box, Breadcrumbs, Stack, Typography, useTheme } from "@mui/material";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import { WetsuitType } from "../../Equipment/Wetsuit/Wetsuit";
import { GloveType } from "../../Equipment/Glove/Glove";
import { BootType } from "../../Equipment/Boot/Boot";
import { BeachType } from "../BeachForm";
import { FirstPage } from "./FirstPage";
import { SecondPage } from "./SecondPage";
import { FC, useState } from "react";
import { ThirdPage } from "./ThirdPage";
import { FourthPage } from "./FourthPage";
import { Review } from "./Review";
import { BoardType } from "../../Equipment/Board/Boards";
import dayjs from "dayjs";

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
  yup.object({
    date: yup.date().required("Please enter the date"),
    location: yup.string().required("Please enter a location"),
  }),
  yup.object({
    timeIn: yup.mixed().nullable(),
    timeOut: yup.mixed().nullable(),
    highTide: yup.mixed().nullable(),
    lowTide: yup.mixed().nullable(),
  }),
  yup.object({
    swell: yup.mixed().required(),
    windSpeed: yup.number().required(),
    windDirection: yup.string().oneOf(directions).required(),
  }),
];

export const schema = yup.object().shape({
  date: yup.date().required("Please enter the date"),
  location: yup.string().required("Please enter a location"),
  timeIn: yup.mixed().nullable(),
  timeOut: yup.mixed().nullable(),
  highTide: yup.mixed().nullable(),
  lowTide: yup.mixed().nullable(),
  swell: yup.mixed().required(),
  windSpeed: yup.number().required(),
  windDirection: yup.string().oneOf(directions).required(),
  board: yup.string().required(),
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
    defaultValues: {
      // date: new Date(),
      location: "Gilgo",
      timeIn: new Date(),
      timeOut: new Date(),
      lowTide: new Date(),
      highTide: new Date(),
    },
  });

  const formSwitch = (page: number) => {
    switch (page) {
      case 1:
        return (
          <FirstPage
            page={page}
            onBackClick={() => setPage(page - 1)}
            onNextClick={() => setPage(page + 1)}
          />
        );
      case 2:
        return (
          <SecondPage
            page={page}
            onBackClick={() => setPage(page - 1)}
            onNextClick={() => setPage(page + 1)}
          />
        );
      case 3:
        return (
          <ThirdPage
            page={page}
            onBackClick={() => setPage(page - 1)}
            onNextClick={() => setPage(page + 1)}
          />
        );
      case 4:
        return (
          <FourthPage
            page={page}
            onBackClick={() => setPage(page - 1)}
            onNextClick={() => setPage(page + 1)}
          />
        );
      case 5:
        return (
          <Review page={page} onBackClick={() => setPage(page - 1)} onNextClick={() => setPage(page + 1)} />
        );
    }
  };

  return (
    <>
      <FormBreadcrumbs page={page} />{" "}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(() => {})}>{formSwitch(page)}</form>
      </FormProvider>
    </>
  );
};

export const FormBreadcrumbs: FC<{ page: number }> = ({ page }) => {
  const theme = useTheme();

  return (
    <Box display="flex" justifyContent="center" sx={{ py: theme.spacing(2) }}>
      <Breadcrumbs separator="›">
        <FormBreadcrumb currentPage={page} targetPage={1} title="Date & Location" />
        <FormBreadcrumb currentPage={page} targetPage={2} title="Tides & Time" />
        <FormBreadcrumb currentPage={page} targetPage={3} title="Swell & Wind" />
        <FormBreadcrumb currentPage={page} targetPage={4} title="Equiptment" />
        <FormBreadcrumb currentPage={page} targetPage={5} title="Review" />
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
