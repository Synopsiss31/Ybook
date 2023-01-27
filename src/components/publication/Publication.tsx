// eslint-disable-next-line simple-import-sort/imports
import Comment from '@mui/icons-material/ChatBubbleOutline';
import Like from '@mui/icons-material/FavoriteBorder';
import ActiveLike from '@mui/icons-material/FavoriteOutlined';
import { Box, Divider, Fade, IconButton, Paper, Typography } from '@mui/material';
import Grid from "@mui/material/Unstable_Grid2";
import { useState } from 'react';
import Editor from '../editor/Editor';
import GetImage from '../image/get';

function Publication() {

  const [isLike, setIsLike] = useState(false);

  const [displayComment, setDisplayComment] = useState(false);
  
  const username = "Moi";

  const nbLike = 1076;

  const nbComment = 18;

  const description = "Voila une photo de mon super setup !";

  const toggleComment = () => {
    setDisplayComment((previous) => !previous);
  };


  return (
    <Paper>
      <Grid container direction="column" spacing={2}>
        <Grid
          container
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Grid
            sx={{
              maxHeight: 60,
              mx: 3,
              mt: 1,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Paper
              sx={{
                width: 50,
                height: 50,
                borderRadius: "50%",
                overflow: "hidden",
              }}
            >
              <GetImage
                fileID="a36de206-50dc-4e10-ab49-fad8b3e1b7b1"
                width={50}
                height={50}
              />
            </Paper>
          </Grid>
          <Grid
            xs
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Typography
              component="h1"
              sx={{
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}
            >
              @{username}
            </Typography>
          </Grid>
        </Grid>
        <Grid xs>
          <GetImage fileID="a36de206-50dc-4e10-ab49-fad8b3e1b7b1" />
        </Grid>
        <Grid container xs sx={{}}>
          <Grid
            xs={6}
            container
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-evenly",
            }}
            wrap="nowrap"
          >
            <Grid
              xs
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <IconButton
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
              <Typography component="span">
                {isLike ? nbLike + 1 : nbLike}
              </Typography>
            </Grid>
            <Grid
              xs
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
                <Comment />
              <Typography component="span">{nbComment}</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          xs
          container
          direction="column"
          sx={{
            px: 2,
          }}
        >
          <Grid xs>
            <Typography
              component="span"
              sx={{
                fontWeight: "bold",
                fontSize: "1.2rem",
              }}
            >
              @{username}
            </Typography>
          </Grid>
          <Grid xs>
            <Typography component="span">{description}</Typography>
          </Grid>
        </Grid>
        <Fade in={displayComment} timeout={300} unmountOnExit>
          <Grid xs>
            <Divider />
            <Grid>
              <Grid>
                <Grid>
                  <Editor />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Fade>
      </Grid>
    </Paper>
  );
}

const Def = () => {
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
