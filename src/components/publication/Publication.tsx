// eslint-disable-next-line simple-import-sort/imports
import Image from 'next/image';
import Comment from '@mui/icons-material/ChatBubbleOutline';
import Like from '@mui/icons-material/FavoriteBorder';
import { Button, Fade, IconButton } from '@mui/material';
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
    <div className={style.post}>
      <div className={style.publiHead}>
        <Image className={style.imgprof} src={imgpro} alt={''} />
        <h1 className={style.namePro}>Synopsis</h1>
      </div>
      <div className={style.imgPost}>
        <Image className={style.img} src={img} alt="img" />
      </div>
      <div className={style.interact}>
        <div className={style.interactbutton}>
          <div className={style.buttonlike}>
            <IconButton
              className={style.button}
              onClick={() => setIsLike((previous) => !previous)}
              sx={{ position: 'relative', m: 1 }}
            >
              <Fade in={isLike} timeout={300}>
                <ActiveLike sx={{ position: 'absolute' }} />
              </Fade>
              <Fade in={!isLike} timeout={300}>
                <Like sx={{ position: 'absolute' }} />
              </Fade>
            </IconButton>
            <span className={style.nblike}>1076</span>
          </div>
          <div className={style.buttoncomment}>
            <IconButton className={style.button}>
              <Comment />
            </IconButton>
            <span className={style.nblike}>18</span>
          </div>
        </div>
      </div>
      <div className={style.publidesc}>
        <div className={style.usernamedesc}>Synopsis</div>
        <div className={style.description}>
          Voila une photo de mon super setup !
        </div>
      </div>
      <div className={style.listcom}>
        <div className={style.comcontent}>
          <span className={style.username}>Synopsis </span>
          <span className={style.com}>
            Salut ! Super setup je veux le même chien !
          </span>
        </div>
        <div className={style.comcontent}>
          <span className={style.username}>Micka </span>
          <span className={style.com}>Styléééé</span>
        </div>
        <div className={style.comcontent}>
          <span className={style.username}>UnderDog</span>
          <span className={style.com}>je suis un professional</span>
        </div>
        <div className={style.comcontent}>
          <span className={style.username}>Mohcine</span>
          <span className={style.com}>degage sahbi</span>
        </div>
        <div className={style.comcontent}>
          <span className={style.username}>michel</span>
          <span className={style.com}>comment ouvrir google ?</span>
        </div>
        <div className={style.comcontent}>
          <span className={style.username}>chien</span>
          <span className={style.com}>kelb</span>
        </div>
        <div className={style.comcontent}>
          <span className={style.username}>bisous</span>
          <span className={style.com}>non mais imagines</span>
        </div>
        <div className={style.comcontent}>
          <span className={style.username}>Synopsis</span>
          <span className={style.com}>ca fou quoi ?</span>
        </div>
        <div className={style.comcontent}>
          <span className={style.username}>simon</span>
          <span className={style.com}>bonjour</span>
        </div>
      </div>
      <div className={style.bottomComment}>
        <div className={style.rowComment}>
          <div className={style.fullWidth}>
            <input
              ref={inputRef}
              onFocusCapture={appear}
              onBlurCapture={appear}
              className={style.inputcomment}
              type="text"
              placeholder="Ecrivez un commentaire ..."
            />
          </div>
          <Fade in={isShown} timeout={150}>
            <Button sx={{}} variant="outlined" className={style.buttonpost}>
              Publier
            </Button>
          </Fade>
        </div>
      </div>
    </div>
  );
}

export default Publication;
