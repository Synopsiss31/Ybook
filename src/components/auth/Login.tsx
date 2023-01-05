import useAuth from "@/lib/hooks/useAuth";
import {
  Box,
  Button, TextField, Typography
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useSwiper } from 'swiper/react';
import { AuthenticationScreens } from "./AuthenticationScreens";
import PasswordInput, { IPasswordInputRef } from "./input/PasswordInput";

interface ILoginError {
  type: 'email' | 'password' | 'unknown';
  message: string;
}

const Login: React.FC = () => {
  const { login } = useAuth();

  const usernameRef = React.useRef<HTMLInputElement>(null);

  const passwordRef = React.useRef<IPasswordInputRef>(null);

  const [error, setError] = React.useState<ILoginError | null>(null);

  const handleLogin = () => {
    if (!usernameRef.current?.value)
      setError({
        type: "email",
        message: "Email is required",
      });
    else if (!passwordRef.current?.value)
      setError({
        type: "password",
        message: "Password is required",
      });
    else {
        login({
          email: usernameRef.current?.value,
          password: passwordRef.current?.value,
        }).then(() => {
          setError(null);
          toast.success("Login successful");
        }).catch((error) => {
          setError(
            error.code === "auth/user-not-found" ? {
              type: "email",
              message: "Email not found",
            } : error.code === "auth/wrong-password" ? {
              type: "password",
              message: "Incorrect password",
            } : {
              type: "unknown",
              message: error.message
            }
          );
        });
    }
  };

  const swiper = useSwiper();

  const handleRegister = () => {
    swiper.slideTo(AuthenticationScreens.Register);
  }

  const handleForgotPassword = () => {
    swiper.slideTo(AuthenticationScreens.ForgotPassword);
  }

  /**
   * on Error : display hot toast
   */
  useEffect(() => {
    if (error) {
      toast.error(error.message);
    }
  }, [error]);
  


  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        marginTop: "8%",
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          paddingTop: "2%",
        }}
      >
          
        <Grid xs={12}>
          <TextField
            error={error?.type === 'email'}
            helperText={error?.type === 'email' ? error.message : undefined}
            inputRef={usernameRef}
            label="Username"
            variant="outlined"
            fullWidth
          />
        </Grid>
        <Grid xs={12}>
          <PasswordInput
            textFieldProps={{
              error: error?.type === 'password',
              helperText: error?.type === 'password' ? error.message : undefined,
          }}
            ref={passwordRef} />
        </Grid>
        <Grid xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleLogin}
          >
            Login
          </Button>
        </Grid>
      </Grid>
      <Grid xs={12}>
        <Typography
          variant="body2"
          align="center"
          sx={{
            marginTop: "2%",
            color: "primary.main",
            "&:hover": {
              cursor: "pointer",
              textDecoration: "underline",
            },
          }}
          onClick={handleForgotPassword}
        >
          Forgot Password?
        </Typography>
      </Grid>
      <Grid xs={12}>
        <Typography
          variant="body2"
                    align="center"
          sx={{
            marginTop: "2%",
            color: "primary.main",
            "&:hover": {
              cursor: "pointer",
              textDecoration: "underline",
            }, 
          }}
          onClick={handleRegister}
        >
          Don't have an Account ?
        </Typography>
      </Grid>
    </Box>
  );
};


export default Login;