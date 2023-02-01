import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from '@mui/icons-material/Chat';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';

import { Pages, useAppContext } from '@/lib/contexts/AppContext';

import AppFabButton from './fab/AppFabButton';

const BottomBar = () => {
  const { state: appState, dispatch: setAppState } = useAppContext();

  return (
    <Box>
      <BottomNavigation
        value={appState.page}
        onChange={(event, newValue) => {
          event.preventDefault();
          setAppState({ type: 'SET_PAGE', payload: newValue });
        }}
        showLabels
        sx={{
          width: '100%',
          justifyContent: 'space-evenly',
          backgroundColor: 'background.paper',
          position: 'relative',
        }}
      >
        <BottomNavigationAction
          label="Home"
          value={Pages.Home}
          icon={<HomeIcon />}
          sx={{
            borderRadius: 2,
          }}
        />
        <BottomNavigationAction
          label="Profile"
          value={Pages.Profile}
          icon={<AccountCircleIcon />}
          sx={{
            borderRadius: 2,
          }}
        />

        <AppFabButton />

        <BottomNavigationAction
          label="Chat"
          value={Pages.Chat}
          icon={<ChatIcon />}
          sx={{
            borderRadius: 2,
          }}
        />
        <BottomNavigationAction
          label="Settings"
          value={Pages.Settings}
          icon={<SettingsIcon />}
          sx={{
            borderRadius: 2,
          }}
        />
      </BottomNavigation>
    </Box>
  );
};

export default BottomBar;
