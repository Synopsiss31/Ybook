// send an image on s3

import Authenticated from "@/layouts/Authenticated";
import { DEFAULT_URL } from "@/lib/hooks/API/users/useAPIUser";
import { getIdToken } from "@/lib/utils/cognito";
import { Box, Typography } from "@mui/material";
import useSWR from 'swr';


const CreatePost = () => {

  const fetcher = async (url: string) => {
    const idToken = await getIdToken();
    console.log("idToken", idToken)

    const response = await fetch(`${DEFAULT_URL}${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({
        name: "test",
        type: "image/png",
        size: 1336186,
      }),
    });

    return response.json();
  }



    const {data, error, isLoading} = useSWR<{url:string,s3Key:string,fileID:string}>(`/post/url`, fetcher, {revalidateOnFocus: false,});


  if (isLoading) return <Typography variant="h1">Loading...</Typography>;

  if (error) return <Typography variant="h1">Error</Typography>;
    
  return (
    <Authenticated>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
              method: "PUT",
              body: file,
            });
            if (!response.ok) {
              //log the error
              console.log("error", response);
              throw new Error("An error occurred while posting the image.");
            }
            console.log("fileID", data.fileID);
          }}
        />
      </Box>
    </Authenticated>
  );
};

export default CreatePost;