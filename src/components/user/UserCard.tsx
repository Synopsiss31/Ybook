/* eslint-disable no-nested-ternary */
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import PersonAddAlt1RoundedIcon from '@mui/icons-material/PersonAddAlt1Rounded';
import { Box, IconButton, Menu, Paper, Typography } from '@mui/material';
import Grid from '@mui/system/Unstable_Grid';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import useSWR from 'swr';

import { useUserCtx } from '@/lib/contexts/UserCtx';
import { DEFAULT_URL } from '@/lib/hooks/API/users/useAPIUser';
import { getIdToken } from '@/lib/utils/cognito';
import { FriendshipStatus } from '@/types/enums';
import type { FriendshipModel, UserModel } from '@/types/models';

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

  const { user: currentUser } = useUserCtx();

  const [friendRequestExist, setFriendRequestExist] = useState({
    asking: false,
    accepted: false,
  });

  const { data } = useSWR<FriendshipModel>(
    `/friend/${user.id}`,
    async (url) => {
      const token = await getIdToken();

      const resp = await fetch(`${DEFAULT_URL}${url}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!resp.ok) {
        throw new Error('An error occurred while fetching the data.');
      }

      return resp.json();
    },
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    if (data && data.status !== FriendshipStatus.IGNORED) {
      setFriendRequestExist({
        asking: data.fromId === currentUser?.id,
        accepted: data.status === FriendshipStatus.ACCEPTED,
      });
    }
  }, [data]);

  const handleAddClick = async () => {
    const token = await getIdToken();
    const resp = await fetch(
      `${DEFAULT_URL}/friend/create/${currentUser?.id}/${user.id}`,
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
    setFriendRequestExist({
      asking: true,
      accepted: false,
    });
  };

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
            <GetImage
              fileID={user?.avatarS3Key || ''}
              width={50}
              height={50}
              alt={`${user?.firstname || ''} ${user?.lastname || ''}`}
            />
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
            {user?.firstname} {user?.lastname}
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
        {friendRequestExist.asking ? (
          friendRequestExist.accepted ? (
            <IconButton onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
          ) : (
            <HowToRegRoundedIcon />
          )
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
