import { yupResolver } from "@hookform/resolvers/yup";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
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
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { PasswordTextField } from "../Shared/PasswordTextField";
import { auth } from "../firebase";

const provider = new GoogleAuthProvider();
provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
auth.languageCode = "it";
provider.setCustomParameters({
  login_hint: "user@example.com",
});

type LoginFormData = {
  email: string;
  password: string;
};

const schema = yup.object().shape({
  email: yup.string().email().required("Please enter your email"),
  password: yup.string().required("Please enter a password"),
});

export const Login = () => {
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

  const onSubmit = (data: LoginFormData) => {
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then(userCredential => {
        console.log("userCredential", userCredential);
        const user = userCredential.user;

        if (!user) return;

        navigate("/equipment");
      })
      .catch(error => {
        console.log(error.message);
        console.log(error.code);
        if (error.code === "auth/email-already-in-use" || error.code === "auth/invalid-credential") {
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
        Sign in
      </Typography>
      <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 3 }}>
        <Grid container spacing={2}>
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
        </Grid>
        <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 1 }}>
          Sign In
        </Button>
        <Button
          fullWidth
          variant="outlined"
          onClick={() => {
            signInWithPopup(auth, provider)
              .then(result => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential?.accessToken;
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)

                console.log("result", result);
                navigate("/equipment");
                // ...
              })
              .catch(error => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
              });
          }}
          sx={{ mb: 2 }}>
          Sign in with Google
        </Button>
        <Grid container>
          <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
          <Grid item>
            <Link component={RouterLink} to="/register" variant="body2">
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
