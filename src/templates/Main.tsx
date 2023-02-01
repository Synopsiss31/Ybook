import { Box } from '@mui/material';
import type { ReactNode } from 'react';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const Main = (props: IMainProps) => (
  <Box
    sx={{
      width: '100%',
      height: '100%',
    }}
  >
    {props.meta}
    <Box
      sx={{
        width: '100%',
        height: '100%',
      }}
    >
      {props.children}
    </Box>
  </Box>
);

export { Main };
