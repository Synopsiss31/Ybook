import { Box, Button, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';

import useAuth from '@/lib/hooks/useAuth';

import type { IPasswordInputRef } from './input/PasswordInput';
import PasswordInput from './input/PasswordInput';

const ConfirmUser: React.FC = () => {
  const { confirmUser } = useAuth();

  const usernameRef = React.useRef<HTMLInputElement>(null);

  const passwordRef = React.useRef<IPasswordInputRef>(null);

  const handleConfirmUser = () => {
    try {
      if (!usernameRef.current?.value || !passwordRef.current?.value) {
        throw new Error('Please fill in all fields');
      } else {
        confirmUser({
          email: usernameRef.current?.value,
          code: passwordRef.current?.value,
        });
      }
    } catch (error) {
      /* empty */
    }
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
          <PasswordInput ref={passwordRef} label="Code" />
        </Grid>

        <Grid xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleConfirmUser}
          >
            Confirm
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConfirmUser;
