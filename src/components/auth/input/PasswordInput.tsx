import { Visibility, VisibilityOff } from '@mui/icons-material';
import type { TextFieldProps } from '@mui/material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import type { ForwardRefRenderFunction } from 'react';
import React, { forwardRef } from 'react';

interface IPasswordInputProps {
  confirm?: boolean;
  label?: string;
  textFieldProps?: TextFieldProps;
}

export interface IPasswordInputRef extends HTMLInputElement {}

const PasswordInput: ForwardRefRenderFunction<
  IPasswordInputRef,
  IPasswordInputProps
> = ({ confirm, label, textFieldProps }, ref) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <TextField
      {...textFieldProps}
      inputRef={ref}
      label={label || (confirm ? 'Confirm Password' : 'Password')}
      variant="outlined"
      type={showPassword ? 'text' : 'password'}
      fullWidth
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label={`toggle ${
                label || (confirm ? 'Confirm Password' : 'Password')
              } visibility`}
              onClick={handleClickShowPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default forwardRef(PasswordInput);
