import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Friend from '@mui/icons-material/PeopleAlt';
import { Box } from '@mui/material';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';

import Comments from '../comments/Comments';
import Publications from '../publication/Publications';
import AuthSwitch from './AuthSwitch';
import style from './profile.module.css';
import img from './profileimg.png';

function Profile() {
  return (
    <div className={style.container}>
      <div className={style.profil}>
        <div className={style.profilinfo}>
          <Image className={style.img} src={img} alt="img" />
          <span className={style.username}>Moulay Senouci</span>
          <span className={style.email}>moulay.senouci@ynov.com</span>
        </div>
      </div>
      <div className={style.information}>
        <div className={style.friend}>
          <div className={style.myfriend}>
            <Friend className={style.muicon} />
            <span className={style.title}>Amis</span>
          </div>
          <div className={style.rightfirend}>
            <ArrowForwardIosIcon className={style.muifleche} />
          </div>
        </div>

        <Box
          sx={{
            position: 'relative',
            height: '80%',
            paddingBottom: 2,
            overflow: 'hidden',
          }}
        >
          <Swiper
            spaceBetween={1000}
            slidesPerView={1}
            initialSlide={0}
            allowTouchMove={false}
            style={{
              height: '100%',
              width: '100%',
              overflow: 'hidden',
            }}
          >
            <AuthSwitch slot="container-start" />
            <SwiperSlide>
              <Publications />
            </SwiperSlide>
            <SwiperSlide>
              <Comments />
            </SwiperSlide>
            <SwiperSlide>
              <Publications />
            </SwiperSlide>
          </Swiper>
        </Box>
      </div>
    </div>
  );
}

export default Profile;
