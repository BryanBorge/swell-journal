import { Stack, TextField, Autocomplete, Button, Box, useTheme } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const gloveBrands = ["Xcel", "Hyperflex"];
const gloveTypes = ["Lobster claw", "Five finger", "Mitten"];

const schema = yup.object().shape({
  brand: yup.string().required("Please enter the brand name"),
  thickness: yup.string().required("Please enter thickness"),
  type: yup.string().required("Please enter glove type"),
});

export const GloveForm = () => {
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    let savedData = localStorage.getItem("gloves") ?? "";

    let gloves = !!savedData ? JSON.parse(savedData) : [];

    gloves.push(data);

    localStorage.setItem("gloves", JSON.stringify(gloves));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1} sx={{ paddingTop: theme.spacing(0.5) }}>
          <Controller
            name="brand"
            control={control}
            render={({ field }: any) => (
              <Autocomplete
                options={gloveBrands}
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
                options={gloveTypes}
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
                    label="Glove type"
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
