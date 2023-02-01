import type { ReactNode } from 'react';
import { createContext, useState } from 'react';

import type { PostModel } from '@/types/models';

interface IPostContext {
  post: PostModel;
  toggleLike: () => void;
  addComment: (text: string) => void;
  removeComment: (commentId: string) => void;
}

const PostContext = createContext<IPostContext>({} as IPostContext);

interface IPostProviderProps {
  children: ReactNode;
}

export const PostProvider = ({ children }: IPostProviderProps) => {
  const [post] = useState<PostModel>({} as PostModel);

  const toggleLike = () => {
    // if the user has already liked the post, remove the like
    // else create a PostLike and link it to the post

    throw new Error('Not implemented');
  };

  const addComment = () => {
    // create a PostComment and link it to the post

    throw new Error('Not implemented');
  };

  const removeComment = () => {
    // remove the PostComment from the post

    throw new Error('Not implemented');
  };

  return (
    <PostContext.Provider
      value={{ post, toggleLike, addComment, removeComment }}
    >
      {children}
    </PostContext.Provider>
  );
};
