import { Fab } from '@mui/material';
import React from 'react';

interface IAuthenticatedProps {
  children: React.ReactNode;
}

const Authenticated: React.FC<IAuthenticatedProps> = ({ children }) => {
  return (
    <>
      <main>{children}</main>
      <footer>
        <Fab />
      </footer>
    </>
  );
};

export default Authenticated;
