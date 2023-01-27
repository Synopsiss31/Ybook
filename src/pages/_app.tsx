import Authenticated from '@/layouts/Authenticated';
import { ColorModeProvider } from '@/lib/contexts/ColorModeContext';
import { withSession } from '@/lib/contexts/SessionCtx';
import { Box } from '@mui/material';
import type { AppProps } from 'next/app';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";


const App : React.FC<AppProps> = ({
  Component,
  pageProps: { ...pageProps },
}) =>{
  return (
    <ColorModeProvider>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "background.default",
        }}
      >
        <Authenticated>
          <Component {...pageProps} />
        </Authenticated>
      </Box>
    </ColorModeProvider>
  );
}

export default withSession(App);
