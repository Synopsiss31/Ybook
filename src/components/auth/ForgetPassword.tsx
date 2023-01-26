import useAuth from "@/lib/hooks/useAuth";
import { Box, Button, IconButton, TextField, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { NextResponse } from "next/server";
import React from "react";
import PasswordInput, { IPasswordInputRef } from "./input/PasswordInput";
import { useSwiper } from 'swiper/react';
import { AuthenticationScreens } from './AuthenticationScreens';
import toast from 'react-hot-toast';


interface IForgetPasswordProps {
  nextStep: (step?: number) => void;
  email:(email? : string)=> string;
}

const ForgetPasswordNewPassword: React.FC<IForgetPasswordProps> = ({
  nextStep,
  email
}) => {
  const { forgetPasswordConfirm } = useAuth();

  const passwordRef = React.useRef<IPasswordInputRef>(null);

  const passwordConfirmRef = React.useRef<IPasswordInputRef>(null);

  const codeRef = React.useRef<IPasswordInputRef>(null);

  const handleForgetPassword = () => {
    try {
      if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
        throw new Error("Password does not match");
      }
      if (!passwordRef.current?.value || !codeRef.current?.value) {
        throw new Error("Please fill in all fields");
      } else {
        forgetPasswordConfirm({
          password: passwordRef.current?.value,
          code: codeRef.current?.value,
          email: email(),
        });
        nextStep()
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          <Typography  gutterBottom>
            The code has been sent to your email
          </Typography>
        </Grid>
        <Grid xs={12}>
          <PasswordInput ref={codeRef} label="Code" />
        </Grid>
        <Grid xs={12}>
          <PasswordInput ref={passwordRef} />
        </Grid>
        <Grid xs={12}>
          <PasswordInput confirm ref={passwordConfirmRef} />
        </Grid>
        <Grid xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleForgetPassword}
          >
            Reset Password
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};


const ForgetPasswordSendCode: React.FC<IForgetPasswordProps> = ({
  nextStep,
  email
}) => {
  const { forgetPasswordSendCode } = useAuth();

  const usernameRef = React.useRef<HTMLInputElement>(null);

  const handleForgetPassword = () => {
    try {
      if (!usernameRef.current?.value) {
        throw new Error("Please fill in all fields");
      } else {
        email(usernameRef.current?.value);
        forgetPasswordSendCode({
          email: usernameRef.current?.value,
        });
        nextStep()
      }
    } catch (error) {
      console.error(error);
    }
  };

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
            inputRef={usernameRef}
            label="Email"
            variant="outlined"
            type="email"
            fullWidth
          />
        </Grid>
        <Grid xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleForgetPassword}
          >
            Reset Password
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};



const ForgetPassword: React.FC = () => {
  const [step, setStep] = React.useState(0);
  const [email, setEmail] = React.useState("");

  const nextStep = (step?: number) => {
    if (step === undefined)
      setStep((step) => step + 1);
    else setStep(step);
  };

  const getEmail = (newEmail?: string) => {
    if (newEmail) {
      setEmail(newEmail);
    }
    return email;
  };

  const swiper = useSwiper()


  if (step > 1) {
    swiper.slideTo(AuthenticationScreens.Login)
    setStep(0);
    toast.success("Password reset successfully")
  }

  return (
    <>
      {step === 0 && (
        <ForgetPasswordSendCode
          nextStep={nextStep}
          email={getEmail}
        />
      )}
      {step === 1 && (
        <ForgetPasswordNewPassword
          nextStep={nextStep}
          email={getEmail}
        />
      )}
    </>

  )
}


export default ForgetPassword;