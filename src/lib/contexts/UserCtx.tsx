import React, { createContext } from 'react';

import type { UserModel } from '@/types/models';

interface IUserCtx {
  user: UserModel | null;
}

const UserCtx = createContext<IUserCtx | null>(null);

const UserCtxProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [user, setUser] = React.useState<UserModel | null>(null);

  React.useEffect(() => {
    // TODO: Fetch user from API
    setUser({
      id: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
      firstname: 'John',
      lastname: 'Doe',
      email: 'jdoe@example.com',
    } as UserModel);
  }, []);

  return <UserCtx.Provider value={{ user }}>{children}</UserCtx.Provider>;
};

const useUserCtx = () => {
  const ctx = React.useContext(UserCtx);

  if (!ctx) {
    throw new Error('useUserCtx must be used within UserCtxProvider');
  }

  return ctx;
};

export { UserCtxProvider, useUserCtx };
