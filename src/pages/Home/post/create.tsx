// send an image on s3

import { DEFAULT_URL } from "@/lib/hooks/API/users/useAPIUser";
import { getIdToken } from "@/lib/utils/cognito";
import useSWR from 'swr';


const CreatePost = () => {

  const fetcher = async (url: string) => {
    const idToken = await getIdToken();
    console.log("idToken", idToken)

    const response = await fetch(`${DEFAULT_URL}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'text/plain',
        'Authorization': `Bearer ${idToken}`
      },
    });

    if (!response.ok) {
      throw new Error('An error occurred while fetching the user.');
    }

    return response.text();
  }



    const {data, error, isLoading} = useSWR<string>(`/post/url`, fetcher, {revalidateOnFocus: false,});

    if (error) {
      console.log("error", error);
      return <div>failed to load</div>;
    }

    if (isLoading) {
      return <div>loading...</div>;
    }
  
  return (
    <div>
      <h1>Create Post</h1>
      <input type="file" onChange={async (e) => {
        const file = e.target.files![0];
        const formData = new FormData();
        if (!file) return;
        if(!data) return;
        formData.append('file', file);
        const response = await fetch(data, {
          method: 'PUT',
          body: formData
        });
        if (!response.ok) {
          //log the error
          console.log("error", response);
          throw new Error('An error occurred while posting the image.');
        }

        console.log("response", response);        

      }} />
    </div>
  );
};

export default CreatePost;