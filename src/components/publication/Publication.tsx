// eslint-disable-next-line simple-import-sort/imports
import Image from 'next/image';
import Comment from '@mui/icons-material/ChatBubbleOutline';
import Like from '@mui/icons-material/FavoriteBorder';
import { Box, Button, Fade, IconButton, TextField, Typography } from '@mui/material';
import ActiveLike from '@mui/icons-material/FavoriteOutlined';
import { useRef, useState } from 'react';
import style from './publication.module.css';

import img from './imgpubli.png';
import imgpro from './profilimg.jpeg';

function Publication() {
  const [isShown, setIsShown] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const appear = () => {
    setIsShown((old) => !old);
  };
  const [isLike, setIsLike] = useState(false);

  return (
    <Box className={style.post}>
      <Box className={style.publiHead}>
        <Box className={style.imgheader}>
          <Image className={style.imgprof} src={imgpro} alt={""} />
        </Box>

        <Typography component="h1" className={style.namePro}>
          Synopsis
        </Typography>
      </Box>
      <Box className={style.imgPost}>
        <Image className={style.img} src={img} alt="img" />
      </Box>
      <Box className={style.interact}>
        <Box className={style.interactbutton}>
          <Box className={style.buttonlike}>
            <IconButton
              className={style.button}
              onClick={() => setIsLike((previous) => !previous)}
              sx={{ position: "relative", m: 1 }}
            >
              <Fade in={isLike} timeout={300}>
                <ActiveLike color="error" sx={{ position: "absolute" }} />
              </Fade>
              <Fade in={!isLike} timeout={300}>
                <Like sx={{ position: "absolute" }} />
              </Fade>
            </IconButton>
            <Typography component="span" className={style.nblike}>
              1076
            </Typography>
          </Box>
          <Box className={style.buttoncomment}>
            <IconButton className={style.button}>
              <Comment />
            </IconButton>
            <Typography component="span" className={style.nblike}>
              18
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className={style.publidesc}>
        <Box className={style.usernamedesc}>
          <Typography component="span" className={style.name}>
            Synopsis
          </Typography>
        </Box>
        <Box className={style.description}>
          <Typography component="span" className={style.desc}>
            Voila une photo de mon super setup !
            </Typography>
        </Box>
      </Box>
      <Box className={style.listcom}>
        <Box className={style.comcontent}>
          <Typography component="span" className={style.username}>
            Synopsis
          </Typography>
          <Typography component="span" className={style.com}>
            Salut ! Super setup je veux le même chien !
          </Typography>
        </Box>
        <Box className={style.comcontent}>
          <Typography component="span" className={style.username}>
            Micka{" "}
          </Typography>
          <Typography component="span" className={style.com}>
            Styléééé
          </Typography>
        </Box>
        <Box className={style.comcontent}>
          <Typography component="span" className={style.username}>
            UnderDog
          </Typography>
          <Typography component="span" className={style.com}>
            je suis un professional
          </Typography>
        </Box>
        <Box className={style.comcontent}>
          <Typography component="span" className={style.username}>
            Mohcine
          </Typography>
          <Typography component="span" className={style.com}>
            degage sahbi
          </Typography>
        </Box>
        <Box className={style.comcontent}>
          <Typography component="span" className={style.username}>
            michel
          </Typography>
          <Typography component="span" className={style.com}>
            comment ouvrir google ?
          </Typography>
        </Box>
        <Box className={style.comcontent}>
          <Typography component="span" className={style.username}>
            chien
          </Typography>
          <Typography component="span" className={style.com}>
            kelb
          </Typography>
        </Box>
        <Box className={style.comcontent}>
          <Typography component="span" className={style.username}>
            bisous
          </Typography>
          <Typography component="span" className={style.com}>
            non mais imagines
          </Typography>
        </Box>
        <Box className={style.comcontent}>
          <Typography component="span" className={style.username}>
            Synopsis
          </Typography>
          <Typography component="span" className={style.com}>
            ca fou quoi ?
          </Typography>
        </Box>
        <Box className={style.comcontent}>
          <Typography component="span" className={style.username}>
            simon
          </Typography>
          <Typography component="span" className={style.com}>
            bonjour
          </Typography>
        </Box>
      </Box>
      <Box className={style.bottomComment}>
        <Box className={style.rowComment}>
          <Box className={style.fullWidth}>
            <TextField
              ref={inputRef}
              onFocusCapture={appear}
              onBlurCapture={appear}
              className={style.inputcomment}
              type="text"
              placeholder="Ecrivez un commentaire ..."
            />
          </Box>
          <Fade in={isShown} timeout={150}>
            <Button sx={{}} variant="outlined" className={style.buttonpost}>
              Publier
            </Button>
          </Fade>
        </Box>
      </Box>
    </Box>
  );
}

const Def = () => {
  // duplicate above random nb of yime

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        overflowY: 'scroll',
      }}
    >
      {Array(Math.floor(Math.random() * 10) + 1)
        .fill(0)
        .map((_, index) => (
          <Box key={index} sx={{ m: 2 }}>
            <Publication />
          </Box>
        ))}
    </Box>
  );
};

export default Def;
