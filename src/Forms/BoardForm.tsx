import { Stack, TextField, Autocomplete, Button, Box, useTheme } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { db } from "../firebase";
import { FirestoreBoardType } from "../Equipment/Board/Boards";
import { collection, addDoc } from "firebase/firestore";

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

export const BoardForm = () => {
  const theme = useTheme();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    const newBoard: FirestoreBoardType = {
      brand: data.brand,
      height: data.height,
      width: data.width,
      thickness: data.thickness,
      fins: data.finSetup,
    };

    try {
      const docRef = await addDoc(collection(db, "boards"), {
        ...newBoard,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
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
            render={({ field: { onChange, value } }: any) => (
              <TextField
                InputProps={{ inputProps: { min: 0 } }}
                onChange={onChange}
                value={value}
                error={!!errors.height?.message}
                helperText={errors.height?.message}
                name="height"
                label="Height"
              />
            )}
          />
          <Controller
            name="width"
            control={control}
            render={({ field: { onChange, value } }: any) => (
              <TextField
                InputProps={{ inputProps: { min: 0 } }}
                onChange={onChange}
                value={value}
                error={!!errors.width?.message}
                helperText={errors.width?.message}
                name="width"
                label="Width"
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
