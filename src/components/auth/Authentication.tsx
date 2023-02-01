import { Box } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { Swiper, SwiperSlide } from 'swiper/react';

import AuthSwitch from './AuthSwitch';
import ConfirmUser from './ConfirmUser';
import ForgetPassword from './ForgetPassword';
import Login from './Login';
import Register from './Register';

const Authentication = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        sx={{
          position: 'absolute',
          marginTop: '10%',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Swiper
          spaceBetween={1000}
          slidesPerView={1}
          initialSlide={0}
          allowTouchMove={false}
          style={{
            height: '80%',
            width: '34%',
            minWidth: '300px',
          }}
        >
          <AuthSwitch slot="container-start" />
          <SwiperSlide>
            <Login />
          </SwiperSlide>
          <SwiperSlide>
            <Register />
          </SwiperSlide>
          <SwiperSlide>
            <ConfirmUser />
          </SwiperSlide>
          <SwiperSlide>
            <ForgetPassword />
          </SwiperSlide>
        </Swiper>
      </Box>
    </Grid>
  );
};

export default Authentication;
