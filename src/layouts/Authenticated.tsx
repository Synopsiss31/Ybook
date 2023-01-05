import { useSessionCtx } from '@/lib/contexts/SessionCtx';
import useAuth from '@/lib/hooks/useAuth';
import LogoutIcon from '@mui/icons-material/Logout';
import { IconButton } from '@mui/material';
import React from 'react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import Authentication from '@/components/auth/Authentication';
interface IAuthenticatedProps {
  children: React.ReactNode;
}

const Authenticated: React.FC<IAuthenticatedProps> = ({ children }) => {

 
  const { logout } = useAuth();

  const { session } = useSessionCtx();
  
  if (!session) {
    return <Authentication/>
  }


  return (
    <>
      <IconButton onClick={
        () => {
            logout();
            toast('Logged out successfully', {
              icon: '👋',
            })
        }
      }>
        <LogoutIcon/>
      </IconButton>
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-col flex-1">
          <main className="flex-1">{children}</main>
        </div>
      </div>
    </>
  );
};

function withToaster<P>(Component: React.ComponentType<P>) {
  return (props: P) => (
    <>
      <Component {...props} />
      <Toaster />
    </>
  );
}

export default withToaster(Authenticated);