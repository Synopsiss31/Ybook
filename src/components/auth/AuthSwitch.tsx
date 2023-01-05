import { Button } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import React from "react";
import swiper from "swiper";
import { useSwiper } from "swiper/react";

interface IAuthSwitchProps {
  slot?: string;
}

const AuthSwitch: React.FC<IAuthSwitchProps> = ({slot}) => {

  const [isLogin, setIsLogin] = React.useState(true);
  const [isRegister, setIsRegister] = React.useState(false);


  const swiper = useSwiper();

  swiper.on("slideChange", () => {
    if (swiper.activeIndex === 0) setIsLogin(true);
    else setIsLogin(false);
    if (swiper.activeIndex === 1) setIsRegister(true);
    else setIsRegister(false);

  });

     
    


  return (
    <Grid
      slot={slot}
      direction="row"
      container
    >
      <Grid xs container>
        <Button
          fullWidth
          variant={isLogin ? "contained" : "outlined"}
          onClick={() => swiper.slideTo(0)}
        >
          Login
        </Button>
      </Grid>
      <Grid xs container>
        <Button 
          fullWidth
          variant={isRegister ? "contained" : "outlined"}
          onClick={() => swiper.slideTo(1)}
        >
          Register
        </Button>
      </Grid>
    </Grid>
  )
}

export default AuthSwitch;