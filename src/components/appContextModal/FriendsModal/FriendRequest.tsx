import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Box, IconButton, Paper, Typography } from '@mui/material';
import Grid from '@mui/system/Unstable_Grid';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';

import GetImage from '@/components/image/get';
import { useUserCtx } from '@/lib/contexts/UserCtx';
import { DEFAULT_URL } from '@/lib/hooks/API/users/useAPIUser';
import { getIdToken } from '@/lib/utils/cognito';
import type { UserModel } from '@/types/models';
// eslint-disable-next-line import/no-named-as-default

interface IUserCardProps {
  user: UserModel;
  id: number;
  /* MUI IconButton */ interaction?: React.ReactNode;
  /* MUI MenuItem */ menuItems?: React.ReactNode[];
}

const FriendRequest: React.FC<IUserCardProps> = ({ user, id }) => {
  const userCo = useUserCtx();
  const [chose, setChose] = useState(false);

  const fetcher = async (url: string) => {
    const token = await getIdToken();

    const response = await fetch(`${DEFAULT_URL}${url}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('An error occurred while fetching the data.');
    }

    return response.json();
  };

  const { data } = useSWR(
    isNaN(parseInt(user)) === false ? `/friend/${user}` : null,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
    }
  );

  if (!user) return null;

  const rec = data;

  const handleAddClick = async () => {
    if (!chose) {
      const token = await getIdToken();
      const resp = await fetch(`${DEFAULT_URL}/friend/update/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          friendshipId: id,
          status: 'ACCEPTED',
        }),
      });
      if (!resp.ok) {
        throw new Error('An error occurred while fetching the data.');
      }

      setChose(true);
      toast(`Demande d'amitié acceptée`, {
        icon: '✅',
      });
    }
  };

  const handleDelClick = async () => {
    if (!chose) {
      const token = await getIdToken();
      const resp = await fetch(`${DEFAULT_URL}/friend/update/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          friendshipId: id,
          status: 'IGNORED',
        }),
      });
      if (!resp.ok) {
        throw new Error('An error occurred while fetching the data.');
      }

      setChose(true);
      toast(`Demande d'amitié refusée`, {
        icon: '❌',
      });
    }
  };

  return (
    <Paper
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 'fit-content',
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          width: 300,
          height: 50,
          alignItems: 'center',
          justifyContent: 'space-between',
          margin: 2,
        }}
      >
        <Grid xs={2}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '50px',
              height: '50px',
              bgcolor: 'primary.main',
              borderRadius: '50%',
              overflow: 'hidden',
            }}
          >
            {rec ? (
              rec.avatarS3Key ? (
                <GetImage fileID={rec.avatarS3Key} width={50} height={50} />
              ) : (
                <GetImage
                  fileID={rec.avatarS3Key || ''}
                  alt={`${rec.firstname} ${rec.lastname}`}
                  width={50}
                  height={50}
                />
              )
            ) : (
              <GetImage fileID={''} alt={`N C`} width={50} height={50} />
            )}
          </Box>
        </Grid>

        <Grid
          xs
          sx={{
            maxWidth: 250,
            paddingInline: 3,
          }}
        >
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {rec
              ? `${rec.firstname} ${rec.lastname}`
              : `${user?.firstname} ${user?.lastname}`}
          </Typography>
        </Grid>
        <IconButton onClick={handleAddClick} disabled={chose}>
          <CheckRoundedIcon />
        </IconButton>
        <IconButton onClick={handleDelClick} disabled={chose}>
          <CloseRoundedIcon />
        </IconButton>
      </Grid>
    </Paper>
  );
};

export default FriendRequest;
