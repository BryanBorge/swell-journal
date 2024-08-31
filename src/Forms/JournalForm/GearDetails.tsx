import React, { FC, useContext, useEffect } from "react";
import { Autocomplete, Grid, Stack, TextField, Typography } from "@mui/material";
import { PageTitle } from "../Shared/PageTitle";
import { Controller, useFormContext } from "react-hook-form";
import { SwellMaskedInput } from "../../Shared/SwellMaskTextField";
import { DesktopTimePicker } from "@mui/x-date-pickers";
import { EquipmentCard, WetsuitType } from "../../Equipment/Wetsuit/Wetsuit";
import { GloveType } from "../../Equipment/Glove/Glove";
import { BootType } from "../../Equipment/Boot/Boot";
import { BoardType } from "../../Equipment/Board/Boards";
import { DataContext } from "../../Context/DataContext/DataContext";
import { PageProps } from "./JournalForm";

export const GearDetails: FC<PageProps> = ({ onBackClick, onNextClick, page }) => {
  const { control } = useFormContext();

  const {
    wetsuits,
    boards,
    gloves,
    boots,
    getBootsForUser,
    getGlovesForUser,
    getWetsuitsForUser,
    getBoardsForUser,
  } = useContext(DataContext);

  useEffect(() => {
    if (wetsuits.length === 0) {
      getWetsuitsForUser();
    }

    if (boards.length === 0) {
      getBoardsForUser();
    }

    if (gloves.length === 0) {
      getGlovesForUser();
    }

    if (boots.length === 0) {
      getBootsForUser();
    }
  }, []);

  console.log("boots", boots);

  return (
    <>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <PageTitle
            page={page}
            title="What equiptment did you use?"
            onBackClick={onBackClick}
            onNextClick={onNextClick}
            showControls={true}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="h4" gutterBottom>
            Boards *
          </Typography>
          <Controller
            name="board"
            control={control}
            render={({ field }) => (
              <Stack spacing={1}>
                {boards.map((board: BoardType) => (
                  <EquipmentCard
                    brand={board.brand}
                    desc={`${board.height} x ${board.width} x ${board.thickness} - ${board.finSetup}`}
                    selected={field.value === board.id}
                    onClick={() => field.onChange(board.id)}
                  />
                ))}
              </Stack>
            )}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="h4" gutterBottom>
            Wetsuits
          </Typography>
          <Controller
            name="wetsuit"
            control={control}
            render={({ field }) => (
              <Stack spacing={1}>
                {wetsuits.map((wetsuit: WetsuitType) => (
                  <EquipmentCard
                    brand={wetsuit.brand}
                    desc={`${wetsuit.thickness}mm ${wetsuit.suitType} ${wetsuit.zipperType}`}
                    selected={field.value === wetsuit.id}
                    onClick={() => field.onChange(wetsuit.id)}
                  />
                ))}
              </Stack>
            )}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="h4" gutterBottom>
            Gloves
          </Typography>
          <Controller
            name="glove"
            control={control}
            render={({ field }) => (
              <Stack spacing={1}>
                {gloves.map((glove: GloveType) => (
                  <EquipmentCard
                    brand={glove.brand}
                    desc={`${glove.thickness}mm ${glove.type}`}
                    selected={field.value === glove.id}
                    onClick={() => field.onChange(glove.id)}
                  />
                ))}
              </Stack>
            )}
          />
        </Grid>

        <Grid item xs={12} md={3}>
          <Typography variant="h4" gutterBottom>
            Boots
          </Typography>
          <Controller
            name="boot"
            control={control}
            render={({ field }) => (
              <Stack spacing={1}>
                {boots.map((boot: BootType) => (
                  <EquipmentCard
                    brand={boot.brand}
                    desc={`${boot.thickness}mm ${boot.type}`}
                    selected={field.value === boot.id}
                    onClick={() => field.onChange(boot.id)}
                  />
                ))}
              </Stack>
            )}
          />
        </Grid>
      </Grid>
    </>
  );
};
