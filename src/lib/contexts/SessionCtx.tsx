import { Session } from 'aws-sdk/clients/appstream';
import React, { createContext, useContext } from 'react';

interface SessionCtxType {
  session: Session | null;
  setSession: (session: Session) => void;
  clearSession: () => void;
}

const SessionCtx = createContext<SessionCtxType>({
  session: null,
  setSession: () => { },
  clearSession: () => { },
});

const SessionCtxProvider: React.FC<React.PropsWithChildren<Record<string, unknown>>> = ({ children }) => {
  const [session, setSession] = React.useState<Session | null>(null);

  const clearSession = () => {
    setSession(null);
  };

  return (
    <SessionCtx.Provider value={{ session, setSession, clearSession }}>
      {children}
    </SessionCtx.Provider>
  );
};

const useSessionCtx = () => {
  return useContext(SessionCtx);
}

const withSession = <P extends object>(Component: React.ComponentType<P>) => {
  return (props: P) => {
    return (
      <SessionCtxProvider>
        <Component {...props} />
      </SessionCtxProvider>
    );
  };
};

export { SessionCtxProvider, useSessionCtx, withSession };