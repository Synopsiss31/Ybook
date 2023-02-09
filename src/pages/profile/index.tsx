import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FriendIcon from '@mui/icons-material/PeopleAlt';
import { Box, Paper, Typography } from '@mui/material';
import Grid from '@mui/system/Unstable_Grid';
import { useRef } from 'react';
import toast from 'react-hot-toast';
import { Swiper, SwiperSlide } from 'swiper/react';

import GetImage from '@/components/image/get';
import MyLikedPosts from '@/components/profile/MyLikedPost';
import MyPosts from '@/components/profile/MyPosts';
import ProfileSwitch from '@/components/profile/ProfileSwitch';
import { useUserCtx } from '@/lib/contexts/UserCtx';
import { DEFAULT_URL } from '@/lib/hooks/API/users/useAPIUser';
import { getIdToken } from '@/lib/utils/cognito';

import style from './profile.module.css';

const Profile = () => {
  const { user } = useUserCtx();

  const ppRef = useRef<HTMLInputElement | null>(null);

  const bgRef = useRef<HTMLInputElement | null>(null);

  const postImage = async (image: File) => {
    const idToken = await getIdToken();

    const response = await fetch(`${DEFAULT_URL}/image/url`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        name: 'test',
        type: 'image/png',
        size: 1336186,
      }),
    });

    const { url, s3Key } = await response.json();

    const response2 = await fetch(url, {
      method: 'PUT',
      body: image,
    });

    if (!response2.ok) {
      // log the error
      throw new Error('An error occurred while posting the image.');
    }

    return { s3Key };
  };

  const handleChangeProfilePicture = async () => {
    const idToken = await getIdToken();

    const file = ppRef.current?.files![0];

    if (!file) return;

    const response3 = await fetch(`${DEFAULT_URL}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        avatarS3Key: postImage(file),
      }),
    });

    if (!response3.ok) {
      // log the error
      throw new Error('An error occurred while posting the image.');
    }
    toast.success('Image uploaded successfully');
  };

  const handleChangeBackgroundPicture = async () => {
    const idToken = await getIdToken();

    const file = bgRef.current?.files![0];

    if (!file) return;

    const response3 = await fetch(`${DEFAULT_URL}/users/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        coverPicS3Key: postImage(file),
      }),
    });

    if (!response3.ok) {
      // log the error
      throw new Error('An error occurred while posting the image.');
    }
    toast.success('Image uploaded successfully');
  };

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
        onClick={() => bgRef?.current?.click()}
      >
        <GetImage
          fileID={user?.coverPicS3Key || ''}
          fullWidth
          fullHeight
          alt={``}
        />
        <input
          hidden
          type="file"
          onChange={handleChangeBackgroundPicture}
          ref={bgRef}
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
          onClick={() => ppRef?.current?.click()}
        >
          <GetImage
            fileID={user?.avatarS3Key || ''}
            width={100}
            height={100}
            alt={`${user?.firstname} ${user?.lastname}`}
          />
          <input
            hidden
            type="file"
            onChange={handleChangeProfilePicture}
            ref={ppRef}
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
