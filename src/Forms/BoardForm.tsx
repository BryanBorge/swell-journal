import { Stack, TextField, Autocomplete, Button, Box, useTheme, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { FC, useContext } from "react";
import { MaskedInput } from "../Shared/HeightMaskTextField";
import { BoardType } from "../Equipment/Board/Boards";
import { DataContext } from "../Context/DataContext/DataContext";

const boardBrands = ["Pyzel", "Lost", "Channel Islands", "Bunger", "Rusty", "Handshaped"];
const finSetups = ["Thruster", "Twin", "Quad"];

const schema = yup.object().shape({
  brand: yup.string().required("Please enter the brand name"),
  height: yup.string().required("Please enter height"),
  width: yup.string().required("Please enter width"),
  thickness: yup.string().required("Please enter thickness"),
  //TODO: Should be multi select to set available setups for a board
  finSetup: yup.string().required("Please enter fin setup"),
});

export const BoardForm: FC<{ closeDialog: () => void }> = ({ closeDialog }) => {
  const theme = useTheme();
  const { addBoard, getBoardsForUser, error } = useContext(DataContext);
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      brand: "",
      finSetup: "",
      height: "",
      thickness: "",
      width: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const newBoard: BoardType = {
      brand: data.brand,
      height: data.height,
      width: data.width,
      thickness: data.thickness,
      finSetup: data.finSetup,
    };

    addBoard(newBoard);
    clearErrors();
    closeDialog();
    setTimeout(() => {
      getBoardsForUser();
    }, 100);
  };

  if (error) {
    return <Typography>{error}</Typography>;
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1} sx={{ paddingTop: theme.spacing(0.5) }}>
          <Controller
            name="brand"
            control={control}
            render={({ field }: any) => (
              <Autocomplete
                options={boardBrands}
                {...field}
                onChange={(event, values: any) => {
                  field.onChange(values);
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    {...field}
                    error={!!errors.brand?.message}
                    helperText={errors.brand?.message}
                    label="Brand"
                  />
                )}
              />
            )}
          />

          <Controller
            name="height"
            control={control}
            render={({ field: { onChange, value, ref } }: any) => (
              <TextField
                InputProps={{
                  inputProps: { min: 0, mask: `#' ##"` },
                  ref,
                  inputComponent: MaskedInput,
                  onChange: onChange,
                  value: value,
                }}
                onChange={onChange}
                value={value}
                error={!!errors.height?.message}
                helperText={errors.height?.message}
                placeholder={`6' 02"`}
                name="height"
                label="Height"
              />
            )}
          />
          <Controller
            name="width"
            control={control}
            render={({ field: { onChange, value, ref } }: any) => (
              <TextField
                InputProps={{
                  inputProps: { min: 0, mask: `##"` },
                  ref,
                  inputComponent: MaskedInput,
                  onChange: onChange,
                  value: value,
                }}
                onChange={onChange}
                value={value}
                error={!!errors.width?.message}
                helperText={errors.width?.message}
                placeholder={`19"`}
                name="width"
                label="Width"
              />
            )}
          />
          <Controller
            name="thickness"
            control={control}
            render={({ field: { onChange, value, ref } }: any) => (
              <TextField
                InputProps={{
                  inputProps: { min: 0, mask: `#.##"` },
                  ref,
                  inputComponent: MaskedInput,
                  onChange: onChange,
                  value: value,
                }}
                onChange={onChange}
                value={value}
                error={!!errors.thickness?.message}
                helperText={errors.thickness?.message}
                placeholder={`2.25"`}
                name="thickness"
                label="Thickness"
              />
            )}
          />
          <Controller
            name="finSetup"
            control={control}
            render={({ field }: any) => (
              <Autocomplete
                options={finSetups}
                {...field}
                onChange={(event, values: any) => {
                  field.onChange(values);
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    {...field}
                    error={!!errors.finSetup?.message}
                    helperText={errors.finSetup?.message}
                    label="Fin setup"
                  />
                )}
              />
            )}
          />
          <Box display="flex" justifyContent="flex-end">
            <Button type="submit">Submit</Button>
          </Box>
        </Stack>
      </form>
    </>
  );
};
