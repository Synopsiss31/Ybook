import { useUserCtx } from "@/lib/contexts/UserCtx";
import useAuth from "@/lib/hooks/useAuth";
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, IconButton, Paper } from "@mui/material";
import Grid from "@mui/system/Unstable_Grid";
import toast from "react-hot-toast";
import UserCard from "../user/UserCard";
import MoonIcon from '@mui/icons-material/DarkMode';
import SunIcon from '@mui/icons-material/Brightness7';
import { useColorMode } from "@/lib/contexts/ColorModeContext";

const TopBar = () => {
  const { logout } = useAuth();
  
  const { user } = useUserCtx();

  const {colorMode,toggleColorMode} = useColorMode();

  const handleLogout = () => {
    toast("GoodBye", {
      icon: "👋",
    });
    setTimeout(() => {
      logout();
    }, 800);
  }


  return (
    <Paper>
      <Grid container xs>
        <Grid xs>
          <UserCard
            user={user!}
            interaction={
              <IconButton onClick={handleLogout}>
                <LogoutIcon />
              </IconButton>
            }
          />
        </Grid>
        <Grid xs>
          <IconButton onClick={
            toggleColorMode
          }>
            {
              colorMode === "light" ? <MoonIcon /> : <SunIcon />
            }
          </IconButton>
        </Grid>

      </Grid>
    </Paper>
  );
  
};

export default TopBar;