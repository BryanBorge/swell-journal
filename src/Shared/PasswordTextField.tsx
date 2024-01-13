import { IconButton, InputAdornment, TextField, TextFieldProps } from "@mui/material";
import React, { FC, useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

/**
 * Mui text field with end adornment to toggle password visibility
 *
 * @param props
 * @returns
 */
export const PasswordTextField: FC<TextFieldProps> = props => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(show => !show);

  return (
    <TextField
      {...props}
      autoComplete="current-password"
      type={showPassword ? "text" : "password"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};
