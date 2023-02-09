/* eslint-disable no-nested-ternary */
// eslint-disable-next-line simple-import-sort/imports
import { PostProvider, usePostCtx } from '@/lib/contexts/PostContext';
import { useUserCtx } from '@/lib/contexts/UserCtx';
import CommentIcon from '@mui/icons-material/ChatBubbleOutline';
import LikeIcon from '@mui/icons-material/FavoriteBorder';
import ActiveLikeIcon from '@mui/icons-material/FavoriteOutlined';
import {
  Button,
  Divider,
  Fade,
  IconButton,
  Paper,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';
import Comment from '../comment/Comment';
import GetImage from '../image/get';

const Publication = () => {
  const { post, toggleLike, addComment } = usePostCtx();

  const [displayComment] = useState(true);

  const [width, setWidth] = useState(0);

  const [commenting, setCommenting] = useState(false);

  const [comment, setComment] = useState('');

  const { user } = useUserCtx();

  useEffect(() => {
    // listen to resize
    window.addEventListener('resize', () => {
      if (window.innerWidth > 600) {
        setWidth(500);
      } else {
        setWidth(window.innerWidth - 50);
      }
    });

    // set initial width
    if (window.innerWidth > 600) {
      setWidth(500);
    } else {
      setWidth(window.innerWidth - 50);
    }

    return () => {
      window.removeEventListener('resize', () => {});
    };
  }, []);

  const isLike = post?.postLikes?.some((like) => like.userId === user?.id);

  const nbLikes = post?.postLikes?.length ?? 0;

  const handleComment = () => {
    if (comment) {
      addComment(comment);
      setComment('');
      setCommenting(false);
    }
  };

  const handleLike = () => {
    toggleLike();
  };

  return (
    <Paper
      sx={{
        width,
      }}
    >
      <Grid container direction="column" spacing={2}>
        <Grid
          container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
        >
          <Grid
            sx={{
              maxHeight: 60,
              mx: 3,
              mt: 1,
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Paper
              sx={{
                width: 50,
                height: 50,
                borderRadius: '50%',
                overflow: 'hidden',
              }}
            >
              {post?.user?.avatarS3Key && (
                <GetImage
                  fileID={post.user.avatarS3Key!}
                  width={50}
                  height={50}
                />
              )}
            </Paper>
          </Grid>
          <Grid
            xs
            sx={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              component="h1"
              sx={{
                fontWeight: 'bold',
                fontSize: '1.2rem',
              }}
            >
              @{`${post?.user?.firstname} ${post?.user?.lastname}` ?? 'Unknown'}
            </Typography>
          </Grid>
        </Grid>
        {!!post.postAttachments?.length && (
          <Grid xs>
            <GetImage
              fileID={
                post.postAttachments[0]?.s3Key ?? 'default-post-image.jpg'
              }
              width={width}
              height={width}
            />
          </Grid>
        )}
        <Grid container xs sx={{}}>
          <Grid
            xs={6}
            container
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
            wrap="nowrap"
          >
            <Grid
              xs
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <IconButton
                onClick={handleLike}
                sx={{ position: 'relative', m: 1 }}
              >
                <Fade in={isLike} timeout={300}>
                  <ActiveLikeIcon color="error" sx={{ position: 'absolute' }} />
                </Fade>
                <Fade in={!isLike} timeout={300}>
                  <LikeIcon sx={{ position: 'absolute' }} />
                </Fade>
              </IconButton>
              <Typography component="span">{nbLikes}</Typography>
            </Grid>
            <Grid
              xs
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <CommentIcon />
              <Typography component="span">
                {post?.postComments?.length}
              </Typography>
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
                fontWeight: 'bold',
                fontSize: '1.2rem',
              }}
            >
              @{`${post?.user?.firstname} ${post?.user?.lastname}` ?? 'Unknown'}
            </Typography>
          </Grid>
          <Grid xs>
            <Typography component="span">
              {post?.htmlContent ?? 'Unknown'}
            </Typography>
          </Grid>
        </Grid>
        <Fade in={displayComment} timeout={300} unmountOnExit>
          <Grid xs>
            <Divider />
            <Grid>
              <Grid
                sx={{
                  maxHeight: 200,
                  overflowY: 'auto',
                }}
              >
                {post?.postComments?.map((currentComment) => (
                  <>
                    <Comment key={currentComment.id} comment={currentComment} />
                    <Divider />
                  </>
                ))}
              </Grid>
              <Grid>
                <TextField
                  sx={{ width: '100%' }}
                  placeholder="Add a comment..."
                  multiline
                  rows={2}
                  variant="standard"
                  onFocus={() => setCommenting(true)}
                  onBlur={() => setCommenting(false)}
                  value={comment}
                  onChange={(e) => {
                    setComment(e.target.value);
                  }}
                />
                <Typography
                  sx={{
                    textAlign: 'right',
                    fontSize: '0.8rem',
                    color: comment.length > 250 ? '#c63c45' : 'grey',
                  }}
                >
                  {comment.length}/250
                </Typography>
              </Grid>
              <Fade in={commenting && !(comment.length > 250)} timeout={300}>
                <Grid>
                  <Button
                    onClick={handleComment}
                    variant="contained"
                    sx={{ width: '100%' }}
                  >
                    Send
                  </Button>
                </Grid>
              </Fade>
            </Grid>
          </Grid>
        </Fade>
      </Grid>
    </Paper>
  );
};

const PublicationWithPost = ({ postId, ...props }: any) => {
  return (
    <PostProvider postId={postId}>
      <Publication {...props} />
    </PostProvider>
  );
};

export default PublicationWithPost;
