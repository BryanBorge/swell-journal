import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { PasswordTextField } from "../Shared/PasswordTextField";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

type RegisterFormData = {
  email: string;
  displayName: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required("Please enter your email"),
  displayName: yup.string().required("Please tell us your name"),
  password: yup.string().required("Please enter a password"),
});

export const Register = () => {
  const [error, setError] = useState<string | undefined>();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: RegisterFormData) => {
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then(userCredential => {
        console.log("userCredential", userCredential);
        const user = userCredential.user;

        if (!user) return;

        return updateProfile(user, { displayName: data.displayName }).then(res => {
          setError(undefined);
          navigate("/equipment");
        });
      })
      .catch(error => {
        if (error.code === "auth/email-already-in-use") {
          setError("Invalid credentials");
        }
      });
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}>
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <LockOutlinedIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Sign up
      </Typography>
      <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Controller
              name="displayName"
              control={control}
              render={({ field: { onChange, value } }: any) => (
                <TextField
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={onChange}
                  value={value}
                  fullWidth
                  error={!!errors.displayName?.message}
                  helperText={errors.displayName?.message}
                  id="displayName"
                  label="What should we call you"
                  name="displayName"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="email"
              control={control}
              render={({ field: { onChange, value } }: any) => (
                <TextField
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={onChange}
                  value={value}
                  fullWidth
                  error={!!errors.email?.message}
                  helperText={errors.email?.message}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <Controller
              name="password"
              control={control}
              render={({ field: { onChange, value } }: any) => (
                <PasswordTextField
                  InputProps={{ inputProps: { min: 0 } }}
                  onChange={onChange}
                  value={value}
                  fullWidth
                  error={!!errors.password?.message || !!error}
                  helperText={errors.password?.message || error}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="password"
                />
              )}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive updates via email."
            />
          </Grid>
        </Grid>
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 1 }}>
          Sign up
        </Button>
        <Button fullWidth variant="outlined" onClick={() => {}} sx={{ mb: 2 }}>
          Sign up with Google
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link component={RouterLink} to="/login" variant="body2">
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
