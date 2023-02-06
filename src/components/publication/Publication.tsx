/* eslint-disable no-nested-ternary */
// eslint-disable-next-line simple-import-sort/imports
import Comment from '@mui/icons-material/ChatBubbleOutline';
import Like from '@mui/icons-material/FavoriteBorder';
import ActiveLike from '@mui/icons-material/FavoriteOutlined';
import {
  Button,
  Divider,
  Fade,
  IconButton,
  Paper,
  Skeleton,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useMemo, useState } from 'react';
import useSWR from 'swr';
import { DEFAULT_URL } from '@/lib/hooks/API/users/useAPIUser';
import { getIdToken } from '@/lib/utils/cognito';
import type { PostModel } from '@/types/models';
import { useUserCtx } from '@/lib/contexts/UserCtx';
import GetImage from '../image/get';

const Publication = ({ postId }: { postId: number }) => {
  if (!postId) throw new Error('postId is undefined');

  const { user } = useUserCtx();
  const fetcher = async (url: string) => {
    const token = await getIdToken();

    const response = await fetch(`${DEFAULT_URL}${url}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error('An error occurred while fetching the data.');
    }

    return response.json();
  };

  const { data, error, isLoading } = useSWR<PostModel>(
    `/post/read/${postId}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
    }
  );

  const post = data;

  const [isLikeCounted, setIsLikeCounted] = useState(
    !!post?.postLikes?.find((like) => like.userId === user?.id)
  );

  const memoIsLikeCounted = useMemo(
    () =>
      setIsLikeCounted(
        !!post?.postLikes?.find((like) => like.userId === user?.id)
      ),
    [post]
  );

  const [isLike, setIsLike] = useState(
    !!post?.postLikes?.find((like) => like.userId === user?.id)
  );

  const memoIsLike = useMemo(
    () =>
      setIsLike(!!post?.postLikes?.find((like) => like.userId === user?.id)),
    [post]
  );

  const [displayComment] = useState(true);

  const [width, setWidth] = useState(0);

  const [commenting, setCommenting] = useState(false);

  const [comment, setComment] = useState('');

  const handleLike = async () => {
    // api call
    if (!isLike) {
      const response = await fetch(`${DEFAULT_URL}/post/like/${postId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${await getIdToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error('An error occurred while fetching the data.');
      } else {
        setIsLike(true);
      }
      return;
    }

    if (isLike) {
      const response = await fetch(`${DEFAULT_URL}/post/like/${postId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${await getIdToken()}`,
        },
      });
      if (!response.ok) {
        throw new Error('An error occurred while fetching the data.');
      } else {
        setIsLike(false);
      }
    }
  };

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

  if (isLoading || !post?.htmlContent)
    return (
      <Skeleton
        variant="rectangular"
        width={width}
        height={width + width * 0.1}
        sx={{
          borderRadius: 10,
        }}
      ></Skeleton>
    );

  if (error)
    return (
      <Typography variant="h6" component="h2">
        Error
      </Typography>
    );

  const nbLike = post.postLikes?.length ?? 0;

  const handleComment = async () => {
    // send comment to api
    if (comment === '') return;
    setCommenting(false);
    const response = await fetch(`${DEFAULT_URL}/post/comment/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${await getIdToken()}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        postId,
        text: comment,
      }),
    });
    if (!response.ok) {
      throw new Error('An error occurred while fetching the data.');
    } else {
      setComment('');
    }
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
        {post.postAttachments?.length && (
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
                  <ActiveLike color="error" sx={{ position: 'absolute' }} />
                </Fade>
                <Fade in={!isLike} timeout={300}>
                  <Like sx={{ position: 'absolute' }} />
                </Fade>
              </IconButton>
              <Typography component="span">
                {isLike && !isLikeCounted
                  ? nbLike + 1
                  : !isLike && isLikeCounted
                  ? nbLike - 1
                  : nbLike}
              </Typography>
            </Grid>
            <Grid
              xs
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Comment />
              <Typography component="span">
                {post.postComments?.length ?? 0}
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
              <Grid>
                {post.postComments?.map((currentComment) => {
                  return (
                    <Grid key={currentComment.id} container direction="column">
                      <Grid>
                        <Typography
                          component="span"
                          sx={{
                            fontSize: '0.8rem',
                          }}
                          color={
                            currentComment.user.id === post.user?.id
                              ? 'primary'
                              : 'secondary'
                          }
                        >
                          @
                          {`${currentComment.user.firstname} ${currentComment.user.lastname}`}
                        </Typography>
                      </Grid>
                      <Grid>
                        <Typography component="span">
                          {currentComment.text}
                        </Typography>
                      </Grid>
                    </Grid>
                  );
                })}
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
                  onChange={(e) => setComment(e.target.value)}
                />
              </Grid>
              <Fade in={commenting} timeout={300}>
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

export default Publication;
