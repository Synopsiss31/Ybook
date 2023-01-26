import { Session } from 'aws-sdk/clients/appstream';
import React, { createContext, useContext } from 'react';

interface ISession extends Session{
  username: string;
}

interface SessionCtxType {
  session: ISession | null;
  setSession: (session: ISession) => void;
  clearSession: () => void;
}

const SessionCtx = createContext<SessionCtxType>({
  session: null,
  setSession: () => { },
  clearSession: () => { },
});

const SessionCtxProvider: React.FC<React.PropsWithChildren<Record<string, unknown>>> = ({ children }) => {
  const isLoad = React.useRef(false);
  const [session, setSession] = React.useState<ISession | null>(null);

  React.useEffect(() => {
    console.log('isLoad', isLoad.current)
    if (!isLoad.current) {
      isLoad.current = true;
      // check if session is in local storage
      const sessionStr = localStorage.getItem('session');
      console.log('sessionStr', sessionStr)
      if (sessionStr) {
        const session = JSON.parse(sessionStr) as ISession;
        setSession(session);
      }
    }
    return () => {
      isLoad.current = false;
    }
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
  if(context === undefined) {
    throw new Error('useSessionCtx must be used within SessionCtxProvider');
  }
  return context;
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

export type { ISession, SessionCtxType };