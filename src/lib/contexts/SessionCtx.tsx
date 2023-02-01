import type { Session } from 'aws-sdk/clients/appstream';
import React, { createContext, useContext } from 'react';

interface ISession extends Session {
  username: string;
}

interface SessionCtxType {
  session: ISession | null;
  setSession: (session: ISession) => void;
  clearSession: () => void;
}

const SessionCtx = createContext<SessionCtxType>({
  session: null,
  setSession: () => {},
  clearSession: () => {},
});

const SessionCtxProvider: React.FC<
  React.PropsWithChildren<Record<string, unknown>>
> = ({ children }) => {
  const isLoad = React.useRef(false);
  const [session, setSession] = React.useState<ISession | null>(null);

  React.useEffect(() => {
    if (!isLoad.current) {
      isLoad.current = true;
      // check if session is in local storage
      const sessionStr = localStorage.getItem('session');
      if (sessionStr) {
        const newSession = JSON.parse(sessionStr) as ISession;
        setSession(newSession);
      }
    }
    return () => {
      isLoad.current = false;
    };
  }, []);

  React.useEffect(() => {
    if (session) {
      localStorage.setItem('session', JSON.stringify(session));
      isLoad.current = true;
    } else {
      localStorage.removeItem('session');
    }
  }, [session]);

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
  const context = useContext(SessionCtx);
  if (context === undefined) {
    throw new Error('useSessionCtx must be used within SessionCtxProvider');
  }
  return context;
};

const withSession = <P extends object>(Component: React.ComponentType<P>) => {
  // eslint-disable-next-line react/display-name
  return (props: P) => {
    return (
      <SessionCtxProvider>
        <Component {...props} />
      </SessionCtxProvider>
    );
  };
};

export { SessionCtxProvider, useSessionCtx, withSession };

export type { ISession, SessionCtxType };
