import { Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React from 'react';
import { useSwiper } from 'swiper/react';

interface IAuthSwitchProps {
  slot?: string;
}

const AuthSwitch: React.FC<IAuthSwitchProps> = ({ slot }) => {
  const [slideIndex, setslideIndex] = React.useState(0);

  const swiper = useSwiper();

  swiper.on('slideChange', () => {
    setslideIndex(swiper.activeIndex);
  });

  return (
    <Grid slot={slot} direction="row" container>
      <Grid xs container>
        <Button
          fullWidth
          variant={slideIndex === 0 ? 'contained' : 'outlined'}
          onClick={() => swiper.slideTo(0)}
        >
          POSTS
        </Button>
      </Grid>
      <Grid xs container>
        <Button
          fullWidth
          variant={slideIndex === 1 ? 'contained' : 'outlined'}
          onClick={() => swiper.slideTo(1)}
        >
          COMMENTS
        </Button>
      </Grid>
      <Grid xs container>
        <Button
          fullWidth
          variant={slideIndex === 2 ? 'contained' : 'outlined'}
          onClick={() => swiper.slideTo(2)}
        >
          LIKES
        </Button>
      </Grid>
    </Grid>
  );
};

export default AuthSwitch;
