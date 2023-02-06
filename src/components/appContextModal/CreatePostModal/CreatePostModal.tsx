import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  IconButton,
  TextField,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import NextImage from 'next/image';
import { useRef, useState } from 'react';

// eslint-disable-next-line import/no-cycle
import { Modals, useAppContext } from '@/lib/contexts/AppContext';
import { DEFAULT_URL } from '@/lib/hooks/API/users/useAPIUser';
import { getIdToken } from '@/lib/utils/cognito';

const CreatePostModal = () => {
  const { dispatch } = useAppContext();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [displayImg, setDisplayImg] = useState(false);

  const [content, setContent] = useState<string>('');

  const [img, setImg] = useState<{
    src: string;
    alt: string;
    width: number;
    height: number;
  }>({
    src: '',
    alt: '',
    width: 0,
    height: 0,
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        const imge = new Image();
        imge.src = reader.result as string;
        imge.onload = () => {
          const imgAspectRatio = imge.width / imge.height;
          setImg({
            src: reader.result as string,
            alt: e.target.files![0]!.name,
            width: 250,
            height: 250 / imgAspectRatio,
          });
          setDisplayImg(true);
        };
      });
      reader.readAsDataURL(e.target.files[0]! as Blob);
    }
  };

  const handleClose = () => {
    dispatch({ type: 'SET_MODAL', payload: Modals.None });
  };

  const handleCreate = async () => {
    const token = await getIdToken();

    if (fileInputRef.current?.files![0]) {
      // get signed post url
      const response = await fetch(`${DEFAULT_URL}/image/url`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: img.alt,
          type: fileInputRef.current?.files![0]!.type || 'image/jpeg',
          size: fileInputRef.current?.files![0]!.size || 0,
        }),
      });

      if (!response.ok) {
        throw new Error('An error occurred while fetching the data.');
      }

      const signedPostUrl = await response.json();

      const response2 = await fetch(signedPostUrl.url, {
        method: 'PUT',
        headers: {
          'Content-Type': fileInputRef.current?.files![0]!.type || 'image/jpeg',
        },
        body: fileInputRef.current?.files![0],
      });

      if (!response2.ok) {
        throw new Error('An error occurred while fetching the data.');
      }

      const response3 = await fetch(`${DEFAULT_URL}/post/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          htmlContent: content,
          attachments: [
            {
              s3Key: signedPostUrl.s3Key,
              type: 'PICTURE',
            },
          ],
        }),
      });

      if (!response3.ok) {
        throw new Error('An error occurred while fetching the data.');
      }
    } else {
      const response3 = await fetch(`${DEFAULT_URL}/post/create`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          htmlContent: content,
          attachments: [],
        }),
      });

      if (!response3.ok) {
        throw new Error('An error occurred while fetching the data.');
      }
    }
  };

  return (
    <>
      <DialogTitle id="alert-dialog-title">{'Create Post'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Grid
            container
            sx={{
              p: 2,
              width: 250,
            }}
            direction="column"
            overflow="hidden"
          >
            <Grid xs>
              <TextField
                id="outlined-multiline-static"
                label="Content"
                multiline
                rows={5}
                fullWidth
                variant="outlined"
                onChange={(e) => {
                  setContent(e.target.value);
                }}
              />
            </Grid>
            <Grid xs>
              <Grid>
                <Grid>
                  <Button
                    onClick={() => {
                      fileInputRef.current?.click();
                    }}
                  >
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      style={{
                        display: 'none',
                      }}
                    />
                  </Button>
                </Grid>
                <Fade in={!!img.src}>
                  <Grid>
                    <IconButton
                      onClick={() => {
                        setDisplayImg(!displayImg);
                      }}
                    >
                      {displayImg ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                    </IconButton>
                  </Grid>
                </Fade>
              </Grid>
              <Fade in={displayImg} unmountOnExit>
                <Grid
                  xs
                  sx={{
                    overflow: 'hidden',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      width: '100%',
                      height: '100%',
                      overflow: 'scroll',
                      border: '1px solid',
                      borderColor: 'grey.500',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      m: 1,
                    }}
                  >
                    <NextImage {...img} loader={({ src }) => src} />
                  </Box>
                </Grid>
              </Fade>
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCreate} color="primary">
          Create
        </Button>

        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </>
  );
};

export default CreatePostModal;
