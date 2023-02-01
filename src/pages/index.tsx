// eslint-disable-next-line import/no-named-as-default
import ReplayIcon from '@mui/icons-material/Replay';
import { Box, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import useSWR from 'swr';

import { DEFAULT_URL } from '@/lib/hooks/API/users/useAPIUser';
import { getIdToken } from '@/lib/utils/cognito';
import type { PostModel } from '@/types/models';

import Publication from '../components/publication/Publication';

function Index() {
  const router = useRouter();

  const fetcher = async (url: string) => {
    const token = await getIdToken();

    const response = await fetch(`${DEFAULT_URL}${url}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        limit: 10,
        offset: 0,
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
  } = useSWR<PostModel[]>(`/post/read`, fetcher, {
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

  const handleReload = () => {
    router.push(router.asPath);
  };

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
      <IconButton
        onClick={handleReload}
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          zIndex: 1000,
        }}
      >
        <ReplayIcon />
      </IconButton>
      {Array.isArray(posts) &&
        posts.map((post: PostModel) => (
          <Box key={post.id} sx={{ m: 2 }}>
            <Publication postId={post.id} />
          </Box>
        ))}
    </Box>
  );
}

export default Index;
