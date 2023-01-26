import { useSessionCtx } from "@/lib/contexts/SessionCtx";
import { useGetCurrentUser, useReadOneUser } from "@/lib/hooks/API/users/useAPIUser";
import useAuth from "@/lib/hooks/useAuth";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import SettingsIcon from "@mui/icons-material/Settings";
import { Box, MenuItem } from "@mui/material";
import error from "next/error";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const MyAccountMenu = () => {
  return (
    <Box>
      <MenuItem>
        <AccountCircleIcon />
        Profile
      </MenuItem>
      <MenuItem>
        <SettingsIcon />
        Settings
      </MenuItem>
    </Box>
  )
}

const MyAuthMenu = () => {
  const { session } = useSessionCtx();
  const { logout } = useAuth();



    const handleLogout = () => {
            logout();
            toast('Logged out successfully', {
              icon: '👋',
            })
  }

  const handleLogin = () => {
    // TODO : handle click on login
    toast('Login not implemented yet', {
      icon: ' 🤷‍♂️',
    })

  }
  
  if (!session) 
    return (
      <Box>
        <MenuItem onClick={handleLogin}>
          <LoginIcon />
          Login
        </MenuItem>,
      </Box>
    )

    
  return (
    <Box>
      <MenuItem onClick={handleLogout}>
            <LogoutIcon />
            Logout
      </MenuItem>,
    </Box>
  )
}

const OtherUserMenu = ({ isFriend }: {
  isFriend: boolean
}) => {

  const handleAddFriend = () => {
    // TODO : handle click on add friend
    toast('Add friend not implemented yet', {
      icon: ' 🤷‍♂️',
    })

  }
  const handleRemoveFriend = () => {
    // TODO : handle click on remove friend
    toast('Remove friend not implemented yet', {
      icon: ' 🤷‍♂️',
    })

  }

  return (
    <Box>
      <MenuItem>
        <AccountCircleIcon />
        Profile
      </MenuItem>
      {isFriend ? (
        <MenuItem onClick={handleRemoveFriend}>
          <PersonAddIcon />
          Add friend
        </MenuItem>
      ) : (
        <MenuItem onClick={handleAddFriend}>
          <PersonRemoveIcon />
          Remove friend
        </MenuItem>
      )}
    </Box>
  );
}

const UserCardMenu = ({ userId }: { userId?: number }) => {

  const { data: currentUser, error: errorC, isLoading: isLoadingC } = useGetCurrentUser();
 
  const { session } = useSessionCtx();
    const {
      data: user,
      error,
      isLoading,
    } = {
      data: null,
      error: null,
      isLoading: false,
    };
 

  if (!userId || userId === currentUser?.id) {
    if (!session || !currentUser) return <MyAuthMenu />;
    return <MyAccountMenu />;
  }


  //   useReadOneUser(
  //   {
  //     where: {
  //       id: userId
  //     }
  //   }
  // );
    
  const areFriends = false; // TODO : check if user is friend of current user
  
 


  if (isLoading || isLoadingC) return (
    <>
      ...Loading
      </> 
  );
  
  if (error || errorC) {
    // logout()
    return (
      <>
        Error
      </>
    );
  }


  return <OtherUserMenu isFriend={areFriends} />;
};

export default UserCardMenu;

export {
  MyAccountMenu,
  MyAuthMenu,
  OtherUserMenu,
  UserCardMenu

};
