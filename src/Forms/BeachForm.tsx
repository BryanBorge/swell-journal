import { Stack, TextField, Button, Box, useTheme } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

export type BeachType = {
  name: string;
  location: string;
};

const schema = yup.object().shape({
  name: yup.string().required("Please enter the beach name"),
  location: yup.string().required("Please enter the location"),
});

export const BeachForm = () => {
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
    let savedData = localStorage.getItem("beaches") ?? "";
    let beaches = !!savedData ? JSON.parse(savedData) : [];
    beaches.push(data);
    localStorage.setItem("beaches", JSON.stringify(beaches));
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={1} sx={{ paddingTop: theme.spacing(0.5) }}>
          <Controller
            name="name"
            control={control}
            render={({ field: { onChange, value } }: any) => (
              <TextField
                InputProps={{ inputProps: { min: 0 } }}
                onChange={onChange}
                value={value}
                error={!!errors.name?.message}
                helperText={errors.name?.message}
                name="name"
                label="Name"
              />
            )}
          />
          <Controller
            name="location"
            control={control}
            render={({ field: { onChange, value } }: any) => (
              <TextField
                InputProps={{ inputProps: { min: 0 } }}
                onChange={onChange}
                value={value}
                error={!!errors.location?.message}
                helperText={errors.location?.message}
                name="location"
                label="Location"
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
