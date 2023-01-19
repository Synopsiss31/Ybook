import { useUserCtx } from "@/lib/contexts/UserCtx";
import useAuth from "@/lib/hooks/useAuth";
import LogoutIcon from '@mui/icons-material/Logout';
import { Box, Divider, IconButton, MenuItem } from "@mui/material";
import toast from "react-hot-toast";
import UserCard from "../user/UserCard";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from "@mui/icons-material/Settings";

const TopBar = () => {
  const { logout } = useAuth();
  
  const { user } = useUserCtx();

  const handleLogout = () => {
            logout();
            toast('Logged out successfully', {
              icon: '👋',
            })
        }


  return (
    <Box>
      <UserCard
        user={user!}
        // interaction={
        //   <IconButton onClick={handleLogout}>
        //     <LogoutIcon />
        //   </IconButton>
        // }
      />
    </Box>
  );
};

export default TopBar;