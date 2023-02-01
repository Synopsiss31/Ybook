// send an image on s3

import { Box, Typography } from '@mui/material';
import useSWR from 'swr';

import { DEFAULT_URL } from '@/lib/hooks/API/users/useAPIUser';
import { getIdToken } from '@/lib/utils/cognito';

const CreateImage = () => {
  const fetcher = async (url: string) => {
    const idToken = await getIdToken();

    const response = await fetch(`${DEFAULT_URL}${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        name: 'test',
        type: 'image/png',
        size: 1336186,
      }),
    });

    return response.json();
  };

  const { data, error, isLoading } = useSWR<{
    url: string;
    s3Key: string;
    fileID: string;
  }>(`/image/url`, fetcher, { revalidateOnFocus: false });

  if (isLoading) return <Typography variant="h1">Loading...</Typography>;

  if (error) return <Typography variant="h1">Error</Typography>;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography variant="h4">Create Post</Typography>
      <input
        type="file"
        onChange={async (e) => {
          const file = e.target.files![0];
          if (!file) return;
          if (!data) return;
          const response = await fetch(data.url, {
            method: 'PUT',
            body: file,
          });
          if (!response.ok) {
            // log the error
            throw new Error('An error occurred while posting the image.');
          }
        }}
      />
    </Box>
  );
};

export default CreateImage;
