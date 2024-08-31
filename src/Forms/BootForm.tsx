import { Stack, TextField, Autocomplete, Button, Box, useTheme, Typography } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { BootType } from "../Equipment/Boot/Boot";
import { FC, useContext } from "react";
import { DataContext } from "../Context/DataContext/DataContext";

const bootBrands = ["Xcel", "Hyperflex", "Solite"];
const bootTypes = ["Round toe", "Split toe"];

const schema = yup.object().shape({
  brand: yup.string().required("Please enter the brand name"),
  thickness: yup.string().required("Please enter thickness"),
  type: yup.string().required("Please enter boot type"),
});

export const BootForm: FC<{ closeDialog: () => void }> = ({ closeDialog }) => {
  const theme = useTheme();
  const { addBoot, getBootsForUser, error } = useContext(DataContext);

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
    const newBoot: BootType = {
      brand: data.brand,
      thickness: data.thickness,
      type: data.type,
    };

    addBoot(newBoot);
    clearErrors();
    closeDialog();
    setTimeout(() => {
      getBootsForUser();
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
                options={bootBrands}
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
            name="type"
            control={control}
            render={({ field }: any) => (
              <Autocomplete
                options={bootTypes}
                {...field}
                onChange={(event, values: any) => {
                  field.onChange(values);
                }}
                renderInput={params => (
                  <TextField
                    {...params}
                    {...field}
                    error={!!errors.type?.message}
                    helperText={errors.type?.message}
                    label="Boot type"
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
