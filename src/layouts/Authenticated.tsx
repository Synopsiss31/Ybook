import Authentication from '@/components/auth/Authentication';
import BottomBar from '@/components/bottomBar/BottomBar';
import TopBar from '@/components/topbar/TopBar';
import { AppContextProvider } from '@/lib/contexts/AppContext';
import { useSessionCtx } from '@/lib/contexts/SessionCtx';
import { UserCtxProvider } from '@/lib/contexts/UserCtx';
import Grid from '@mui/system/Unstable_Grid';
import React from 'react';
import { Toaster } from 'react-hot-toast';

interface IAuthenticatedProps {
  children: React.ReactNode;
}

const Authenticated: React.FC<IAuthenticatedProps> = ({ children }) => {
 

  const { session } = useSessionCtx();
  
  if (!session) {
    return <Authentication/>
  }


  return (
    <>
      <UserCtxProvider>
        <AppContextProvider>
        <Grid
          container
          xs
          direction="column"
          sx={{
            width: "100%",
            height: "100%",
          }}
          wrap="nowrap"
        >
          <Grid>
            <TopBar />
          </Grid>
          <Grid
            xs
            sx={{
              width: "100%",
              height: "100%",
              overflow: "hidden ",
            }}
          >
            {children}
          </Grid>
          <Grid
            sx={{
              mt: "auto",
            }}
          >
            <BottomBar />
          </Grid>
        </Grid>
          <Toaster />
        </AppContextProvider>
      </UserCtxProvider>
    </>
  );
};



export default Authenticated;