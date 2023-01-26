import { useAppContext,Pages } from "@/lib/contexts/AppContext";
import { BottomNavigation, BottomNavigationAction, Box, Divider, Fab } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import { AddTwoTone } from "@mui/icons-material";


const BottomBar = () => {
  const { state,dispatch } = useAppContext();

  return (
    <Box>
      <BottomNavigation
        value={state.page}
        onChange={(event, newValue) => {
          event.preventDefault();
          dispatch({ type: "SET_PAGE", payload: newValue });
        }}
        showLabels
        sx={{
          width: "100%",
          justifyContent: "space-evenly",
          backgroundColor: "background.paper",
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

        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: "auto",
            right: "auto",
            p: 1.5,
            m: 1.5,
            backgroundColor: "background.default",
            borderRadius: "50%",
          }}
        >
          <Fab color="primary" aria-label="add">
            <AddTwoTone />
          </Fab>
        </Box>

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

    