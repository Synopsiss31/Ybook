import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import { Box, IconButton, Menu, Paper, Typography } from '@mui/material';
import Grid from '@mui/system/Unstable_Grid';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';

import { useUserCtx } from '@/lib/contexts/UserCtx';
import { DEFAULT_URL } from '@/lib/hooks/API/users/useAPIUser';
import { getIdToken } from '@/lib/utils/cognito';
import type { UserModel } from '@/types/models';

import GetImage from '../image/get';
// eslint-disable-next-line import/no-named-as-default
import UserCardMenu from './userCardMenu/UserCardMenu';

interface IUserCardProps {
  user: UserModel;
  /* MUI IconButton */ interaction?: React.ReactNode;
  /* MUI MenuItem */ menuItems?: React.ReactNode[];
}

const UserCard: React.FC<IUserCardProps> = ({ user, interaction }) => {
  if (interaction) {
    /* Verify interaction is a MUI IconButton */
    if (!React.isValidElement(interaction) || interaction.type !== IconButton)
      throw new Error('interaction must be a MUI IconButton');
  }

  const userCo = useUserCtx();

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

  const [validated, setValidated] = useState(false);

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
    const token = await getIdToken();
    const resp = await fetch(
      `${DEFAULT_URL}/friend/create/${userCo.user.id}/${rec.id}`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    if (!resp.ok) {
      throw new Error('An error occurred while fetching the data.');
    }

    toast('Invitation envoyée', {
      icon: '✅',
    });
    setValidated(true);
  };

  // if (menuItems) {
  //   /* Verify menuItems is an array of MUI MenuItem */
  //   if (
  //     !menuItems.every(
  //       (item) => React.isValidElement(item) && item.type == MenuItem
  //     )
  //   )
  //     throw new Error('menuItems must be an array of MUI MenuItem');
  // }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
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
        {interaction && (
          <Grid xs={2}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                overflow: 'hidden',
              }}
            >
              {interaction}
            </Box>
          </Grid>
        )}
        {validated ? (
          <HowToRegRoundedIcon />
        ) : !rec ? (
          <IconButton onClick={handleMenuClick}>
            <MoreVertIcon />
          </IconButton>
        ) : (
          <IconButton onClick={handleAddClick}>
            <PersonAddAlt1RoundedIcon />
          </IconButton>
        )}

        <Menu
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <UserCardMenu userId={user.id} />
        </Menu>
      </Grid>
    </Paper>
  );
};

export default UserCard;
