/* eslint-disable consistent-return */
// Home/post/get/[fileName].tsx
// get the file / image from the bucket and display it fileName is the s3 key
// it get a presigned url from the api and then fetch the image from the bucket

import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import useSWR from 'swr';

import { DEFAULT_URL } from '@/lib/hooks/API/users/useAPIUser';
import { getIdToken } from '@/lib/utils/cognito';

const GetImage = ({
  fileID,
  width,
  height,
  alt,
  fullHeight,
  fullWidth,
}: {
  fileID: string;
  width?: number;
  height?: number;
  alt?: string;
  fullHeight?: boolean;
  fullWidth?: boolean;
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

  const altText = useMemo(() => {
    if (!alt) return '';
    if (alt.split(' ').length > 1) {
      // return 1 letter of each word
      return alt
        .split(' ')
        .map((word) => word[0])
        .join('')
        .toLocaleUpperCase();
    }
    return alt[0]?.toLocaleUpperCase() || '';
  }, [alt]);

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

  const [errorImage, setErrorImage] = useState(false);

  const [boxRef, setBoxRef] = useState<HTMLDivElement | null>(null);

  const [imageDimensions, setImageDimensions] = useState<{
    width: number;
    height: number;
  }>({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (!boxRef) return;

    const { width: boxWidth, height: boxHeight } =
      boxRef.getBoundingClientRect();

    setImageDimensions({
      width: boxWidth,
      height: boxHeight,
    });
  }, [boxRef]);

  return (
    <Box
      sx={{
        width: fullWidth ? '100%' : width || 500,
        height: fullHeight ? '100%' : height || 500,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey.500',
        userSelect: 'none',
        userDrag: 'none',
        overflow: 'hidden',
      }}
      ref={setBoxRef}
    >
      {(() => {
        if (errorImage || isLoading || error || !data)
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
              <Typography>{altText}</Typography>
            </Box>
          );

        return (
          <Image
            src={data.url}
            {...imageDimensions}
            alt={altText}
            loader={({ src }) => {
              asLoad.current = true;
              return src;
            }}
            onError={() => {
              setErrorImage(true);
            }}
          />
        );
      })()}
    </Box>
  );
};

export default GetImage;
