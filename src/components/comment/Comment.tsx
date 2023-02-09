import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Button,
  Collapse,
  IconButton,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useRef, useState } from 'react';

import { usePostCtx } from '@/lib/contexts/PostContext';
import { useUserCtx } from '@/lib/contexts/UserCtx';
import type { PostCommentModel } from '@/types';

interface ICommentProps {
  comment: PostCommentModel;
  onClick?: (comment: PostCommentModel) => void;
}

const Comment = ({ comment, onClick }: ICommentProps) => {
  const { user } = useUserCtx();

  const { post, removeComment, editComment } = usePostCtx();

  if (!user) throw new Error('user is undefined');
  const isAuthor = user.id === comment.userId;

  const [displayPanel, setDisplayPanel] = useState(false);

  const [isEditing, setIsEditing] = useState(false);

  const [commentText, setCommentText] = useState(comment?.text ?? '');

  const handleEdit = () => {
    if (!isAuthor) return;

    setIsEditing(true);

    setCommentText(comment?.text ?? '');
  };

  const handleSave = () => {
    if (!isAuthor) return;

    editComment(comment.id, commentText);

    setIsEditing(false);
    setCommentText('');
  };

  const handleDelete = () => {
    if (!isAuthor) return;

    removeComment(comment.id);
  };

  const handleClick = () => {
    if (onClick) onClick(comment);
    else setDisplayPanel((prevDisplayPanel) => !prevDisplayPanel);
  };

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsEditing(false);
        setCommentText('');
        setDisplayPanel(false);
      }
    }
    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);

  return (
    <Grid
      container
      direction="column"
      xs
      spacing={0.5}
      sx={{
        m: 0.5,
        backgroundColor: 'rgba(0, 0, 0, 0.10)',
        borderRadius: 2,
      }}
      ref={ref}
    >
      <Collapse in={isEditing}>
        <Grid container xs spacing={0.5}>
          <Grid
            xs
            sx={{
              backgroundColor: 'rgba(0, 0, 0, 0.10)',
              borderRadius: 2,
              position: 'relative',
            }}
          >
            <TextField
              fullWidth
              multiline
              rows={3}
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <Typography
              variant="caption"
              sx={{
                position: 'absolute',
                bottom: 2,
                right: 10,
                color: commentText.length > 250 ? '#c63c45' : 'grey',
              }}
            >
              {commentText.length}/250
            </Typography>
          </Grid>
          <Grid xs>
            <Grid container xs spacing={0.5}>
              <Grid xs>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSave}
                  disabled={commentText.length === 0}
                >
                  Save
                </Button>
              </Grid>
              <Grid xs>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Collapse>
      <Collapse in={!isEditing}>
        <Grid
          container
          direction="column"
          xs
          spacing={0.5}
          onClick={handleClick}
        >
          <Grid xs>
            <Typography
              component="span"
              sx={{
                fontSize: '0.8rem',
              }}
              color={comment.user.id === post.userId ? 'primary' : 'secondary'}
            >
              @{`${comment.user.firstname} ${comment.user.lastname}`}
            </Typography>
          </Grid>
          <Grid
            xs
            sx={{
              position: 'relative',
            }}
          >
            <Typography component="span">{comment.text}</Typography>
            <Typography
              component="span"
              sx={{
                fontSize: '0.8rem',
                color: 'grey',
                position: 'absolute',
                right: 0,
              }}
            >
              {comment.createdAt !== comment.updatedAt && ' (edited)'}
            </Typography>
          </Grid>
        </Grid>
      </Collapse>

      <Collapse in={displayPanel}>
        <Grid container xs spacing={0.5}>
          <Grid
            xs
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
            }}
          >
            <IconButton onClick={handleEdit} disabled={isEditing} size="small">
              <EditIcon fontSize="inherit" />
            </IconButton>
          </Grid>
          <Grid>
            <IconButton
              onClick={handleDelete}
              disabled={isEditing}
              size="small"
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </Grid>
        </Grid>
      </Collapse>
    </Grid>
  );
};

export default Comment;
