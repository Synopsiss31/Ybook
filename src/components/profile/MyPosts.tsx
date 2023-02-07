// eslint-disable-next-line import/no-named-as-default
import { Box } from '@mui/material';
import useSWR from 'swr';

import { DEFAULT_URL } from '@/lib/hooks/API/users/useAPIUser';
import { getIdToken } from '@/lib/utils/cognito';
import type { PostModel } from '@/types/models';

import Publication from '../publication/Publication';

function MyPosts() {
  const fetcher = async (url: string) => {
    const token = await getIdToken();

    const response = await fetch(`${DEFAULT_URL}${url}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        limit: 10,
        page: 0,
      }),
    });

    if (!response.ok) {
      throw new Error('An error occurred while fetching the data.');
    }

    return response.json();
  };

  const {
    data: posts,
    error,
    isLoading,
  } = useSWR<PostModel[]>(`/post/me`, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    refreshWhenHidden: false,
    refreshWhenOffline: false,
  });

  if (isLoading)
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Loading...
      </Box>
    );

  if (error)
    return (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        Error
      </Box>
    );

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
      {Array.isArray(posts) &&
        posts.map((post: PostModel) => (
          <Box key={post.id} sx={{ m: 2 }}>
            <Publication postId={post.id} />
          </Box>
        ))}
    </Box>
  );
}

export default MyPosts;
