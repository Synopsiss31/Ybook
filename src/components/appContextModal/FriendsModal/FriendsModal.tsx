import {
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useState } from 'react';
import useSWR from 'swr';

import UserCard from '@/components/user/UserCard';
import { DEFAULT_URL } from '@/lib/hooks/API/users/useAPIUser';
import { getIdToken } from '@/lib/utils/cognito';

import FriendRequest from './FriendRequest';

// eslint-disable-next-line import/no-cycle

const FriendsModal = () => {
  const [friends, setFriends] = useState([]);
  const [asking, setAsking] = useState([]);

  const findFriend = async (e) => {
    if (e.target.value !== '') {
      const token = await getIdToken();

      const resp = await fetch(`${DEFAULT_URL}/friend/get`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          filter: e.target.value,
        }),
      });

      if (!resp.ok) {
        throw new Error('An error occurred while fetching the data.');
      }
      setFriends(await resp.json());
    } else {
      setFriends([]);
    }
  };
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

  const { data } = useSWR(`/friend/recommended`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
  });

  const rec = data;

  const req = async (url: string) => {
    const token = await getIdToken();
    const resp = await fetch(`${DEFAULT_URL}${url}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    if (!resp.ok) {
      throw new Error('An error occurred while fetching the data.');
    }

    setAsking(await resp.json());
  };

  useSWR('/friend/pending/to', req, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
  });

  return (
    <>
      <DialogTitle id="alert-dialog-title">{'Friends'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <Grid
            container
            sx={{
              p: 2,
              width: 550,
              height: 500,
            }}
            direction="column"
            overflow="hidden"
          >
            <Grid
              container
              sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'row',
              }}
            >
              <Typography sx={{ width: '100%' }}>Recommandés</Typography>
              <Grid
                container
                sx={{
                  width: '100%',
                  height: '20%',
                  display: 'flex',
                  flexDirection: 'row',
                  flexWrap: 'nowrap',
                  overflowX: 'auto',
                  overflowY: 'hidden',
                }}
              >
                {Array.isArray(rec) &&
                  rec.map((id) => <UserCard key={id} user={id.id}></UserCard>)}
              </Grid>
              <Grid
                sx={{
                  width: '100%',
                  height: '35%',
                }}
              >
                <TextField
                  sx={{
                    width: '100%',
                  }}
                  placeholder={'Rechercher un ami...'}
                  onChange={findFriend}
                ></TextField>
                <Grid>
                  {Array.isArray(friends) &&
                    friends.map((id) => (
                      <UserCard key={id} user={id.id}></UserCard>
                    ))}
                </Grid>
              </Grid>
              <Grid
                sx={{
                  width: '100%',
                  height: '35%',
                }}
              >
                <Typography sx={{ width: '100%' }}>Demandes</Typography>
                <Grid
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    flexWrap: 'nowrap',
                    overflowX: 'auto',
                    overflowY: 'hidden',
                  }}
                >
                  {Array.isArray(asking) &&
                    asking.map((id) => (
                      <FriendRequest
                        key={id}
                        user={id.fromId}
                        id={id.id}
                      ></FriendRequest>
                    ))}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </DialogContentText>
      </DialogContent>
    </>
  );
};

export default FriendsModal;
