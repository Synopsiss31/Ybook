import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Box, IconButton, Menu, Paper, Typography } from '@mui/material';
import Grid from '@mui/system/Unstable_Grid';
import Image from 'next/image';
import React from 'react';

import type { UserModel } from '@/types/models';

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

  // if (menuItems) {
  //   /*Verify menuItems is an array of MUI MenuItem */
  //   if (!menuItems.every(item => (React.isValidElement(item) && item.type == MenuItem))
  //   ) throw new Error("menuItems must be an array of MUI MenuItem")
  // }

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  if (!user) return null;

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
            <Image
              src="https://www.shutterstock.com/image-vector/people-illustrations-profile-examples-260nw-1270121050.jpg"
              loader={({ src, width, quality }) => {
                return `${src}?w=${width}&q=${quality || 75}`;
              }}
              alt="Picture of the author"
              width={50}
              height={50}
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
            {`${user?.firstname} ${user?.lastname}`}
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
        <IconButton onClick={handleMenuClick}>
          <MoreVertIcon />
        </IconButton>
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
