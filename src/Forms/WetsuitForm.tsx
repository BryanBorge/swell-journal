import { Stack, TextField, Autocomplete, Button, Box, useTheme, MenuItem, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { WetsuitType } from "../Equipment/Wetsuit/Wetsuit";
import { FC, useContext } from "react";
import { AuthContext } from "../Context/AuthContext";
import { DataContext } from "../Context/DataContext/DataContext";

const wetsuitBrands = ["Xcel", "Hyperflex"];

const zipperTypes = [
  { label: "Back zip", value: "back" },
  { label: "Chest zip", value: "chest" },
  { label: "No zip", value: "no-zip" },
];

const suitTypes = [
  { label: "Hooded full suit", value: "hooded-full-suit" },
  { label: "Full suit", value: "full-suit" },
  { label: "Half suit", value: "half-suit" },
  { label: "Long sleve rash guard", value: "long-sleve-rash" },
  { label: "No sleve rash guard", value: "no-sleve-rash" },
];

const schema = yup.object().shape({
  brand: yup.string().required("Please enter the brand name"),
  thickness: yup.string().required("Please enter thickness"),
  zipperType: yup.string().required("Please enter zipper type"),
  suitType: yup.string().required("Please enter suit type"),
});

export const WetsuitForm: FC<{ closeDialog: () => void }> = ({ closeDialog }) => {
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  const { addWetsuit, getWetsuitsForUser, error } = useContext(DataContext);

  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const newWetsuit: WetsuitType = {
      brand: data.brand,
      thickness: data.thickness,
      suitType: data.suitType,
      zipperType: data.zipperType,
    };

    addWetsuit(newWetsuit);
    clearErrors();
    closeDialog();
    setTimeout(() => {
      getWetsuitsForUser();
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
                options={wetsuitBrands}
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
            name="thickness"
            control={control}
            render={({ field: { onChange, value } }: any) => (
              <TextField
                InputProps={{ inputProps: { min: 0 } }}
                onChange={onChange}
                value={value}
                error={!!errors.thickness?.message}
                helperText={errors.thickness?.message}
                name="thickness"
                label="Thickness"
              />
            )}
          />
          <Controller
            control={control}
            name="suitType"
            render={({ field }) => (
              <TextField {...field} select label="Suit Type">
                {suitTypes.map(type => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </TextField>
            )}
          />
          <Controller
            control={control}
            name="zipperType"
            render={({ field }) => (
              <TextField {...field} select label="Zipper Type">
                {zipperTypes.map(type => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </TextField>
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
