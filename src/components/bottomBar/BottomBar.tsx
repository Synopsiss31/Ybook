import { Pages, useAppContext } from "@/lib/contexts/AppContext";
import { AddTwoTone } from "@mui/icons-material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ChatIcon from "@mui/icons-material/Chat";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from '@mui/icons-material/Settings';
import { BottomNavigation, BottomNavigationAction, Box, Fab } from '@mui/material';
import { useRouter } from "next/router";
import { useEffect } from "react";


const BottomBar = () => {
  const { state, dispatch } = useAppContext();
  const router = useRouter();
  
  useEffect(() => {
    router.push(state.page.path);
  }, [state]);
  

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

    