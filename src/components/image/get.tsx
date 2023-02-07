/* eslint-disable consistent-return */
// Home/post/get/[fileName].tsx
// get the file / image from the bucket and display it fileName is the s3 key
// it get a presigned url from the api and then fetch the image from the bucket

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useRef } from 'react';
import useSWR from 'swr';

import { DEFAULT_URL } from '@/lib/hooks/API/users/useAPIUser';
import { getIdToken } from '@/lib/utils/cognito';

const GetImage = ({
  fileID,
  width,
  height,
}: {
  fileID: string;
  width?: number;
  height?: number;
}) => {
  const asLoad = useRef(false);

  const idNoSlash = fileID.replaceAll('/', '%2F');

  const fetcher = async (url: string) => {
    if (asLoad.current) return;
    const token = await getIdToken();

    const response = await fetch(`${DEFAULT_URL}${url}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('An error occurred while fetching the data.');
    }

    return response.json();
  };

  const { data, error, isLoading } = useSWR<{ url: string }>(
    `/image/url/${idNoSlash}`,
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      refreshWhenHidden: false,
      refreshWhenOffline: false,
    }
  );

  useEffect(() => {
    return () => {
      asLoad.current = false;
    };
  }, []);

  return (
    <Box
      sx={{
        width: width || 500,
        height: height || 500,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey.500',
      }}
    >
      {(() => {
        if (isLoading) return <Typography variant="h1">Loading...</Typography>;

        if (error || !data) return <Typography variant="h1">Error</Typography>;

        asLoad.current = true;

        return (
          <Image
            src={data.url}
            width={width || 500}
            height={height || 500}
            alt={'image'}
            loader={({ src }) => {
              return src;
            }}
          />
        );
      })()}
    </Box>
  );
};

export default GetImage;
