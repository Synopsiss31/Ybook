import { Box, Button, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import { useSwiper } from 'swiper/react';

import useAuth from '@/lib/hooks/useAuth';

import { AuthenticationScreens } from './AuthenticationScreens';
import type { IPasswordInputRef } from './input/PasswordInput';
import PasswordInput from './input/PasswordInput';

const Register: React.FC = () => {
  const { register } = useAuth();

  const usernameRef = React.useRef<HTMLInputElement>(null);

  const passwordRef = React.useRef<IPasswordInputRef>(null);

  const passwordConfirmRef = React.useRef<IPasswordInputRef>(null);

  const firstnameRef = React.useRef<HTMLInputElement>(null);

  const lastnameRef = React.useRef<HTMLInputElement>(null);

  const swiper = useSwiper();

  const handleRegister = () => {
    try {
      if (passwordRef.current?.value !== passwordConfirmRef.current?.value) {
        throw new Error('Password does not match');
      }
      if (
        !usernameRef.current?.value ||
        !passwordRef.current?.value ||
        !firstnameRef.current?.value ||
        !lastnameRef.current?.value
      ) {
        throw new Error('Please fill in all fields');
      } else {
        register({
          email: usernameRef.current?.value,
          password: passwordRef.current?.value,
          name: firstnameRef.current?.value,
          given_name: lastnameRef.current?.value,
        });
        swiper.slideTo(AuthenticationScreens.ConfirmUser);
      }
    } catch (error) {
      /* empty */
    }
  };

  const handleLogin = () => {
    swiper.slideTo(AuthenticationScreens.Login);
  };

  return (
    <Box
      sx={{
        position: 'relative',
        overflow: 'hidden',
        marginTop: '8%',
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          paddingTop: '2%',
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
          <PasswordInput ref={passwordRef} />
        </Grid>
        <Grid xs={12}>
          <PasswordInput confirm ref={passwordConfirmRef} />
        </Grid>
        <Grid xs={12}>
          <TextField
            inputRef={firstnameRef}
            label="Firstname"
            variant="outlined"
            type="text"
            fullWidth
          />
        </Grid>
        <Grid xs={12}>
          <TextField
            inputRef={lastnameRef}
            label="Lastname"
            variant="outlined"
            type="text"
            fullWidth
          />
        </Grid>

        <Grid xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleRegister}
          >
            Register
          </Button>
        </Grid>
      </Grid>
      <Grid xs={12}>
        <Typography
          variant="body2"
          align="center"
          sx={{
            marginTop: '2%',
            color: 'primary.main',
            '&:hover': {
              cursor: 'pointer',
              textDecoration: 'underline',
            },
          }}
          onClick={handleLogin}
        >
          Already have an Account?
        </Typography>
      </Grid>
    </Box>
  );
};

export default Register;
