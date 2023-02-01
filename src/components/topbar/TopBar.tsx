import SunIcon from '@mui/icons-material/Brightness7';
import MoonIcon from '@mui/icons-material/DarkMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Badge, Box, IconButton, Menu, Paper } from '@mui/material';
import Grid from '@mui/system/Unstable_Grid';
import React from 'react';

import Notifications from '@/components/Notification/NotificationList';
import { useColorMode } from '@/lib/contexts/ColorModeContext';
import { useUserCtx } from '@/lib/contexts/UserCtx';

import GetImage from '../image/get';

const TopBar = () => {
  // const MenuNotifications = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const { user } = useUserCtx();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const [random] = React.useState(Math.floor(Math.random() * 5));

  return (
    <Paper
      sx={{
        width: '100%',
        height: 60,
      }}
    >
      <Grid
        container
        xs
        sx={{
          position: 'absolute',
          left: 10,
          top: 10,
          zIndex: 1000,
        }}
      >
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: 50,
            overflow: 'hidden',
          }}
        >
          <GetImage
            fileID={user?.avatarS3Key || 'avatar/1.jpg'}
            width={40}
            height={40}
          />
        </Box>
      </Grid>
      <Grid
        container
        xs
        sx={{
          position: 'absolute',
          right: 10,
          top: 10,
          zIndex: 1000,
        }}
      >
        <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
          <Badge badgeContent={random} color="primary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <IconButton onClick={toggleColorMode}>
          {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
        </IconButton>
      </Grid>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <Notifications random={random} />
      </Menu>
    </Paper>
  );
};

export default TopBar;
