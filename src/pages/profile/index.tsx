import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FriendIcon from '@mui/icons-material/PeopleAlt';
import { Box, Paper, Typography } from '@mui/material';
import Grid from '@mui/system/Unstable_Grid';
import { Swiper, SwiperSlide } from 'swiper/react';

import GetImage from '@/components/image/get';
import MyLikedPosts from '@/components/profile/MyLikedPost';
import MyPosts from '@/components/profile/MyPosts';
import ProfileSwitch from '@/components/profile/ProfileSwitch';
import { useUserCtx } from '@/lib/contexts/UserCtx';

import style from './profile.module.css';

const Profile = () => {
  const { user } = useUserCtx();

  return (
    <Box className={style.container}>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '33%',
          zIndex: 100,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '0 0 10% 10%',
          overflow: 'hidden',
        }}
      >
        <GetImage
          fileID={user?.coverPicS3Key || ''}
          fullWidth
          fullHeight
          alt={``}
        />
      </Box>
      <Box
        className={style.profil}
        sx={{
          marginTop: '2%',
          zIndex: 1000,
        }}
      >
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: '50%',
            overflow: 'hidden',
          }}
        >
          <GetImage
            fileID={user?.avatarS3Key || ''}
            width={100}
            height={100}
            alt={`${user?.firstname} ${user?.lastname}`}
          />
        </Paper>
        <Typography className={style.username}>
          {user?.firstname} {user?.lastname}
        </Typography>
        <Typography className={style.email}>{user?.email}</Typography>
      </Box>
      <Paper className={style.information}>
        <Paper
          className={style.friend}
          elevation={2}
          sx={{
            cursor: 'pointer',
            justifyContent: 'space-between',
            alignItems: 'center',
            display: 'flex',
          }}
        >
          <Grid xs container>
            <Grid xs container className={style.myfriend} spacing={2}>
              <Grid>
                <FriendIcon fontSize="large" className={style.muicon} />
              </Grid>
              <Grid>
                <Typography variant="h5" className={style.title}>
                  Friend
                </Typography>
              </Grid>
            </Grid>
            <Box className={style.rightfirend}>
              <ArrowForwardIosIcon className={style.muifleche} />
            </Box>
          </Grid>
        </Paper>

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
            <ProfileSwitch slot="container-start" />
            <SwiperSlide>
              <MyPosts />
            </SwiperSlide>
            <SwiperSlide></SwiperSlide>
            <SwiperSlide>
              <MyLikedPosts />
            </SwiperSlide>
          </Swiper>
        </Box>
      </Paper>
    </Box>
  );
};

export default Profile;
