import Authentication from '@/components/auth/Authentication';
import TopBar from '@/components/topbar/TopBar';
import { useSessionCtx } from '@/lib/contexts/SessionCtx';
import { UserCtxProvider } from '@/lib/contexts/UserCtx';
import useAuth from '@/lib/hooks/useAuth';
import React from 'react';
import { Toaster } from 'react-hot-toast';
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
      <UserCtxProvider>
        <TopBar />
        <div className="flex flex-col min-h-screen">
          <div className="flex flex-col flex-1">
            <main className="flex-1">{children}</main>
          </div>
        </div>
      </UserCtxProvider>
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