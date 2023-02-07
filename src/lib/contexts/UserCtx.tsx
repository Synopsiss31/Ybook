import { LinearProgress } from '@mui/material';
import { Box } from '@mui/system';
import React, { createContext } from 'react';
import useSWR from 'swr';

import { getIdToken } from '@/lib/utils/cognito';
import type { UserModel } from '@/types/models';

import { DEFAULT_URL } from '../hooks/API/users/useAPIUser';

interface IUserCtx {
  user: UserModel | undefined;
}

const UserCtx = createContext<IUserCtx>({} as IUserCtx);

const UserCtxProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const fetcher = async (url: string) => {
    const token = await getIdToken();

    const response = await fetch(`${DEFAULT_URL}${url}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('An error occurred while fetching the data.');
    }

    return response.json();
  };

  const {
    data: user,
    error,
    isLoading,
  } = useSWR<UserModel>(`/users/me`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
  });

  if (isLoading)
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <LinearProgress />
      </Box>
    );

  if (error)
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Error
      </Box>
    );

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
