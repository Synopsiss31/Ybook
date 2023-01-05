import { withSession } from '@/lib/contexts/SessionCtx';
import type { AppProps } from 'next/app';

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";


const App : React.FC<AppProps> = ({
  Component,
  pageProps: { ...pageProps },
}) =>{
  return <Component {...pageProps} />;
}

export default withSession(App);
