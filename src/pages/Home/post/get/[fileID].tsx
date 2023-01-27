// Home/post/get/[fileName].tsx
// get the file / image from the bucket and display it fileName is the s3 key
// it get a presigned url from the api and then fetch the image from the bucket

import { useRouter } from 'next/router';
import { DEFAULT_URL } from '@/lib/hooks/API/users/useAPIUser';
import { getIdToken } from '@/lib/utils/cognito';
import Authenticated from '@/layouts/Authenticated';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import useSWR from 'swr';


const GetPost = () => {
  const router = useRouter();

  const fetcher = async (url: string) => {

    const { fileID } = router.query;

    const token = await getIdToken();

    const response = await fetch(`${DEFAULT_URL}${url}/${fileID}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      console.log("error", response);
      throw new Error('An error occurred while fetching the data.');
    }

    return response.json();
  };

  const { data, error, isLoading } = useSWR<{ url: string }>(`/post/url`, 
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
    }
  );
  
  

  if (isLoading) return <Typography variant="h1">Loading...</Typography>

  if (error) return <Typography variant="h1">Error</Typography>

  return (
    <Authenticated>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h1">Get Post</Typography>
          <Box>
            <Image
              src={data!.url}
              width={500}
              height={500}
              alt={"image"}
              loader={({ src}) => {return src}}
            />
          </Box>
      </Box>
    </Authenticated>
  );
};

export default GetPost;
