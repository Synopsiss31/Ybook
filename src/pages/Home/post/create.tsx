// send an image on s3

import { DEFAULT_URL } from "@/lib/hooks/API/users/useAPIUser";
import { getIdToken } from "@/lib/utils/cognito";
import useSWR from 'swr';


const CreatePost = () => {

  // const fetcher = async (url: string) => {
  //   console.log("idToken", idToken)

  //   const response = await fetch(`${DEFAULT_URL}${url}`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'text/plain',
  //       'Authorization': `Bearer ${idToken}`
  //     },
  //     body :{

  //     }
  //   });

  //   if (!response.ok) {
  //     throw new Error('An error occurred while fetching the user.');
  //   }

  //   return response.text();
  // }



  //   const {data, error, isLoading} = useSWR<string>(`/post/url`, fetcher, {revalidateOnFocus: false,});

  //   if (error) {
  //     console.log("error", error);
  //     return <div>failed to load</div>;
  //   }

  //   if (isLoading) {
  //     return <div>loading...</div>;
  //   }
  
  return (
    <div>
      <h1>Create Post</h1>
      <input type="file" onChange={async (e) => {
        const idToken = await getIdToken();
        const file = e.target.files![0];
        if (!file) return;
        const response = await fetch('http://localhost:8083/rest/post/url', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${idToken}`,
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            'name': file.name,
            'size': file.size,
            'type': file.type
          })
        });
        if (!response.ok) {
          //log the error
          console.log("error", response);
          throw new Error('An error occurred while posting the image.');
        }
        
        // get the s3 key from the response
        response.text().then(async (text) => {
          const obj = JSON.parse(text);
          console.log(text);
          const post = await fetch('http://localhost:8083/rest/post/create', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${idToken}`,
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
              'htmlContent': 'test',
              'attachments': [{
                's3Key': obj.s3Key,
                'type': 'PICTURE'
              }]
            })
          })
          //TODO: persister les images dans s3 avant de créer le post

          if(!post.ok){
            console.log("error", post);
            throw new Error('An error occurred while posting the post.');
          }

          post.text().then(async (text) => {

          })
        });
        

      }} />
    </div>
  );
};

export default CreatePost;