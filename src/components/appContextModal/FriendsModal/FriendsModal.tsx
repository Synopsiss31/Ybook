import { TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useEffect, useState } from 'react';
import useSWR from 'swr';

import UserCard from '@/components/user/UserCard';
import { DEFAULT_URL } from '@/lib/hooks/API/users/useAPIUser';
import { getIdToken } from '@/lib/utils/cognito';
import type { FriendshipModel, UserModel } from '@/types/models';

// eslint-disable-next-line import/no-cycle

const FriendsModal = () => {
  const [friends, setFriends] = useState<UserModel[]>([]);
  const [asking, setAsking] = useState<FriendshipModel[]>([]);

  const [reqString, setReqString] = useState('');

  const handleChange = (e: any) => {
    if (e?.target) setReqString(e.target.value);
  };

  useEffect(() => {
    const findFriend = async () => {
      if (reqString !== '') {
        const token = await getIdToken();

        const resp = await fetch(`${DEFAULT_URL}/friend/get`, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            filter: reqString,
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

    const timer = setTimeout(findFriend, 200);

    return () => clearTimeout(timer);
  }, [reqString]);

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

  const { data: rec } = useSWR<UserModel[]>(`/friend/recommended`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
  });

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
    <Grid
      container
      sx={{
        p: 2,
        width: 550,
        height: 500,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center',
        overflowY: 'auto',
      }}
      direction="column"
      xs
      spacing={2}
    >
      <Grid xs container direction="column" spacing={2}>
        <Grid xs>
          <Typography>Recommandés</Typography>
        </Grid>
        <Grid
          xs
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            overflowY: 'hidden',
          }}
          spacing={2}
        >
          {Array.isArray(rec) &&
            rec.map((user) => (
              <Grid key={user.id} xs>
                <UserCard user={user} />
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Grid xs container direction="column" spacing={2}>
        <Grid xs>
          <TextField
            sx={{
              width: '100%',
            }}
            placeholder={'Rechercher un ami...'}
            onChange={handleChange}
            value={reqString}
          />
        </Grid>
        <Grid
          container
          spacing={2}
          direction="column"
          sx={{
            overflowY: 'auto',
            maxHeight: 200,
          }}
          wrap="nowrap"
        >
          {Array.isArray(friends) &&
            friends.map((user) => (
              <Grid key={user.id} xs>
                <UserCard user={user} />
              </Grid>
            ))}
        </Grid>
      </Grid>
      <Grid
        xs
        container
        direction="column"
        sx={{
          width: '100%',
        }}
      >
        <Grid xs>
          <Typography sx={{ width: '100%' }}>Demandes</Typography>
        </Grid>
        <Grid
          xs
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'nowrap',
            overflowX: 'auto',
            overflowY: 'hidden',
          }}
        >
          {Array.isArray(asking) &&
            asking.map((friendship) => (
              <Grid key={friendship.id} xs>
                <UserCard user={friendship.from} />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default FriendsModal;
